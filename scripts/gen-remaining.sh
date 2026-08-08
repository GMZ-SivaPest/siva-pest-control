#!/bin/bash
# gen-remaining.sh — sequentially generate remaining images with delays to avoid rate limits
cd /home/z/my-project

gen() {
  local out="$1"; shift
  local prompt="$1"; shift
  local size="${1:-1344x768}"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP $out"
    return 0
  fi
  echo "GEN  $out"
  for attempt in 1 2 3; do
    z-ai image -s "$size" -o "$out" -p "$prompt" 2>&1 | tail -2
    if [ -f "$out" ] && [ -s "$out" ]; then
      echo "  OK"
      break
    fi
    echo "  Attempt $attempt failed, waiting 30s..."
    sleep 30
  done
  sleep 10  # delay between successful calls
}

gen public/images/blog/fssai.png "Premium editorial photograph of a pristine modern Indian restaurant kitchen with stainless steel counters, chef inspecting fresh ingredients, FSSAI compliance theme, no insects, premium hospitality aesthetic, warm ivory and steel color palette with orange accent, editorial photography, high detail"

gen public/images/blog/child-safe.png "Premium editorial photograph of a young Indian family with toddler playing safely in a clean modern living room, professional pest control treatment recently applied, no insects visible, peaceful protected home, warm ivory and sand color palette with orange accent, editorial photography, high detail"

gen public/images/blog/bed-bugs-pg.png "Premium editorial photograph of a tidy modern PG hostel room with bunk beds and crisp linens, professional treatment applied, no insects visible, clean protected accommodation, warm ivory and sand color palette with orange accent, editorial photography, high detail"

gen public/images/blog/pre-monsoon-checklist.png "Premium editorial flat-lay photograph of a home inspection checklist on a clipboard with pen, modern Indian home kitchen background softly blurred, no insects visible, organized methodical prevention theme, warm ivory and sand color palette with orange accent, top-down editorial photography, high detail"

gen public/images/misc/about-hero.png "Cinematic photograph of a professional Indian pest control technician team in clean modern uniforms standing confidently in front of a luxury residential building, three technicians with professional equipment cases, warm golden hour lighting, premium corporate team photography, diverse team, no insects, no scary imagery, warm sand and ivory color palette with orange accent, professional photography, high detail"

gen public/images/misc/cta-bg.png "Cinematic wide-angle photograph of a beautiful protected Indian neighborhood at twilight with warm amber lights glowing in homes, peaceful safe community mood, no people no insects, warm sand and brown color palette with orange ambient lighting, professional photography, high detail, suitable as dark background with overlay"

echo "=== Final listing ==="
ls -la public/images/blog/ public/images/misc/
