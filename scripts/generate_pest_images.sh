#!/usr/bin/env bash
# Generates real, scientifically-accurate pest colony / infestation / control-mechanism
# images for every pest in the library, plus homepage control/treatment images.
#
# Uses z-ai image CLI. Each generation is independent and idempotent — already-generated
# files are skipped (size > 0 check).
#
# Run from anywhere; outputs to /home/z/my-project/public/images/pests/ and
# /home/z/my-project/public/images/treatments/.

set +e  # Never exit on a single failure — keep generating

PEST_DIR="/home/z/my-project/public/images/pests"
TREAT_DIR="/home/z/my-project/public/images/treatments"
CAROUSEL_DIR="/home/z/my-project/public/images/carousel"
mkdir -p "$PEST_DIR" "$TREAT_DIR" "$CAROUSEL_DIR"

gen() {
  local out="$1"
  local prompt="$2"
  local size="${3:-1024x1024}"
  if [ -s "$out" ]; then
    echo "SKIP (exists): $(basename "$out")"
    return 0
  fi
  echo "GEN: $(basename "$out") — ${size}"
  # Write output to a per-image log file so a single failure doesn't kill the script
  if z-ai image -p "$prompt" -o "$out" -s "$size" > "/tmp/gen-$(basename "$out").log" 2>&1; then
    if [ -s "$out" ]; then
      echo "  OK ($(stat -c%s "$out") bytes)"
      return 0
    fi
  fi
  # Retry once
  echo "  retrying..."
  sleep 2
  if z-ai image -p "$prompt" -o "$out" -s "$size" > "/tmp/gen-$(basename "$out").log" 2>&1; then
    if [ -s "$out" ]; then
      echo "  OK on retry ($(stat -c%s "$out") bytes)"
      return 0
    fi
  fi
  echo "  FAILED — see /tmp/gen-$(basename "$out").log"
}

# ============================================================================
# PEST LIBRARY — colony / infestation / specimen photos
# (Editorial photography style, documentary realism, NOT posed stock)
# ============================================================================

# Cockroaches (3 species)
gen "$PEST_DIR/german-cockroach.jpg" \
  "Documentary macro photograph of a German cockroach (Blattella germanica) infestation in a kitchen cabinet hinge — multiple small light-brown cockroaches with two dark stripes behind the head, scattered egg cases (ootheca) and black pepper-like droppings, harsh flash lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$PEST_DIR/american-cockroach.jpg" \
  "Documentary photograph of large reddish-brown American cockroaches (Periplaneta americana) scattered on a damp bathroom floor at night, multiple adults with long antennae, real-world photojournalistic style, harsh flash lighting, sharp detail, no text" \
  "1344x768"

# Termites
gen "$PEST_DIR/subterranean-termite.jpg" \
  "Documentary close-up photograph of subterranean termite workers and soldiers in damaged wood, cream-colored soft-bodied insects in a mud tube on a wooden door frame, real-world photojournalistic style, sharp macro detail, no text" \
  "1344x768"

# Rodents (3 species)
gen "$PEST_DIR/house-rat.jpg" \
  "Documentary photograph of a black roof rat (Rattus rattus) in a residential attic at night, long tail, large ears, sharp focus, harsh flash, real-world photojournalistic style, no text" \
  "1344x768"

gen "$PEST_DIR/house-mouse.jpg" \
  "Documentary photograph of a small grey house mouse (Mus musculus) on a kitchen floor at night, sharp focus, harsh flash, real-world photojournalistic style, no text" \
  "1344x768"

gen "$PEST_DIR/bandicoot-rat.jpg" \
  "Documentary photograph of a large brown bandicoot rat (Bandicota indica) with short tail near a garbage area, harsh flash lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Mosquitoes (3 species)
gen "$PEST_DIR/aedes-mosquito.jpg" \
  "Macro photograph of an Aedes aegypti mosquito (dengue vector) with white striped legs on a human arm about to bite, sharp focus, daylight, real-world documentary style, no text" \
  "1344x768"

gen "$PEST_DIR/anopheles-mosquito.jpg" \
  "Macro photograph of Anopheles stephensi mosquito (malaria vector) with spotted wings resting on a wall, sharp focus, real-world documentary style, no text" \
  "1344x768"

gen "$PEST_DIR/culex-mosquito.jpg" \
  "Macro photograph of Culex quinquefasciatus mosquito resting on a ceiling at night, brown body, harsh flash, real-world documentary style, sharp detail, no text" \
  "1344x768"

# Bed bug
gen "$PEST_DIR/bed-bug.jpg" \
  "Documentary macro photograph of bed bugs (Cimex lectularius) — multiple reddish-brown oval adults and translucent nymphs — clustered along a mattress seam with dark fecal spots, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Spider
gen "$PEST_DIR/house-spider.jpg" \
  "Documentary photograph of a common house spider (Parasteatoda) in a ceiling corner web with dust and egg sacs, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Pigeon
gen "$PEST_DIR/rock-pigeon.jpg" \
  "Documentary photograph of a flock of feral rock pigeons (Columba livia) roosting on a city apartment balcony ledge with droppings staining the wall, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Wasp
gen "$PEST_DIR/red-wasp.jpg" \
  "Documentary photograph of a large red paper wasp (Polistes) nest hanging from a residential roof eave with multiple wasps visible, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Ants (3 species)
gen "$PEST_DIR/pharaoh-ant.jpg" \
  "Documentary macro photograph of tiny pharaoh ants (Monomorium pharaonis) trailing along a kitchen counter in a long line, multiple workers, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$PEST_DIR/black-crazy-ant.jpg" \
  "Documentary macro photograph of black crazy ants (Paratrechina longicornis) with long antennae scattered on a wall socket, erratic movement, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$PEST_DIR/carpenter-ant.jpg" \
  "Documentary macro photograph of a large black carpenter ant (Camponotus compressus) on damaged wooden furniture with sawdust-like frass, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Flies
gen "$PEST_DIR/housefly.jpg" \
  "Documentary macro photograph of a housefly (Musca domestica) on a dirty plate with red compound eyes visible, sharp focus, harsh flash, real-world photojournalistic style, no text" \
  "1344x768"

gen "$PEST_DIR/fruit-fly.jpg" \
  "Documentary macro photograph of fruit flies (Drosophila) swarming around overripe bananas in a kitchen, multiple tiny flies, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Silverfish
gen "$PEST_DIR/silverfish.jpg" \
  "Documentary macro photograph of a silverfish (Lepisma saccharina) on a damp bathroom wall, silvery-teardrop body with long tail appendages, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Powderpost beetle
gen "$PEST_DIR/powderpost-beetle.jpg" \
  "Documentary close-up of powderpost beetle (Lyctus) damage in hardwood furniture — small round exit holes and fine wood-powder frass on the surface, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Honey bee
gen "$PEST_DIR/indian-honey-bee.jpg" \
  "Documentary photograph of a large Indian honey bee (Apis cerana indica) hive comb attached to a residential balcony ceiling with hundreds of bees visible, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Gecko (lizard)
gen "$PEST_DIR/common-house-gecko.jpg" \
  "Documentary photograph of a common house gecko (Hemidactylus frenatus) on a white wall at night with droppings stains nearby, translucent pink-grey body, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Snakes
gen "$PEST_DIR/rat-snake.jpg" \
  "Documentary photograph of an Indian rat snake (Ptyas mucosa) — large olive-brown non-venomous snake — coiled in a residential garden, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$PEST_DIR/spectacled-cobra.jpg" \
  "Documentary photograph of a spectacled cobra (Naja naja) with hood raised showing the distinctive spectacle mark, in a residential compound, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# NEW PESTS — added per user request (from storefront sign)

# Common krait (venomous, south India)
gen "$PEST_DIR/common-krait.jpg" \
  "Documentary photograph of a common krait (Bungarus caeruleus) — sleek black body with narrow white bands — coiled on a residential floor, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Russell's viper (venomous, south India)
gen "$PEST_DIR/russells-viper.jpg" \
  "Documentary photograph of a Russell's viper (Daboia russelii) with brown oval spots on a tan body, coiled in agricultural land near a residential compound, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Garden lizard / calotes
gen "$PEST_DIR/garden-lizard.jpg" \
  "Documentary photograph of a common Indian garden lizard (Calotes versicolor) — bloodsucker lizard — on a residential compound wall, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# House crow
gen "$PEST_DIR/house-crow.jpg" \
  "Documentary photograph of a flock of Indian house crows (Corvus splendens) on a residential rooftop with droppings, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# House sparrow
gen "$PEST_DIR/house-sparrow.jpg" \
  "Documentary photograph of house sparrows (Passer domesticus) nesting in a residential roof vent, multiple birds, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Stray dog
gen "$PEST_DIR/stray-dog.jpg" \
  "Documentary photograph of a pack of stray dogs (Indian pariah) near a residential garbage area, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Stray cat
gen "$PEST_DIR/stray-cat.jpg" \
  "Documentary photograph of a stray cat (Felis catus) on a residential compound wall at night, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Tick
gen "$PEST_DIR/tick.jpg" \
  "Documentary macro photograph of a brown dog tick attached to a dog's skin, engorged, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Flea
gen "$PEST_DIR/flea.jpg" \
  "Documentary macro photograph of a flea (Ctenocephalides) on animal fur, small dark brown jumping insect, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Scorpion
gen "$PEST_DIR/scorpion.jpg" \
  "Documentary photograph of an Indian black scorpion (Heterometrus) in a residential bathroom at night, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Centipede
gen "$PEST_DIR/centipede.jpg" \
  "Documentary photograph of a Scolopendra centipede on a damp residential bathroom floor, long multi-legged body, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# ============================================================================
# HOMEPAGE SHOWCASE CAROUSEL — real pest-control-in-action images
# (Treatment photos, control mechanisms, technician at work)
# ============================================================================

gen "$CAROUSEL_DIR/cockroach-colony.jpg" \
  "Documentary close-up photograph of a severe German cockroach infestation scattering on a kitchen counter when flashlight hits them, dozens of cockroaches, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$CAROUSEL_DIR/termite-damage.jpg" \
  "Documentary photograph of severe subterranean termite damage in a wooden door frame with visible mud tubes and hollowed-out wood, harsh lighting, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$CAROUSEL_DIR/rodent-infestation.jpg" \
  "Documentary photograph of rodent droppings scattered in a residential attic with damaged wiring visible, real-world photojournalistic style, harsh flash, sharp detail, no text" \
  "1344x768"

gen "$CAROUSEL_DIR/mosquito-colony.jpg" \
  "Documentary photograph of mosquito larvae wiggling in stagnant water in a residential bucket, real-world photojournalistic style, harsh flash, sharp macro detail, no text" \
  "1344x768"

gen "$CAROUSEL_DIR/bedbug-infestation.jpg" \
  "Documentary close-up of bed bug infestation along mattress seams with dark fecal stains and shed skins, harsh flash, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

# Treatment / control mechanism photos
gen "$TREAT_DIR/gel-bait-application.jpg" \
  "Documentary photograph of a pest control technician in PPE uniform applying gel bait with a syringe into a kitchen cabinet hinge, focused professional at work, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/termite-drill-treatment.jpg" \
  "Documentary photograph of a pest control technician drilling holes along a concrete floor for termite barrier treatment, dust visible, professional in uniform, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/mosquito-fogging.jpg" \
  "Documentary photograph of a pest control technician operating a thermal fogging machine at twilight in a residential gated community, thick white fog cloud, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/rodent-bait-station.jpg" \
  "Documentary close-up photograph of a black tamper-proof rodent bait station installed along a garden wall with a pest control technician's gloved hand placing it, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/bed-bug-steam.jpg" \
  "Documentary photograph of a pest control technician using a steam machine on a mattress for bed bug elimination, visible steam jet, professional in PPE, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/bird-spike-install.jpg" \
  "Documentary close-up photograph of stainless steel bird spikes being installed on a residential balcony ledge to deter pigeons, technician's gloved hand visible, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/bee-hive-removal.jpg" \
  "Documentary photograph of a beekeeper in full protective suit with smoker removing a large honey bee hive comb from a residential wall, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/snake-rescue.jpg" \
  "Documentary photograph of a professional snake rescue handler in protective gear using a snake hook to safely capture a cobra from a residential compound, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/lizard-repellent.jpg" \
  "Documentary photograph of a pest control technician spraying botanical repellent on a wall corner to deter lizards, professional in PPE, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/fly-uv-trap.jpg" \
  "Documentary photograph of a UV fly light trap installed on a restaurant kitchen wall with dead flies visible on the glue board, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

gen "$TREAT_DIR/commercial-ipm-monitor.jpg" \
  "Documentary close-up of a tamper-proof IPM monitoring station on a restaurant kitchen wall with a pest control technician inspecting it, real-world photojournalistic style, sharp detail, no text" \
  "1344x768"

echo ""
echo "=== DONE — image generation pass complete ==="
ls -la "$PEST_DIR" | wc -l
ls -la "$TREAT_DIR" | wc -l
ls -la "$CAROUSEL_DIR" | wc -l
