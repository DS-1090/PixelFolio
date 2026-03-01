export const SECTION_HEADINGS = {
  projects: "Builds and Experiments",
  about: "Me, Myself and I",
  blogs: "My Poetry Nook",
  coding: "Tech Grid",
  hobbies: "Hobbies and Passions",
  food: "Favorite Flavours",
};

export const SECTION_QUICK_ACTIONS = [
  { id: "resume", label: "Resume", hint: "Monitor screen" },
  { id: "projects", label: "Projects", hint: "Mouse" },
  { id: "about", label: "About", hint: "Computer body" },
  { id: "blogs", label: "Blog", hint: "Keyboard" },
  { id: "coding", label: "Tech Stack", hint: "Cable" },
  { id: "hobbies", label: "Hobbies", hint: "Painting" },
  { id: "food", label: "Food", hint: "Coffee mug" },
];

export const PROJECTS = [
  {
    name: "EzyAid",
    stack: ["Flutter", "Django", "PySpark", "SQL"],
    href: "https://github.com/DS-1090/EzyAid",
    blurb:
      "Event-driven welfare discovery platform with real-time scheme updates and accessibility-first design",
    detail:
      "Designed and built an end-to-end event-driven architecture to surface government welfare schemes with real-time updates Integrated CDC using Debezium, streamed changes through Kafka, cached updates with Redis, and exposed structured APIs via Django to a cross-platform Flutter app",
    highlights: [
      "CDC-based real-time data pipeline (MySQL → Debezium → Kafka -> Redis → Django)",
      "Spark-powered ETL for scraped scheme processing",
      "Accessibility features: TTS, multilingual UI, customizable fonts",
      "Geo-location integration for nearby service centers",
      "Containerized deployment with Docker",
    ],
  },
  {
    name: "Indian Pattern Classifier",
    stack: ["Python", "TensorFlow", "Roboflow"],
    href: "https://githubcom/DS-1090/Indian_Pattern_Classifier",
    blurb: "Deep learning pipeline for Indian fabric pattern classification",
    detail:
      "Built a custom CNN to classify Banarasi, Pichwai, and Ikat patterns, achieving 0.82 test accuracy. Benchmarked transfer learning models (ResNet, EfficientNet) and evaluated performance across architectures using structured training and validation workflows.",
    highlights: [
      "Custom CNN architecture design and tuning",
      "Transfer learning with ResNet and EfficientNet",
      "Roboflow-based dataset preprocessing and augmentation",
      "Comparative model evaluation using accuracy metrics",
    ],
  },
  {
    name: "Blaze Buddy",
    stack: [
      "Flutter",
      "Firebase Realtime Database",
      "Google Maps API",
      "Gemini API",
      "IoT Sensors",
    ],
    href: "https://githubcom/DS-1090/mini_project",
    blurb: "IoT-enabled fire alert system with real-time cloud notifications",
    detail:
      "Designed an end-to-end emergency alert system that streams IoT fire events to a Flutter mobile app via Firebase. Integrated Google Maps for rapid incident navigation, Gemini AI for chatbot assistance, and Firestore for secure user and emergency contact persistence.",
    highlights: [
      "Low-latency IoT → Firebase → Mobile alert pipeline",
      "Google Maps-based incident navigation",
      "Gemini-powered emergency chatbot support",
      "Secure emergency contact registration with Firestore",
    ],
  },
];

export const TECH_STACK = [
  {
    name: "Java",
    lane: "Backend",
    detail: "Scalable, OOP-driven backend systems and services",
  },
  {
    name: "Spring Boot",
    lane: "Backend",
    detail: "REST APIs, OAuth2 security, and microservice architecture",
  },
  {
    name: "Python",
    lane: "Backend + ML",
    detail: "Data-heavy workflows, and model experimentation",
  },
  {
    name: "Django",
    lane: "Backend",
    detail: "Rapid API development with clean MVC structure",
  },
  {
    name: "Flutter",
    lane: "Mobile",
    detail: "Cross-platform Android and iOS applications",
  },
  {
    name: "TensorFlow",
    lane: "Machine Learning",
    detail: "Deep learning models for vision and classification",
  },
];

export const HOBBY_SPOTS = [
  {
    name: "Poetry & Creative Writing",
    note: "Turning my 12 am muses into rhythm and hidden letters",
  },
  {
    name: "Indian Art & Craft",
    note: "Honoring the Indian in me with colors, motifs, and raagas",
  },
  {
    name: "Nature Strolls & Gardening",
    note: "Tending to my green thumb and watching winged friends in the backyard",
  },
  {
    name: "Cultural Travel",
    note: "Backpacking through old lanes and collecting their stories",
  },
  {
    name: "Badminton & Chess",
    note: "Swinging rackets or planning my next checkmate",
  },
];

export const FAV_FOODS = [
  {
    name: "Evening Chaat from My Neighbourhood",
  },
  {
    name: "Everyday Ghar ka Khana",
  },
  {
    name: "Steaming Dal with Telugu Tadka and ghee",
  },
  {
    name: "Biryani for the Yay, Meh and Sigh Days",
  },
  {
    name: "Brownie for when the rain pours down",
  },
];

export const ABOUT_TEXT = [
  "Hey there, I'm Divya Sahithi, a backend developer with roots in Java and Spring Boot, building systems that solve real problems and spark curiosity.",
  "When I'm not immersed in algorithms, you'll find me writing poetry, painting fragments of my day onto memory canvases, or making to do lists.",
];

export const ABOUT_TIMELINE = [
  {
    year: "2025-2026",
    title: "Optculture, SWE",
    note: "Primarily working on backend systems and microservices",
  },
  {
    year: "2021-2025",
    title: "UCE, Osmania University, B.E CSE",
    note: "Graduated with 9.42 GPA 🥈",
  },
  {
    year: "2014-2019",
    title: "Bharatiya Vidya Bhavans Public School",
    note: "Completed schooling with 96.4%",
  },
];

export const BLOG_TEXT =
  "The nook for my unsaid desires, longings, and musings";

export const THEMES = [
  { id: "studio", label: "Studio Warm" },
  { id: "terminal", label: "Terminal Mint" },
  { id: "paper", label: "Paper Ink" },
];
