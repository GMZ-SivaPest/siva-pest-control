// Generate proper before/after pairs + about-page hero + showcase gallery.
// Run with: node /home/z/my-project/scripts/generate_work_images.mjs
//
// Strategy: each before/after pair uses two prompts that share scene
// composition (same room, angle, lighting) but differ in pest/treatment
// state. The two images won't be pixel-identical but they will look like
// the same scene before and after treatment — which is what the user asked
// for ("linked, not completely different images").

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_BA = "/home/z/my-project/public/images/before-after";
const OUT_SHOW = "/home/z/my-project/public/images/showcase";
const OUT_MISC = "/home/z/my-project/public/images/misc";

const SIZE = "1344x768"; // landscape, fits 16/10 slider aspect

// ============ BEFORE/AFTER PAIRS (3) ============
// Each entry: { id, before: {prompt, file}, after: {prompt, file} }
// Critical: same scene composition, only pest state changes.
const PAIRS = [
  {
    id: "kitchen-cockroach",
    before: {
      file: "kitchen-before.jpg",
      prompt:
        "Photorealistic documentary photograph of a South Indian apartment kitchen corner at night, " +
        "stainless steel sink with leftover water droplets, wooden cabinet door slightly ajar with brass hinges, " +
        "white tiled countertop, ~12 German cockroaches (light brown, two dark stripes) scattered on the counter, " +
        "around the sink edge, and crawling on the cabinet hinge; tiny dark droppings visible near the hinge gap; " +
        "warm yellow under-cabinet LED lighting, slight overhead fluorescent fill, sharp focus on the counter, " +
        "shot from a 45-degree top-down angle from 1.2m away, professional pest-control field photography, " +
        "no text, no watermark, no people",
    },
    after: {
      file: "kitchen-after.jpg",
      prompt:
        "Photorealistic documentary photograph of the SAME South Indian apartment kitchen corner at night, " +
        "stainless steel sink with leftover water droplets, wooden cabinet door slightly ajar with brass hinges, " +
        "white tiled countertop, completely clean and dry — NO cockroaches, NO droppings anywhere; " +
        "three tiny dots of white gel-bait visible behind the cabinet hinge and along the sink-caulk line " +
        "(clearly the treatment, not dirt); warm yellow under-cabinet LED lighting, slight overhead fluorescent fill, " +
        "sharp focus on the counter, shot from the SAME 45-degree top-down angle from 1.2m away, " +
        "professional post-treatment field photography, no text, no watermark, no people",
    },
  },
  {
    id: "termite-doorframe",
    before: {
      file: "termite-before.jpg",
      prompt:
        "Photorealistic documentary photograph of a wooden door frame in a South Indian home, " +
        "bottom 60cm of a teak-wood frame meeting a cream-painted wall, severe subterranean termite damage: " +
        "brown mud tubes running vertically up the wood grain, hollowed-out sections exposing inner channels, " +
        "fine brown frass (sawdust) piled on the floor at the base of the frame; soft daylight from a window to the left, " +
        "eye-level angle, 50cm away, sharp focus on the mud tubes, professional pest-control field photography, " +
        "no text, no watermark, no people",
    },
    after: {
      file: "termite-after.jpg",
      prompt:
        "Photorealistic documentary photograph of the SAME wooden door frame in a South Indian home after termite treatment, " +
        "bottom 60cm of a teak-wood frame meeting a cream-painted wall, NO mud tubes, NO frass, " +
        "floor swept clean; a row of small evenly-spaced drilled holes along the bottom of the frame, " +
        "each hole filled with a small white sealant plug (clearly a drill-fill-seal termite barrier treatment); " +
        "soft daylight from a window to the left, eye-level angle, 50cm away, sharp focus on the sealed drill holes, " +
        "professional post-treatment field photography, no text, no watermark, no people",
    },
  },
  {
    id: "mosquito-yard",
    before: {
      file: "mosquito-before.jpg",
      prompt:
        "Photorealistic documentary photograph of a residential South Indian backyard corner, " +
        "a shallow stagnant water puddle (~50cm wide) on a concrete slab near a boundary wall, " +
        "green algae film on the water surface, ~15 visible mosquitoes hovering in a swarm above the puddle, " +
        "a discarded plastic bucket and old tyre nearby; late afternoon golden-hour lighting, " +
        "standing eye-level angle, 2m away, sharp focus on the puddle and swarm, " +
        "professional pest-control field photography, no text, no watermark, no people",
    },
    after: {
      file: "mosquito-after.jpg",
      prompt:
        "Photorealistic documentary photograph of the SAME residential South Indian backyard corner after mosquito treatment, " +
        "the puddle area now swept clean and dry, concrete slab visible, NO standing water, NO mosquitoes, " +
        "the discarded bucket and old tyre have been removed; a small yellow larvicide briquette " +
        "(Bti dunk, clearly a treatment product) visible at the edge of where the puddle was; " +
        "faint residual fog visible in the air indicating recent thermal fogging; " +
        "late afternoon golden-hour lighting, standing eye-level angle, 2m away, " +
        "sharp focus on the dry concrete area, professional post-treatment field photography, " +
        "no text, no watermark, no people",
    },
  },
];

// ============ ABOUT PAGE — new hero image ============
const ABOUT_HERO = {
  file: "about-hero-team.png",
  prompt:
    "Photorealistic documentary photograph of two South Indian pest control technicians in matching khaki uniforms " +
    "with the word 'SIVA' visible on the chest, kneeling in a customer's kitchen examining under a sink with a flashlight, " +
    "professional equipment bag open on the floor beside them showing gel-bait tubes and a spray tank; " +
    "warm natural window light, residential kitchen background slightly blurred, candid working moment, " +
    "shot from a 3/4 angle 1.5m away, professional photojournalism style, " +
    "no text overlay, no watermark, faces not visible (focused on hands and equipment)",
};

// ============ SHOWCASE / PREVIOUS WORKS GALLERY (6) ============
const SHOWCASE = [
  {
    file: "work-restaurant-kitchen.jpg",
    title: "FSSAI-compliant restaurant IPM",
    location: "T. Nagar, Chennai",
    prompt:
      "Photorealistic documentary photograph of a clean commercial restaurant kitchen in Chennai after pest control service, " +
      "stainless steel counters gleaming, wall-mounted fly UV light trap glowing softly in the corner, " +
      "a Siva technician in khaki uniform logging the service on a clipboard attached to the wall; " +
      "professional kitchen lighting, sharp focus on the UV trap and clipboard, 3m away wide angle, " +
      "professional commercial pest-control documentation photography, no text overlay, no watermark",
  },
  {
    file: "work-warehouse-termite.jpg",
    title: "Warehouse perimeter termite barrier",
    location: "Whitefield, Bangalore",
    prompt:
      "Photorealistic documentary photograph of a Siva pest control technician in khaki uniform drilling " +
    "into a concrete warehouse floor along the perimeter wall with a rotary hammer drill, " +
    "white dust collecting in a neat line, an injection tube visible going into the drilled hole for termite chemical barrier; " +
    "high warehouse ceiling, industrial lighting, eye-level 2m away, sharp focus on the drill and hole, " +
    "professional commercial pest-control documentation photography, no text overlay, no watermark",
  },
  {
    file: "work-bedbug-steam.jpg",
    title: "Bed bug steam treatment — mattress",
    location: "Madhapur, Hyderabad",
    prompt:
      "Photorealistic documentary photograph of a Siva pest control technician in khaki uniform " +
      "applying a professional steam cleaner with a wide nozzle to a bedroom mattress in a Hyderabad apartment, " +
      "hot steam visible coming out of the nozzle, the technician's gloved hands holding the nozzle, " +
      "bedroom with simple white walls and wooden bed frame, warm window light from the side, " +
      "eye-level 1.5m away, sharp focus on the steam nozzle and mattress surface, " +
    "professional pest-control field photography, no text overlay, no watermark, no faces visible",
  },
  {
    file: "work-rodent-station.jpg",
    title: "Rodent bait station install — warehouse",
    location: "Guindy, Chennai",
    prompt:
      "Photorealistic documentary photograph of a black tamper-resistant rodent bait station " +
      "placed along an exterior warehouse wall corner on a concrete floor, " +
      "a Siva technician's gloved hand placing a bait block inside the open station, " +
      "a small yellow 'Rodent Control' warning sticker on the wall above; " +
      "industrial building exterior, soft overcast daylight, eye-level 1m away, " +
      "sharp focus on the bait station, professional pest-control field photography, " +
      "no text overlay, no watermark",
  },
  {
    file: "work-beehive-removal.jpg",
    title: "Bee hive removal — apartment balcony",
    location: "Koramangala, Bangalore",
    prompt:
      "Photorealistic documentary photograph of a Siva pest control technician in full protective bee suit " +
      "carefully removing a large honeycomb bee hive from the underside of an apartment balcony ceiling, " +
      "using a smoker and a long-handled scraper, the hive visible as a hanging pale-yellow honeycomb mass; " +
      "warm late-afternoon light, eye-level 2m away, sharp focus on the hive and scraper, " +
      "professional pest-control field photography, no text overlay, no watermark",
  },
  {
    file: "work-bird-spike.jpg",
    title: "Bird spike installation — commercial ledge",
    location: "Hitech City, Hyderabad",
    prompt:
      "Photorealistic documentary photograph of a row of newly installed stainless steel bird spikes " +
      "glued along a concrete commercial-building window ledge, the spikes pointing up to deter pigeons; " +
      "a Siva technician's gloved hand visible pressing the final spike strip into the adhesive, " +
      "blurred city background visible below; soft overcast daylight, eye-level 1m away, " +
      "sharp focus on the spike strip and adhesive line, professional pest-control field photography, " +
      "no text overlay, no watermark",
  },
];

// ============ HELPERS ============
async function generateOne(zai, prompt, outPath) {
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
    console.log(`[skip] already exists: ${outPath}`);
    return { ok: true, skipped: true, path: outPath };
  }
  try {
    console.log(`[start] ${outPath}`);
    const t0 = Date.now();
    const resp = await zai.images.generations.create({
      prompt,
      size: SIZE,
    });
    const b64 = resp.data[0].base64;
    const buf = Buffer.from(b64, "base64");
    fs.writeFileSync(outPath, buf);
    const ms = Date.now() - t0;
    console.log(`[ok]   ${outPath}  (${(buf.length / 1024).toFixed(0)} KB, ${ms}ms)`);
    return { ok: true, path: outPath };
  } catch (e) {
    console.error(`[fail] ${outPath}: ${e.message}`);
    return { ok: false, error: e.message, path: outPath };
  }
}

async function main() {
  const zai = await ZAI.create();

  const jobs = [];

  // Pairs
  for (const p of PAIRS) {
    jobs.push({ prompt: p.before.prompt, outPath: path.join(OUT_BA, p.before.file) });
    jobs.push({ prompt: p.after.prompt, outPath: path.join(OUT_BA, p.after.file) });
  }
  // About hero
  jobs.push({ prompt: ABOUT_HERO.prompt, outPath: path.join(OUT_MISC, ABOUT_HERO.file) });
  // Showcase
  for (const s of SHOWCASE) {
    jobs.push({ prompt: s.prompt, outPath: path.join(OUT_SHOW, s.file) });
  }

  console.log(`Running ${jobs.length} image-generation jobs (concurrency=2, 4s gap)…`);

  const results = [];
  const CONCURRENCY = 1;
  const GAP_MS = 6000;
  let idx = 0;

  async function worker(label) {
    while (idx < jobs.length) {
      const myIdx = idx++;
      const j = jobs[myIdx];
      if (fs.existsSync(j.outPath) && fs.statSync(j.outPath).size > 5000) {
        console.log(`[skip:${label}] ${j.outPath}`);
        results.push({ ok: true, skipped: true, path: j.outPath });
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      const r = await generateOne(zai, j.prompt, j.outPath);
      results.push(r);
      // small gap between requests to avoid 429
      await new Promise((r) => setTimeout(r, GAP_MS));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(`w${i}`)));

  const ok = results.filter((r) => r.ok).length;
  const fail = results.length - ok;
  console.log(`\n=== Done. ${ok} succeeded, ${fail} failed ===`);
  if (fail > 0) {
    console.log("Failed paths:");
    results.filter((r) => !r.ok).forEach((r) => console.log(`  - ${r.path}: ${r.error}`));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
