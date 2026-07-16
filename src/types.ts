export type UserRole = 
  | "Student" 
  | "Lecturer" 
  | "SRC Executive" 
  | "Non-Teaching Staff" 
  | "Admin";

export interface UserProfile {
  id: string;
  name: string;
  studentIdOrStaffId: string;
  role: UserRole;
  email: string;
  programme?: string;
  department?: string;
  faculty?: string;
  level?: string; // 100, 200, 300, 400
  semester?: string; // 1st, 2nd
  bio: string;
  avatar: string;
  skills: string[];
  interests: string[];
  xp: number;
  streak: number;
  badges: string[];
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  dean: string;
  description: string;
  departments: string[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hod: string;
  lecturers: string[];
  timetable: string[]; // List of events/times
}

export interface Course {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  lecturer: string;
  semester: string;
  level: string;
}

export interface AcademicMaterial {
  id: string;
  title: string;
  courseCode: string;
  type: "Slide" | "Note" | "Lab Manual" | "Recorded Lecture" | "E-Book";
  author: string;
  url: string;
  fileSize?: string;
  downloads: number;
  uploadedAt: string;
}

export interface PastQuestion {
  id: string;
  courseCode: string;
  courseTitle: string;
  year: string;
  semester: string;
  level: string;
  uploadedBy: string;
  downloads: number;
  upvotes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface SocialPost {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  content: string;
  image?: string;
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    votedOptionIndex?: number;
  };
  category: "General" | "SRC News" | "Lost & Found" | "Marketplace" | "Club Activity" | "Question" | "Business Promotion";
  upvotes: number;
  comments: Comment[];
  timestamp: string;
  hasLiked?: boolean;
}

export interface MarketListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "Books" | "Laptops" | "Phones" | "Hostel Items" | "Fashion" | "Food" | "Services";
  image: string;
  sellerName: string;
  sellerContact: string;
  isStudentSeller: boolean;
  timestamp: string;
}

export interface Notice {
  id: string;
  title: string;
  sender: "Vice Chancellor" | "Registrar" | "SRC" | "Library" | "Security" | "HOD";
  content: string;
  priority: "High" | "Normal";
  date: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  category: "Safety Emergency" | "Medical Crisis" | "Missing Person" | "Infrastructure Fault" | "General Alert";
  description: string;
  location: string;
  isAnonymous: boolean;
  status: "Reported" | "Investigating" | "Resolved";
  timestamp: string;
}

export interface LostFoundItem {
  id: string;
  type: "Lost" | "Found";
  itemName: string;
  description: string;
  location: string;
  contact: string;
  image?: string;
  timestamp: string;
}

export interface HostelListing {
  id: string;
  name: string;
  location: string; // e.g. "Bantama", "Amakom", "Near Main Gate"
  pricePerSemester: number;
  roomsAvailable: number;
  rating: number;
  features: string[];
  contact: string;
}

export interface RoommateRequest {
  id: string;
  authorName: string;
  gender: "Male" | "Female";
  programme: string;
  budget: string;
  habits: string[];
  contact: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  type: "Internship" | "Industrial Attachment" | "Campus Job" | "Graduate Job";
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  contactEmail: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  ticketPrice?: string;
  registeredCount: number;
  isRegistered?: boolean;
}

export interface CampusLocation {
  id: string;
  name: string;
  category: "Lecture Hall" | "Department" | "Hostel" | "Admin" | "Facility";
  coordinates: { x: number; y: number }; // Relative coordinates for interactive SVG
  description: string;
}
