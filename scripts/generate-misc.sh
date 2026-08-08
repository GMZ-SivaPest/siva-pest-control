#!/bin/bash
# generate-hero-and-about.sh — Hero, About page, Process visuals

set -e
cd /home/z/my-project

echo "=== About page hero ==="
z-ai image -s 1344x768 -o public/images/misc/about-hero.png -p "Cinematic photograph of a professional Indian pest control technician team in clean modern uniforms standing confidently in front of a luxury residential building, three technicians with professional equipment cases, warm golden hour lighting, premium corporate team photography, diverse team, no insects, no scary imagery, warm sand and ivory color palette with orange accent, professional photography, high detail"

echo "=== Process: Inspection ==="
z-ai image -s 1024x1024 -o public/images/misc/process-inspection.png -p "Professional photograph of a certified pest control technician conducting thorough inspection of a modern Indian home with flashlight and magnifying glass, kneeling to examine kitchen skirting board, professional uniform with logo, modern interior, no insects visible, scientific methodical approach, warm ivory and sand color palette with orange accent, professional commercial photography, high detail"

echo "=== Process: Treatment ==="
z-ai image -s 1024x1024 -o public/images/misc/process-treatment.png -p "Professional photograph of a pest control technician's gloved hands precisely calibrating a modern gel bait application device, professional equipment in soft focus background, scientific precision, modern and clean, warm ivory color palette with orange accent, professional commercial photography, macro lens, high detail"

echo "=== Process: Follow-up ==="
z-ai image -s 1024x1024 -o public/images/misc/process-followup.png -p "Professional photograph of a friendly Indian pest control technician in clean uniform returning for follow-up inspection, holding digital tablet with checklist, modern home interior, customer service excellence, no insects visible, premium service aesthetic, warm ivory and sand color palette with orange accent, professional commercial photography, high detail"

echo "=== Trust/Certification badge image ==="
z-ai image -s 1024x1024 -o public/images/misc/certifications.png -p "Premium flat-lay photograph of professional pest control certifications and badges on a warm ivory desk, ISO 9001 certification badge, FSSAI compliant certificate, CIB RC registration, Green Pro service provider badge, professional credentials arranged neatly, warm sand and ivory color palette with orange and teal accents, professional commercial photography, top-down view, high detail"

echo "=== CTA background ==="
z-ai image -s 1440x720 -o public/images/misc/cta-bg.png -p "Cinematic wide-angle photograph of a beautiful protected Indian neighborhood at twilight with warm amber lights glowing in homes, peaceful safe community mood, subtle protective overlay suggesting safety, no people no insects, warm sand and brown color palette with orange ambient lighting, professional photography, high detail, suitable as dark background with overlay"

echo "=== About: Modern equipment ==="
z-ai image -s 1024x1024 -o public/images/misc/equipment.png -p "Professional photograph of modern pest control equipment arranged neatly: professional sprayer, gel bait applicator, UV inspection light, moisture meter, protective gloves, all on a clean ivory surface, premium professional aesthetic, no insects, warm sand color palette with orange accent, professional commercial photography, top-down flat lay, high detail"

echo "=== Done ==="
ls -la public/images/misc/
