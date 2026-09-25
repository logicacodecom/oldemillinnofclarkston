import { property, northLocation } from "../property";
import type { Dict } from "./en";

// Spanish copy (neutral Latin American Spanish, formal "usted"). Same shape as en.ts.
// Room names stay in English: they match the Cloudbeds booking system.
export const es: Dict = {
  htmlLang: "es",
  ogLocale: "es_US",
  // Toggle shown on Spanish pages points to English.
  toggle: { label: "English", aria: "View this site in English", hrefLang: "en" },
  skip: "Saltar al contenido",

  meta: {
    defaultTitle: "Hotel frente al lago en Clarkston, MI | Olde Mill Inn cerca de Pine Knob",
    titleTemplate: "%s | Olde Mill Inn of Clarkston",
    description:
      "Hospédese junto al lago Van Norman en Olde Mill Inn of Clarkston, a unas cinco millas de Pine Knob, con habitaciones cómodas, kayaks, botes de pedales y reservas directas.",
    ogDescription:
      "Hospédese junto al lago Van Norman en Olde Mill Inn of Clarkston, a unas cinco millas de Pine Knob.",
    twitterDescription: "Una estadía relajada y accesible frente al lago, cerca de Pine Knob.",
    rooms: {
      title: "Habitaciones frente al lago y sin vista al lago",
      description:
        "Conozca las habitaciones frente al lago y sin vista al lago de Olde Mill Inn of Clarkston y consulte la disponibilidad actual con reservas directas y seguras.",
    },
    lakefront: {
      title: "Estadía frente al lago en Clarkston, MI",
      description:
        "Relájese junto al lago Van Norman con un patio techado frente al agua, áreas al aire libre y kayaks y botes de pedales sin costo para huéspedes registrados.",
    },
    pineKnob: {
      title: "Hotel cerca de Pine Knob Music Theatre",
      description:
        "Hospédese a unas cinco millas de Pine Knob Music Theatre en un hotel independiente frente al lago en Clarkston, Michigan.",
    },
    thingsToDo: {
      title: "Qué hacer cerca de Clarkston, MI",
      description:
        "Conciertos en Pine Knob, esquí cercano, compras en Great Lakes Crossing y restaurantes locales en Clarkston, todo a poca distancia de Olde Mill Inn.",
    },
    gallery: {
      title: "Galería de fotos",
      description:
        "Vea fotos actuales de las habitaciones, el entorno frente al lago, el patio techado y las áreas al aire libre de Olde Mill Inn of Clarkston.",
    },
    plan: {
      title: "Planifique su estadía: preguntas frecuentes y políticas",
      description:
        "Horarios de llegada y salida, política de mascotas, kayaks y botes de pedales, Wi-Fi, estacionamiento e información de reservas de Olde Mill Inn of Clarkston.",
    },
    contact: {
      title: "Contacto y cómo llegar",
      description:
        "Comuníquese con Olde Mill Inn of Clarkston, 5835 Dixie Hwy, para reservas, indicaciones e información de hospedaje.",
    },
    privacy: {
      title: "Privacidad",
      description: "Cómo Olde Mill Inn of Clarkston maneja la información recopilada a través de este sitio web.",
    },
    accessibility: {
      title: "Accesibilidad",
      description: "El compromiso de Olde Mill Inn of Clarkston con un sitio web accesible.",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La página que busca no existe.",
    },
  },

  nav: {
    main: [
      { label: "Habitaciones", href: "/rooms" },
      { label: "Frente al lago", href: "/lakefront-experience" },
      { label: "Pine Knob", href: "/pine-knob" },
      { label: "Qué hacer", href: "/things-to-do" },
      { label: "Galería", href: "/gallery" },
      { label: "Planifique su estadía", href: "/plan-your-stay" },
      { label: "Contacto", href: "/contact" },
    ],
    legal: [
      { label: "Privacidad", href: "/privacy" },
      { label: "Accesibilidad", href: "/accessibility" },
    ],
    primaryAria: "Principal",
    mobileAria: "Móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    homeAria: `${property.name} — inicio`,
  },

  common: {
    bookNow: "Reservar",
    viewRooms: "Ver habitaciones",
    callNumber: `Llame al ${property.phone.display}`,
    textNumber: `Envíe un mensaje al ${property.text.display}`,
    checkAvailability: "Ver disponibilidad",
    callInn: "Llamar al hotel",
    getDirections: "Cómo llegar",
    directions: "Cómo llegar",
    viewDetails: "Ver detalles",
    lakefront: "Frente al lago",
    offWater: "Sin vista al lago",
    miles: (n: number) => `≈${n} mi`,
  },

  mobileBar: { aria: "Acciones rápidas", call: "Llamar", directions: "Ubicación", book: "Reservar" },

  footer: {
    tagline: `Hospedaje independiente y familiar frente al ${property.lake}, en Clarkston, Michigan.`,
    explore: "Explorar",
    contact: "Contacto",
    plan: "Planifique",
    credit: "Sitio web desarrollado por nuestro socio tecnológico,",
  },

  social: { aria: (network: string) => `The Olde Mill Inn of Clarkston en ${network}` },

  amenities: {
    "Recently renovated": "Recientemente renovada",
    "Rustic log furniture": "Muebles rústicos de troncos",
    "Serta Perfect Sleeper mattress": "Colchón Serta Perfect Sleeper",
    "Stand-up shower": "Ducha",
    Microwave: "Microondas",
    "Small refrigerator": "Refrigerador pequeño",
    "Cable TV": "Televisión por cable",
    "Free Wi-Fi": "Wi-Fi gratis",
    "Air conditioning": "Aire acondicionado",
    "Coffee maker": "Cafetera",
    Hairdryer: "Secadora de cabello",
    Kitchenette: "Cocineta",
    "Wall-mounted electric fireplace": "Chimenea eléctrica de pared",
    "Smart TV with Roku": "Smart TV con Roku",
    "Dual-burner stovetop": "Estufa de dos quemadores",
    "Full kitchen": "Cocina completa",
    Stove: "Estufa",
    "In-unit washer & dryer": "Lavadora y secadora en la habitación",
    "Large-screen Smart TV with Roku": "Smart TV de pantalla grande con Roku",
  },
  beds: {
    "Full bed": "Cama matrimonial",
    "Queen bed": "Cama queen",
    "Two full beds": "Dos camas matrimoniales",
  },

  rooms: {
    "standard-full": {
      shortDescription:
        "Una habitación sin vista al lago con cama matrimonial y cálidos muebles rústicos de troncos: una base cómoda y práctica para su estadía en Clarkston, con acceso al lago y a los kayaks.",
      metaDescription:
        "Habitación sin vista al lago en Clarkston, MI, con cama matrimonial y muebles rústicos de troncos. Incluye acceso al lago y kayaks sin costo.",
    },
    "deluxe-queen": {
      shortDescription:
        "Una habitación sin vista al lago con cama queen y muebles rústicos de troncos, con chimenea eléctrica de pared y cocineta. Incluye acceso al lago y kayaks.",
      metaDescription:
        "Habitación con cama queen sin vista al lago en Clarkston, MI, con cocineta, chimenea de pared y muebles rústicos de troncos. Incluye acceso al lago.",
    },
    "premium-queen": {
      shortDescription:
        "Una habitación frente al lago con cama queen y muebles rústicos de troncos, justo junto al agua. Incluye cocineta, estufa de dos quemadores y chimenea eléctrica de pared.",
      metaDescription:
        "Habitación con cama queen frente al lago en Clarkston, MI, con cocineta, estufa de dos quemadores y chimenea, a orillas del lago Van Norman.",
    },
    "premium-two-full": {
      shortDescription:
        "Una habitación frente al lago con dos camas matrimoniales y muebles rústicos de troncos, con espacio de sobra junto al agua. Incluye cocineta, estufa de dos quemadores y chimenea eléctrica de pared.",
      metaDescription:
        "Habitación frente al lago en Clarkston, MI, con dos camas matrimoniales para hasta cuatro personas, cocineta, estufa y chimenea.",
    },
    "honeymoon-family-suite": {
      shortDescription:
        "Nuestra suite frente al lago más amplia, llena de muebles rústicos de troncos. Cuenta con cocina completa, lavadora y secadora en la habitación y un televisor de pantalla grande sobre la chimenea.",
      metaDescription:
        "Suite frente al lago en Clarkston, MI, con cocina completa, lavadora y secadora en la habitación y chimenea, para hasta cuatro huéspedes.",
    },
  },

  roomFacts: {
    sleeps: (n: number) => `Hasta ${n} personas`,
    sleepsUpTo: (n: number) => `Hasta ${n} personas`,
    photoAlt: (name: string) => `${name} en Olde Mill Inn of Clarkston`,
  },

  home: {
    eyebrow: "Hospedaje frente al lago en Clarkston, Michigan",
    heroTitle: "Hospédese en el lago. A minutos de Pine Knob.",
    heroText:
      "Disfrute de una estadía relajada en Clarkston con habitaciones cómodas, kayaks y botes de pedales sin costo, espacios frente al agua y fácil acceso a conciertos, esquí, restaurantes y atracciones locales.",
    heroAlt: "Vista aérea de Olde Mill Inn of Clarkston a orillas del lago Van Norman",
    availabilityTitle: "Consulte disponibilidad y tarifas",
    glanceAria: "De un vistazo",
    trust: [
      { icon: "water", label: "Frente al lago" },
      { icon: "music_note", label: "≈5 millas de Pine Knob" },
      { icon: "kayaking", label: "Kayaks sin costo" },
      { icon: "directions_boat", label: "Botes de pedales sin costo" },
      { icon: "local_parking", label: "Estacionamiento disponible" },
      { icon: "kitchen", label: "Cocinetas en algunas habitaciones" },
    ],
    introTitle: "Una estadía diferente en Clarkston",
    introText: `Olde Mill Inn of Clarkston combina el carácter y el buen precio de un hotel independiente con un entorno que las cadenas hoteleras cercanas no pueden ofrecer. Hospédese junto al ${property.lake}, relájese cerca del patio techado frente al agua y disfrute de fácil acceso a Pine Knob, áreas de esquí cercanas, restaurantes y tiendas locales.`,
    lakefrontRooms: "Habitaciones frente al lago",
    viewAllRooms: "Ver todas las habitaciones",
    offWaterRooms: "Habitaciones sin vista al lago",
    waterEyebrow: "Vida junto al agua",
    waterTitle: "Más que una habitación",
    waterText:
      "Salga y disfrute del entorno frente al lago que hace único a Olde Mill Inn. Los huéspedes registrados pueden relajarse junto al agua, usar los kayaks y botes de pedales sin costo o pasar el tiempo cerca del patio techado frente al lago y las áreas al aire libre.",
    waterAlt: "Terraza techada junto al lago con sillas de troncos frente al agua en Olde Mill Inn of Clarkston",
    waterItems: [
      {
        icon: "deck",
        title: "Patio techado frente al lago",
        text: "Un espacio con sombra para disfrutar del café por la mañana o de una tarde junto al agua.",
      },
      {
        icon: "kayaking",
        title: "Kayaks y botes de pedales",
        text: "Sin costo para huéspedes registrados, sujeto a la temporada, el clima, las condiciones de seguridad y la disponibilidad.",
      },
    ],
    exploreLakefront: "Conozca el lago",
    pineTitle: "¿Va a Pine Knob? Hospédese a unas cinco millas.",
    pineText:
      "Haga de Olde Mill Inn su base en Clarkston para conciertos, esquí y eventos de temporada. Al terminar, regrese a un entorno tranquilo frente al lago en lugar de un hotel convencional de carretera.",
    pineCta: "Planifique su estadía para Pine Knob",
    milesToPineKnob: "millas a Pine Knob",
    pineNote: "Pine Knob Music Theatre y Pine Knob Ski and Snowboard Resort están a unas cinco millas.",
    locationsTitle: "Dos ubicaciones en Clarkston",
    youAreHere: "Usted está aquí",
    southName: "Clarkston South",
    southText: "Habitaciones junto al lago Van Norman con reservas en línea.",
    petFriendly: "Acepta mascotas",
    northText: "Estudios que aceptan mascotas con reservas en línea. Estadías prolongadas por teléfono.",
    visitNorth: `Visitar ${northLocation.short}`,
    northUrl: `${northLocation.url}es`,
    exploreTitle: "Explore la zona",
    seeThingsToDo: "Ver qué hacer",
    independentTitle: "Independiente, local y acogedor",
    independentText:
      "Olde Mill Inn es una propiedad familiar que ofrece una estadía relajada para visitas de una noche, escapadas de fin de semana y estadías más largas. Las habitaciones combinan cálidos detalles rústicos con comodidades prácticas para una visita confortable.",
    finalTitle: "Su estadía frente al lago en Clarkston comienza aquí",
  },

  roomsPage: {
    eyebrow: "Alojamiento",
    title: "Encuentre su habitación",
    subtitle:
      "Elija entre prácticas habitaciones sin vista al lago y distintivas habitaciones frente al lago. Las características varían, así que revise los detalles y consulte la disponibilidad actual en el sistema de reservas seguro.",
    heroAlt: "El edificio de habitaciones frente al lago de Olde Mill Inn of Clarkston visto desde el agua",
    availabilityTitle: "Consulte disponibilidad y tarifas",
    note: "Las características y la disponibilidad de las habitaciones se confirman al momento de reservar.",
  },

  filters: {
    aria: "Filtrar habitaciones",
    all: "Todas",
    offWater: "Sin vista al lago",
    lakefront: "Frente al lago",
    full: "Cama matrimonial",
    queen: "Cama queen",
    twoFull: "Dos camas matrimoniales",
    noMatch: "Ninguna habitación coincide con ese filtro.",
  },

  roomPage: {
    featuresTitle: "Características de la habitación",
    policiesPrefix: "Consulte nuestras",
    policiesLink: "políticas y preguntas frecuentes",
    policiesSuffix: "sobre la llegada, mascotas y más.",
    readyTitle: "¿Listo para hospedarse?",
    readyText: "Consulte disponibilidad y tarifas en tiempo real en nuestro sistema de reservas seguro, o llame al hotel.",
    relatedTitle: "También le puede interesar",
  },

  availability: {
    checkin: "Llegada",
    checkout: "Salida",
    guests: "Huéspedes",
    guest1: "huésped",
    guestN: "huéspedes",
    search: "Ver disponibilidad",
    searching: "Buscando…",
    bookSecure: "Reserve en nuestro sistema seguro",
    notConfigured: "La disponibilidad en tiempo real no está disponible en este momento.",
    notConfiguredLink: "Consulte la disponibilidad en nuestro sistema de reservas seguro",
    night1: "{n} noche · tarifas por noche",
    nightN: "{n} noches · tarifas por noche",
    noRooms: "No hay habitaciones disponibles para esas fechas. Pruebe otras fechas o",
    noRoomsLink: "consulte nuestro sistema de reservas",
    onlyLeft: " · solo quedan {n}",
    perNight: "/noche",
    total: "en total",
    book: "Reservar",
    disclaimer: "Tarifas en tiempo real de nuestro sistema de reservas. El precio final y los impuestos se confirman al pagar.",
    lakefront: "Frente al lago",
    offWater: "Sin vista al lago",
    errors: {
      order: "Elija una fecha de salida posterior a la de llegada.",
      dates: "Elija fechas válidas.",
      range: "Elija una estadía de 1 a 30 noches.",
      past: "La fecha de llegada no puede ser en el pasado.",
      unavailable: "La disponibilidad no está disponible temporalmente.",
      generic: "Algo salió mal. Inténtelo de nuevo.",
      network: "Error de red. Inténtelo de nuevo o reserve en nuestro sistema seguro.",
    },
  },

  lakefront: {
    eyebrow: "Vida junto al agua",
    title: "Relájese junto al lago Van Norman",
    heroAlt: "Playa de arena con un bote de pedales y kayaks a la orilla del agua en Olde Mill Inn of Clarkston",
    intro: `El entorno frente al lago es lo que hace diferente a Olde Mill Inn. Los huéspedes pueden disfrutar de espacios al aire libre junto al ${property.lake}, relajarse cerca del patio techado y usar kayaks y botes de pedales sin costo cuando las condiciones de la temporada lo permiten.`,
    highlights: [
      { icon: "water", title: "Frente al lago", text: `Habitaciones y espacios al aire libre a orillas del ${property.lake}.` },
      { icon: "deck", title: "Patio techado", text: "Un patio con sombra frente al agua para el café de la mañana o una tarde junto al lago." },
      { icon: "beach_access", title: "Playa y orilla", text: "Un área de arena con acceso al lago para disfrutar de la orilla." },
      { icon: "kayaking", title: "Kayaks", text: "Sin costo para huéspedes registrados." },
      { icon: "directions_boat", title: "Botes de pedales", text: "Sin costo para huéspedes registrados." },
      { icon: "photo_camera", title: "Paisajes de temporada", text: "Aguas abiertas en verano y vistas tranquilas y escénicas en cada temporada." },
    ],
    deckAlt: "Terraza techada junto al lago con sillas de troncos en Olde Mill Inn of Clarkston",
    buildingAlt: "Edificio de habitaciones frente al lago sobre el agua en Olde Mill Inn of Clarkston",
    qualifier:
      "Las comodidades al aire libre y las actividades acuáticas están sujetas a la temporada, el clima, las condiciones de seguridad y la disponibilidad. No hay salvavidas y la natación no está supervisada.",
  },

  pineKnob: {
    eyebrow: "Conciertos, esquí y eventos de temporada",
    title: "Una estadía frente al lago cerca de Pine Knob",
    heroAlt: "Vista aérea de Olde Mill Inn of Clarkston en el lago Van Norman",
    intro:
      "¿Va a un concierto o planea un día de esquí en Pine Knob? Olde Mill Inn of Clarkston ofrece un lugar práctico para hospedarse a unas cinco millas. Después, regrese a un entorno relajado frente al lago, con comodidades prácticas en la habitación y restaurantes cercanos.",
    address: "Pine Knob Music Theatre está en 33 Bob Seger Drive, Clarkston, MI 48348. Las distancias son aproximadas.",
    milesToPineKnob: "millas a Pine Knob",
    venuesTitle: "Pine Knob y pistas cercanas",
    roomsTitle: "Habitaciones frente al lago para su estadía",
    diningTitle: "Restaurantes cercanos",
    faqTitle: "Información útil",
    faqs: [
      {
        q: "¿A qué distancia está el hotel de Pine Knob?",
        a: "El hotel está a unas cinco millas de Pine Knob Music Theatre y de Pine Knob Ski and Snowboard Resort.",
      },
      {
        q: "¿Puedo llegar después de un concierto?",
        a: "Si planea llegar tarde, comuníquese directamente con el hotel para recibir instrucciones.",
      },
    ],
  },

  thingsToDo: {
    eyebrow: "Explore la zona",
    title: "Qué hacer",
    subtitle:
      "De conciertos y esquí a compras y restaurantes locales, lo mejor de Clarkston está a poca distancia del hotel. Las distancias son aproximadas.",
    heroAlt: "Vista desde la calle de Olde Mill Inn of Clarkston",
    sections: {
      concerts: "Conciertos y entretenimiento",
      skiing: "Esquí y actividades de invierno",
      shopping: "Compras",
      local: "Restaurantes locales y Clarkston",
    },
  },

  attractions: [
    {
      name: "Pine Knob Music Theatre",
      category: "concerts",
      approxMiles: 5,
      address: "33 Bob Seger Drive, Clarkston, MI 48348",
      description:
        "El emblemático anfiteatro al aire libre de Michigan. Haga del hotel su base relajada frente al lago para las noches de concierto.",
    },
    {
      name: "Pine Knob Ski and Snowboard Resort",
      category: "skiing",
      approxMiles: 5,
      description: "Esquí, snowboard y tubing a minutos del hotel.",
    },
    {
      name: "Alpine Valley Ski Resort",
      category: "skiing",
      approxMiles: 8,
      description: "Otra área de esquí cercana con pistas para distintos niveles.",
    },
    {
      name: "Mt. Holly Ski and Snowboard Resort",
      category: "skiing",
      approxMiles: 12,
      description: "Pistas familiares a poca distancia hacia el norte.",
    },
    {
      name: "Great Lakes Crossing Outlets",
      category: "shopping",
      address: "4000 Baldwin Road, Auburn Hills, MI 48326",
      description: "El centro comercial outlet cubierto más grande de Michigan, con tiendas, restaurantes y entretenimiento.",
    },
    {
      name: "Downtown Clarkston",
      category: "local",
      description: "Un centro histórico para recorrer a pie, con restaurantes, tiendas y eventos comunitarios.",
    },
    {
      name: "LA Cafe & Java",
      category: "dining",
      description: "Una cafetería vecina, descrita en el sitio actual como la de al lado.",
      note: "Negocio cercano: sus horarios y detalles los define ese negocio de forma independiente.",
    },
    {
      name: "Sportsmen's Great Northern Grill",
      category: "dining",
      description: "Un restaurante y bar descrito en el sitio actual como al otro lado de la calle.",
      note: "Negocio cercano: sus horarios y detalles los define ese negocio de forma independiente.",
    },
  ],

  gallery: {
    eyebrow: "Galería de fotos",
    title: "Conozca la propiedad",
    heroAlt: "Playa y lago en Olde Mill Inn of Clarkston",
    categories: {
      exterior: { label: "Exterior y terrenos", alt: "Exterior y terrenos de Olde Mill Inn of Clarkston" },
      rooms: { label: "Habitaciones e interiores", alt: "Interior de una habitación en Olde Mill Inn of Clarkston" },
      lakefront: {
        label: "Lago y terraza",
        alt: "Entorno frente al lago y terraza techada en Olde Mill Inn of Clarkston",
      },
    },
    ui: {
      all: "Todas",
      filterAria: "Filtrar fotos",
      viewLarger: "ver en grande",
      viewerAria: "Visor de fotos",
      close: "Cerrar visor de fotos",
      prev: "Foto anterior",
      next: "Foto siguiente",
    },
  },

  plan: {
    eyebrow: "Planifique su estadía",
    title: "Preguntas frecuentes y políticas",
    subtitle: "Los detalles prácticos para una visita cómoda. Para cualquier otra cosa, comuníquese directamente con el hotel.",
    quickFacts: [
      { icon: "login", label: "Llegada", value: `Desde las ${property.checkIn}` },
      { icon: "logout", label: "Salida", value: `Antes de las ${property.checkOut}` },
      { icon: "pets", label: "Mascotas", value: "No se permiten" },
      { icon: "local_parking", label: "Estacionamiento", value: "Disponible en el lugar" },
    ],
    faqTitle: "Preguntas frecuentes",
  },

  faqs: [
    {
      q: "¿A qué hora son la llegada y la salida?",
      a: `La llegada comienza a las ${property.checkIn} y la salida es antes de las ${property.checkOut}. Si planea llegar tarde, comuníquese directamente con el hotel.`,
    },
    { q: "¿Se permiten mascotas?", a: "No se permiten mascotas en la propiedad." },
    {
      q: "¿Los kayaks y botes de pedales están incluidos?",
      a: "Los huéspedes registrados pueden usar los kayaks y botes de pedales de la propiedad sin costo adicional, sujeto a la temporada, el clima, las condiciones de seguridad y la disponibilidad.",
    },
    {
      q: "¿A qué distancia está el hotel de Pine Knob?",
      a: "El hotel está a unas cinco millas de Pine Knob Music Theatre y de Pine Knob Ski and Snowboard Resort.",
    },
    {
      q: "¿Las habitaciones tienen microondas y refrigerador?",
      a: "Las habitaciones incluyen microondas y un refrigerador pequeño.",
    },
    {
      q: "¿Hay cocinetas disponibles?",
      a: "Algunas habitaciones tienen cocineta. Comuníquese con el hotel o consulte la información de cada habitación para conocer los detalles actuales.",
    },
    {
      q: "¿Hay cafeteras y utensilios de cocina?",
      a: "Hay cafeteras, cubiertos y utensilios de cocina disponibles a pedido.",
    },
    { q: "¿Hay Wi-Fi?", a: "Hay internet o Wi-Fi disponible." },
    { q: "¿Hay estacionamiento?", a: "Hay estacionamiento disponible en la propiedad." },
    {
      q: "¿Puedo llegar tarde?",
      a: "Si planea llegar tarde, comuníquese directamente con el hotel para recibir instrucciones.",
    },
    {
      q: "¿Cuál es la política de cancelación?",
      a: "Las condiciones de cancelación pueden variar según la reservación y la tarifa elegida. Revise las condiciones que se muestran al reservar o comuníquese directamente con el hotel.",
    },
    {
      q: "¿Cómo puedo reservar una habitación?",
      a: `Puede consultar la disponibilidad en el sistema de reservas seguro de Cloudbeds o llamar al hotel al ${property.phone.display}.`,
    },
  ],

  contact: {
    eyebrow: "Estamos para ayudarle",
    title: "Contacte a Olde Mill Inn of Clarkston",
    reachUs: "Comuníquese con nosotros",
    directionsTitle: "Cómo llegar",
    directionsText:
      "Estamos en Dixie Highway, en Clarkston, a orillas del lago Van Norman. Toque “Cómo llegar” para obtener indicaciones paso a paso.",
    formTitle: "Enviar un mensaje",
  },

  form: {
    intro:
      "Enviar este formulario no confirma una reservación. Para conocer la disponibilidad actual, use el sistema de reservas o llame al hotel.",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    arrival: "Llegada (opcional)",
    departure: "Salida (opcional)",
    message: "Mensaje",
    consent: "Al enviar, acepta que usemos los datos anteriores para responder a su consulta. No vendemos su información.",
    errorPrefix: "Lo sentimos, no pudimos enviar su mensaje en este momento. Por favor llame al",
    errorOr: "o envíe un mensaje de texto al",
    sending: "Enviando…",
    submit: "Enviar mensaje",
    successTitle: "Gracias, su mensaje fue enviado.",
    successPrefix: "Le responderemos lo antes posible. Para algo urgente, llame al",
  },

  privacy: {
    title: "Privacidad",
    note: "Esta declaración describe cómo este sitio web maneja la información personal. Se ofrece por transparencia y debe ser revisada y aprobada por la propiedad antes de su publicación.",
    blocks: [
      {
        h: "Información que recopilamos",
        ps: [
          "Si usa nuestro formulario de contacto, recopilamos los datos que nos proporciona, como su nombre, correo electrónico, teléfono (opcional), fechas de viaje (opcionales) y su mensaje, para poder responder a su consulta.",
          "Como la mayoría de los sitios web, podemos recopilar información técnica y de uso limitada (como las páginas visitadas) para entender cómo se usa el sitio y mejorarlo. Esto solo está activo si se ha configurado un servicio de analítica.",
        ],
      },
      {
        h: "Cómo usamos la información",
        ps: [
          "Usamos la información que nos envía para responder a sus preguntas y ayudarle a organizar su estadía. No vendemos su información personal.",
        ],
      },
      {
        h: "Servicios de terceros",
        ps: [
          "Las reservaciones se gestionan en el sistema seguro de nuestro proveedor de reservas (Cloudbeds); los datos que ingrese allí se rigen por sus términos y prácticas de privacidad. Los enlaces de mapas e indicaciones abren Google Maps.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactPrefix: "¿Preguntas sobre esta declaración? Escríbanos a",
    or: "o llame al",
  },

  accessibility: {
    title: "Accesibilidad",
    intro:
      "Queremos que este sitio web pueda ser usado por la mayor cantidad de personas posible y buscamos cumplir con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, nivel AA.",
    doneTitle: "Lo que hemos hecho",
    done: [
      "Estructura semántica con encabezados y regiones claras",
      "Navegación con teclado y estilos de foco visibles",
      "Texto alternativo descriptivo para las imágenes",
      "Contraste de color verificado con la paleta del diseño",
      "Compatibilidad con la preferencia de movimiento reducido",
      "Etiquetas y mensajes de error claros en el formulario de contacto",
      "Todo el sitio está disponible en inglés y en español",
    ],
    propertyTitle: "Reservas y la propiedad",
    propertyText:
      "Las reservaciones se completan en el sistema de nuestro proveedor de reservas, que se administra por separado. Si tiene preguntas sobre las características de accesibilidad de las habitaciones o de la propiedad, comuníquese directamente con nosotros para ayudarle.",
    tellTitle: "Háganos saber",
    tellPrefix: "Si tiene alguna dificultad para usar este sitio, escríbanos a",
    or: "o llame al",
    tellSuffix: "y haremos lo posible por ayudarle y corregir el problema.",
  },

  notFound: {
    title: "Página no encontrada",
    text: "Lo sentimos, no encontramos esa página. Pruebe uno de los enlaces a continuación.",
    home: "Volver al inicio",
    rooms: "Ver habitaciones",
    contact: "Contáctenos",
  },
};
