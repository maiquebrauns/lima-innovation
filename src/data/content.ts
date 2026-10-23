export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  start: number;
  end: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  categoryTag: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  altText: string;
  highlights: string[];
  videoUrl?: string;
  videoPoster?: string;
  videoCaptions?: { text: string; start: number; end: number }[];
  roadmap?: RoadmapStep[];
  gallery?: string[];
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  category: 'windows' | 'doors' | 'siding' | 'decks';
  categoryLabel: string;
  location: string;
  image: string;
  altText: string;
  description: string;
  longDescription?: string;
  videoUrl?: string;
  videoPoster?: string;
  videoCaptions?: { text: string; start: number; end: number }[];
  gallery?: string[];
  features?: string[];
  year?: string;
  area?: string;
  scope?: string;
  timeline?: string;
  budgetStatus?: string;
}

export interface ProjectGalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  tag: string;
  location: string;
}

export const ALL_PROJECT_GALLERY_IMAGES: ProjectGalleryItem[] = [
  {
    id: 1,
    src: "/images/house5.jpg",
    alt: "Mountain estate transformation in Northern Colorado",
    title: "Mountain Estate Transformation",
    tag: "Multi-Level Residence",
    location: "Northern Colorado",
  },
  {
    id: 2,
    src: "/images/door-1.jpg",
    alt: "Architectural Craftsman entry doors with brick arch",
    title: "Craftsman Grand Entryway",
    tag: "Custom Double Doors",
    location: "Loveland, CO",
  },
  {
    id: 3,
    src: "/images/house2-1.jpg",
    alt: "Modern dark siding renovation with covered entry deck and pergola",
    title: "Modern Dark Siding & Deck",
    tag: "Siding & Covered Deck",
    location: "Fort Collins, CO",
  },
  {
    id: 4,
    src: "/images/house7.jpg",
    alt: "Architectural light lap siding with patio terrace and windows",
    title: "Architectural Lap Siding & Windows",
    tag: "Exterior Renovation",
    location: "Windsor, CO",
  },
  {
    id: 5,
    src: "/images/door-2.jpg",
    alt: "Artisan dual entry doors with decorative stained glass interior view",
    title: "Artisan Dual Entry Doors",
    tag: "Interior Glass Detailing",
    location: "Estes Park, CO",
  },
  {
    id: 6,
    src: "/images/house3-1.jpg",
    alt: "High-performance Anlin energy-saving windows with fresh siding",
    title: "High-Performance Window Wall",
    tag: "Energy Glazing & Siding",
    location: "Berthoud, CO",
  },
  {
    id: 7,
    src: "/images/house2-3.jpg",
    alt: "Contemporary alpine residence with vertical dark architectural cladding and deck",
    title: "Alpine Architectural Cladding",
    tag: "Mountain Modern",
    location: "Northern Colorado",
  },
  {
    id: 8,
    src: "/images/house4-1.jpg",
    alt: "Two-story horizontal lap siding and window installation in Colorado pines",
    title: "Two-Story Alpine Siding",
    tag: "All-Weather Lap Siding",
    location: "Red Feather Lakes, CO",
  },
  {
    id: 9,
    src: "/images/windows.jpg",
    alt: "Custom replacement interior window overlooking mountain views",
    title: "Panoramic Window Replacement",
    tag: "Custom Frame Glazing",
    location: "Loveland, CO",
  },
  {
    id: 10,
    src: "/images/house6-1.jpg",
    alt: "Complete exterior siding and crisp white trim modernization",
    title: "Exterior Siding & Trim Modernization",
    tag: "Full Facade Update",
    location: "Longmont, CO",
  },
  {
    id: 11,
    src: "/images/house2-2.jpg",
    alt: "Detail of vertical board-and-batten dark siding and entry terrace",
    title: "Vertical Board-and-Batten & Terrace",
    tag: "Architectural Detailing",
    location: "Fort Collins, CO",
  },
  {
    id: 12,
    src: "/images/house6-2.jpg",
    alt: "Residential siding transformation with stone pathway",
    title: "Curb Appeal Exterior Transformation",
    tag: "Complete Exterior Upgrade",
    location: "Northern Colorado",
  },
];

/**
 * 6 curated, themed high-resolution photos per service
 * Perfectly matches each service's architectural specialty in Northern Colorado
 */
export const SERVICE_GALLERY_IMAGES: Record<string, ProjectGalleryItem[]> = {
  windows: [
    {
      id: 1,
      src: "/assets/images/custom-window-replacement-showcase.jpg",
      alt: "Custom residential window replacement in Loveland, CO",
      title: "Custom Low-E Window Replacement",
      tag: "Panoramic Mountain Glazing",
      location: "Loveland, CO",
    },
    {
      id: 2,
      src: "/images/house3-1.jpg",
      alt: "High-performance energy saving windows with dark frames in Berthoud, CO",
      title: "High-Performance Energy Window Wall",
      tag: "Double-Hung Low-E",
      location: "Berthoud, CO",
    },
    {
      id: 3,
      src: "/images/windows.jpg",
      alt: "Custom replacement interior window overlooking mountain views in Estes Park, CO",
      title: "Alpine Vista Picture Windows",
      tag: "Thermal Framing",
      location: "Estes Park, CO",
    },
    {
      id: 4,
      src: "/assets/images/after-windows.jpg",
      alt: "Full-frame energy star replacement windows in Fort Collins, CO",
      title: "Full-Frame Efficiency Upgrade",
      tag: "Energy Star Glazing",
      location: "Fort Collins, CO",
    },
    {
      id: 5,
      src: "/assets/images/gallery-windows-frame-1.jpg",
      alt: "Precision casement window installation in Windsor, CO",
      title: "Architectural Casement Windows",
      tag: "Weather-Sealed Fit",
      location: "Windsor, CO",
    },
    {
      id: 6,
      src: "/assets/images/project-4.jpg",
      alt: "Modern residential bedroom and living windows in Longmont, CO",
      title: "Triple-Pane Glazing Package",
      tag: "Acoustic & UV Defense",
      location: "Longmont, CO",
    },
  ],

  doors: [
    {
      id: 1,
      src: "/images/door-1.jpg",
      alt: "Architectural Craftsman entry doors with brick arch in Loveland, CO",
      title: "Craftsman Grand Entryway",
      tag: "Custom Double Doors",
      location: "Loveland, CO",
    },
    {
      id: 2,
      src: "/images/door-2.jpg",
      alt: "Artisan dual entry doors with decorative stained glass in Estes Park, CO",
      title: "Artisan Dual Entry Doors",
      tag: "Decorative Stained Glass",
      location: "Estes Park, CO",
    },
    {
      id: 3,
      src: "/assets/images/architectural-entryway-door-showcase.jpg",
      alt: "Solid wood architectural front door with satin nickel hardware in Loveland, CO",
      title: "Architectural Front Entry Door",
      tag: "Precision Wood Craftsmanship",
      location: "Loveland, CO",
    },
    {
      id: 4,
      src: "/assets/images/after-doors.jpg",
      alt: "High-security insulated fiberglass front door in Northern Colorado",
      title: "High-Security Insulated Entrance",
      tag: "Multi-Point Deadbolt",
      location: "Northern Colorado",
    },
    {
      id: 5,
      src: "/assets/images/service-doors.jpg",
      alt: "Seamless sliding patio glass door system in Fort Collins, CO",
      title: "Smooth-Gliding Patio Sliders",
      tag: "Indoor-Outdoor Living",
      location: "Fort Collins, CO",
    },
    {
      id: 6,
      src: "/assets/images/project-5.jpg",
      alt: "Contemporary exterior front door with glass sidelight in Windsor, CO",
      title: "Modern Entry with Glass Sidelight",
      tag: "Thermal Core Construction",
      location: "Windsor, CO",
    },
  ],

  siding: [
    {
      id: 1,
      src: "/assets/images/complete-siding-trim-showcase.jpg",
      alt: "Complete exterior siding and architectural trim renovation in Loveland, CO",
      title: "Complete Siding & Trim Modernization",
      tag: "All-Weather Fiber Cement",
      location: "Loveland, CO",
    },
    {
      id: 2,
      src: "/assets/images/siding-nova.jpg",
      alt: "Modern dark panel siding renovation with covered entry in Fort Collins, CO",
      title: "Modern Dark Cladding Facade",
      tag: "Architectural Panels",
      location: "Fort Collins, CO",
    },
    {
      id: 3,
      src: "/assets/images/after-siding.jpg",
      alt: "Residential exterior siding transformation with crisp trim in Longmont, CO",
      title: "Engineered Wood Lap Siding",
      tag: "Hail & UV Defense",
      location: "Longmont, CO",
    },
    {
      id: 4,
      src: "/assets/images/siding-etapa-3-finalizado.jpg",
      alt: "Laser-aligned fiber cement siding with mitered trim in Berthoud, CO",
      title: "Precision Mitered Trim Cladding",
      tag: "Moisture Barrier HardieWrap",
      location: "Berthoud, CO",
    },
    {
      id: 5,
      src: "/images/house2-2.jpg",
      alt: "Vertical board-and-batten dark siding in Windsor, CO",
      title: "Vertical Board-and-Batten Accent",
      tag: "Mountain Modern",
      location: "Windsor, CO",
    },
    {
      id: 6,
      src: "/images/house4-1.jpg",
      alt: "Two-story horizontal lap siding in Colorado pines in Red Feather Lakes, CO",
      title: "Two-Story Alpine Lap Siding",
      tag: "Full Facade Envelope",
      location: "Red Feather Lakes, CO",
    },
  ],

  decks: [
    {
      id: 1,
      src: "/assets/images/colorado-mountain-view-deck-showcase.jpg",
      alt: "Custom elevated timber outdoor deck overlooking Colorado foothills in Loveland, CO",
      title: "Colorado Mountain View Timber Deck",
      tag: "Heavy-Timber Framework",
      location: "Loveland, CO",
    },
    {
      id: 2,
      src: "/assets/images/colorado-deck-showcase.jpg",
      alt: "Multi-level cedar deck for outdoor entertaining in Fort Collins, CO",
      title: "Multi-Level Outdoor Living Deck",
      tag: "Natural Cedar & Redwood",
      location: "Fort Collins, CO",
    },
    {
      id: 3,
      src: "/assets/images/after-decks.jpg",
      alt: "Finished multi-level deck overlooking mountain view in Estes Park, CO",
      title: "Custom Elevated Alpine Deck",
      tag: "Snow Load Engineered",
      location: "Estes Park, CO",
    },
    {
      id: 4,
      src: "/assets/images/project-6.jpg",
      alt: "Low-maintenance composite deck with integrated railings in Windsor, CO",
      title: "Low-Maintenance Composite Decking",
      tag: "Concealed Fastener System",
      location: "Windsor, CO",
    },
    {
      id: 5,
      src: "/assets/images/gallery-decks-frame-2.jpg",
      alt: "Glulam beam framing with helical pier foundation in Red Feather Lakes, CO",
      title: "Engineered Helical Framing Deck",
      tag: "Frost-Line Pier Support",
      location: "Red Feather Lakes, CO",
    },
    {
      id: 6,
      src: "/assets/images/service-decks.jpg",
      alt: "Finished residential deck with slimline cable railing in Berthoud, CO",
      title: "Modern Deck with Slimline Railings",
      tag: "Integrated Lighting & Stairs",
      location: "Berthoud, CO",
    },
  ],
};

export const LIMA_CONFIG = {
  company: {
    legalName: "Lima Innovations LLC",
    brandName: "LIMA INNOVATIONS",
    brandSuffix: "LLC",
    tagline: "Quality Exterior Improvements. Built to Last.",
    primaryLocation: "Loveland, Colorado",
    region: "Northern Colorado",
    phone: "970 7751830",
    phoneHref: "tel:+19707751830",
    email: "magiollilima@hotmail.com",
    emailHref: "mailto:magiollilima@hotmail.com",
    address: "Loveland, Colorado",
    businessHours: "Mon - Sat: 8:00 AM - 6:00 PM",
    licenseInfo: "Licensed & Fully Insured",
  },

  serviceAreas: [
    { city: "Loveland", state: "CO", isPrimary: true, note: "Home Base & Primary Hub" },
    { city: "Fort Collins", state: "CO", isPrimary: false, note: "Full Service Area" },
    { city: "Longmont", state: "CO", isPrimary: false, note: "Full Service Area" },
    { city: "Windsor", state: "CO", isPrimary: false, note: "Full Service Area" },
    { city: "Berthoud", state: "CO", isPrimary: false, note: "Full Service Area" },
    { city: "Greeley", state: "CO", isPrimary: false, note: "Full Service Area" },
  ],

  services: [
    {
      id: "windows",
      title: "WINDOWS",
      categoryTag: "Energy Efficiency & Comfort",
      shortDesc: "Improve your home's comfort, efficiency, and appearance with professionally installed windows.",
      fullDesc: "Colorado's dramatic temperature shifts demand high-performance glazing. We deliver precision window installations featuring advanced low-E glass, heavy-duty insulating frames, and custom architectural fits that lower energy bills and keep your home cozy year-round.",
      image: "/assets/images/service-windows.jpg",
      altText: "Modern residential window installation showcasing natural mountain light",
      videoUrl: "/assets/videos/windows-install-scroll-v3.mp4",
      videoPoster: "/assets/videos/windows-install-poster-v3.jpg",
      videoCaptions: [
        { text: "Scaffolding erection and structural masonry opening prep.", start: 0.05, end: 0.28 },
        { text: "Precision shimming and composite frame anchoring.", start: 0.30, end: 0.52 },
        { text: "Triple-pane Low-E architectural glass installation.", start: 0.55, end: 0.78 },
        { text: "Continuous closed-cell airtight perimeter seal.", start: 0.80, end: 0.98 }
      ],
      roadmap: [
        {
          step: 1,
          title: "Multi-Story Staging & Masonry Prep",
          description: "Erecting structural scaffolding and laser-plumbing stone masonry rough openings for multi-level glass installation.",
          start: 0,
          end: 0.25
        },
        {
          step: 2,
          title: "Thermal Frame Fastening & Shimming",
          description: "Setting high-performance insulated composite frames with masonry anchor fasteners and moisture sill pans.",
          start: 0.25,
          end: 0.50
        },
        {
          step: 3,
          title: "Low-E Triple-Pane Glazing",
          description: "Securing architectural triple-pane Low-E insulated glass units with argon gas barrier for maximum UV defense.",
          start: 0.50,
          end: 0.75
        },
        {
          step: 4,
          title: "Airtight Thermal Seal & Casing Finish",
          description: "Injecting expanding closed-cell foam insulation and applying elastomeric architectural sealants around all stone transitions.",
          start: 0.75,
          end: 1.0
        }
      ],
      highlights: [
        "Double & triple pane low-E insulating glass",
        "Precision weather-sealing against Colorado drafts",
        "Custom replacement & architectural styles",
        "Acoustic dampening and UV interior protection"
      ],
      gallery: [
        "/assets/images/custom-window-replacement-showcase.jpg",
        "/assets/images/gallery-windows-frame-2.jpg",
        "/assets/images/gallery-windows-frame-3.jpg",
        "/assets/images/windows-hero.jpg",
        "/assets/images/gallery-windows-frame-1.jpg",
        "/assets/images/project-4.jpg"
      ]
    },
    {
      id: "doors",
      title: "DOORS",
      categoryTag: "Curb Appeal & Security",
      shortDesc: "Upgrade your home's entrance with durable, stylish, and professionally installed exterior doors.",
      fullDesc: "Your exterior doors are your home's first impression and primary security barrier. We install high-durability fiberglass, steel, and artisan wood entrance doors, patio sliders, and French doors built to resist warping, drafts, and forced entry.",
      image: "/assets/images/service-doors.jpg",
      altText: "Contemporary residential exterior front door with architectural hardware",
      videoUrl: "/assets/videos/doors-scroll-keyint.mp4",
      videoPoster: "/assets/videos/doors-poster.jpg",
      videoCaptions: [
        { text: "Structural squaring, header reinforcement, and laser leveling.", start: 0.05, end: 0.28 },
        { text: "Heavy-duty thermal jamb assembly and threshold anchoring.", start: 0.30, end: 0.52 },
        { text: "Precision hanging of custom double entry doors and hardware.", start: 0.55, end: 0.78 },
        { text: "Finished architectural casing and weather-tight compression seal.", start: 0.80, end: 0.98 }
      ],
      roadmap: [
        {
          step: 1,
          title: "Structural Squaring & Laser Leveling",
          description: "Inspecting opening tolerances, plumbing rough studs, and reinforcing header load capacity with precision laser instruments.",
          start: 0,
          end: 0.25
        },
        {
          step: 2,
          title: "Thermal Jamb Assembly & Threshold Bed",
          description: "Anchoring heavy-duty composite jambs with thermal break sill pan to block drafts and prevent subfloor moisture seepage.",
          start: 0.25,
          end: 0.50
        },
        {
          step: 3,
          title: "Hanging Dual Doors & Multi-Point Locks",
          description: "Mounting architectural door slabs on heavy-duty ball-bearing hinges and configuring continuous multi-point deadbolt security.",
          start: 0.50,
          end: 0.75
        },
        {
          step: 4,
          title: "Compression Weatherseals & Artisan Casing",
          description: "Installing magnetic compression weatherstripping and custom-milled architectural trim for airtight, weather-tight elegance.",
          start: 0.75,
          end: 1.0
        }
      ],
      highlights: [
        "Reinforced multi-point locking mechanisms",
        "High-density thermal insulation cores",
        "Weather-resistant finishes and custom thresholds",
        "Smooth-glide patio sliders and multi-panel systems"
      ],
      gallery: [
        "/assets/images/architectural-entryway-door-showcase.jpg",
        "/assets/images/gallery-doors-frame-2.jpg",
        "/assets/images/gallery-doors-frame-3.jpg",
        "/assets/images/gallery-doors-frame-1.jpg",
        "/assets/images/project-1.jpg",
        "/assets/images/contact-colorado-home.jpg"
      ]
    },
    {
      id: "siding",
      title: "SIDING",
      categoryTag: "All-Weather Defense",
      shortDesc: "Protect your home from the elements while giving your exterior a fresh, updated look.",
      fullDesc: "Protect your exterior from high-altitude UV rays, heavy mountain snow, and severe hail storms. We specialize in robust fiber cement, engineered wood, and premium composite siding that dramatically boosts curb appeal while providing a durable barrier.",
      image: "/assets/images/siding-nova.jpg",
      altText: "Modern dark panel siding renovation with covered entry deck",
      videoUrl: "/videos/facade-renovation.mp4",
      videoPoster: "/assets/videos/transformation-poster.jpg",
      videoCaptions: [
        { text: "Every transformation starts with a solid foundation.", start: 0.05, end: 0.28 },
        { text: "Protection begins beneath the surface.", start: 0.30, end: 0.52 },
        { text: "Precision in every siding detail.", start: 0.55, end: 0.78 },
        { text: "A renewed exterior. Built to last.", start: 0.80, end: 0.98 }
      ],
      roadmap: [
        {
          step: 1,
          title: "Tear-Off & Substrate Inspection",
          description: "Stripping deteriorated exterior cladding, evaluating structural sheathing integrity, and repairing sub-wall framing.",
          start: 0,
          end: 0.25
        },
        {
          step: 2,
          title: "HardieWrap Weather Barrier System",
          description: "Applying non-woven breathable weather resistive barrier with sealed flashing tape around all penetrations and corners.",
          start: 0.25,
          end: 0.50
        },
        {
          step: 3,
          title: "Laser-Aligned Fiber Cement Installation",
          description: "Fastening high-durability horizontal lap panels and natural cedar trim accents with calibrated blind-nailing fasteners.",
          start: 0.50,
          end: 0.75
        },
        {
          step: 4,
          title: "Mitered Corners & Architectural Sealants",
          description: "Precision-cutting seamless corner joints, applying elastomeric architectural sealants, and inspecting UV-cured finish.",
          start: 0.75,
          end: 1.0
        }
      ],
      highlights: [
        "Hail and impact-resistant siding options",
        "Breathable moisture and wind barrier installation",
        "Modern architectural colors and natural wood grains",
        "Precision mitered corners and architectural trim"
      ],
      gallery: [
        "/assets/images/complete-siding-trim-showcase.jpg",
        "/assets/images/contact-colorado-home.jpg",
        "/assets/images/gallery-siding-frame-2.jpg",
        "/assets/images/siding-nova.jpg",
        "/assets/images/gallery-siding-frame-3.jpg",
        "/assets/images/gallery-siding-frame-1.jpg"
      ]
    },
    {
      id: "decks",
      title: "DECKS",
      categoryTag: "Outdoor Colorado Living",
      shortDesc: "Create a space to enjoy Colorado's outdoors with a deck designed around your home and lifestyle.",
      fullDesc: "Take full advantage of 300 days of Colorado sunshine. From spacious multi-level entertainment decks to private cedar and composite outdoor retreats, we engineer sturdy structures designed to handle snow loads and mountain living.",
      image: "/assets/images/service-decks.jpg",
      altText: "Beautiful residential outdoor deck with mountain and forest view",
      videoUrl: "/assets/videos/decks-scroll-keyint.mp4",
      videoPoster: "/assets/videos/decks-poster.jpg",
      videoCaptions: [
        { text: "Engineered helical footings and load-bearing framing.", start: 0.05, end: 0.28 },
        { text: "Heavy timber glulam beams built for snow loads.", start: 0.30, end: 0.52 },
        { text: "Concealed fastener decking with slimline balusters.", start: 0.55, end: 0.78 },
        { text: "Designed for 300 days of Colorado sunshine.", start: 0.80, end: 0.98 }
      ],
      roadmap: [
        {
          step: 1,
          title: "Helical Footings & Pier Excavation",
          description: "Excavating below Colorado frost line and driving engineered helical piers to support heavy mountain snow loads.",
          start: 0,
          end: 0.25
        },
        {
          step: 2,
          title: "Glulam Beam Framing & Joist Ledger",
          description: "Erecting structural glulam beams with heavy-duty powder-coated galvanized steel framing brackets and joists.",
          start: 0.25,
          end: 0.50
        },
        {
          step: 3,
          title: "Composite Decking & Hidden Fasteners",
          description: "Securing capped polymer composite boards using stainless steel hidden clips for a smooth, splinter-free surface.",
          start: 0.50,
          end: 0.75
        },
        {
          step: 4,
          title: "Cable Balusters & Low-Voltage Lighting",
          description: "Mounting slimline black aluminum cable railing systems and wiring subtle recessed perimeter and step LED lighting.",
          start: 0.75,
          end: 1.0
        }
      ],
      highlights: [
        "Low-maintenance composite & natural cedar/redwood",
        "Engineered footings and heavy-duty load framing",
        "Integrated railings, stairs, and modern accents",
        "Built-in perimeter and stair step low-voltage LED lighting"
      ],
      gallery: [
        "/assets/images/colorado-mountain-view-deck-showcase.jpg",
        "/assets/images/colorado-deck-showcase.jpg",
        "/assets/images/gallery-decks-frame-2.jpg",
        "/assets/images/gallery-decks-frame-3.jpg",
        "/assets/images/gallery-decks-frame-1.jpg",
        "/assets/images/gallery-windows-frame-2.jpg"
      ]
    }
  ] as ServiceItem[],

  projects: [
    {
      id: 1,
      slug: "custom-window-replacement",
      title: "Custom Window Replacement",
      category: "windows",
      categoryLabel: "Windows",
      location: "Loveland, CO",
      image: "/assets/images/custom-window-replacement-showcase.jpg",
      altText: "Professional installer securing custom residential window frame in Loveland, CO",
      description: "Complete full-frame window replacement optimizing mountain view sightlines and interior thermal comfort.",
      longDescription: "Engineered specifically for Loveland's microclimate and mountain weather swings. This project replaced deteriorating single-pane glass with custom-dimensioned, low-E triple-pane frames that withstand high-altitude UV radiation while cutting seasonal heating costs.",
      features: [
        "Argon-insulated triple-pane glass",
        "Concealed heavy-duty weatherstripping",
        "Architectural matte black composite frames",
        "Lifetime structural warranty"
      ],
      gallery: [
        "/assets/images/project-1.jpg",
        "/assets/images/project-4.jpg",
        "/assets/images/service-windows.jpg"
      ],
      year: "2024",
      area: "2,400 SQ FT",
      scope: "LOW-E TRIPLE PANE",
      timeline: "ON TIME",
      budgetStatus: "ON TARGET"
    },
    {
      id: 2,
      slug: "architectural-entryway-door",
      title: "Architectural Entryway Door",
      category: "doors",
      categoryLabel: "Doors",
      location: "Loveland, CO",
      image: "/assets/images/architectural-entryway-door-showcase.jpg",
      altText: "Artisan craftsman laser leveling and hanging solid wood entry door in Loveland, CO",
      description: "High-security insulated front door with sleek satin nickel hardware and custom weatherstripping.",
      longDescription: "A statement entrance blending structural security and artisan exterior styling. Installed with heavy-duty multi-point locking deadbolts and insulated polyurethane thermal cores that block cold drafts from Northern Colorado winter storms.",
      features: [
        "Reinforced fiberglass woodgrain skin",
        "Thermal break aluminum threshold",
        "Multi-point deadbolt security locking",
        "Low-E insulated decorative sidelight"
      ],
      gallery: [
        "/assets/images/project-5.jpg",
        "/assets/images/service-doors.jpg"
      ],
      year: "2024",
      area: "CUSTOM ENTRY",
      scope: "FIBERGLASS MULTI-LOCK",
      timeline: "ON TIME",
      budgetStatus: "ON TARGET"
    },
    {
      id: 3,
      slug: "complete-siding-and-trim-renovation",
      title: "Complete Siding & Trim Renovation",
      category: "siding",
      categoryLabel: "Siding",
      location: "Loveland, CO",
      image: "/assets/images/complete-siding-trim-showcase.jpg",
      altText: "Exterior siding specialist installing weather-tight horizontal lap panels in Loveland, CO",
      description: "Full exterior siding replacement using premium weather-resistant panels and precision corner miter joints.",
      longDescription: "An end-to-end exterior transformation combining durable fiber cement horizontal lap siding with custom-milled cedar trim accents. Engineered to provide an impenetrable moisture barrier against wind-driven hail, freeze-thaw cycles, and summer sun.",
      videoUrl: "/videos/facade-renovation.mp4",
      videoPoster: "/assets/videos/transformation-poster.jpg",
      videoCaptions: [
        { text: "Every transformation starts with a solid foundation.", start: 0.05, end: 0.28 },
        { text: "Protection begins beneath the surface.", start: 0.30, end: 0.52 },
        { text: "Precision in every siding detail.", start: 0.55, end: 0.78 },
        { text: "A renewed exterior. Built to last.", start: 0.80, end: 0.98 }
      ],
      roadmap: [
        {
          step: 1,
          title: "Tear-Off & Substrate Inspection",
          description: "Stripping deteriorated exterior cladding, evaluating structural sheathing integrity, and repairing sub-wall framing.",
          start: 0,
          end: 0.25
        },
        {
          step: 2,
          title: "HardieWrap Weather Barrier System",
          description: "Applying non-woven breathable weather resistive barrier with sealed flashing tape around all penetrations and corners.",
          start: 0.25,
          end: 0.50
        },
        {
          step: 3,
          title: "Laser-Aligned Fiber Cement Installation",
          description: "Fastening high-durability horizontal lap panels and natural cedar trim accents with calibrated blind-nailing fasteners.",
          start: 0.50,
          end: 0.75
        },
        {
          step: 4,
          title: "Mitered Corners & Architectural Sealants",
          description: "Precision-cutting seamless corner joints, applying elastomeric architectural sealants, and inspecting UV-cured finish.",
          start: 0.75,
          end: 1.0
        }
      ],
      features: [
        "Class A fire-rated fiber cement siding",
        "Breathable weather-resistant barrier (HardieWrap)",
        "Precision mitered aluminum corners and cedar headers",
        "ColorPlus UV-resistant architectural finish"
      ],
      gallery: [
        "/assets/images/project-2.jpg",
        "/assets/images/project-3.jpg",
        "/assets/images/siding-nova.jpg"
      ],
      year: "2024",
      area: "3,850 SQ FT",
      scope: "HARDIEWRAP & CEDAR TRIM",
      timeline: "-4 DAYS",
      budgetStatus: "ON TARGET"
    },
    {
      id: 4,
      slug: "colorado-mountain-view-deck",
      title: "Colorado Mountain View Deck",
      category: "decks",
      categoryLabel: "Decks",
      location: "Loveland, CO",
      image: "/assets/images/colorado-mountain-view-deck-showcase.jpg",
      altText: "Deck builder fastening cedar planks with Rocky Mountain vista in Loveland, CO",
      description: "Heavy-timber deck build designed for outdoor entertaining, high snow load capacity, and lasting beauty.",
      longDescription: "Crafted to take full advantage of Colorado's 300 days of sunshine. Built on engineered concrete helical piers with heavy structural glulam beams designed to effortlessly support deep winter snow loads while maintaining a seamless indoor-outdoor transition.",
      features: [
        "Structural glulam beam framing with powder-coated brackets",
        "Concealed stainless steel deck fastener system",
        "Slimline black aluminum cable baluster railings",
        "Integrated low-voltage stair and perimeter LED lighting"
      ],
      gallery: [
        "/assets/images/service-decks.jpg",
        "/assets/images/project-6.jpg"
      ],
      year: "2024",
      area: "950 SQ FT",
      scope: "STRUCTURAL GLULAM & CABLE",
      timeline: "ON TIME",
      budgetStatus: "ON TARGET"
    },
    {
      id: 5,
      slug: "energy-star-double-hung-windows",
      title: "Energy Star Double-Hung Windows",
      category: "windows",
      categoryLabel: "Windows",
      location: "Loveland, CO",
      image: "/assets/images/project-4.jpg",
      altText: "Modern residential bedroom and living windows with dark architectural frames in Loveland, CO",
      description: "High-efficiency double-hung window retrofit eliminating drafts and brightening living spaces.",
      longDescription: "A whole-home window retrofit replacing old aluminum drafty sliders with high-performance double-hung units. Both sashes tilt inward for effortless cleaning, while advanced dual weather-stripping keeps indoor temperatures steady year-round.",
      features: [
        "Dual-sash inward tilt for easy cleaning",
        "Low-E glass coating with UV fade prevention",
        "Reinforced composite thermal sash frames",
        "Sound-dampening acoustic laminate"
      ],
      gallery: [
        "/assets/images/project-4.jpg",
        "/assets/images/project-1.jpg"
      ],
      year: "2024",
      area: "2,100 SQ FT",
      scope: "DUAL-SASH RETROFIT",
      timeline: "ON TIME",
      budgetStatus: "ON TARGET"
    },
    {
      id: 6,
      slug: "patio-multi-slide-glass-doors",
      title: "Patio Multi-Slide Glass Doors",
      category: "doors",
      categoryLabel: "Doors",
      location: "Loveland, CO",
      image: "/assets/images/service-doors.jpg",
      altText: "Seamless indoor-outdoor patio door system in Loveland, CO",
      description: "Smooth-gliding patio door system establishing seamless transitions between living room and patio.",
      longDescription: "This custom 3-panel multi-slide door system disappears into a hidden wall pocket, transforming a traditional living room into a sun-drenched open-air entertaining pavilion overlooking the foothills.",
      features: [
        "Heavy-duty tandem ball-bearing rollers",
        "Flush-mounted ADA sill threshold",
        "Impact-resistant tempered safety glass",
        "Thermally broken aluminum exterior"
      ],
      gallery: [
        "/assets/images/service-doors.jpg",
        "/assets/images/project-5.jpg"
      ],
      year: "2025",
      area: "OPEN-AIR LIVING",
      scope: "3-PANEL MULTI-SLIDE",
      timeline: "ON SCHEDULE",
      budgetStatus: "ON TARGET"
    },
    {
      id: 7,
      slug: "cedar-and-dark-accent-siding",
      title: "Cedar & Dark Accent Siding",
      category: "siding",
      categoryLabel: "Siding",
      location: "Loveland, CO",
      image: "/assets/images/project-3.jpg",
      altText: "Modern architectural facade with mixed material cedar and charcoal siding in Loveland, CO",
      description: "Architectural siding installation combining horizontal wood accents with durable dark exterior siding.",
      longDescription: "A standout architectural hybrid: western red cedar tongue-and-groove siding stained with penetrating UV oil, paired with vertical board-and-batten fiber cement siding in charcoal.",
      features: [
        "Clear grade Western Red Cedar siding",
        "Rainscreen ventilation gap system",
        "Corrosion-resistant stainless fasteners",
        "Custom flashing at material transitions"
      ],
      gallery: [
        "/assets/images/project-3.jpg",
        "/assets/images/project-2.jpg"
      ],
      year: "2024",
      area: "4,100 SQ FT",
      scope: "RED CEDAR & ACCENT PANELS",
      timeline: "+2 DAYS",
      budgetStatus: "ON TARGET"
    },
    {
      id: 8,
      slug: "low-maintenance-composite-decking",
      title: "Low-Maintenance Composite Decking",
      category: "decks",
      categoryLabel: "Decks",
      location: "Loveland, CO",
      image: "/assets/images/project-6.jpg",
      altText: "Finished composite deck with integrated railings in Loveland, CO",
      description: "UV-stabilized composite deck build with concealed fasteners and modern safety railing system.",
      longDescription: "Zero-splinter, zero-stain composite decking engineered for heavy use and high-altitude Colorado sun. Resists mold, rot, scratching, and fading with a 30-year manufacturer warranty.",
      features: [
        "Capped polymer composite core",
        "Grooved board profiles with hidden clips",
        "Non-slip embossed natural woodgrain texture",
        "Matching composite fascia and stair risers"
      ],
      gallery: [
        "/assets/images/project-6.jpg",
        "/assets/images/service-decks.jpg"
      ],
      year: "2024",
      area: "1,200 SQ FT",
      scope: "CAPPED POLYMER DECKING",
      timeline: "-3 DAYS",
      budgetStatus: "ON TARGET"
    }
  ] as ProjectItem[]
};
