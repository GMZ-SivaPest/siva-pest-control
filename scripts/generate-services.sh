#!/bin/bash
# generate-images.sh — Generate all premium images for Siva Pest Control website
# Uses z-ai image CLI. Run from project root.

set -e
cd /home/z/my-project

echo "=== [1/9] HERO image — cinematic protection-first ==="
z-ai image -s 1344x768 -o public/images/hero/hero-main.png -p "Cinematic wide-angle photograph of a beautiful modern Indian luxury home at golden hour, warm sandstone and ivory exterior, large glass windows, lush green garden, soft orange sunset light bathing the facade, a subtle translucent protective energy shield glowing faintly around the house in warm amber tones suggesting safety and protection, professional architectural photography, premium real estate aesthetic, no people, no insects, peaceful and safe mood, warm color palette of sand beige ivory cream with orange accent, high detail, 8k quality"

echo "=== [2/9] SERVICE: Termite Control ==="
z-ai image -s 1024x1024 -o public/images/services/termite.png -p "Premium close-up photograph of a technician's gloved hand applying advanced soil treatment around a wooden door frame foundation, modern drill-fill-seal termite barrier treatment, professional pest control equipment, warm sandstone and ivory background, soft orange accent lighting, child-safe professional treatment, scientific precision, no insects visible, clean modern aesthetic, warm color palette, high detail commercial photography"

echo "=== [3/9] SERVICE: Cockroach Gel ==="
z-ai image -s 1024x1024 -o public/images/services/cockroach.png -p "Premium close-up of a clean modern Indian kitchen with white marble countertop and stainless steel appliances, a technician's gloved hand precisely applying tiny gel bait dots behind a stove in micro-dosing precision, professional pest control application, no insects visible, no mess, no spray, child-safe modern treatment, warm ivory and sand color palette with orange accent, professional commercial photography, shallow depth of field, high detail"

echo "=== [4/9] SERVICE: Mosquito Control ==="
z-ai image -s 1024x1024 -o public/images/services/mosquito.png -p "Cinematic photograph of a beautiful Indian residential backyard garden at twilight with subtle eco-friendly mosquito misting treatment being applied, soft golden fog drifting through landscaped garden, modern luxury home in background, peaceful protected outdoor space, no insects visible, premium residential setting, warm sand and teal color palette with orange sunset accent, professional photography, high detail"

echo "=== [5/9] SERVICE: Bed Bug Treatment ==="
z-ai image -s 1024x1024 -o public/images/services/bed-bug.png -p "Professional photograph of a clean modern bedroom with crisp white linens on a premium mattress, a technician using professional steam heat treatment equipment on mattress seams, modern bedroom interior, no insects visible, sterile and protected mood, warm ivory and sand color palette, professional commercial photography, high detail, shallow depth of field"

echo "=== [6/9] SERVICE: Rodent Control ==="
z-ai image -s 1024x1024 -o public/images/services/rodent.png -p "Premium photograph of a professional pest control technician sealing entry points around a modern home's utility pipe with stainless steel wool and exclusion material, gloved hands working precisely, modern home interior detail, no rodents visible, focused on prevention and exclusion, warm sandstone and brown color palette with orange accent, professional commercial photography, high detail"

echo "=== [7/9] SERVICE: Bird Management ==="
z-ai image -s 1024x1024 -o public/images/services/bird.png -p "Architectural photograph of a modern high-rise apartment balcony with professionally installed transparent bird netting and discreet stainless steel spikes on railing, clean minimal premium aesthetic, blue sky background, no birds visible, focus on prevention and humane exclusion, warm sand and ivory color palette, professional architectural photography, high detail"

echo "=== [8/9] SERVICE: Commercial IPM ==="
z-ai image -s 1024x1024 -o public/images/services/commercial.png -p "Professional photograph of a pristine modern commercial restaurant kitchen with stainless steel surfaces, a certified pest control technician in clean uniform conducting inspection with clipboard and UV light, FSSAI compliant environment, no insects visible, premium hospitality aesthetic, warm ivory and steel color palette with orange safety accent, professional commercial photography, high detail"

echo "=== [9/9] SERVICE: Ant Control ==="
z-ai image -s 1024x1024 -o public/images/services/ant.png -p "Premium close-up of a technician's gloved hand applying eco-friendly gel bait along a modern kitchen skirting board crack, professional precision application, no ants visible, modern Indian home interior with marble flooring, warm sand and ivory color palette with orange accent, professional commercial photography, shallow depth of field, high detail"

echo "=== All service images generated ==="
ls -la public/images/services/
