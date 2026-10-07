import type { Project, ProjectCaseStudy, ProjectImage } from '@/types/project'

export { PROJECT_ROLE } from './project-role'

// ---------------------------------------------------------------------------
// Case studies from the client's "NEW PROJECTS" deck (Oct 2026), rendered by
// the shared template at /projects/[slug]. Copy is verbatim from the deck;
// the renders live in /public/projects/<slug>/ and are listed in the deck's
// order (images the deck didn't use follow at the end).
// ---------------------------------------------------------------------------

type DeckText = Pick<Project, 'title' | 'location'> & Omit<ProjectCaseStudy, 'gallery'>

function render(slug: string, file: string, width: number, height: number, alt: string): ProjectImage {
  return { src: `/projects/${slug}/${file}`, width, height, alt }
}

function caseStudyProject(slug: string, text: DeckText, gallery: ProjectImage[]): Project {
  const { title, location, ...caseStudy } = text
  return {
    slug,
    title,
    category: 'Residential',
    description: caseStudy.subtitle,
    heroImage: gallery[0].src,
    images: gallery.map((image) => image.src),
    location,
    caseStudy: { ...caseStudy, gallery },
  }
}

// The Reconnected Home — deck slide 1
const RECONNECTED_TEXT: DeckText = {
  title: 'The Reconnected Home',
  label: 'Residential Interiors · Refurbishment',
  subtitle: 'A residential refurbishment concept that reimagines a divided layout as a welcoming, connected space for cooking, dining and everyday living.',
  location: 'United Kingdom',
  highlights: [
    'An interior refurbishment proposal bringing an enclosed kitchen and separate living area together within a unified open plan.',
    'Warm oak, soft greige cabinetry and tactile upholstery establish a restrained palette with a comfortable domestic character.',
    'A central kitchen island, garden-facing dining area and carefully arranged seating create distinct zones while maintaining clear sightlines.',
  ],
  sections: [
    {
      heading: 'Layout & Connection',
      body: 'The proposal addresses a fragmented arrangement in which a narrow entrance corridor and enclosed kitchen interrupt movement and separate daily activities. Opening the internal layout creates a more direct relationship between arrival, cooking and living. The kitchen island defines the transition between working and social spaces, while furniture placement establishes a comfortable sitting area without introducing additional partitions. The approach focuses on making better use of the existing footprint.',
    },
    {
      heading: 'Materials & Light',
      body: 'Warm oak tones connect the flooring, island and living-room furniture, balanced by soft greige cabinetry and light neutral walls. Textured upholstery and a generous rug bring softness to the seating area, while rounded tables provide a gentle contrast to the kitchen’s clean lines. Glazed garden doors introduce daylight beside the dining table. Pendant lights, concealed kitchen lighting and freestanding lamps provide complementary layers of illumination for different activities.',
    },
    {
      heading: 'Design Approach',
      body: 'The refurbishment is conceived around everyday connection: preparing meals while conversing, gathering around the dining table and relaxing within the same shared space. The island provides informal seating alongside the kitchen, while the dining area maintains a visual relationship with the garden. Presented through comparative layouts and concept visualizations, the scheme demonstrates how internal reconfiguration can give an existing UK home a more open, coherent and welcoming character.',
    },
  ],
}

// The Sage Retreat — deck slide 8
const SAGE_TEXT: DeckText = {
  title: 'The Sage Retreat',
  label: 'Residential Interiors · Refurbishment',
  subtitle: 'A considered bedroom refurbishment concept, bringing together muted sage, warm timber and layered light to create a quiet space for rest.',
  location: 'United Kingdom',
  highlights: [
    'A residential refurbishment scheme focused on refreshing an existing bedroom through coordinated finishes, furniture and lighting.',
    'A timber-framed feature wall, softly patterned sage wallpaper and warm metallic accents establish a cohesive interior palette.',
    'A low-profile bed, paired bedside storage and a compact dressing area balance everyday practicality with a sense of calm.',
  ],
  sections: [
    {
      heading: 'Space & Function',
      body: 'The design centers on a clearly defined sleeping area, with the bed and paired bedside tables forming a balanced composition. A compact dressing table introduces a separate place for daily routines, while its circular mirror softens the room’s linear geometry. The refurbishment approach focuses on the interior rather than additional floor area, using furniture placement and coordinated detailing to give the room a more considered character.',
    },
    {
      heading: 'Materials & Light',
      body: 'Muted sage wallpaper provides a gentle backdrop, framed by warm timber that carries through the bed, bedside furniture and dressing table. Ivory bedding, sheer curtains and a textured rug soften the harder surfaces, while subtle brass-toned details add definition. Concealed lighting traces the feature wall, complemented by bedside lamps and recessed ceiling lights. Together, these layers allow the atmosphere to shift from bright daytime use to a softer evening setting.',
    },
    {
      heading: 'Design Approach',
      body: 'The scheme demonstrates how a bedroom refurbishment can create a coherent interior through a restrained palette and carefully selected details. The emphasis is on comfortable proportions, useful furniture and a consistent relationship between color, texture and light. Presented through concept visualizations, the proposal establishes a clear direction for a warm, understated bedroom within a UK home.',
    },
  ],
}

// The Dividing Line — deck slide 11
const DIVIDING_TEXT: DeckText = {
  title: 'The Dividing Line',
  label: 'Residential Interiors · Refurbishment',
  subtitle: 'A compact bathroom refurbishment concept, organized around a multifunctional partition that brings together privacy, storage and a warm Mediterranean palette.',
  location: 'United Kingdom',
  highlights: [
    'A residential refurbishment proposal that separates the vanity and entrance area from a discreet walk-in shower.',
    'Warm stone tones, textured timber cabinetry and brass-toned fittings create a cohesive interior with a soft, tactile character.',
    'Integrated shelving, a floating vanity and a shower bench make purposeful use of the room’s limited footprint.',
  ],
  sections: [
    {
      heading: 'Space & Function',
      body: 'The design centers on a partition that performs three roles: defining the shower enclosure, supporting the vanity and accommodating storage. Its entrance-facing surface forms the room’s focal point, pairing a sculptural basin with a semicircular mirror. Behind it, the shower occupies a more private zone, accessed through a clear glass door. This arrangement establishes distinct wet and dry areas while maintaining visual depth within the compact interior.',
    },
    {
      heading: 'Materials & Light',
      body: 'A restrained palette of warm stone tones extends across the walls, floor and basin, creating continuity throughout the room. Fluted timber cabinetry and inset wooden shelves introduce texture, complemented by brass-toned taps and shower fittings. Concealed lighting behind the mirror and within the shelving highlights these surfaces without overwhelming the space. An illuminated shower niche carries the same soft lighting language into the bathing area.',
    },
    {
      heading: 'Design Approach',
      body: 'The refurbishment concept uses the depth of the partition to accommodate open shelving and enclosed storage, keeping everyday essentials close to hand without adding freestanding furniture. A floating vanity and wall-hung toilet leave more of the floor visible, while the shower incorporates a bench and recessed niche. Presented through concept visualizations, the scheme explores how one carefully considered architectural element can bring clarity, comfort and character to a small bathroom within a UK home.',
    },
  ],
}

// The Warm Ascent — deck slide 15
const WARM_TEXT: DeckText = {
  title: 'The Warm Ascent',
  label: 'Residential Interiors · Refurbishment',
  subtitle: 'A residential entrance and staircase refurbishment concept, defined by sculptural form, warm textures and carefully layered illumination.',
  location: 'United Kingdom',
  highlights: [
    'An interior refurbishment proposal that reimagines the entrance hall as a welcoming space with a distinctive architectural focal point.',
    'Stone-toned surfaces, dark timber doors and slender black balustrades establish a balanced composition of warmth and contrast.',
    'Illuminated stair treads, suspended glass pendants and a compact seating arrangement bring atmosphere and purpose to the arrival experience.',
  ],
  sections: [
    {
      heading: 'Arrival & Form',
      body: 'The staircase anchors the interior, its angular profile creating a strong visual connection between the entrance level and the floor above. A slender black balustrade traces the ascent, contrasting with the substantial appearance of the treads. Beneath the upper flight, two upholstered chairs introduce a quiet seating area within the circulation space. The arrangement gives the hall a welcoming domestic character while keeping the main route through the room open.',
    },
    {
      heading: 'Materials & Light',
      body: 'Warm stone tones unite the floor, staircase and textured walls, complemented by the deeper colour of the timber entrance doors. A tall, vertically ribbed wall surface accentuates the stairwell’s height, while rounded upholstery softens its linear geometry. Integrated tread lighting follows the ascent, and concealed perimeter lighting gently washes the surrounding walls. A cluster of glass pendants adds a more intimate layer of light above the seating area.',
    },
    {
      heading: 'Design Approach',
      body: 'The refurbishment concept treats the entrance as an inhabited space rather than simply a passage between rooms. Seating, artwork and a recessed display niche introduce moments of interest around the staircase, while the restrained palette maintains visual continuity. Presented through a concept visualisation, the scheme explores how coordinated finishes, lighting and furniture can give a UK residential entrance a more considered and memorable identity.',
    },
  ],
}

const RECONNECTED_GALLERY = [
  render('the-reconnected-home', 'image1.jpeg', 1672, 941, 'Open-plan kitchen, dining and living space arranged around a central island'),
  render('the-reconnected-home', 'image4.jpeg', 1329, 1183, 'Round oak dining table with upholstered chairs beneath glass pendant lights'),
  render('the-reconnected-home', 'image2.jpeg', 1537, 1023, 'Living-area sofa with a textured throw and layered cushions'),
  render('the-reconnected-home', 'image3.jpeg', 1537, 1023, 'Kitchen island with timber bar stools and soft greige cabinetry'),
  render('the-reconnected-home', 'image6.jpeg', 1537, 1023, 'Garden-facing dining area with a round table and rust-toned upholstered chairs'),
  render('the-reconnected-home', 'image5.jpeg', 1448, 1086, 'Round timber coffee table styled with books, a candle and greenery'),
  render('the-reconnected-home', 'image7.jpeg', 1448, 1086, 'Dining table and rust-toned chairs beside glazed garden doors'),
]

const SAGE_GALLERY = [
  render('the-sage-retreat', 'image4.jpeg', 941, 1672, 'Bedroom with a timber-framed sage feature wall, low bed and bedside lamps'),
  render('the-sage-retreat', 'image6.jpeg', 941, 1672, 'Timber bedside table and ceramic lamp beside the bed'),
  render('the-sage-retreat', 'image5.jpeg', 941, 1672, 'Dressing area with a round mirror, timber console and upholstered stool'),
  render('the-sage-retreat', 'image3.jpeg', 941, 1672, 'Low timber bed centred on the softly lit sage feature wall'),
  render('the-sage-retreat', 'image2.jpeg', 941, 1672, 'Timber dressing table with a circular mirror and upholstered stool'),
  render('the-sage-retreat', 'image7.jpeg', 941, 1672, 'Feature wall detail with landscape artwork above the headboard'),
  render('the-sage-retreat', 'image1.jpeg', 941, 1672, 'Dressing area and timber door beside the framed sage feature wall'),
]

const DIVIDING_GALLERY = [
  render('the-dividing-line', 'image6.jpeg', 1086, 1448, 'Bathroom partition with a semicircular mirror, floating fluted vanity and lit shelving'),
  render('the-dividing-line', 'image2.jpeg', 1086, 1448, 'Illuminated timber shelving and rattan-fronted storage within the partition'),
  render('the-dividing-line', 'image3.jpeg', 1086, 1448, 'Walk-in shower with brass fittings, a stone bench and a lit niche'),
  render('the-dividing-line', 'image4.jpeg', 1086, 1448, 'Shower enclosure behind a clear glass door with a brass handle'),
  render('the-dividing-line', 'image5.jpeg', 1086, 1448, 'Wall-hung toilet with a brass flush plate beneath a lit display niche'),
  render('the-dividing-line', 'image1.jpeg', 1086, 1448, 'Sculptural stone basin on a fluted timber vanity with brass taps'),
]

const WARM_GALLERY = [
  render('the-warm-ascent', 'image1.jpeg', 1122, 1402, 'Entrance hall with an illuminated staircase, black balustrade and two armchairs'),
  render('the-warm-ascent', 'image2.jpeg', 1122, 1402, 'Seating area beneath the staircase with suspended glass pendants'),
  render('the-warm-ascent', 'image5.jpeg', 1122, 1402, 'Entrance hall with glass pendants, illuminated stair treads and display shelving'),
  render('the-warm-ascent', 'image6.jpeg', 1122, 1402, 'Brass side table between two upholstered armchairs'),
  render('the-warm-ascent', 'image4.jpeg', 1122, 1402, 'Cluster of glass pendant lights in the stairwell'),
  render('the-warm-ascent', 'image3.jpeg', 1122, 1402, 'View from the staircase of the seating area below'),
]

export const projects: Project[] = [
  caseStudyProject('the-reconnected-home', RECONNECTED_TEXT, RECONNECTED_GALLERY),
  caseStudyProject('the-sage-retreat', SAGE_TEXT, SAGE_GALLERY),
  caseStudyProject('the-dividing-line', DIVIDING_TEXT, DIVIDING_GALLERY),
  caseStudyProject('the-warm-ascent', WARM_TEXT, WARM_GALLERY),
  {
    slug: 'oakridge-house',
    title: 'Oakridge House',
    category: 'Residential',
    description:
      'A considered transformation of a Victorian semi in Surrey — restoring its original bones while introducing calm, contemporary interiors that work for modern family life.',
    heroImage: '/projects/oakridge-house/1.jpeg',
    images: [
      '/projects/oakridge-house/1.jpeg',
      '/projects/oakridge-house/2.jpeg',
      '/projects/oakridge-house/3.jpeg',
      '/projects/oakridge-house/4.jpeg',
      '/projects/oakridge-house/5.jpeg',
      '/projects/oakridge-house/6.jpeg',
      '/projects/oakridge-house/7.jpeg',
      '/projects/oakridge-house/8.jpeg',
    ],
    year: 2024,
    location: 'Cobham, Surrey, UK',
    services: ['Architecture', 'Interior Design', 'Project Management'],
    testimonial: {
      quote:
        'It was a transition from listening to what our needs and problems were, and what kind of aspirations we had, and then converting those into solutions.',
      author: 'Oakridge House Client',
    },
  },
  {
    slug: 'sereniflow-wellness-centre',
    title: 'SereniFlow Wellness Centre',
    category: 'Commercial',
    description:
      'A purpose-built wellness centre in Richmond designed around the principles of biophilic design — connecting occupants to nature through light, material, and form.',
    heroImage: '/projects/sereniflow-wellness-centre/1.jpeg',
    // NOTE: only one production photo exists in /public for this project.
    // Add /projects/sereniflow-wellness-centre/2.jpeg & 3.jpeg (or update this
    // list) once more photography is available — referencing missing files
    // here would 404 wherever the gallery renders.
    images: ['/projects/sereniflow-wellness-centre/1.jpeg'],
    year: 2023,
    location: 'Richmond, London, UK',
    services: ['Architecture', 'Interior Design', 'Landscape Design'],
  },
  {
    slug: 'arbore-sanctuary-cafe',
    title: 'Arboré Sanctuary Café',
    category: 'Multipurpose',
    description:
      'A sanctuary café and co-working retreat in Bali that blends traditional Balinese craftsmanship with contemporary hospitality design — a space to slow down and reconnect.',
    heroImage: '/projects/arbore-sanctuary-cafe/1.jpeg',
    // NOTE: only photos 1 & 4 exist in /public for this project — 2 & 3 were
    // referenced here but missing (would 404 wherever the gallery renders).
    images: [
      '/projects/arbore-sanctuary-cafe/1.jpeg',
      '/projects/arbore-sanctuary-cafe/4.jpeg',
    ],
    year: 2024,
    location: 'Bali, Indonesia',
    services: ['Interior Design', 'Concept Design', 'FF&E'],
  },
]
