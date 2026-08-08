import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();

  const prompts = [
    {
      file: '/home/z/my-project/public/images/hero/hero-technician.png',
      prompt: 'Cinematic wide shot of a professional South Indian pest control technician in clean navy blue uniform with subtle orange accents, standing confidently in front of a beautiful modern South Indian home at golden hour, holding professional spray equipment, warm soft sunlight, shallow depth of field, premium commercial photography style, warm sand and ivory color palette, protective service mood, no text, no logo, photorealistic, high detail, depth of field bokeh background, no pests visible, no insects, sense of trust and protection',
      size: '1344x768' as const,
    },
    {
      file: '/home/z/my-project/public/images/hero/hero-shield-home.png',
      prompt: 'Cinematic hero image of a beautiful modern South Indian luxury villa at twilight with warm interior lights glowing, a subtle translucent glowing protective energy shield dome overlay covering the entire home in soft teal-orange gradient, premium real estate photography, golden hour lighting, palm trees, no people, no insects, no pests, protective service mood, photorealistic, premium brand aesthetic, deep brown and warm orange color palette, sense of safety and protection, ultra high detail, depth of field',
      size: '1344x768' as const,
    },
    {
      file: '/home/z/my-project/public/images/hero/hero-treatment-macro.png',
      prompt: 'Extreme close-up macro shot of a gloved professional hand in white nitrile gloves precisely applying a tiny gel bait dot inside a modern Indian kitchen, premium editorial pest control photography, shallow depth of field, warm professional lighting, no insects visible, no pests, scientific precision mood, ivory and warm orange palette, photorealistic, high detail, depth of field bokeh background, premium brand aesthetic',
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
