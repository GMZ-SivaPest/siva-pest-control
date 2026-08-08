#!/bin/bash
# generate-services-resume.sh — Skip already-generated images
cd /home/z/my-project

gen() {
  local out="$1"; shift
  local prompt="$1"; shift
  local size="${1:-1024x1024}"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP $out"
    return 0
  fi
  echo "GEN  $out"
  z-ai image -s "$size" -o "$out" -p "$prompt" 2>&1 | tail -2
}

gen public/images/services/cockroach.png "Premium close-up of a clean modern Indian kitchen with white marble countertop and stainless steel appliances, a technician's gloved hand precisely applying tiny gel bait dots behind a stove in micro-dosing precision, professional pest control application, no insects visible, no mess, no spray, child-safe modern treatment, warm ivory and sand color palette with orange accent, professional commercial photography, shallow depth of field, high detail"

gen public/images/services/mosquito.png "Cinematic photograph of a beautiful Indian residential backyard garden at twilight with subtle eco-friendly mosquito misting treatment being applied, soft golden fog drifting through landscaped garden, modern luxury home in background, peaceful protected outdoor space, no insects visible, premium residential setting, warm sand and teal color palette with orange sunset accent, professional photography, high detail"

gen public/images/services/bed-bug.png "Professional photograph of a clean modern bedroom with crisp white linens on a premium mattress, a technician using professional steam heat treatment equipment on mattress seams, modern bedroom interior, no insects visible, sterile and protected mood, warm ivory and sand color palette, professional commercial photography, high detail, shallow depth of field"

gen public/images/services/rodent.png "Premium photograph of a professional pest control technician sealing entry points around a modern home's utility pipe with stainless steel wool and exclusion material, gloved hands working precisely, modern home interior detail, no rodents visible, focused on prevention and exclusion, warm sandstone and brown color palette with orange accent, professional commercial photography, high detail"

gen public/images/services/bird.png "Architectural photograph of a modern high-rise apartment balcony with professionally installed transparent bird netting and discreet stainless steel spikes on railing, clean minimal premium aesthetic, blue sky background, no birds visible, focus on prevention and humane exclusion, warm sand and ivory color palette, professional architectural photography, high detail"

gen public/images/services/commercial.png "Professional photograph of a pristine modern commercial restaurant kitchen with stainless steel surfaces, a certified pest control technician in clean uniform conducting inspection with clipboard and UV light, FSSAI compliant environment, no insects visible, premium hospitality aesthetic, warm ivory and steel color palette with orange safety accent, professional commercial photography, high detail"

gen public/images/services/ant.png "Premium close-up of a technician's gloved hand applying eco-friendly gel bait along a modern kitchen skirting board crack, professional precision application, no ants visible, modern Indian home interior with marble flooring, warm sand and ivory color palette with orange accent, professional commercial photography, shallow depth of field, high detail"

echo "=== Services batch complete ==="
ls -la public/images/services/
