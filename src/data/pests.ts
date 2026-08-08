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
];

export const pestBySlug = (slug: string) => pests.find((p) => p.slug === slug);

export const pestCategories = [
  { id: "all", label: "All pests" },
  { id: "insect", label: "Insects" },
  { id: "rodent", label: "Rodents" },
  { id: "arachnid", label: "Spiders" },
  { id: "bird", label: "Birds" },
] as const;
