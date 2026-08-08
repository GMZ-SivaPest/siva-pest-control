#!/bin/bash
# generate-pests.sh — Pest library illustrations
cd /home/z/my-project

gen() {
  local out="$1"; shift
  local prompt="$1"; shift
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP $out"
    return 0
  fi
  echo "GEN  $out"
  z-ai image -s 1024x1024 -o "$out" -p "$prompt" 2>&1 | tail -2
}

gen public/images/pests/termite.png "Premium macro scientific photograph of a single termite isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/cockroach.png "Premium macro scientific photograph of a single German cockroach isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/mosquito.png "Premium macro scientific photograph of a single Aedes mosquito isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/bedbug.png "Premium macro scientific photograph of a single bed bug isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/rodent.png "Premium macro scientific photograph of a single house mouse isolated on warm ivory background, soft amber lighting, museum-quality specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/ant.png "Premium macro scientific photograph of a single carpenter ant isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/spider.png "Premium macro scientific photograph of a single garden spider isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

gen public/images/pests/fly.png "Premium macro scientific photograph of a single house fly isolated on warm ivory background, soft amber lighting, museum-quality entomology specimen photography, sharp focus on body details, scientific reference photography style, no infestation no damage, single specimen only, warm sand and brown color palette, professional macro photography, high detail"

echo "=== Pests batch complete ==="
ls -la public/images/pests/
