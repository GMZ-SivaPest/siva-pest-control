/**
 * Lead encryption verification script.
 *
 * Scans Lead rows in the database and proves that the PII columns
 * (nameEnc, phoneEnc, emailEnc, messageEnc):
 *   1. are stored as AES-256-GCM ciphertext (base64, correct structure),
 *   2. do NOT contain readable plaintext,
 *   3. can be decrypted back with the current ENCRYPTION_KEY.
 *
 * Also self-tests the encryption helpers (encrypt -> decrypt round trip)
 * to confirm the app's cipher implementation is working.
 *
 * Usage:
 *   bun scripts/verify-encryption.ts            # verify all leads
 *   bun scripts/verify-encryption.ts <leadId>   # verify a single lead
 *
 * Exit codes: 0 = all good, 1 = problems found.
 */
import { PrismaClient } from "@prisma/client";
import { decrypt, encrypt, isEncrypted } from "../src/lib/encryption";

const db = new PrismaClient();

/** Fields that must always be present and decryptable. */
const REQUIRED_FIELDS = ["nameEnc", "phoneEnc"] as const;
/** Fields that may legitimately be null (customer left them blank). */
const OPTIONAL_FIELDS = ["emailEnc", "messageEnc"] as const;

interface LeadRow {
  id: string;
  nameEnc: string;
  phoneEnc: string;
  emailEnc: string | null;
  messageEnc: string | null;
  createdAt: Date;
}

interface FieldCheck {
  field: string;
  ok: boolean;
  detail: string;
}

function checkField(field: string, value: string | null, required: boolean): FieldCheck {
  // Optional field never filled by the customer — nothing to verify.
  if (value === null) {
    if (required) {
      return { field, ok: false, detail: "unexpected null on a required field" };
    }
    return { field, ok: true, detail: "null (optional, not provided)" };
  }

  // Empty string is valid output of encrypt('') — treat as not-provided.
  if (value === "") {
    if (required) {
      return { field, ok: false, detail: "unexpected empty string on a required field" };
    }
    return { field, ok: true, detail: "empty string (optional, not provided)" };
  }

  // Structure check: base64 with IV + ciphertext + auth tag (>= 29 bytes).
  if (!isEncrypted(value)) {
    return {
      field,
      ok: false,
      detail: "not valid AES-256-GCM ciphertext structure — possible plaintext stored!",
    };
  }

  // Readability check: must NOT contain control chars / long readable ASCII runs
  // before decryption. Ciphertext is base64, so anything outside [A-Za-z0-9+/=]
  // indicates plaintext leakage.
  if (!/^[A-Za-z0-9+/=]+$/.test(value)) {
    return { field, ok: false, detail: "contains non-base64 characters — possible plaintext" };
  }

  // Decryption check: the most important one — the stored value must decrypt
  // cleanly with the current ENCRYPTION_KEY (proves key match + data integrity,
  // since GCM auth tags fail hard on tampering or wrong keys).
  let decrypted: string;
  try {
    decrypted = decrypt(value);
  } catch {
    return {
      field,
      ok: false,
      detail: "decryption FAILED — wrong/changed ENCRYPTION_KEY or corrupted data",
    };
  }

  if (decrypted.length === 0) {
    return { field, ok: false, detail: "decrypted to an empty string" };
  }

  // Leakage check: the decrypted value must not appear in the stored value and
  // vice versa (i.e. the column must not hold plaintext).
  if (value.includes(decrypted) || decrypted === value) {
    return { field, ok: false, detail: "stored value equals/contains its plaintext!" };
  }

  return {
    field,
    ok: true,
    detail: `ciphertext (len=${value.length}) -> decrypted OK (len=${decrypted.length})`,
  };
}

async function main(): Promise<number> {
  console.log("=== Lead Encryption Verification ===\n");

  // 1. Self-test the cipher helpers.
  const sample = "Self-test ✓ 123 +91 90000 00000";
  const selfOk = (() => {
    try {
      return decrypt(encrypt(sample)) === sample;
    } catch {
      return false;
    }
  })();
  console.log(`Cipher self-test (encrypt -> decrypt round trip): ${selfOk ? "OK" : "FAILED"}\n`);
  if (!selfOk) {
    console.error("The encryption helpers are broken — check ENCRYPTION_KEY / encryption.ts.");
    return 1;
  }

  // 2. Load leads (all, or the single one passed as argv[2]).
  const leadId = process.argv[2];
  const leads: LeadRow[] = await db.lead.findMany({
    where: leadId ? { id: leadId } : {},
    orderBy: { createdAt: "desc" },
  });

  if (leads.length === 0) {
    console.log(leadId ? `No lead found with id "${leadId}".` : "No leads in the database yet.");
    return 0;
  }

  console.log(`Scanning ${leads.length} lead(s)...\n`);

  let failures = 0;

  for (const lead of leads) {
    console.log(`Lead ${lead.id} (created ${lead.createdAt.toISOString()}):`);

    const checks: FieldCheck[] = [
      ...REQUIRED_FIELDS.map((f) => checkField(f, lead[f], true)),
      ...OPTIONAL_FIELDS.map((f) => checkField(f, lead[f], false)),
    ];

    for (const { field, ok, detail } of checks) {
      console.log(`  ${ok ? "✓" : "✗"} ${field}: ${detail}`);
      if (!ok) failures += 1;
    }
    console.log();
  }

  if (failures > 0) {
    console.error(`FAIL — ${failures} problem(s) found. Details above.`);
    return 1;
  }

  console.log("PASS — all PII fields are stored as AES-256-GCM ciphertext and decrypt cleanly.");
  return 0;
}

main()
  .then((code) => db.$disconnect().then(() => process.exit(code)))
  .catch((err) => {
    console.error("Verification script crashed:", err);
    db.$disconnect()
      .catch(() => undefined)
      .finally(() => process.exit(1));
  });

