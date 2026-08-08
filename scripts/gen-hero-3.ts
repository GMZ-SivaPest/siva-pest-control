import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();

  const prompts = [
    {
      file: '/home/z/my-project/public/images/hero/hero-cinematic-wide.png',
      prompt: 'Cinematic wide hero image: a confident South Indian pest control technician in clean modern navy uniform with subtle orange accents, holding professional spray equipment, standing in front of a beautiful modern South Indian luxury apartment building at golden hour, warm soft sunlight, palm trees, premium commercial advertising photography, shallow depth of field, warm sand and ivory color palette, deep brown tones, sense of trust and protection, no insects visible, no pests visible, photorealistic, ultra high detail, depth of field bokeh background, premium brand aesthetic, Apple-style product photography lighting',
      size: '1344x768' as const,
    },
    {
      file: '/home/z/my-project/public/images/hero/hero-split.png',
      prompt: 'Cinematic split-composition hero image: left half shows a beautiful modern South Indian home exterior at golden hour with warm interior lights, right half shows a professional technician in clean uniform holding spray equipment, premium editorial photography, warm orange and ivory palette, depth of field, no insects, no pests, photorealistic, high detail, premium brand aesthetic',
      size: '1344x768' as const,
    },
  ];

  for (const p of prompts) {
    try {
      console.log(`Generating: ${p.file}`);
      const resp = await zai.images.generations.create({ prompt: p.prompt, size: p.size });
      const b64 = resp.data[0].base64;
      fs.writeFileSync(p.file, Buffer.from(b64, 'base64'));
      console.log(`OK: ${p.file} (${fs.statSync(p.file).size} bytes)`);
    } catch (e: any) {
      console.error(`FAIL ${p.file}: ${e.message}`);
    }
  }
}
main();
