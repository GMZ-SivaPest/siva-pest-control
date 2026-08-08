#!/bin/bash
# generate-blog.sh — Blog post thumbnails
cd /home/z/my-project

gen() {
  local out="$1"; shift
  local prompt="$1"; shift
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP $out"
    return 0
  fi
  echo "GEN  $out"
  z-ai image -s 1344x768 -o "$out" -p "$prompt" 2>&1 | tail -2
}

gen public/images/blog/monsoon.png "Premium editorial photograph of an Indian residential home during monsoon rain, beautiful garden with rain falling, protective pest prevention theme, no insects visible, peaceful protected home, warm sand color palette with teal sky accent, editorial photography, high detail"

gen public/images/blog/termite-detection.png "Premium editorial photograph of a homeowner inspecting a wooden door frame with flashlight, modern Indian home interior, no insects visible, prevention and detection theme, warm ivory and sand color palette with orange accent, editorial photography, high detail"

gen public/images/blog/fssai.png "Premium editorial photograph of a pristine modern Indian restaurant kitchen with stainless steel counters, chef inspecting fresh ingredients, FSSAI compliance theme, no insects, premium hospitality aesthetic, warm ivory and steel color palette with orange accent, editorial photography, high detail"

gen public/images/blog/child-safe.png "Premium editorial photograph of a young Indian family with toddler playing safely in a clean modern living room, professional pest control treatment recently applied, no insects visible, peaceful protected home, warm ivory and sand color palette with orange accent, editorial photography, high detail"

gen public/images/blog/bed-bugs-pg.png "Premium editorial photograph of a tidy modern PG hostel room with bunk beds and crisp linens, professional treatment applied, no insects visible, clean protected accommodation, warm ivory and sand color palette with orange accent, editorial photography, high detail"

gen public/images/blog/pre-monsoon-checklist.png "Premium editorial flat-lay photograph of a home inspection checklist on a clipboard with pen, modern Indian home kitchen background softly blurred, no insects visible, organized methodical prevention theme, warm ivory and sand color palette with orange accent, top-down editorial photography, high detail"

echo "=== Blog batch complete ==="
ls -la public/images/blog/
