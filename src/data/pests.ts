/**
 * pests.ts — Pest library / pest guide data.
 * Each entry: identification signs, health risks, prevention tips, related service.
 */

import {
  Bug,
  ShieldCheck,
  Rat,
  BugPlay,
  Hexagon,
  Bird,
  BugOff,
  type LucideIcon,
} from "lucide-react";

export interface Pest {
  slug: string;
  name: string;
  scientificName: string;
  icon: LucideIcon;
  image: string;
  category: "insect" | "rodent" | "arachnid" | "bird" | "other";
  threat: "high" | "medium" | "low";
  description: string;
  identification: string[];
  signs: string[];
  healthRisk: string;
  prevention: string[];
  serviceSlug: string;
  seasonality: string;
}

export const pests: Pest[] = [
  {
    slug: "german-cockroach",
    name: "German Cockroach",
    scientificName: "Blattella germanica",
    icon: Bug,
    image: "/images/pests/cockroach.png",
    category: "insect",
    threat: "high",
    description:
      "The most common and troublesome cockroach species in Indian homes. Small (10-15mm), light brown with two dark parallel stripes behind the head. Prolific breeders — a single female and her offspring can produce 100,000+ descendants in a year. Thrives in warm, humid environments near food and water — typically kitchens and bathrooms.",
    identification: [
      "Light brown body, 10–15mm long",
      "Two dark parallel stripes on the head shield",
      "Egg cases (ootheca) brown, 8mm long, often found in hinges",
      "Droppings resemble black pepper or coffee grounds",
    ],
    signs: [
      "Musty odour in kitchen cabinets",
      "Black droppings in drawer corners and hinge points",
      "Egg cases glued under sinks and behind appliances",
      "Live sightings at night when lights are switched on",
      "Smear marks along walls and baseboards in heavy infestations",
    ],
    healthRisk:
      "Triggers asthma and allergies, especially in children. Carries salmonella, E. coli, and other pathogens on legs and body. Contaminates food preparation surfaces.",
    prevention: [
      "Fix leaking taps — cockroaches can survive 7 days without food but need water daily",
      "Seal cracks around plumbing and cabinets with silicone sealant",
      "Empty kitchen trash nightly and use a bin with tight lid",
      "Don't leave pet food out overnight",
      "Wipe kitchen surfaces nightly — even tiny grease films feed colonies",
    ],
    serviceSlug: "cockroach-gel-treatment",
    seasonality: "Year-round, peaks in monsoon humidity",
  },
  {
    slug: "american-cockroach",
    name: "American Cockroach",
    scientificName: "Periplaneta americana",
    icon: Bug,
    image: "/images/pests/cockroach.png",
    category: "insect",
    threat: "high",
    description:
      "The largest common cockroach species in India — 35-40mm long, reddish-brown with a pale yellow figure-8 pattern behind the head. Strong flyer (especially males). Prefers warm, damp, dark areas: drains, sewers, basements, manhole chambers. Often enters homes via plumbing stacks during heavy rain.",
    identification: [
      "Reddish-brown body, 35–40mm long — the largest common roach",
      "Yellow figure-8 pattern on the head shield",
      "Both sexes have wings; males are strong fliers",
      "Egg cases dark brown, 12mm long, dropped in hidden areas",
    ],
    signs: [
      "Large droppings (mouse-dropping sized) in basements and drains",
      "Strong musty odour in infested areas",
      "Sightings in bathrooms and kitchens after rain",
      "Chewed paper or fabric in storage areas",
      "Egg cases behind washing machines and under sinks",
    ],
    healthRisk:
      "Carries 22+ pathogen strains including salmonella, staphylococcus, and streptococcus. Major trigger for asthma in urban children. Contaminates food and food-prep surfaces.",
    prevention: [
      "Install drain covers (cockroaches enter via drain pipes)",
      "Seal gaps around plumbing stacks where pipes enter walls",
      "Keep bathroom and kitchen drains flowing freely",
      "Use exhaust fans to reduce humidity",
      "Inspect and clean basement and storage areas monthly",
    ],
    serviceSlug: "cockroach-gel-treatment",
    seasonality: "Year-round, surges during monsoon",
  },
  {
    slug: "subterranean-termite",
    name: "Subterranean Termite",
    scientificName: "Coptotermes formosanus",
    icon: ShieldCheck,
    image: "/images/pests/termite.png",
    category: "insect",
    threat: "high",
    description:
      "The most destructive termite species in India. Lives in underground colonies of 60,000 to 1 million members. Builds distinctive mud tubes to travel between nest and food source (your wooden structures). Can consume 15 grams of wood per day — a mature colony can structurally damage a home in 6 months.",
    identification: [
      "Cream-coloured workers, 6mm long, soft-bodied",
      "Soldiers have large orange heads with mandibles",
      "Winged reproductives (swarmers) dark brown, 12mm including wings",
      "Mud tubes pencil-thick, running along walls or foundations",
    ],
    signs: [
      "Mud tubes on walls, foundations, or wooden beams",
      "Hollow sound when tapping wooden structures",
      "Discarded wings near windows and light sources (post-swarm)",
      "Buckling paint or tiny holes in drywall",
      "Frass (termite droppings) resembling sawdust near wooden furniture",
    ],
    healthRisk:
      "No direct disease risk to humans, but causes irreversible structural damage. Termite damage is not covered by most home insurance policies.",
    prevention: [
      "Eliminate wood-to-ground contact around the property",
      "Fix all plumbing leaks — termites need moisture",
      "Maintain 6-inch gap between soil and any wooden siding",
      "Store firewood at least 20 feet from the house",
      "Schedule annual professional termite inspection",
    ],
    serviceSlug: "termite-control",
    seasonality: "Year-round, swarm season Mar–Jun post-monsoon",
  },
  {
    slug: "house-rat",
    name: "House Rat / Roof Rat",
    scientificName: "Rattus rattus",
    icon: Rat,
    image: "/images/pests/rodent.png",
    category: "rodent",
    threat: "high",
    description:
      "The most common rat species in Indian urban homes. 16-22cm body plus 19-25cm tail, black or dark brown with lighter belly. Excellent climbers — typically nests in attics, false ceilings, and upper floors. Nocturnal and neophobic (suspicious of new objects), making trapping challenging without professional protocols.",
    identification: [
      "Black or dark brown fur, 16–22cm body length",
      "Tail longer than head and body combined",
      "Pointed snout, large ears, slender body",
      "Droppings spindle-shaped, 12mm long, scattered along runways",
    ],
    signs: [
      "Droppings in kitchen cabinets, behind appliances, in attics",
      "Gnaw marks on wood, plastic, and electrical wiring (fire risk!)",
      "Rub marks (greasy dark streaks) along walls and pipes",
      "Scurrying or scratching sounds in false ceilings at night",
      "Nests of shredded paper, fabric, and insulation in hidden areas",
    ],
    healthRisk:
      "Carries leptospirosis, rat-bite fever, salmonellosis, and hantavirus. Gnawing on electrical wiring is a leading cause of unexplained house fires. Contaminates food with urine and droppings.",
    prevention: [
      "Seal all holes and cracks larger than 12mm (rats can compress their bodies)",
      "Install mesh screens on vents and chimney caps",
      "Keep food in sealed glass or metal containers",
      "Trim tree branches at least 1 metre from roof",
      "Secure outdoor garbage bins with tight lids",
    ],
    serviceSlug: "rodent-control",
    seasonality: "Year-round, peaks in winter (seeks warmth)",
  },
  {
    slug: "aedes-mosquito",
    name: "Aedes Mosquito (Dengue)",
    scientificName: "Aedes aegypti",
    icon: BugPlay,
    image: "/images/pests/mosquito.png",
    category: "insect",
    threat: "high",
    description:
      "The primary vector for dengue, chikungunya, zika, and yellow fever. Small (4-7mm), dark with distinctive white stripes on legs and a white lyre-shaped mark on the back. Day-biter, most active at dawn and dusk. Breeds in clean standing water — flower pots, cooler trays, discarded containers, tyre piles.",
    identification: [
      "Small dark mosquito, 4–7mm long",
      "White stripes on legs — distinctive 'tiger' pattern",
      "White lyre-shaped mark on the upper back",
      "Day-biter, attracted to human breath and sweat",
    ],
    signs: [
      "Daytime mosquito bites, especially at dawn and dusk",
      "Mosquitoes resting in dark, humid indoor corners",
      "Wrigglers (larvae) in standing water around the property",
      "Multiple family members with fever within a week (cluster signal)",
    ],
    healthRisk:
      "Vector for dengue, chikungunya, zika, and yellow fever. Dengue can be life-threatening — seek immediate medical care for high fever, severe headache, and joint pain. No specific antiviral treatment available.",
    prevention: [
      "Empty all standing water weekly — even bottle caps breed mosquitoes",
      "Use mosquito screens on windows and doors",
      "Wear long sleeves and pants during dawn and dusk",
      "Use DEET-based repellents when outdoors",
      "Install mesh covers on overhead water tanks",
    ],
    serviceSlug: "mosquito-control",
    seasonality: "Year-round in South India, peaks Jun–Oct",
  },
  {
    slug: "bed-bug",
    name: "Bed Bug",
    scientificName: "Cimex lectularius",
    icon: Bug,
    image: "/images/pests/bedbug.png",
    category: "insect",
    threat: "medium",
    description:
      "Small (5-7mm), reddish-brown, oval, wingless parasites that feed exclusively on human blood. Nocturnal — hides in mattress seams, headboards, baseboards, electrical outlets, and adjacent furniture during the day. Adults can survive 12 months without feeding. Major resurgence in PG accommodations and budget hotels near tech corridors.",
    identification: [
      "Reddish-brown, oval, 5–7mm long (apple seed size)",
      "Flat body when unfed, swollen after feeding",
      "Six legs, no wings, distinct antennae",
      "Eggs white, 1mm long, glued in crevices",
    ],
    signs: [
      "Itchy red bites in a line or cluster on exposed skin",
      "Tiny blood stains on sheets and pillowcases",
      "Dark fecal spots on mattress seams and headboards",
      "Empty molted skins (translucent) in mattress tufts",
      "Sweet musty odour in heavy infestations",
    ],
    healthRisk:
      "Bites cause itchy welts and sleep disturbance. Severe reactions include allergic responses and secondary skin infections from scratching. Significant psychological impact — anxiety, insomnia, social isolation.",
    prevention: [
      "Inspect hotel rooms before unpacking — check mattress seams",
      "Keep luggage on racks, not on beds or floors",
      "Wash and hot-dry all clothes immediately after returning from trips",
      "Avoid second-hand mattresses and upholstered furniture",
      "Install mattress encasements with bed-bug-proof zippers",
    ],
    serviceSlug: "bed-bugs-treatment",
    seasonality: "Year-round, peaks after travel seasons",
  },
  {
    slug: "house-spider",
    name: "Common House Spider",
    scientificName: "Parasteatoda tepidariorum",
    icon: Hexagon,
    image: "/images/pests/spider.png",
    category: "arachnid",
    threat: "low",
    description:
      "Most household spiders in India are harmless and beneficial — they prey on flies, mosquitoes, and other insects. However, two species require caution: the Brown Recluse (Loxosceles) and the Widow (Latrodectus). Most spider concerns are about web aesthetics and arachnophobia rather than actual danger.",
    identification: [
      "Eight legs, two body segments, no antennae",
      "Most species 5–15mm body length",
      "Webs vary: orb, cobweb, funnel, or hunting (no web)",
      "Brown Recluse: violin-shaped mark on cephalothorax",
    ],
    signs: [
      "Webs in corners, behind furniture, in basements",
      "Egg sacs (small silky balls) in webs",
      "Molted exoskeletons in quiet areas",
      "Occasional sightings of spiders themselves",
    ],
    healthRisk:
      "Most species harmless. Brown Recluse bite causes necrotic skin ulcer. Widow bite causes severe muscle pain and requires medical attention. Seek medical care for any spider bite with severe symptoms.",
    prevention: [
      "Reduce clutter in storage areas (spiders prefer undisturbed spaces)",
      "Seal cracks around windows and doors",
      "Remove webs regularly with a vacuum",
      "Control other insects — spiders follow their prey",
      "Use yellow outdoor lights (less attractive to spider prey)",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Year-round, peaks in late monsoon",
  },
  {
    slug: "pigeon",
    name: "Rock Pigeon",
    scientificName: "Columba livia",
    icon: Bird,
    image: "/images/pests/fly.png",
    category: "bird",
    threat: "medium",
    description:
      "India's most common urban bird. Originally a cliff-dweller, the pigeon has adapted perfectly to city buildings — ledges, parapets, AC compressor platforms, and ducts serve as their cliffs. Prolific breeders — 5-6 broods per year of 2 squabs each. Fouling damages paint, blocks gutters, and corrodes metal surfaces.",
    identification: [
      "Blue-grey body, 32–37cm long",
      "Two dark wing bars, iridescent neck feathers",
      "Orange-red eyes, grey beak with white cere",
      "Distinctive cooing call",
    ],
    signs: [
      "Heavy fouling on ledges, AC units, balconies",
      "Nests of twigs and debris in ducts and parapets",
      "Continuous cooing, especially mornings",
      "Blocked gutters from nesting material",
      "Corrosion on metal surfaces from acidic droppings",
    ],
    healthRisk:
      "Droppings carry histoplasmosis, cryptococcosis, and psittacosis. Nesting material blocks gutters causing water damage. Fouling creates slip hazard. Major aesthetic and brand damage to commercial buildings.",
    prevention: [
      "Install stainless steel bird spikes on all ledges",
      "Net balconies and duct openings with UV-stabilised mesh",
      "Remove food sources — don't feed pigeons on the property",
      "Block access to nesting sites with mesh or solid barriers",
      "Install acoustic or visual deterrents for open areas",
    ],
    serviceSlug: "bird-management",
    seasonality: "Year-round, breeding peaks Mar–Jun and Sep–Dec",
  },
  {
    slug: "red-wasp",
    name: "Red Paper Wasp",
    scientificName: "Polistes spp.",
    icon: BugOff,
    image: "/images/pests/fly.png",
    category: "insect",
    threat: "medium",
    description:
      "Slender, reddish-brown wasps that build distinctive open-paper nests under eaves, in shrubs, and around window frames. Less aggressive than yellow jackets but will defend the nest aggressively if disturbed. Painful sting — multiple stings can cause allergic reactions.",
    identification: [
      "Slender body, 15–20mm long, reddish-brown with yellow bands",
      "Long legs dangle in flight",
      "Open-paper nest (cells visible, not enclosed) under eaves",
      "Slow hovering flight near nest site",
    ],
    signs: [
      "Visible paper nests under eaves, in shrubs, on window frames",
      "Multiple wasps hovering around a fixed point",
      "Stripped wood from wooden furniture (they use it for nest paper)",
      "Audible buzzing near nest sites on warm afternoons",
    ],
    healthRisk:
      "Painful sting. Multiple stings can cause severe allergic reaction including anaphylaxis. Risk highest for children playing near nests and for residents with allergies.",
    prevention: [
      "Inspect eaves and window frames weekly in spring",
      "Remove small nests early before colony grows",
      "Paint or varnish exposed wood (wasps use it for nest paper)",
      "Keep garbage bins sealed — wasps are attracted to protein",
      "Professional removal for any nest larger than your fist",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Mar–Oct, peaks May–Jul",
  },
  {
    slug: "pharaoh-ant",
    name: "Pharaoh Ant",
    scientificName: "Monomorium pharaonis",
    icon: Bug,
    image: "/images/pests/ant.png",
    category: "insect",
    threat: "medium",
    description:
      "Tiny (2mm) yellow-brown ants that form massive multi-queen colonies with up to 300,000 workers. Infamous for 'budding' — when disturbed, colonies split into multiple satellite nests, making DIY spraying counterproductive. Nests in wall voids, behind baseboards, and inside electrical outlets. Major pest in hospitals where they contaminate sterile equipment and seek IV fluids.",
    identification: [
      "Tiny ant, 1.5–2mm long — barely visible",
      "Yellow-brown body with darker abdomen",
      "Two-segment petiole (waist), 12-segmented antennae",
      "Workers all the same size (monomorphic)",
    ],
    signs: [
      "Trails of tiny ants along edges of countertops and walls",
      "Nests inside electrical outlets and light switches",
      "Foragers on food containers and inside refrigerator seals",
      "Sudden appearance in many rooms at once (multi-nest colony)",
    ],
    healthRisk:
      "Mechanical vector for salmonella, staphylococcus, and streptococcus. In hospitals, can contaminate sterile fields and IV lines. Major concern for immune-compromised patients and newborns.",
    prevention: [
      "DO NOT spray — budding splits the colony and worsens infestation",
      "Use professional bait stations that workers carry back to queens",
      "Seal cracks around baseboards, outlets, and window frames",
      "Wipe sugary spills immediately and store sweets in sealed jars",
      "Trim vegetation at least 30cm away from exterior walls",
    ],
    serviceSlug: "cockroach-gel-treatment",
    seasonality: "Year-round, prefers warm indoor environments",
  },
  {
    slug: "black-crazy-ant",
    name: "Black Crazy Ant",
    scientificName: "Paratrechina longicornis",
    icon: Bug,
    image: "/images/pests/ant.png",
    category: "insect",
    threat: "low",
    description:
      "Small (3mm) dark-brown to black ant named for its erratic, jerky movement when disturbed. Highly adaptable — nests in soil, wall voids, potted plants, and even electronics. Forms supercolonies that can displace other ant species. Common in Indian kitchens, bathrooms, and balconies, especially in apartment complexes with shared plumbing.",
    identification: [
      "Dark brown to black, 2.5–3mm long",
      "Extremely long antennae and legs",
      "Erratic 'crazy' running pattern when disturbed",
      "Single node (waist segment), no spine on thorax",
    ],
    signs: [
      "Trails along kitchen countertops, sinks, and electrical outlets",
      "Nests in potted plant soil and window AC units",
      "Foragers swarming on sugary spills within minutes",
      "Workers inside laptop vents and electrical junction boxes",
    ],
    healthRisk:
      "Low disease risk but can cause short circuits when nesting inside electronics. Occasionally bites but venom is harmless. Major nuisance in food preparation areas.",
    prevention: [
      "Clean sugary spills immediately — crazy ants recruit fast",
      "Seal cracks around windows and pipe penetrations",
      "Repot indoor plants annually to prevent nesting",
      "Use gel baits along foraging trails — do not spray",
      "Keep electrical junction boxes sealed and dry",
    ],
    serviceSlug: "cockroach-gel-treatment",
    seasonality: "Year-round, peaks in pre-monsoon humidity",
  },
  {
    slug: "carpenter-ant",
    name: "Carpenter Ant",
    scientificName: "Camponotus compressus",
    icon: Bug,
    image: "/images/pests/ant.png",
    category: "insect",
    threat: "medium",
    description:
      "India's largest ant species — workers range from 8 to 15mm. Black or bicolour black-red. Does NOT eat wood but excavates galleries in moist or decaying timber for nesting. A mature colony can hollow out structural beams over 2-3 years. Often confused with termites, but carpenter ants leave clean 'frass' (sawdust) piles outside nest openings whereas termites pack mud.",
    identification: [
      "Large ant, 8–15mm long — visibly bigger than other household ants",
      "Black or black-and-red body, robust build",
      "Evenly rounded thorax profile (no spines)",
      "Majors have large heads; minors are smaller",
    ],
    signs: [
      "Piles of coarse sawdust (frass) below nest openings",
      "Faint rustling sound inside wooden beams at night",
      "Smooth, 'sculpted' galleries inside damaged wood",
      "Foragers travelling in trails from trees/fence to house",
    ],
    healthRisk:
      "Does not spread disease. Bites are painful but not venomous. Real damage is structural — untreated colonies compromise wooden beams, door frames, and window sills over years.",
    prevention: [
      "Repair all roof and plumbing leaks — carpenter ants need moisture",
      "Replace water-damaged wood promptly",
      "Trim tree branches at least 1 metre from roof",
      "Store firewood elevated and 5m from the house",
      "Seal cracks in foundation and around pipe entries",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Year-round, swarm season Apr–Jun",
  },
  {
    slug: "anopheles-mosquito",
    name: "Anopheles Mosquito (Malaria)",
    scientificName: "Anopheles stephensi",
    icon: BugPlay,
    image: "/images/pests/mosquito.png",
    category: "insect",
    threat: "high",
    description:
      "The primary malaria vector in Indian cities. Pale brown with dark spots on wings, 5-8mm long. Rests at a distinctive 45-degree angle with abdomen pointed up. Nocturnal biter, most active 10pm to 4am. Breeds in clean, sunlit water — overhead tanks, construction sites, puddles, and improperly maintained storm drains.",
    identification: [
      "Pale brown body, 5–8mm long",
      "Dark spots on transparent wings",
      "Rests at 45-degree angle (abdomen tilted up)",
      "Long palps equal in length to the proboscis",
    ],
    signs: [
      "Night-time mosquito bites disturbing sleep",
      "Mosquitoes resting on shaded walls during day",
      "Wrigglers in overhead water tanks and open sumps",
      "Family members with intermittent fever, chills, and sweating",
    ],
    healthRisk:
      "Primary vector for malaria (Plasmodium vivax and falciparum). Untreated malaria can be fatal, especially in children and pregnant women. Also transmits lymphatic filariasis in endemic zones.",
    prevention: [
      "Cover overhead tanks and sumps with tight-fitting lids",
      "Use insecticide-treated bed nets, especially for children",
      "Install mesh screens on windows (1.2mm mesh size)",
      "Apply residual indoor spraying before monsoon season",
      "Report stagnant water in construction sites to municipal authorities",
    ],
    serviceSlug: "mosquito-control",
    seasonality: "Year-round in South India, peaks Jul–Oct",
  },
  {
    slug: "culex-mosquito",
    name: "Culex Mosquito",
    scientificName: "Culex quinquefasciatus",
    icon: BugPlay,
    image: "/images/pests/mosquito.png",
    category: "insect",
    threat: "medium",
    description:
      "The most common night-biting mosquito in Indian cities. Brown, 4-10mm long, with a blunt abdomen. Breeds in polluted standing water — open drains, septic tanks, soak pits, and stagnant puddles. The persistent 'whine' at night is a hallmark of Culex presence. Major vector for lymphatic filariasis (elephantiasis) across coastal South India.",
    identification: [
      "Brown body, 4–10mm long",
      "Blunt (rounded) abdomen tip",
      "Rests parallel to surface (flat posture)",
      "No distinctive wing patterns",
    ],
    signs: [
      "Persistent whining sound in bedrooms at night",
      "Mosquitoes resting in dark corners during day",
      "Wrigglers in dirty water (drains, soak pits)",
      "Multiple night bites on exposed feet and ankles",
    ],
    healthRisk:
      "Primary vector for lymphatic filariasis (elephantiasis) — endemic in coastal Tamil Nadu and Andhra. Also transmits Japanese encephalitis in rural areas and West Nile virus. Bites cause itchy welts and sleep disturbance.",
    prevention: [
      "Ensure drains flow freely — Culex breeds in stagnant polluted water",
      "Septic tanks and soak pits must be sealed and vented properly",
      "Use mosquito nets and window mesh screens",
      "Apply DEET-based repellents from dusk to dawn",
      "Schedule professional thermal fogging in high-density neighbourhoods",
    ],
    serviceSlug: "mosquito-control",
    seasonality: "Year-round, peaks in post-monsoon Oct–Dec",
  },
  {
    slug: "housefly",
    name: "Housefly",
    scientificName: "Musca domestica",
    icon: Bug,
    image: "/images/pests/fly.png",
    category: "insect",
    threat: "medium",
    description:
      "The universal urban pest. 6-7mm long, grey with four dark longitudinal stripes on the thorax. Female lays 500 eggs in batches on rotting organic matter — garbage, manure, food waste. Egg-to-adult cycle is just 7-10 days in Indian summer heat. Flies regurgitate digestive enzymes onto food and then lap up the liquid — a primary mechanism of pathogen transfer.",
    identification: [
      "Grey body, 6–7mm long",
      "Four dark stripes on the thorax",
      "Red compound eyes (closer together in males)",
      "Sponging mouthparts, no bite",
    ],
    signs: [
      "Adult flies clustering around garbage bins and kitchen waste",
      "Maggots in rotting food, compost, or pet waste",
      "Dark 'fly specks' (faecal spots) on walls and light fixtures",
      "Persistent buzzing in kitchens and dining areas",
    ],
    healthRisk:
      "Mechanical vector for 100+ pathogens including typhoid, cholera, dysentery, salmonella, E. coli, and poliomyelitis. Transfers pathogens by walking on food and surfaces after visiting faeces or garbage. Major food-safety risk in commercial kitchens.",
    prevention: [
      "Use sealed bins with foot pedals — empty daily",
      "Install air curtains at kitchen and restaurant entry points",
      "Fit windows with 1.2mm mesh fly screens",
      "Clean pet feeding areas and litter boxes twice daily",
      "Use UV light traps in commercial food-handling areas",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Year-round, peaks Apr–Sep in summer heat",
  },
  {
    slug: "fruit-fly",
    name: "Fruit Fly",
    scientificName: "Drosophila melanogaster",
    icon: Bug,
    image: "/images/pests/fly.png",
    category: "insect",
    threat: "low",
    description:
      "Tiny (3mm) tan-bodied flies with red eyes that plague every Indian kitchen during monsoon and summer. Female lays 500 eggs on overripe fruit, vegetable peels, and fermenting liquids. Egg-to-adult cycle is just 8 days at 28°C — a single overripe banana can produce 200 flies in a week. Major complaint in bars, juice shops, and food-processing units.",
    identification: [
      "Tiny tan-brown body, 3mm long",
      "Bright red compound eyes",
      "Slow hovering flight pattern",
      "Attracted to fermenting sugars and alcohol",
    ],
    signs: [
      "Cloud of tiny flies rising from fruit bowls and compost",
      "Larvae (small white worms) in overripe fruit",
      "Flies hovering around wine, beer, and juice glasses",
      "Adults resting on kitchen ceiling and walls near sink",
    ],
    healthRisk:
      "Low disease risk in homes but causes contamination in food-handling businesses. Carries acetobacter and other spoilage organisms that ferment fruit. Major audit failure risk for commercial kitchens and bars.",
    prevention: [
      "Refrigerate ripe fruit — counter-top fruit is the #1 breeding site",
      "Rinse and recycle bottles immediately (wine, beer, juice)",
      "Use apple-cider-vinegar traps with a drop of dish soap",
      "Empty kitchen compost daily and rinse the bin",
      "Seal garbage disposals and clean sink drains weekly",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Year-round, peaks Mar–Jun and Sep–Nov",
  },
  {
    slug: "house-mouse",
    name: "House Mouse",
    scientificName: "Mus musculus",
    icon: Rat,
    image: "/images/pests/rodent.png",
    category: "rodent",
    threat: "medium",
    description:
      "Small (7-10cm body plus 7-10cm tail) grey-brown rodent with large ears and small eyes. Exceptional climbers and jumpers — can scale vertical brick walls and jump 30cm from a standstill. Needs only a 6mm gap to enter a building (the width of a pencil). A single female produces 8 litters of 6 pups per year — populations explode fast. Major pest in apartment kitchens, false ceilings, and storage rooms.",
    identification: [
      "Small grey-brown body, 7–10cm long",
      "Tail equal to body length, scaly and nearly hairless",
      "Large ears, small eyes, pointed snout",
      "Droppings rod-shaped, 3–4mm long, scattered (not clustered)",
    ],
    signs: [
      "Tiny droppings in kitchen drawers and inside packaged food",
      "Chewed holes in cereal boxes and plastic bags",
      "Scratching sounds in false ceilings and behind appliances",
      "Musky odour in enclosed infested areas",
    ],
    healthRisk:
      "Carries leptospirosis, salmonellosis, and lymphocytic choriomeningitis. Gnaws on electrical wiring — major cause of unexplained fires. Contaminates 10× more food than it eats through urine and droppings.",
    prevention: [
      "Seal all gaps larger than 6mm with steel wool + silicone",
      "Store grains and flours in glass or hard plastic containers",
      "Install door sweeps on exterior and garage doors",
      "Trim shrubs 30cm away from foundation walls",
      "Place tamper-resistant bait stations in garages and storage rooms",
    ],
    serviceSlug: "rodent-control",
    seasonality: "Year-round, peaks in winter (seeks warmth)",
  },
  {
    slug: "bandicoot-rat",
    name: "Greater Bandicoot Rat",
    scientificName: "Bandicota indica",
    icon: Rat,
    image: "/images/pests/rodent.png",
    category: "rodent",
    threat: "high",
    description:
      "India's largest rat species — 30-40cm body plus 25cm tail. Aggressive, burrowing rodent that destroys gardens, foundations, and ground-floor storage. Burrows up to 1m deep with multiple exits, undermining foundations and paving. Unlike house rats, bandicoots live mostly outdoors but invade kitchens at night. Recognised by deep grunting calls and large footprint.",
    identification: [
      "Very large rat, 30–40cm body length",
      "Coarse dark brown-black fur",
      "Heavy build, blunt snout, small ears",
      "Scaly tail shorter than head and body combined",
    ],
    signs: [
      "Large burrow openings (8–12cm) near foundations and gardens",
      "Big droppings (capsule-shaped, 18–22mm long) in storage areas",
      "Heavy gnaw damage on plastic drums, doors, and electrical cables",
      "Deep grunting calls at night in yard",
    ],
    healthRisk:
      "Major vector for leptospirosis in South India, especially during monsoon flooding. Carries plague, murine typhus, and trichinellosis. Burrowing undermines building foundations, pavements, and garden walls.",
    prevention: [
      "Eliminate outdoor harbourage — clear debris, lumber, and overgrown vegetation",
      "Seal foundation cracks and gaps around pipe entries with concrete",
      "Use rodent-proof compost bins with metal bases",
      "Install tamper-resistant outdoor bait stations along perimeter",
      "Pick fruit and vegetables promptly — fallen produce attracts bandicoots",
    ],
    serviceSlug: "rodent-control",
    seasonality: "Year-round, peaks in monsoon flood season",
  },
  {
    slug: "silverfish",
    name: "Silverfish",
    scientificName: "Lepisma saccharina",
    icon: Bug,
    image: "/images/pests/spider.png",
    category: "insect",
    threat: "low",
    description:
      "Wingless, tear-drop-shaped insect (12-19mm) covered in silvery scales that give it a metallic sheen. Moves with characteristic fish-like wriggle. Nocturnal, prefers 70-80% humidity and temperatures above 25°C — perfect for Indian bathrooms and kitchens. Feeds on starches and proteins: paper, book glue, wallpaper paste, photos, sugar, flour, dead insects, and synthetic fabrics. Can live 3+ years without reproducing if conditions are wrong.",
    identification: [
      "Silver-grey, tear-drop body, 12–19mm long",
      "Three long tail appendages and two long antennae",
      "Fish-like wriggling movement, very fast when disturbed",
      "Wingless, flattened body",
    ],
    signs: [
      "Notched chewing holes on book pages and wallpaper",
      "Yellow stains on synthetic fabrics and stored clothing",
      "Sightings in bathrooms, under sinks, and inside bookshelves",
      "Faecal pellets (tiny black pepper-like specks) in dark drawers",
    ],
    healthRisk:
      "No direct disease risk to humans. Causes costly damage to books, archival documents, wallpaper, photographs, and stored clothing. Major pest in libraries, archives, and museums.",
    prevention: [
      "Use dehumidifiers in bathrooms, basements, and libraries",
      "Seal cracks around bathroom fixtures and baseboards",
      "Store books and papers in airtight plastic bins with silica gel",
      "Vacuum regularly under beds and behind furniture",
      "Cedar chips and lavender sachets provide mild natural deterrence",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Year-round indoors, prefers humid monsoon conditions",
  },
  {
    slug: "powderpost-beetle",
    name: "Powderpost Beetle (Wood Borer)",
    scientificName: "Lyctus africanus",
    icon: ShieldCheck,
    image: "/images/pests/termite.png",
    category: "insect",
    threat: "medium",
    description:
      "Small (4-7mm) reddish-brown to black beetle whose larvae tunnel through hardwood for 6-12 months before emerging as adults. Recognised by tiny (1-2mm) round exit holes in wooden furniture and a fine, talc-like frass falling from the wood. Major pest in antique furniture, hardwood flooring, and structural bamboo. Often confused with termite damage but powderpost frass is fine powder, not packed mud.",
    identification: [
      "Reddish-brown to black beetle, 4–7mm long",
      "Cylindrical body, slightly flattened head",
      "Larvae cream-coloured, C-shaped, up to 6mm long",
      "Distinct round exit holes (1–2mm) in hardwood surfaces",
    ],
    signs: [
      "Tiny round holes (1–2mm) in wooden furniture and flooring",
      "Fine talc-like wood powder falling from holes",
      "Weak or hollow-sounding timber when tapped",
      "Adult beetles emerging near windows in spring (attracted to light)",
    ],
    healthRisk:
      "No direct human health risk. Causes structural damage to hardwood furniture, flooring, doors, and structural bamboo. Often introduced via infested antique furniture or untreated bamboo.",
    prevention: [
      "Inspect antique furniture for exit holes before bringing indoors",
      "Sand and varnish exposed hardwood surfaces — females lay eggs only in unfinished wood",
      "Store firewood outdoors and inspect before use",
      "Maintain indoor humidity below 60% — beetles need moisture to thrive",
      "Treat structural bamboo with borate preservative before installation",
    ],
    serviceSlug: "termite-control",
    seasonality: "Year-round, adult emergence Apr–Jun",
  },
  {
    slug: "indian-honey-bee",
    name: "Indian Honey Bee",
    scientificName: "Apis cerana indica",
    icon: BugOff,
    image: "/images/pests/fly.png",
    category: "insect",
    threat: "medium",
    description:
      "Native South Asian honey bee, 10-13mm long, brown with pale stripes. Builds parallel wax combs in enclosed cavities — chimneys, false ceilings, wall voids, and tree hollows. Colonies can reach 30,000 bees and persist for years. Ecologically beneficial pollinators, but a colony inside a residential wall becomes a serious stinging hazard and honey-damage issue. Do NOT attempt DIY removal — disturbed bees release alarm pheromone triggering mass stinging.",
    identification: [
      "Brown body with pale yellow abdominal stripes, 10–13mm long",
      "Fuzzy thorax, less slender than a wasp",
      "Visible wax comb at nest entrance",
      "Steady direct flight path to/from a single opening",
    ],
    signs: [
      "Continuous bee traffic in and out of a wall cavity, chimney, or roof gap",
      "Visible wax comb at the entrance of the void",
      "Audible buzzing inside the wall on warm afternoons",
      "Honey staining or odour on the wall below the nest",
    ],
    healthRisk:
      "Stings cause pain, swelling, and itching. Multiple stings trigger toxic reactions (nausea, dizziness). Anaphylaxis in 1-3% of the population is life-threatening and requires immediate epinephrine. Don't attempt DIY removal.",
    prevention: [
      "Seal gaps in exterior walls, chimneys, and roof eaves before swarm season",
      "Install mesh screens on vents and chimney caps",
      "If a swarm lands on your property, leave it alone and call a professional",
      "Do not plant fragrant flowering trees directly against building walls",
      "Schedule annual pre-monsoon inspection of roof voids and chimneys",
    ],
    serviceSlug: "general-disinfection",
    seasonality: "Swarm season Feb–May, colonies persist year-round",
  },
];

export const pestBySlug = (slug: string) => pests.find((p) => p.slug === slug);

export const pestCategories = [
  { id: "all", label: "All pests" },
  { id: "insect", label: "Insects" },
  { id: "rodent", label: "Rodents" },
  { id: "arachnid", label: "Spiders" },
  { id: "bird", label: "Birds" },
] as const;
