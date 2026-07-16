import { 
  Faculty, 
  Course, 
  Notice, 
  AcademicMaterial, 
  PastQuestion, 
  SocialPost, 
  MarketListing, 
  HostelListing, 
  RoommateRequest, 
  CampusEvent, 
  CampusLocation,
  JobListing
} from "./types";

export const PRESEEDED_FACULTIES: Faculty[] = [
  {
    id: "foe",
    name: "Faculty of Engineering",
    code: "FOE",
    dean: "Prof. Dr.-Ing. Robert Kwaku-Amoah",
    description: "Training innovative engineers for Ghana's industrialization and technological expansion.",
    departments: ["Computer Engineering", "Civil Engineering", "Electrical/Electronic Engineering", "Mechanical Engineering"]
  },
  {
    id: "fas",
    name: "Faculty of Applied Sciences",
    code: "FAS",
    dean: "Prof. Abigail Osei-Bonsu",
    description: "Fostering academic excellence in science and computing to solve real-world problems.",
    departments: ["Computer Science", "Information Technology", "Statistics & Actuarial Science", "Applied Mathematics"]
  },
  {
    id: "fob",
    name: "Faculty of Business",
    code: "FOB",
    dean: "Dr. Kwabena Mensah-Agyei",
    description: "Developing ethical business leaders, financial managers, and marketing entrepreneurs.",
    departments: ["Accountancy & Finance", "Marketing & Entrepreneurship", "Procurement & Supply Chain Management"]
  },
  {
    id: "fbne",
    name: "Faculty of Built and Natural Environment",
    code: "FBNE",
    dean: "Surv. Dr. Emmanuel Owusu-Ansah",
    description: "Spearheading sustainable building, environmental science, and estate management standards.",
    departments: ["Building Technology", "Estate Management", "Environmental Science"]
  },
  {
    id: "fhs",
    name: "Faculty of Health Sciences",
    code: "FHS",
    dean: "Dr. Mary-Annette Oppong",
    description: "Delivering state-of-the-art education in clinical dispensing, laboratory diagnostics, and nursing.",
    departments: ["Medical Laboratory Technology", "Dispensing Technology", "Nursing & Midwifery"]
  },
  {
    id: "fcat",
    name: "Faculty of Creative Arts and Technology",
    code: "FCAT",
    dean: "Mrs. Gifty Boateng-Adade",
    description: "Unlocking artistic innovation, fashion excellence, culinary arts, and tourism management.",
    departments: ["Fashion Design & Textiles", "Hotel Catering & Institutional Management", "Graphic Design"]
  }
];

export const PRESEEDED_COURSES: Course[] = [
  { id: "c1", code: "CS-201", title: "Database Management Systems", creditHours: 3, lecturer: "Dr. Kofi Adu-Gyamfi", semester: "1st", level: "200" },
  { id: "c2", code: "IT-311", title: "Web Application Development", creditHours: 3, lecturer: "Mrs. Faustina Osei", semester: "1st", level: "300" },
  { id: "c3", code: "CE-102", title: "Introduction to Computer Engineering", creditHours: 2, lecturer: "Dr. Isaac Kwarteng", semester: "2nd", level: "100" },
  { id: "c4", code: "ST-402", title: "Advanced Biostatistics", creditHours: 3, lecturer: "Prof. Abigail Osei-Bonsu", semester: "1st", level: "400" },
  { id: "c5", code: "MR-304", title: "Digital Marketing & Brand Management", creditHours: 3, lecturer: "Mr. Prince Baah", semester: "1st", level: "300" },
  { id: "c6", code: "BT-205", title: "Construction Materials & Testing", creditHours: 3, lecturer: "Surv. Dr. Emmanuel Owusu-Ansah", semester: "2nd", level: "200" }
];

export const PRESEEDED_NOTICES: Notice[] = [
  {
    id: "n1",
    title: "End of Semester Examinations Registration Deadline Extension",
    sender: "Registrar",
    content: "The registration window for the upcoming 1st Semester exams has been extended to Friday, 24th July 2026. Students who have not completed their fee payment are advised to contact the finance office for payment plans. No registration, no exams.",
    priority: "High",
    date: "2026-07-12"
  },
  {
    id: "n2",
    title: "Notice on Campus Security & Entry Passes",
    sender: "Security",
    content: "To guarantee campus-wide safety, the main security directorate reminds students that wearing student ID cards is COMPULSORY inside all lecture blocks, library facilities, and exam halls. Hostlers must display vehicle security stickers.",
    priority: "Normal",
    date: "2026-07-13"
  },
  {
    id: "n3",
    title: "SRC Tech Week & Startup Fair 2026",
    sender: "SRC",
    content: "Akwaaba! The SRC Executives are thrilled to announce this year's Campus Tech Week under the theme: 'Ghanaian Youth, Global Impact'. Pitch your startups, join the robotic show, and win up to GHS 20,000 in capital!",
    priority: "High",
    date: "2026-07-14"
  },
  {
    id: "n4",
    title: "Library Extended Hours for exam preparation",
    sender: "Library",
    content: "Beginning Monday, the university library will operate under extended hours, remaining open from 8:00 AM until 11:00 PM on weekdays, and 9:00 AM until 6:00 PM on Saturdays.",
    priority: "Normal",
    date: "2026-07-10"
  }
];

export const PRESEEDED_MATERIALS: AcademicMaterial[] = [
  {
    id: "m1",
    title: "Introduction to PostgreSQL & SQL Querying Basics",
    courseCode: "CS-201",
    type: "Slide",
    author: "Dr. Kofi Adu-Gyamfi",
    url: "#",
    fileSize: "2.4 MB",
    downloads: 142,
    uploadedAt: "2026-06-15"
  },
  {
    id: "m2",
    title: "Full-Stack Web Architectures & React 19 Essentials",
    courseCode: "IT-311",
    type: "Note",
    author: "Mrs. Faustina Osei",
    url: "#",
    fileSize: "4.8 MB",
    downloads: 289,
    uploadedAt: "2026-07-02"
  },
  {
    id: "m3",
    title: "CE-102 Lecture 4: Logic Gates & Karnaugh Maps",
    courseCode: "CE-102",
    type: "Lab Manual",
    author: "Dr. Isaac Kwarteng",
    url: "#",
    fileSize: "1.2 MB",
    downloads: 95,
    uploadedAt: "2026-07-05"
  },
  {
    id: "m4",
    title: "Video Tutorial: Normalization Forms (1NF, 2NF, 3NF, BCNF)",
    courseCode: "CS-201",
    type: "Recorded Lecture",
    author: "Dr. Kofi Adu-Gyamfi",
    url: "#",
    fileSize: "45 MB",
    downloads: 320,
    uploadedAt: "2026-06-20"
  }
];

export const PRESEEDED_PAST_QUESTIONS: PastQuestion[] = [
  {
    id: "pq1",
    courseCode: "CS-201",
    courseTitle: "Database Management Systems",
    year: "2024/2025",
    semester: "1st",
    level: "200",
    uploadedBy: "Ebenezer Osei (CS Level 300)",
    downloads: 215,
    upvotes: 48,
    comments: [
      { id: "c_pq1", author: "Priscilla Ansah", text: "Chale, Section B was extremely tough last year! Study the trigger definitions.", timestamp: "2026-07-12" },
      { id: "c_pq2", author: "Kwadwo Boakye", text: "Does anyone have the solution guide for Q3?", timestamp: "2026-07-13" }
    ]
  },
  {
    id: "pq2",
    courseCode: "IT-311",
    courseTitle: "Web Application Development",
    year: "2024/2025",
    semester: "1st",
    level: "300",
    uploadedBy: "Amma Serwaa (IT Alumni)",
    downloads: 340,
    upvotes: 75,
    comments: [
      { id: "c_pq3", author: "Yaw Mensah", text: "Very standard questions on Express and routing. Recommended!", timestamp: "2026-07-11" }
    ]
  }
];

export const PRESEEDED_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "p1",
    authorName: "Samuel Gyamfi (SRC PRO)",
    authorRole: "SRC Executive",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Chale! The SRC executive team is organizing a clean-up campaign around the Foyer and Amakom main access road this Saturday. Let's show the Kumasi community that KsTU represents excellence both in mind and environment! Free custom T-shirts for the first 100 students! 🧹👕✊",
    category: "SRC News",
    upvotes: 124,
    comments: [
      { id: "sc1", author: "Abigail Donkor", text: "I am definitely showing up! Standard SRC service.", timestamp: "10 mins ago" },
      { id: "sc2", author: "Bright Ofori", text: "Chale, what of refreshments? We need Sobolo after clean-up o!", timestamp: "5 mins ago" }
    ],
    timestamp: "2 hours ago",
    hasLiked: false
  },
  {
    id: "p2",
    authorName: "Albert Kwamina",
    authorRole: "Student",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "Who won? Check out this poll about which coding language is the favorite among computer science and IT students at KsTU! Vote now!",
    category: "General",
    poll: {
      question: "Which programming language is king at FAS department?",
      options: [
        { text: "TypeScript / JavaScript (Web App Devs)", votes: 67 },
        { text: "Python (Data Science & Analytics)", votes: 45 },
        { text: "Java / C# (Backend Enterprise)", votes: 21 },
        { text: "Kotlin / Swift (Mobile Enthusiasts)", votes: 12 }
      ]
    },
    upvotes: 56,
    comments: [],
    timestamp: "4 hours ago",
    hasLiked: false
  },
  {
    id: "p3",
    authorName: "Sena Mensah",
    authorRole: "Student",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "🚨 LOST ITEM REPORT 🚨\nI misplaced my black HP laptop charger yesterday afternoon at the Library Annex, Second Floor. If found, please return or alert me. It has a tiny red tape on the brick. God bless you!",
    category: "Lost & Found",
    upvotes: 18,
    comments: [
      { id: "sc3", author: "Ernest Owusu", text: "I saw a charger with a red sticker at the main librarian's desk this morning. Check there!", timestamp: "1 hour ago" }
    ],
    timestamp: "6 hours ago",
    hasLiked: false
  }
];

export const PRESEEDED_MARKETPLACE: MarketListing[] = [
  {
    id: "ml1",
    title: "HP EliteBook 840 G6 (Core i7, 16GB RAM, 512GB SSD)",
    description: "Highly clean engineering laptop, perfect for programming, statistics, and architectural drawings. Battery life is solid (approx. 4.5 hours). Comes with genuine charger.",
    price: 3600,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    sellerName: "Emmanuel Boateng",
    sellerContact: "+233 24 555 1234",
    isStudentSeller: true,
    timestamp: "1 day ago"
  },
  {
    id: "ml2",
    title: "Introduction to Database Systems (4th Edition - PDF & Hardcopy)",
    description: "Used textbook in fantastic condition. Clean pages, no highlights. Recommended reading for CS-201 at Level 200.",
    price: 120,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    sellerName: "Yaa Adutwumwaa",
    sellerContact: "+233 50 111 8899",
    isStudentSeller: true,
    timestamp: "2 days ago"
  },
  {
    id: "ml3",
    title: "Kente Graduation Stole Custom Embroidery",
    description: "Authentic custom kente stoles for graduating students. Add your department initials and honors. Takes 3 working days.",
    price: 150,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
    sellerName: "FCAT Fashion Hub (Sika)",
    sellerContact: "+233 27 333 4455",
    isStudentSeller: false,
    timestamp: "12 hours ago"
  }
];

export const PRESEEDED_HOSTELS: HostelListing[] = [
  {
    id: "h1",
    name: "GetFund Hostel (KsTU Main Campus)",
    location: "Main Campus, KsTU",
    pricePerSemester: 2500,
    roomsAvailable: 5,
    rating: 4.5,
    features: ["Wi-Fi", "Water Tanks", "Study Room", "Security Patrol", "Kitchenette"],
    contact: "+233 20 888 1122"
  },
  {
    id: "h2",
    name: "Royal Gate Hostel (Amakom)",
    location: "Amakom, 5-min walk",
    pricePerSemester: 3200,
    roomsAvailable: 8,
    rating: 4.8,
    features: ["Air Conditioning", "DSTV Lounge", "Standby Generator", "Fenced Gate"],
    contact: "+233 24 999 7788"
  },
  {
    id: "h3",
    name: "Standard Haven Hostel (Bantama)",
    location: "Bantama",
    pricePerSemester: 1800,
    roomsAvailable: 12,
    rating: 3.9,
    features: ["Borehole Water", "Self Meter", "Balcony", "Spacious Compound"],
    contact: "+233 55 444 0099"
  }
];

export const PRESEEDED_ROOMMATES: RoommateRequest[] = [
  {
    id: "rr1",
    authorName: "Ekow Appiah",
    gender: "Male",
    programme: "Computer Science (Level 200)",
    budget: "GHS 1,500 - 2,500",
    habits: ["Late studies", "Clean-freak", "No smoking", "Respects personal space"],
    contact: "+233 24 111 2233"
  },
  {
    id: "rr2",
    authorName: "Evelyn Koduah",
    gender: "Female",
    programme: "Hospitality Management (Level 300)",
    budget: "GHS 2,000 - 3,000",
    habits: ["Loves cooking", "Early riser", "Quiet", "Friendly"],
    contact: "+233 50 999 0011"
  }
];

export const PRESEEDED_EVENTS: CampusEvent[] = [
  {
    id: "e1",
    title: "KsTU Annual Hackathon & Tech Exhibition",
    organizer: "Computer Society x FAS HOD",
    date: "2026-07-28",
    time: "09:00 AM",
    venue: "Main ICT Auditorium, KsTU",
    description: "Bring your team of 3-5 to build solutions solving Kumasi environmental and business problems. Sponsors include Google Developers Group, MTN Ghana, and local tech startups.",
    ticketPrice: "Free (RSVP Required)",
    registeredCount: 145
  },
  {
    id: "e2",
    title: "SRC Akwaaba Night Concert 2026",
    organizer: "SRC Executive",
    date: "2026-08-05",
    time: "07:00 PM",
    venue: "KsTU Sports Complex",
    description: "Welcome concert for all levels! Live performances from Gh artists, student bands, and food vendors. Bring your student ID card.",
    ticketPrice: "GHS 20 (Students), GHS 50 (External)",
    registeredCount: 890
  }
];

export const PRESEEDED_CAMPUS_LOCATIONS: CampusLocation[] = [
  { id: "loc1", name: "Main Administration Block", category: "Admin", coordinates: { x: 50, y: 15 }, description: "Vice Chancellor, Registrar, Admissions, Finance, and Public Relations offices." },
  { id: "loc2", name: "Central Library", category: "Facility", coordinates: { x: 55, y: 35 }, description: "Multi-floor study area, digital archive, citation hubs, and research desks." },
  { id: "loc3", name: "FAS & FOE Lecture Block (J Block)", category: "Lecture Hall", coordinates: { x: 30, y: 45 }, description: "Primary lecture theatres for Computer Science, IT, and Engineering." },
  { id: "loc4", name: "FCAT Fashion & Design Complex", category: "Department", coordinates: { x: 75, y: 55 }, description: "Creative workshops, textile studios, and culinary training restaurants." },
  { id: "loc5", name: "GetFund Hostel", category: "Hostel", coordinates: { x: 20, y: 75 }, description: "Major on-campus student residential complex." },
  { id: "loc6", name: "Campus Clinic & Health Centre", category: "Facility", coordinates: { x: 80, y: 25 }, description: "First-aid, emergency care, dental clinic, and consultation rooms." },
  { id: "loc7", name: "KsTU Sports Complex & Pitch", category: "Facility", coordinates: { x: 45, y: 85 }, description: "Football field, basketball courts, and athletics running track." }
];

export const PRESEEDED_JOBS: JobListing[] = [
  {
    id: "j1",
    title: "Junior Web Developer (React & Node.js)",
    company: "SikaTech Ghana",
    type: "Internship",
    description: "SikaTech is looking for a passionate student developer to assist in building next-generation digital payment widgets. Flexible hours.",
    requirements: ["Solid HTML/CSS/React understanding", "Knowledge of relational databases", "Ability to work 15 hours per week"],
    location: "Kumasi, Adum (Hybrid)",
    salary: "GHS 1,200/month",
    contactEmail: "careers@sikatech.com.gh"
  },
  {
    id: "j2",
    title: "Industrial Attachment - Mechanical/Electrical Engineering",
    company: "Kumasi Brewery Limited",
    type: "Industrial Attachment",
    description: "Gain hands-on experience in machine servicing, PLC programming, and electrical system diagnostics at our modern bottling facility.",
    requirements: ["FOE Level 300 student", "Strong analytical skills", "Good team cooperation"],
    location: "Kumasi, Kaase (On-Site)",
    salary: "Stipend + Free Lunch",
    contactEmail: "attachment@kbl.com"
  }
];
