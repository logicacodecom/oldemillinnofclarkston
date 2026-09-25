import { property, northLocation } from "../property";
import { AMENITIES, BEDS, type Amenity, type Bed, type RoomSlug } from "../rooms";

// All English copy. es.ts must match this shape (typed as Dict).
// Slices passed to client components (availability, form, filters, gallery.ui)
// must stay plain strings — functions can't cross the server/client boundary.
export const en = {
  htmlLang: "en",
  ogLocale: "en_US",
  // Toggle shown on English pages points to Spanish.
  toggle: { label: "Español", aria: "Ver este sitio en español", hrefLang: "es" },
  skip: "Skip to content",

  meta: {
    defaultTitle: "Lakefront Hotel in Clarkston, MI | Olde Mill Inn Near Pine Knob",
    titleTemplate: "%s | Olde Mill Inn of Clarkston",
    description:
      "Stay beside Van Norman Lake at Olde Mill Inn of Clarkston, approximately five miles from Pine Knob, with comfortable rooms, kayaks, pedal boats and direct booking.",
    ogDescription:
      "Stay beside Van Norman Lake at Olde Mill Inn of Clarkston, approximately five miles from Pine Knob.",
    twitterDescription: "A relaxed, affordable lakefront stay near Pine Knob.",
    rooms: {
      title: "Rooms — Lakefront and Off-Water",
      description:
        "Explore lakefront and off-water rooms at Olde Mill Inn of Clarkston and check current availability through secure direct booking.",
    },
    lakefront: {
      title: "Lakefront Stay in Clarkston, MI",
      description:
        "Relax beside Van Norman Lake with a covered waterfront patio, outdoor areas, complimentary kayaks and pedal boats for registered guests.",
    },
    pineKnob: {
      title: "Hotel Near Pine Knob Music Theatre",
      description:
        "Stay approximately five miles from Pine Knob Music Theatre at an independent lakefront inn in Clarkston, Michigan.",
    },
    thingsToDo: {
      title: "Things to Do Near Clarkston, MI",
      description:
        "Concerts at Pine Knob, nearby skiing, shopping at Great Lakes Crossing and local dining in Clarkston — all a short drive from Olde Mill Inn.",
    },
    gallery: {
      title: "Photo Gallery",
      description:
        "View current photos of the rooms, lakefront setting, covered patio and outdoor areas at Olde Mill Inn of Clarkston.",
    },
    plan: {
      title: "Plan Your Stay — FAQs & Policies",
      description:
        "Check-in and check-out times, pet policy, kayaks and pedal boats, Wi-Fi, parking and booking information for Olde Mill Inn of Clarkston.",
    },
    contact: {
      title: "Contact & Directions",
      description:
        "Contact Olde Mill Inn of Clarkston at 5835 Dixie Hwy for reservations, directions and lodging information.",
    },
    privacy: {
      title: "Privacy",
      description: "How Olde Mill Inn of Clarkston handles information collected through this website.",
    },
    accessibility: {
      title: "Accessibility",
      description: "Olde Mill Inn of Clarkston's commitment to an accessible website.",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    },
  },

  nav: {
    main: [
      { label: "Rooms", href: "/rooms" },
      { label: "Lakefront Experience", href: "/lakefront-experience" },
      { label: "Pine Knob", href: "/pine-knob" },
      { label: "Things to Do", href: "/things-to-do" },
      { label: "Gallery", href: "/gallery" },
      { label: "Plan Your Stay", href: "/plan-your-stay" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
    primaryAria: "Primary",
    mobileAria: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: `${property.name} — home`,
  },

  common: {
    bookNow: "Book Now",
    viewRooms: "View Rooms",
    callNumber: `Call ${property.phone.display}`,
    textNumber: `Text ${property.text.display}`,
    checkAvailability: "Check Availability",
    callInn: "Call the Inn",
    getDirections: "Get Directions",
    directions: "Directions",
    viewDetails: "View Details",
    lakefront: "Lakefront",
    offWater: "Off-water",
    miles: (n: number) => `≈${n} mi`,
  },

  mobileBar: { aria: "Quick actions", call: "Call", directions: "Directions", book: "Book Now" },

  footer: {
    tagline: `Independent, family-operated lakefront lodging on ${property.lake} in Clarkston, Michigan.`,
    explore: "Explore",
    contact: "Contact",
    plan: "Plan",
    credit: "Website delivered by our technology partner,",
  },

  social: { aria: (network: string) => `The Olde Mill Inn of Clarkston on ${network}` },

  amenities: Object.fromEntries(AMENITIES.map((a) => [a, a])) as Record<Amenity, string>,
  beds: Object.fromEntries(BEDS.map((b) => [b, b])) as Record<Bed, string>,

  rooms: {
    "standard-full": {
      shortDescription:
        "An off-water room with a full-size bed and warm rustic log furniture — a comfortable, practical base for your Clarkston stay, with access to the lake and kayaks.",
      metaDescription:
        "Off-water room in Clarkston, MI with a full bed and rustic log furniture. Includes lake access and complimentary kayaks.",
    },
    "deluxe-queen": {
      shortDescription:
        "An off-water room with a queen bed and rustic log furniture, featuring a wall-mounted electric fireplace and a kitchenette. Includes lake access and kayaks.",
      metaDescription:
        "Off-water queen room in Clarkston, MI with a kitchenette, wall-mounted fireplace and rustic log furniture. Includes lake access.",
    },
    "premium-queen": {
      shortDescription:
        "A lakefront room with a queen bed and rustic log furniture, set right by the water. Includes a kitchenette, dual-burner stovetop and a wall-mounted electric fireplace.",
      metaDescription:
        "Lakefront queen room in Clarkston, MI with a kitchenette, dual-burner stovetop and fireplace, set right on Van Norman Lake.",
    },
    "premium-two-full": {
      shortDescription:
        "A lakefront room with two full-size beds and rustic log furniture — room to spread out by the water. Includes a kitchenette, dual-burner stovetop and a wall-mounted electric fireplace.",
      metaDescription:
        "Lakefront room in Clarkston, MI with two full beds, sleeping up to four, a kitchenette, stovetop and fireplace.",
    },
    "honeymoon-family-suite": {
      shortDescription:
        "Our most accommodating lakefront suite, filled with rustic log furniture. Features a full kitchen, an in-unit washer and dryer, and a large-screen TV above a fireplace.",
      metaDescription:
        "Lakefront suite in Clarkston, MI with a full kitchen, in-unit washer/dryer and fireplace, sleeping up to four guests.",
    },
  } satisfies Record<RoomSlug, { shortDescription: string; metaDescription: string }>,

  roomFacts: {
    sleeps: (n: number) => `Sleeps ${n}`,
    sleepsUpTo: (n: number) => `Sleeps up to ${n}`,
    photoAlt: (name: string) => `The ${name} at Olde Mill Inn of Clarkston`,
  },

  home: {
    eyebrow: "Lakefront lodging in Clarkston, Michigan",
    heroTitle: "Stay on the Lake. Minutes from Pine Knob.",
    heroText:
      "Enjoy a relaxed Clarkston stay with comfortable rooms, complimentary kayaks and pedal boats, waterfront spaces, and convenient access to concerts, skiing, dining and local attractions.",
    heroAlt: "Aerial view of Olde Mill Inn of Clarkston along the shoreline of Van Norman Lake",
    availabilityTitle: "Check availability & rates",
    glanceAria: "At a glance",
    trust: [
      { icon: "water", label: "Lakefront Setting" },
      { icon: "music_note", label: "≈5 Miles from Pine Knob" },
      { icon: "kayaking", label: "Complimentary Kayaks" },
      { icon: "directions_boat", label: "Complimentary Pedal Boats" },
      { icon: "local_parking", label: "Parking Available" },
      { icon: "kitchen", label: "Selected Kitchenettes" },
    ],
    introTitle: "A Different Kind of Clarkston Stay",
    introText: `Olde Mill Inn of Clarkston combines the character and value of an independent inn with a setting nearby chain hotels cannot offer. Stay beside ${property.lake}, relax near the covered waterfront patio, and enjoy convenient access to Pine Knob, nearby ski areas, local dining and shopping.`,
    lakefrontRooms: "Lakefront Rooms",
    viewAllRooms: "View all rooms",
    offWaterRooms: "Off-Water Rooms",
    waterEyebrow: "Waterfront Living",
    waterTitle: "More Than a Room",
    waterText:
      "Step outside and enjoy the lakefront setting that makes Olde Mill Inn distinctive. Registered guests can relax beside the water, use complimentary kayaks and pedal boats, or spend time near the covered lakefront patio and outdoor areas.",
    waterAlt: "Covered lakeside deck with log chairs overlooking the water at Olde Mill Inn of Clarkston",
    waterItems: [
      {
        icon: "deck",
        title: "Covered lakefront patio",
        text: "A shaded space to enjoy morning coffee or an evening by the water.",
      },
      {
        icon: "kayaking",
        title: "Kayaks & pedal boats",
        text: "Complimentary for registered guests, subject to season, weather, safety conditions and availability.",
      },
    ],
    exploreLakefront: "Explore the lakefront",
    pineTitle: "Going to Pine Knob? Stay Approximately Five Miles Away.",
    pineText:
      "Make Olde Mill Inn your Clarkston home base for concerts, skiing and seasonal events. Return after your outing to a quieter lakefront setting instead of a conventional highway hotel.",
    pineCta: "Plan Your Pine Knob Stay",
    milesToPineKnob: "miles to Pine Knob",
    pineNote: "Pine Knob Music Theatre & Pine Knob Ski and Snowboard Resort are both about five miles away.",
    locationsTitle: "Two Locations in Clarkston",
    youAreHere: "You are here",
    southName: "Clarkston South",
    southText: "Rooms on Van Norman Lake with online booking.",
    petFriendly: "Pet-friendly",
    northText: "Pet-friendly studios with online booking. Extended stays by phone.",
    visitNorth: `Visit ${northLocation.short}`,
    northUrl: northLocation.url as string,
    exploreTitle: "Explore the Area",
    seeThingsToDo: "See things to do",
    independentTitle: "Independent, Local and Welcoming",
    independentText:
      "Olde Mill Inn is a family-operated property offering a relaxed stay for overnight visits, weekend getaways and longer stays. The rooms combine warm rustic details with practical amenities for a comfortable visit.",
    finalTitle: "Your Clarkston Lakefront Stay Starts Here",
  },

  roomsPage: {
    eyebrow: "Accommodations",
    title: "Find Your Room",
    subtitle:
      "Choose from practical off-water rooms and distinctive lakefront accommodations. Room features vary, so review the details and check current availability through the secure booking system.",
    heroAlt: "The lakefront room building at Olde Mill Inn of Clarkston seen from the water",
    availabilityTitle: "Check availability & rates",
    note: "Room features and availability are confirmed at the time of booking.",
  },

  filters: {
    aria: "Filter rooms",
    all: "All Rooms",
    offWater: "Off-Water",
    lakefront: "Lakefront",
    full: "Full Bed",
    queen: "Queen Bed",
    twoFull: "Two Full Beds",
    noMatch: "No rooms match that filter.",
  },

  roomPage: {
    featuresTitle: "Room features",
    policiesPrefix: "See our",
    policiesLink: "policies and FAQs",
    policiesSuffix: "for check-in, pets and more.",
    readyTitle: "Ready to stay?",
    readyText: "Check live availability and rates through our secure booking system, or call the inn.",
    relatedTitle: "You might also like",
  },

  // Client component: strings only. {n} is replaced at render time.
  availability: {
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    guest1: "guest",
    guestN: "guests",
    search: "Check availability",
    searching: "Checking…",
    bookSecure: "Book on our secure system",
    notConfigured: "Live availability isn’t available right now.",
    notConfiguredLink: "Check availability on our secure booking system",
    night1: "{n} night · rates shown per night",
    nightN: "{n} nights · rates shown per night",
    noRooms: "No rooms available for those dates. Try different dates, or",
    noRoomsLink: "check our booking system",
    onlyLeft: " · only {n} left",
    perNight: "/night",
    total: "total",
    book: "Book",
    disclaimer: "Live rates from our booking system. Final price and taxes are confirmed at checkout.",
    lakefront: "Lakefront",
    offWater: "Off-water",
    errors: {
      order: "Please choose a check-out date after check-in.",
      dates: "Please choose valid dates.",
      range: "Choose a stay of 1–30 nights.",
      past: "Check-in can't be in the past.",
      unavailable: "Availability is temporarily unavailable.",
      generic: "Something went wrong. Please try again.",
      network: "Network error. Please try again, or book on our secure system.",
    },
  },

  lakefront: {
    eyebrow: "Waterfront Living",
    title: "Relax Beside Van Norman Lake",
    heroAlt: "Sandy beach with a pedal boat and kayaks at the water's edge at Olde Mill Inn of Clarkston",
    intro: `The lakefront setting is what makes Olde Mill Inn different. Guests can enjoy outdoor spaces beside ${property.lake}, relax near the covered patio, and use complimentary kayaks and pedal boats during suitable seasonal conditions.`,
    highlights: [
      { icon: "water", title: "Lakefront setting", text: `Rooms and outdoor spaces set right along ${property.lake}.` },
      { icon: "deck", title: "Covered patio", text: "A shaded waterfront patio for morning coffee or an evening by the water." },
      { icon: "beach_access", title: "Beach & shoreline", text: "A sandy lake-access area to enjoy the shoreline." },
      { icon: "kayaking", title: "Kayaks", text: "Complimentary for registered guests." },
      { icon: "directions_boat", title: "Pedal boats", text: "Complimentary for registered guests." },
      { icon: "photo_camera", title: "Seasonal scenery", text: "Open water in summer and quiet, scenic views through the seasons." },
    ],
    deckAlt: "Covered lakeside deck with log chairs at Olde Mill Inn of Clarkston",
    buildingAlt: "Lakefront room building over the water at Olde Mill Inn of Clarkston",
    qualifier:
      "Outdoor amenities and water activities are subject to season, weather, safety conditions and availability. There is no lifeguard on duty and swimming is not supervised.",
  },

  pineKnob: {
    eyebrow: "Concerts, skiing & seasonal events",
    title: "A Lakefront Stay Near Pine Knob",
    heroAlt: "Aerial view of Olde Mill Inn of Clarkston on Van Norman Lake",
    intro:
      "Attending a concert or planning a ski day at Pine Knob? Olde Mill Inn of Clarkston offers a convenient place to stay approximately five miles away. Return afterward to a relaxed lakefront setting with practical room amenities and nearby dining.",
    address: "Pine Knob Music Theatre is located at 33 Bob Seger Drive, Clarkston, MI 48348. Distances are approximate.",
    milesToPineKnob: "miles to Pine Knob",
    venuesTitle: "Pine Knob & nearby slopes",
    roomsTitle: "Lakefront rooms for your stay",
    diningTitle: "Nearby dining",
    faqTitle: "Good to know",
    faqs: [
      {
        q: "How far is the inn from Pine Knob?",
        a: "The inn is approximately five miles from Pine Knob Music Theatre and Pine Knob Ski and Snowboard Resort.",
      },
      {
        q: "Can I arrive after a concert?",
        a: "Guests planning a late arrival should contact the inn directly for instructions.",
      },
    ],
  },

  thingsToDo: {
    eyebrow: "Explore the area",
    title: "Things to Do",
    subtitle:
      "From concerts and skiing to shopping and local dining, Clarkston's best is a short drive from the inn. Distances are approximate.",
    heroAlt: "Street view of Olde Mill Inn of Clarkston",
    sections: {
      concerts: "Concerts & Entertainment",
      skiing: "Skiing & Winter Activities",
      shopping: "Shopping",
      local: "Local Dining & Clarkston",
    },
  },

  // Distances are approximate and clearly labeled. No shuttle, partnership,
  // discount or ticket claims.
  attractions: [
    {
      name: "Pine Knob Music Theatre",
      category: "concerts",
      approxMiles: 5,
      address: "33 Bob Seger Drive, Clarkston, MI 48348",
      description:
        "Michigan's landmark outdoor amphitheater. Make the inn your relaxed lakefront home base for concert nights.",
    },
    {
      name: "Pine Knob Ski and Snowboard Resort",
      category: "skiing",
      approxMiles: 5,
      description: "Downhill skiing, snowboarding and tubing just minutes from the inn.",
    },
    {
      name: "Alpine Valley Ski Resort",
      category: "skiing",
      approxMiles: 8,
      description: "A second nearby ski area with runs for a range of abilities.",
    },
    {
      name: "Mt. Holly Ski and Snowboard Resort",
      category: "skiing",
      approxMiles: 12,
      description: "Family-friendly slopes a short drive north.",
    },
    {
      name: "Great Lakes Crossing Outlets",
      category: "shopping",
      address: "4000 Baldwin Road, Auburn Hills, MI 48326",
      description: "Michigan's largest indoor outlet mall, with shopping, dining and entertainment.",
    },
    {
      name: "Downtown Clarkston",
      category: "local",
      description: "A walkable historic downtown with local dining, shops and community events.",
    },
    {
      name: "LA Cafe & Java",
      category: "dining",
      description: "A neighboring cafe, described on the current site as next door.",
      note: "Nearby business — hours and details are set independently by that business.",
    },
    {
      name: "Sportsmen's Great Northern Grill",
      category: "dining",
      description: "A grill and tavern described on the current site as across the street.",
      note: "Nearby business — hours and details are set independently by that business.",
    },
  ] as Attraction[],

  gallery: {
    eyebrow: "Photo gallery",
    title: "See the Property",
    heroAlt: "Beach and lake at Olde Mill Inn of Clarkston",
    categories: {
      exterior: { label: "Exterior & Grounds", alt: "Exterior and grounds at Olde Mill Inn of Clarkston" },
      rooms: { label: "Rooms & Interiors", alt: "Guest room interior at Olde Mill Inn of Clarkston" },
      lakefront: {
        label: "Lakefront & Deck",
        alt: "Lakefront setting and covered deck at Olde Mill Inn of Clarkston",
      },
    },
    ui: {
      all: "All",
      filterAria: "Filter photos",
      viewLarger: "view larger",
      viewerAria: "Photo viewer",
      close: "Close photo viewer",
      prev: "Previous photo",
      next: "Next photo",
    },
  },

  plan: {
    eyebrow: "Plan your stay",
    title: "FAQs & Policies",
    subtitle: "The practical details for a comfortable visit. For anything not covered here, contact the inn directly.",
    quickFacts: [
      { icon: "login", label: "Check-in", value: `From ${property.checkIn}` },
      { icon: "logout", label: "Check-out", value: `By ${property.checkOut}` },
      { icon: "pets", label: "Pets", value: "Not permitted" },
      { icon: "local_parking", label: "Parking", value: "Available on-site" },
    ],
    faqTitle: "Frequently asked questions",
  },

  faqs: [
    {
      q: "What time is check-in and check-out?",
      a: `Check-in begins at ${property.checkIn}, and check-out is by ${property.checkOut}. Guests planning a late arrival should contact the inn directly.`,
    },
    { q: "Are pets permitted?", a: "Pets are not permitted at the property." },
    {
      q: "Are kayaks and pedal boats included?",
      a: "Registered guests may use the property's kayaks and pedal boats at no additional charge, subject to season, weather, safety conditions and availability.",
    },
    {
      q: "How far is the inn from Pine Knob?",
      a: "The inn is approximately five miles from Pine Knob Music Theatre and Pine Knob Ski and Snowboard Resort.",
    },
    { q: "Do rooms have microwaves and refrigerators?", a: "Rooms include a microwave and small refrigerator." },
    {
      q: "Are kitchenettes available?",
      a: "Selected rooms offer kitchenettes. Guests should contact the inn or check room information for current details.",
    },
    { q: "Are coffee pots and cookware available?", a: "Coffee pots, flatware and cookware are available upon request." },
    { q: "Is Wi-Fi available?", a: "Internet or Wi-Fi is available." },
    { q: "Is parking available?", a: "Parking is available at the property." },
    { q: "Can guests arrive late?", a: "Guests planning a late arrival should contact the inn directly for instructions." },
    {
      q: "What is the cancellation policy?",
      a: "Cancellation terms may vary by reservation and selected rate. Guests should review the terms presented during booking or contact the inn directly.",
    },
    {
      q: "How can guests reserve a room?",
      a: `Guests can check availability through the secure Cloudbeds booking system or call the inn at ${property.phone.display}.`,
    },
  ],

  contact: {
    eyebrow: "We're here to help",
    title: "Contact Olde Mill Inn of Clarkston",
    reachUs: "Reach us",
    directionsTitle: "Directions",
    directionsText:
      "We're on Dixie Highway in Clarkston, along Van Norman Lake. Tap “Get Directions” for turn-by-turn navigation.",
    formTitle: "Send a message",
  },

  // Client component: strings only.
  form: {
    intro:
      "Submitting this form does not confirm a reservation. For current availability, use the booking system or call the inn.",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    arrival: "Arrival (optional)",
    departure: "Departure (optional)",
    message: "Message",
    consent: "By submitting, you agree we may use the details above to respond to your inquiry. We don't sell your information.",
    errorPrefix: "Sorry — we couldn't send your message right now. Please call",
    errorOr: "or text",
    sending: "Sending…",
    submit: "Send message",
    successTitle: "Thanks — your message is on its way.",
    successPrefix: "We'll follow up as soon as we can. For anything time-sensitive, please call",
  },

  privacy: {
    title: "Privacy",
    note: "This statement describes how this website handles personal information. It is provided for transparency and should be reviewed and approved by the property before launch.",
    blocks: [
      {
        h: "Information we collect",
        ps: [
          "If you use our contact form, we collect the details you provide — such as your name, email address, optional phone number, optional travel dates and your message — so we can respond to your inquiry.",
          "Like most websites, we may collect limited technical and usage information (such as pages viewed) to understand how the site is used and to improve it. This is only active if an analytics service has been configured.",
        ],
      },
      {
        h: "How we use information",
        ps: [
          "We use the information you submit to reply to your questions and to help arrange your stay. We do not sell your personal information.",
        ],
      },
      {
        h: "Third-party services",
        ps: [
          "Reservations are handled by our booking provider (Cloudbeds) on their secure system; any details you enter there are governed by their terms and privacy practices. Map and directions links open Google Maps.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactPrefix: "Questions about this statement? Contact us at",
    or: "or",
  },

  accessibility: {
    title: "Accessibility",
    intro:
      "We want this website to be usable by as many people as possible and aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.",
    doneTitle: "What we've done",
    done: [
      "Semantic structure with clear headings and landmarks",
      "Keyboard navigation with visible focus styles",
      "Descriptive alternative text for images",
      "Color contrast checked against the design palette",
      "Support for reduced-motion preferences",
      "Labels and clear error messages on the contact form",
      "The full site is available in English and Spanish",
    ],
    propertyTitle: "Booking & the property",
    propertyText:
      "Reservations are completed on our booking provider's system, which is maintained separately. For questions about accessibility features of the rooms or property, please contact us directly so we can help.",
    tellTitle: "Let us know",
    tellPrefix: "If you encounter any difficulty using this site, contact us at",
    or: "or",
    tellSuffix: "and we'll do our best to help and to fix the issue.",
  },

  notFound: {
    title: "Page Not Found",
    text: "Sorry, we couldn't find that page. Try one of the links below.",
    home: "Back Home",
    rooms: "View Rooms",
    contact: "Contact us",
  },
};

export type Attraction = {
  name: string;
  category: "concerts" | "skiing" | "shopping" | "dining" | "local";
  description: string;
  approxMiles?: number;
  address?: string;
  note?: string;
};

export type Dict = typeof en;
