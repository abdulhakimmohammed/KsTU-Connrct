import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Compass, 
  Info, 
  Building, 
  School, 
  Landmark, 
  MessageSquare, 
  Plus, 
  Heart, 
  User, 
  Award, 
  Shield, 
  AlertTriangle, 
  FileText, 
  ShoppingBag, 
  BookOpen, 
  Calendar, 
  Map, 
  CheckCircle, 
  Bell, 
  HelpCircle, 
  GraduationCap, 
  Laptop, 
  Phone, 
  PlusCircle, 
  Trash, 
  ExternalLink, 
  Settings, 
  Briefcase, 
  ChevronRight, 
  UserCheck, 
  TrendingUp, 
  Flag, 
  Share2,
  Lock,
  Menu,
  X,
  Volume2
} from "lucide-react";

import { 
  PRESEEDED_FACULTIES, 
  PRESEEDED_COURSES, 
  PRESEEDED_NOTICES, 
  PRESEEDED_MATERIALS, 
  PRESEEDED_PAST_QUESTIONS, 
  PRESEEDED_SOCIAL_POSTS, 
  PRESEEDED_MARKETPLACE, 
  PRESEEDED_HOSTELS, 
  PRESEEDED_ROOMMATES, 
  PRESEEDED_EVENTS, 
  PRESEEDED_CAMPUS_LOCATIONS,
  PRESEEDED_JOBS
} from "./data";

import { 
  UserProfile, 
  SocialPost, 
  MarketListing, 
  RoommateRequest, 
  PastQuestion, 
  AcademicMaterial, 
  Notice, 
  SecurityIncident, 
  CampusEvent,
  JobListing,
  UserRole
} from "./types";

import AIChatbot from "./components/AIChatbot";
import CampusMap from "./components/CampusMap";
import CVBuilder from "./components/CVBuilder";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>("social");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core App State (Persisted in localStorage)
  const [profile, setProfile] = useState<UserProfile>(() => {
    const cached = localStorage.getItem("kstu_profile");
    if (cached) return JSON.parse(cached);
    return {
      id: "u1",
      name: "Abdul-Hakim Mohammed",
      studentIdOrStaffId: "04240900105",
      role: "Student",
      email: "abdulhakimmohammed059@gmail.com",
      programme: "Computer Science",
      department: "Computer Science",
      faculty: "Faculty of Applied Sciences",
      level: "300",
      semester: "1st",
      bio: "Aspiring software engineer and student leader at KsTU. Passionate about mobile-first web tech and helping classmates succeed o!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      skills: ["TypeScript", "React", "Node.js", "SQL", "Technical Writing"],
      interests: ["AI Systems", "Ghanaian Startups", "Football", "Kente Design"],
      xp: 450,
      streak: 5,
      badges: ["Code Wizard", "Early Bird", "Active Contributor"]
    };
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    const cached = localStorage.getItem("kstu_social");
    return cached ? JSON.parse(cached) : PRESEEDED_SOCIAL_POSTS;
  });

  const [marketListings, setMarketListings] = useState<MarketListing[]>(() => {
    const cached = localStorage.getItem("kstu_market");
    return cached ? JSON.parse(cached) : PRESEEDED_MARKETPLACE;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const cached = localStorage.getItem("kstu_notices");
    return cached ? JSON.parse(cached) : PRESEEDED_NOTICES;
  });

  const [pastQuestions, setPastQuestions] = useState<PastQuestion[]>(() => {
    const cached = localStorage.getItem("kstu_past_questions");
    return cached ? JSON.parse(cached) : PRESEEDED_PAST_QUESTIONS;
  });

  const [academicMaterials, setAcademicMaterials] = useState<AcademicMaterial[]>(() => {
    const cached = localStorage.getItem("kstu_materials");
    return cached ? JSON.parse(cached) : PRESEEDED_MATERIALS;
  });

  const [roommateRequests, setRoommateRequests] = useState<RoommateRequest[]>(() => {
    const cached = localStorage.getItem("kstu_roommates");
    return cached ? JSON.parse(cached) : PRESEEDED_ROOMMATES;
  });

  const [incidents, setIncidents] = useState<SecurityIncident[]>(() => {
    const cached = localStorage.getItem("kstu_incidents");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "inc1",
        title: "Flickering lights in J-Block Room 204",
        category: "Infrastructure Fault",
        description: "The main fluorescent lights are making buzzing noises and flickering, causing eye strains o.",
        location: "J Block, Room 204",
        isAnonymous: false,
        status: "Investigating",
        timestamp: "2026-07-13"
      }
    ];
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const cached = localStorage.getItem("kstu_events");
    return cached ? JSON.parse(cached) : PRESEEDED_EVENTS;
  });

  const [registeredCourses, setRegisteredCourses] = useState<string[]>(() => {
    const cached = localStorage.getItem("kstu_registered_courses");
    return cached ? JSON.parse(cached) : ["CS-201", "IT-311"];
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("kstu_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("kstu_social", JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    localStorage.setItem("kstu_market", JSON.stringify(marketListings));
  }, [marketListings]);

  useEffect(() => {
    localStorage.setItem("kstu_notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("kstu_past_questions", JSON.stringify(pastQuestions));
  }, [pastQuestions]);

  useEffect(() => {
    localStorage.setItem("kstu_materials", JSON.stringify(academicMaterials));
  }, [academicMaterials]);

  useEffect(() => {
    localStorage.setItem("kstu_roommates", JSON.stringify(roommateRequests));
  }, [roommateRequests]);

  useEffect(() => {
    localStorage.setItem("kstu_incidents", JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem("kstu_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("kstu_registered_courses", JSON.stringify(registeredCourses));
  }, [registeredCourses]);

  // Social Feed Handlers
  const [newPostText, setNewPostText] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<SocialPost["category"]>("General");
  const [hasPoll, setHasPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: SocialPost = {
      id: "post_" + Date.now(),
      authorName: profile.name,
      authorRole: profile.role,
      authorAvatar: profile.avatar,
      content: newPostText,
      category: newPostCategory,
      upvotes: 0,
      comments: [],
      timestamp: "Just now",
      hasLiked: false,
      ...(hasPoll && pollQuestion.trim() && {
        poll: {
          question: pollQuestion,
          options: pollOptions.filter(o => o.trim() !== "").map(o => ({ text: o, votes: 0 }))
        }
      })
    };

    setSocialPosts([newPost, ...socialPosts]);
    setNewPostText("");
    setHasPoll(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    
    // Reward XP
    setProfile(p => ({ ...p, xp: p.xp + 15 }));
  };

  const handleVote = (postId: string, optionIdx: number) => {
    setSocialPosts(posts => posts.map(post => {
      if (post.id === postId && post.poll) {
        // If already voted, don't vote again
        if (post.poll.votedOptionIndex !== undefined) return post;
        const newOptions = [...post.poll.options];
        newOptions[optionIdx] = { 
          ...newOptions[optionIdx], 
          votes: newOptions[optionIdx].votes + 1 
        };
        return {
          ...post,
          poll: {
            ...post.poll,
            options: newOptions,
            votedOptionIndex: optionIdx
          }
        };
      }
      return post;
    }));
  };

  const handleLikePost = (postId: string) => {
    setSocialPosts(posts => posts.map(post => {
      if (post.id === postId) {
        const liked = !post.hasLiked;
        return {
          ...post,
          upvotes: liked ? post.upvotes + 1 : post.upvotes - 1,
          hasLiked: liked
        };
      }
      return post;
    }));
  };

  // Comments State
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});
  
  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    setSocialPosts(posts => posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: "comment_" + Date.now(),
              author: profile.name,
              text: text,
              timestamp: "Just now"
            }
          ]
        };
      }
      return post;
    }));

    setCommentInput(prev => ({ ...prev, [postId]: "" }));
  };

  // Marketplace Handlers
  const [marketTitle, setMarketTitle] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [marketCategory, setMarketCategory] = useState<MarketListing["category"]>("Books");
  const [marketDesc, setMarketDesc] = useState("");
  const [marketContact, setMarketContact] = useState("");
  const [marketImg, setMarketImg] = useState("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400");

  const handleAddMarket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketTitle.trim() || !marketPrice || !marketContact) return;

    const newListing: MarketListing = {
      id: "market_" + Date.now(),
      title: marketTitle,
      description: marketDesc,
      price: parseFloat(marketPrice),
      category: marketCategory,
      image: marketImg,
      sellerName: profile.name,
      sellerContact: marketContact,
      isStudentSeller: profile.role === "Student",
      timestamp: "Just now"
    };

    setMarketListings([newListing, ...marketListings]);
    setMarketTitle("");
    setMarketPrice("");
    setMarketDesc("");
    setMarketContact("");
    
    // Reward XP
    setProfile(p => ({ ...p, xp: p.xp + 25 }));
  };

  // Academic Hub state
  const [academicSearch, setAcademicSearch] = useState("");
  const [selectedHubTab, setSelectedHubTab] = useState<"notes" | "pq">("notes");
  const [pqCourseCode, setPqCourseCode] = useState("");
  const [pqCourseTitle, setPqCourseTitle] = useState("");
  const [pqYear, setPqYear] = useState("2024/2025");

  const handleUploadPQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pqCourseCode || !pqCourseTitle) return;

    const newPQ: PastQuestion = {
      id: "pq_" + Date.now(),
      courseCode: pqCourseCode.toUpperCase(),
      courseTitle: pqCourseTitle,
      year: pqYear,
      semester: "1st",
      level: profile.level || "200",
      uploadedBy: `${profile.name} (${profile.programme} Lvl ${profile.level})`,
      downloads: 0,
      upvotes: 0,
      comments: []
    };

    setPastQuestions([newPQ, ...pastQuestions]);
    setPqCourseCode("");
    setPqCourseTitle("");
    
    // Reward XP
    setProfile(p => ({ ...p, xp: p.xp + 30 }));
  };

  const handleDownloadPQ = (pqId: string) => {
    setPastQuestions(prev => prev.map(q => {
      if (q.id === pqId) return { ...q, downloads: q.downloads + 1 };
      return q;
    }));
    alert("Past Question downloaded successfully o!");
  };

  const handleUpvotePQ = (pqId: string) => {
    setPastQuestions(prev => prev.map(q => {
      if (q.id === pqId) return { ...q, upvotes: q.upvotes + 1 };
      return q;
    }));
  };

  // Roommate state
  const [roommateBudget, setRoommateBudget] = useState("");
  const [roommateHabits, setRoommateHabits] = useState("");

  const handleAddRoommateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roommateBudget || !roommateHabits) return;

    const newRequest: RoommateRequest = {
      id: "rr_" + Date.now(),
      authorName: profile.name,
      gender: "Male",
      programme: `${profile.programme} (Level ${profile.level})`,
      budget: `GHS ${roommateBudget}`,
      habits: roommateHabits.split(",").map(h => h.trim()),
      contact: "+233 24 000 0000"
    };

    setRoommateRequests([newRequest, ...roommateRequests]);
    setRoommateBudget("");
    setRoommateHabits("");
  };

  // Security reporting
  const [incidentTitle, setIncidentTitle] = useState("");
  const [incidentCategory, setIncidentCategory] = useState<SecurityIncident["category"]>("Safety Emergency");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleReportIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentTitle || !incidentDesc || !incidentLocation) return;

    const newIncident: SecurityIncident = {
      id: "inc_" + Date.now(),
      title: incidentTitle,
      category: incidentCategory,
      description: incidentDesc,
      location: incidentLocation,
      isAnonymous: isAnonymous,
      status: "Reported",
      timestamp: new Date().toISOString().split("T")[0]
    };

    setIncidents([newIncident, ...incidents]);
    setIncidentTitle("");
    setIncidentDesc("");
    setIncidentLocation("");
    alert("Incident reported securely o! The security team will review it immediately.");
  };

  const handleRegisterEvent = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const already = ev.isRegistered;
        return {
          ...ev,
          registeredCount: already ? ev.registeredCount - 1 : ev.registeredCount + 1,
          isRegistered: !already
        };
      }
      return ev;
    }));
  };

  // Notice Creator (SRC/Admin)
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeSender, setNoticeSender] = useState<Notice["sender"]>("SRC");
  
  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    const newNotice: Notice = {
      id: "notice_" + Date.now(),
      title: noticeTitle,
      sender: noticeSender,
      content: noticeContent,
      priority: "Normal",
      date: new Date().toISOString().split("T")[0]
    };

    setNotices([newNotice, ...notices]);
    setNoticeTitle("");
    setNoticeContent("");
  };

  // Toggle user role (Student vs Lecturer)
  const toggleRole = () => {
    const nextRole: UserRole = profile.role === "Student" ? "Lecturer" : "Student";
    setProfile(p => ({
      ...p,
      role: nextRole,
      studentIdOrStaffId: nextRole === "Lecturer" ? "STF-2026-904" : "04240900105"
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Upper Brand Nav */}
      <header className="bg-[#003366] border-b border-[#003366]/20 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo & Crest */}
          <div className="flex items-center gap-3">
            {/* SVG crest of KsTU */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#FFD700] p-1 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#003366" />
                <path d="M 50 15 L 80 40 L 80 75 L 50 90 L 20 75 L 20 40 Z" fill="#FFD700" />
                <path d="M 50 20 L 75 42 L 75 72 L 50 85 L 25 72 L 25 42 Z" fill="#003366" />
                <text x="50" y="55" fontSize="24" fill="#ffffff" fontWeight="bold" textAnchor="middle">KsTU</text>
                <polygon points="50,25 55,35 65,35 57,42 60,52 50,45 40,52 43,42 35,35 45,35" fill="#FFD700" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold tracking-tight uppercase">KsTU Connect</h1>
                <span className="bg-[#FFD700] text-[#003366] font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase">SUPER APP</span>
              </div>
              <p className="text-[10px] text-blue-100 font-mono">Kumasi Technical University Portal</p>
            </div>
          </div>

          {/* Search & Actions bar */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-[#002244]/40 border border-[#004488]/50 px-3.5 py-2 rounded-xl">
              <Award className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs font-mono font-extrabold">{profile.xp} XP</span>
              <span className="h-3 w-px bg-blue-800" />
              <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs font-mono font-extrabold">{profile.streak} Day Streak o!</span>
            </div>

            <button 
              onClick={toggleRole}
              className="px-4 py-2 bg-[#FFD700] hover:bg-yellow-400 text-[#003366] rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Viewing as: {profile.role} (Toggle)
            </button>
          </div>

          {/* Profile Quick Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold truncate max-w-[120px]">{profile.name}</p>
              <p className="text-[10px] text-yellow-300 font-mono">{profile.studentIdOrStaffId}</p>
            </div>
            <img 
              src={profile.avatar} 
              alt="avatar" 
              className="w-9 h-9 rounded-full border-2 border-[#FFD700] object-cover cursor-pointer" 
              onClick={() => setActiveTab("dashboard")}
            />
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 hover:bg-[#002244] rounded-lg md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer (When Open) */}
      {mobileMenuOpen && (
        <div className="bg-[#003366] text-white p-5 space-y-4 border-b border-[#003366]/30 md:hidden animate-slide-down rounded-b-[2rem] shadow-lg">
          <div className="flex items-center justify-between p-2 bg-[#002244]/60 rounded-xl border border-white/10">
            <span className="text-xs font-bold text-slate-100">🎯 {profile.xp} XP | 🔥 {profile.streak} Days</span>
            <button 
              onClick={() => { toggleRole(); setMobileMenuOpen(false); }}
              className="px-3 py-1 bg-[#FFD700] text-[#003366] font-extrabold text-[10px] rounded-lg"
            >
              Role: {profile.role} (Swap)
            </button>
          </div>
          <nav className="grid grid-cols-2 gap-2">
            {[
              { id: "social", label: "Campus Feed", icon: MessageSquare },
              { id: "dashboard", label: "My Dashboard", icon: User },
              { id: "academics", label: "Academic Hub", icon: BookOpen },
              { id: "map", label: "Campus Map", icon: Map },
              { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
              { id: "notice", label: "Notice Board", icon: Landmark },
              { id: "ai", label: "Kojo AI Chat", icon: Compass }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === tab.id ? "bg-[#FFD700] text-[#003366]" : "hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col space-y-4 col-span-1">
          {/* Student Stats Box */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <img src={profile.avatar} alt="avatar" className="w-12 h-12 rounded-full border-2 border-slate-100 object-cover" />
              <div>
                <h4 className="font-bold text-xs text-slate-800 leading-tight">{profile.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{profile.studentIdOrStaffId}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level</p>
                <p className="text-xs font-extrabold text-[#003366]">{profile.level || "N/A"}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CGPA</p>
                <p className="text-xs font-extrabold text-[#003366]">3.62</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-[#003366]">
                <span>XP Level 4</span>
                <span>{profile.xp}/600 XP</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="bg-[#FFD700] h-full" style={{ width: `${(profile.xp/600)*100}%` }} />
              </div>
            </div>
          </div>

          {/* Quick Menu List */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-3 shadow-sm space-y-1.5">
            {[
              { id: "social", label: "Campus Feed", desc: "SRC posts, lost & found, polls", icon: MessageSquare },
              { id: "dashboard", label: "My Dashboard", desc: "Bio, course registration, grades", icon: User },
              { id: "academics", label: "Academic Hub", desc: "Notes, past papers repository", icon: BookOpen },
              { id: "map", label: "Interactive Map", desc: "Locate lecture halls & clinics", icon: Map },
              { id: "marketplace", label: "Marketplace & Hostels", desc: "Buy, sell, find flat roommates", icon: ShoppingBag },
              { id: "notice", label: "Notice Board & Safety", desc: "Official releases & emergency reports", icon: Landmark },
              { id: "ai", label: "Ask Kojo (AI Assistant)", desc: "AI notes summarizer & homework helper", icon: Compass }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                    isSelected 
                      ? "bg-[#003366] text-white shadow-sm font-extrabold" 
                      : "text-slate-600 hover:bg-[#003366]/5"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? "text-[#FFD700]" : "text-slate-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold leading-tight">{tab.label}</p>
                    <p className={`text-[10px] truncate mt-0.5 ${isSelected ? "text-blue-100" : "text-slate-500"}`}>{tab.desc}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 self-center ${isSelected ? "text-white" : "text-slate-300"}`} />
                </button>
              );
            })}
          </div>

          {/* Emergency Alert Widget */}
          <div className="bg-red-50/60 border border-red-100 rounded-[2rem] p-6 shadow-sm text-red-900 space-y-3.5">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5 animate-bounce shrink-0" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Campus Security</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">Report safety issues or physical incidents directly to the KsTU main security gates o!</p>
            <div className="bg-white p-2.5 rounded-xl border border-red-100 font-mono text-[10px] text-red-950 flex items-center justify-between">
              <span>Gate 1 Hotline:</span>
              <span className="font-bold">+233 24 999 1111</span>
            </div>
            <button 
              onClick={() => setActiveTab("notice")}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold transition-colors shadow-xs"
            >
              Launch Anonymous Incident Report
            </button>
          </div>
        </aside>

        {/* Right Content Area (Major Switch Board) */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          
          {/* TAB 1: SOCIAL MEDIA FEED */}
          {activeTab === "social" && (
            <div className="space-y-6">
              {/* Post Creator */}
              <form onSubmit={handleCreatePost} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex gap-3">
                  <img src={profile.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" />
                  <textarea
                    rows={2}
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Chale, what is happening on the KsTU campus today? Share updates o..."
                    className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
                  />
                </div>

                {hasPoll && (
                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-2.5 animate-slide-down">
                    <input
                      type="text"
                      placeholder="Enter Poll Question (e.g. Favorite canteen vendor?)"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {pollOptions.map((opt, oIdx) => (
                        <input
                          key={oIdx}
                          type="text"
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...pollOptions];
                            updated[oIdx] = e.target.value;
                            setPollOptions(updated);
                          }}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPollOptions([...pollOptions, ""])}
                      className="text-[10px] text-[#003366] font-bold hover:underline"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value as SocialPost["category"])}
                      className="bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-slate-600"
                    >
                      <option value="General">📣 General Feed</option>
                      <option value="SRC News">🇬🇭 SRC Updates</option>
                      <option value="Lost & Found">🔑 Lost & Found</option>
                      <option value="Club Activity">🏆 Clubs & Society</option>
                      <option value="Question">❓ Academic Doubt</option>
                      <option value="Business Promotion">💼 Campus Business</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setHasPoll(!hasPoll)}
                      className="px-3 py-1.5 hover:bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600"
                    >
                      📊 {hasPoll ? "Remove Poll" : "Add Poll"}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#003366] hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Broadcast Post
                  </button>
                </div>
              </form>

              {/* Feed Listings */}
              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4 animate-fade-in">
                    {/* Author Line */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img src={post.authorAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-extrabold text-xs text-slate-800">{post.authorName}</h4>
                            <span className="bg-slate-100 text-slate-600 font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase">{post.authorRole}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{post.timestamp}</p>
                        </div>
                      </div>

                      <span className="bg-[#FFD700]/10 text-[#003366] font-bold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                    {/* Render Poll if exists */}
                    {post.poll && (
                      <div className="p-4 bg-slate-50/80 border border-slate-200/60 rounded-2xl space-y-2.5">
                        <p className="text-xs font-bold text-slate-800">📊 {post.poll.question}</p>
                        <div className="space-y-2">
                          {post.poll.options.map((opt, optIdx) => {
                            const totalVotes = post.poll?.options.reduce((sum, o) => sum + o.votes, 0) || 1;
                            const percentage = Math.round((opt.votes / totalVotes) * 100);
                            const hasVoted = post.poll?.votedOptionIndex !== undefined;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleVote(post.id, optIdx)}
                                disabled={hasVoted}
                                className="w-full text-left relative overflow-hidden bg-white hover:bg-[#FFD700]/10 border border-slate-200 disabled:hover:bg-white p-2.5 rounded-xl text-xs transition-all flex justify-between items-center"
                              >
                                {/* Percentage bar */}
                                {hasVoted && (
                                  <div 
                                    className="absolute left-0 top-0 bottom-0 bg-[#FFD700]/15 transition-all duration-500" 
                                    style={{ width: `${percentage}%` }} 
                                  />
                                )}
                                <span className="relative font-bold text-slate-700">{opt.text}</span>
                                {hasVoted && (
                                  <span className="relative font-mono font-black text-[#003366]">{percentage}% ({opt.votes})</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 font-bold transition-colors ${
                          post.hasLiked ? "text-red-600" : "text-slate-500 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4.5 h-4.5 ${post.hasLiked ? "fill-red-600" : ""}`} />
                        <span>{post.upvotes} Support</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                        <MessageSquare className="w-4.5 h-4.5" />
                        <span>{post.comments.length} Comments</span>
                      </div>
                    </div>

                    {/* Render Comments */}
                    {post.comments.length > 0 && (
                      <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-h-[220px] overflow-y-auto">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="text-xs leading-relaxed border-b border-slate-200/50 pb-2.5 last:border-0 last:pb-0">
                            <span className="font-extrabold text-slate-800 block">{comment.author}</span>
                            <span className="text-slate-600 mt-0.5 block">{comment.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Post Comment Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment, chale..."
                        value={commentInput[post.id] || ""}
                        onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                        className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-4 py-2 bg-[#003366] hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Send
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT & LECTURER DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Profile Card / Bio Editor */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-extrabold text-[#003366] border-b border-slate-100 pb-2">Profile & Identity Portal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <img src={profile.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover border-2 border-[#003366] mb-3 shadow-xs" />
                    <button 
                      onClick={() => {
                        const nextAvatar = prompt("Enter custom photo URL o:", profile.avatar);
                        if (nextAvatar) setProfile({ ...profile, avatar: nextAvatar });
                      }}
                      className="text-[10px] text-[#003366] font-bold hover:underline"
                    >
                      Update Photo URL
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">My Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">ID Number</label>
                        <input
                          type="text"
                          value={profile.studentIdOrStaffId}
                          onChange={(e) => setProfile({ ...profile, studentIdOrStaffId: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Profile Biography</label>
                      <textarea
                        rows={2}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STUDENT VIEW ONLY */}
              {profile.role === "Student" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Dynamic Course Registration Checklist */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Semester Course Checklist
                      </h4>
                      <p className="text-[10px] text-slate-500">Tick classes that you have successfully registered at the main Admin registry o.</p>
                    </div>

                    <div className="space-y-2">
                      {PRESEEDED_COURSES.map((course) => {
                        const isRegistered = registeredCourses.includes(course.code);
                        return (
                          <label 
                            key={course.id} 
                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                              isRegistered ? "bg-green-50/30 border-green-200 text-slate-800" : "border-slate-100 hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isRegistered}
                                onChange={() => {
                                  if (isRegistered) {
                                    setRegisteredCourses(registeredCourses.filter(c => c !== course.code));
                                  } else {
                                    setRegisteredCourses([...registeredCourses, course.code]);
                                  }
                                }}
                                className="w-4 h-4 text-[#003366] rounded-sm border-slate-300 focus:ring-0 cursor-pointer"
                              />
                              <div>
                                <p className="text-xs font-bold text-slate-800">{course.code}: {course.title}</p>
                                <p className="text-[10px] text-slate-500 font-semibold">{course.lecturer} | {course.creditHours} Credits</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-bold">Lvl {course.level}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Class Attendance & Academic Calendar Countdown */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#FFD700]" />
                        Attendance & Grade Simulator
                      </h4>
                      <p className="text-[10px] text-slate-500">Review class presence levels and simulate academic target grades.</p>
                    </div>

                    <div className="space-y-3.5">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-slate-700">CS-201 attendance:</span>
                          <span className="font-mono font-bold text-green-700">88% (Meets Criteria)</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full" style={{ width: "88%" }} />
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-slate-700">IT-311 attendance:</span>
                          <span className="font-mono font-bold text-amber-700">76% (Caution)</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: "76%" }} />
                        </div>
                      </div>

                      <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 p-4 rounded-2xl text-xs space-y-1.5">
                        <p className="font-extrabold text-[#003366]">⚠️ Registration Deadline Approaching o!</p>
                        <p className="text-[10px] text-slate-700 leading-relaxed font-semibold">
                          Registration for end of 1st Semester Exams close in <strong>10 Days</strong>. Please verify your index number.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* LECTURER VIEW ONLY */}
              {profile.role === "Lecturer" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Notes & Assignments upload form */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <PlusCircle className="w-4 h-4 text-[#FFD700]" />
                        Lecturer Course Materials Manager
                      </h4>
                      <p className="text-[10px] text-slate-500">Provide direct academic slides, textbook downloads or homework notes.</p>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const title = (e.currentTarget.elements.namedItem("doc_title") as HTMLInputElement).value;
                        const course = (e.currentTarget.elements.namedItem("doc_course") as HTMLInputElement).value;
                        const docType = (e.currentTarget.elements.namedItem("doc_type") as HTMLSelectElement).value;
                        if (!title || !course) return;

                        const newMat: AcademicMaterial = {
                          id: "mat_" + Date.now(),
                          title: title,
                          courseCode: course.toUpperCase(),
                          type: docType as any,
                          author: profile.name,
                          url: "#",
                          downloads: 0,
                          uploadedAt: new Date().toISOString().split("T")[0],
                          fileSize: "1.8 MB"
                        };

                        setAcademicMaterials([newMat, ...academicMaterials]);
                        e.currentTarget.reset();
                        alert("Material uploaded to Academic Hub database successfully o!");
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Material Title / Name</label>
                        <input name="doc_title" type="text" placeholder="e.g. Chapter 2: Relational Schema Design" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Course Code</label>
                          <input name="doc_course" type="text" placeholder="e.g. CS-201" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-hidden focus:ring-2 focus:ring-[#003366]" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Material Type</label>
                          <select name="doc_type" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                            <option value="Slide">Slide PDF</option>
                            <option value="Note">Notes / PDF</option>
                            <option value="Lab Manual">Lab Manual</option>
                            <option value="Recorded Lecture">Lecture Video Link</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-[#003366] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                        Publish Material to Students Hub
                      </button>
                    </form>
                  </div>

                  {/* Submission Grade simulation & Attendance simulator */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#003366]" />
                        Class Attendance Marker (QR Mock)
                      </h4>
                      <p className="text-[10px] text-slate-500">Initiate automated student class attendance tracking.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                      <p className="text-xs text-slate-600 font-medium">Generate attendance session QR code o. Students scan the QR from their student IDs to instantly record attendance.</p>
                      <div className="w-28 h-28 bg-white border border-slate-200 mx-auto flex items-center justify-center p-2 rounded-xl">
                        {/* Mock QR Code representation */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect x="5" y="5" width="20" height="20" fill="#003366" />
                          <rect x="10" y="10" width="10" height="10" fill="#ffffff" />
                          <rect x="75" y="5" width="20" height="20" fill="#003366" />
                          <rect x="80" y="10" width="10" height="10" fill="#ffffff" />
                          <rect x="5" y="75" width="20" height="20" fill="#003366" />
                          <rect x="10" y="80" width="10" height="10" fill="#ffffff" />
                          {/* Scattered squares */}
                          <rect x="35" y="15" width="10" height="10" fill="#FFD700" />
                          <rect x="50" y="25" width="15" height="15" fill="#003366" />
                          <rect x="30" y="50" width="20" height="10" fill="#003366" />
                          <rect x="60" y="50" width="10" height="20" fill="#FFD700" />
                          <rect x="45" y="70" width="15" height="15" fill="#003366" />
                        </svg>
                      </div>
                      <span className="inline-block bg-[#003366]/10 text-[#003366] text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase">
                        SESSION ACTIVE: CS-201
                      </span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 3: ACADEMIC HUB & PAST QUESTIONS */}
          {activeTab === "academics" && (
            <div className="space-y-6">
              
              {/* Hub Tabs selector */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setSelectedHubTab("notes")}
                  className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
                    selectedHubTab === "notes" ? "border-[#003366] text-[#003366]" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Lecture Notes & E-Books
                </button>
                <button
                  onClick={() => setSelectedHubTab("pq")}
                  className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
                    selectedHubTab === "pq" ? "border-[#003366] text-[#003366]" : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Past Questions Hub (KsTU Repo)
                </button>
              </div>

              {/* Sub-tab 1: Lecture Notes & Materials */}
              {selectedHubTab === "notes" && (
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-5 shadow-sm flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder="Search notes, slides, books by course code or lecturer name o..."
                        value={academicSearch}
                        onChange={(e) => setAcademicSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {academicMaterials
                      .filter(m => m.title.toLowerCase().includes(academicSearch.toLowerCase()) || m.courseCode.toLowerCase().includes(academicSearch.toLowerCase()))
                      .map((mat) => (
                        <div key={mat.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm flex justify-between items-start animate-fade-in">
                          <div className="space-y-2">
                            <span className="bg-[#003366]/10 text-[#003366] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold">
                              {mat.type}
                            </span>
                            <h4 className="font-bold text-xs text-slate-800 pt-1.5">{mat.title}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold">Course: {mat.courseCode} | Author: {mat.author}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{mat.fileSize || "1.5 MB"} | {mat.uploadedAt}</p>
                          </div>
                          
                          <button 
                            onClick={() => {
                              alert(`Chale, starting download for: ${mat.title}`);
                              setAcademicMaterials(academicMaterials.map(m => m.id === mat.id ? { ...m, downloads: m.downloads + 1 } : m));
                            }}
                            className="p-2.5 bg-[#003366]/10 hover:bg-[#003366] text-[#003366] hover:text-white rounded-xl transition-all text-xs font-bold"
                            title="Download PDF"
                          >
                            📥 ({mat.downloads})
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Past Questions Repo */}
              {selectedHubTab === "pq" && (
                <div className="space-y-6">
                  {/* Form to contribute past questions */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#FFD700]" />
                        Contribute a Past Exam Paper o!
                      </h4>
                      <p className="text-[10px] text-slate-500">Help fellow students study! Upload past mid-sem or main exam papers here and earn +30 XP.</p>
                    </div>

                    <form onSubmit={handleUploadPQ} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Course Code (e.g. CS-201)"
                        value={pqCourseCode}
                        onChange={(e) => setPqCourseCode(e.target.value)}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Course Title (e.g. DBMS)"
                        value={pqCourseTitle}
                        onChange={(e) => setPqCourseTitle(e.target.value)}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                        required
                      />
                      <select
                        value={pqYear}
                        onChange={(e) => setPqYear(e.target.value)}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      >
                        <option value="2024/2025">Year: 2024/2025</option>
                        <option value="2023/2024">Year: 2023/2024</option>
                        <option value="2022/2023">Year: 2022/2023</option>
                      </select>
                      <button type="submit" className="md:col-span-3 py-2.5 bg-[#003366] hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs">
                        Publish Past Exam Paper o!
                      </button>
                    </form>
                  </div>

                  {/* PQ Listings */}
                  <div className="space-y-4">
                    {pastQuestions.map((pq) => (
                      <div key={pq.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-3.5 animate-fade-in">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div className="space-y-1">
                            <span className="bg-[#FFD700] text-[#003366] font-mono text-[9px] px-2.5 py-1 rounded-full font-black uppercase">
                              Exam Year: {pq.year}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-800 pt-1.5">{pq.courseCode}: {pq.courseTitle}</h4>
                            <p className="text-[10px] text-slate-500 font-semibold">Semester: {pq.semester} | Level: {pq.level}</p>
                            <p className="text-[9px] text-slate-400 font-mono">Contributor: {pq.uploadedBy}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleUpvotePQ(pq.id)}
                              className="px-3.5 py-2 bg-slate-100 hover:bg-[#FFD700]/15 border border-slate-200 text-xs text-slate-700 font-bold rounded-xl flex items-center gap-1 transition-all"
                            >
                              👍 {pq.upvotes}
                            </button>
                            <button 
                              onClick={() => handleDownloadPQ(pq.id)}
                              className="px-3.5 py-2 bg-[#003366] hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                            >
                              📥 Download ({pq.downloads})
                            </button>
                          </div>
                        </div>

                        {/* Comments inside Past Questions */}
                        <div className="border-t border-slate-100 pt-2.5 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Exam preparation hints o:</p>
                          {pq.comments.map((comment) => (
                            <div key={comment.id} className="bg-slate-50 p-3.5 rounded-2xl text-xs border border-slate-100">
                              <span className="font-extrabold text-slate-800 block">{comment.author}</span>
                              <span className="text-slate-600 block mt-0.5 leading-relaxed">{comment.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: INTERACTIVE CAMPUS MAP */}
          {activeTab === "map" && (
            <div className="space-y-6 animate-fade-in">
              <CampusMap />
            </div>
          )}

          {/* TAB 5: MARKETPLACE & HOSTEL FINDER */}
          {activeTab === "marketplace" && (
            <div className="space-y-6">
              
              {/* Marketplace header / Add item form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Add Market Item Form */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4 md:col-span-1">
                  <div>
                    <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#FFD700]" />
                      Sell on Campus Market
                    </h4>
                    <p className="text-[10px] text-slate-500">List textbooks, hostel decors, canteens, or gadgets o.</p>
                  </div>

                  <form onSubmit={handleAddMarket} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Item Name</label>
                      <input
                        type="text"
                        value={marketTitle}
                        onChange={(e) => setMarketTitle(e.target.value)}
                        placeholder="e.g. Scientific Calculator"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Price (GHS)</label>
                        <input
                          type="number"
                          value={marketPrice}
                          onChange={(e) => setMarketPrice(e.target.value)}
                          placeholder="80"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category</label>
                        <select
                          value={marketCategory}
                          onChange={(e) => setMarketCategory(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="Laptops">Laptops</option>
                          <option value="Books">Books</option>
                          <option value="Phones">Phones</option>
                          <option value="Hostel Items">Hostel</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Food">Food & Catering</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Contact Phone o</label>
                      <input
                        type="text"
                        value={marketContact}
                        onChange={(e) => setMarketContact(e.target.value)}
                        placeholder="+233 24..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Brief Description</label>
                      <textarea
                        rows={2}
                        value={marketDesc}
                        onChange={(e) => setMarketDesc(e.target.value)}
                        placeholder="Perfect condition..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-[#003366] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs">
                      Add to Canteen / Market
                    </button>
                  </form>
                </div>

                {/* Market Listings */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-sm font-extrabold text-[#003366] uppercase tracking-wider">Active Campus Offers o:</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {marketListings.map((list) => (
                      <div key={list.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between animate-fade-in">
                        <img src={list.image} alt="listing" className="w-full h-32 object-cover border-b border-slate-100" />
                        <div className="p-5 space-y-2 flex-1">
                          <div className="flex justify-between items-start">
                            <span className="bg-[#FFD700]/15 text-[#003366] font-mono text-[9px] px-2.5 py-1 rounded-full font-extrabold">
                              {list.category}
                            </span>
                            <span className="text-xs font-mono font-extrabold text-[#003366]">GHS {list.price}</span>
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-800 truncate">{list.title}</h4>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{list.description}</p>
                        </div>
                        <div className="p-4 pt-3.5 border-t border-slate-50 bg-slate-50 flex items-center justify-between text-[10px]">
                          <div>
                            <p className="font-extrabold text-slate-700">{list.sellerName}</p>
                            <p className="text-[9px] text-slate-400 font-mono">{list.timestamp}</p>
                          </div>
                          <a 
                            href={`tel:${list.sellerContact}`} 
                            className="px-3.5 py-1.5 bg-[#003366] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors"
                          >
                            Call seller
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* HOSTEL SEARCH PORTAL */}
              <div className="border-t border-slate-200 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Roommate Finder Form */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4 col-span-1">
                    <div>
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#FFD700]" />
                        Roommate Matcher Form o!
                      </h4>
                      <p className="text-[10px] text-slate-500">Post details to match with clean and quiet hostel roommates.</p>
                    </div>

                    <form onSubmit={handleAddRoommateRequest} className="space-y-3.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">My Budget (GHS / semester)</label>
                        <input
                          type="text"
                          value={roommateBudget}
                          onChange={(e) => setRoommateBudget(e.target.value)}
                          placeholder="e.g. 1500 - 2500"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">My Habits o (comma separated)</label>
                        <textarea
                          rows={2}
                          value={roommateHabits}
                          onChange={(e) => setRoommateHabits(e.target.value)}
                          placeholder="e.g. Quiet studies, respects personal space"
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-[#FFD700] hover:bg-amber-500 text-[#003366] font-black text-xs rounded-xl transition-all shadow-xs">
                        List Roommate Request
                      </button>
                    </form>
                  </div>

                  {/* Hostel listings & requests */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-extrabold text-[#003366] uppercase tracking-wider">Hostel Allocations & Roommate Board</h3>
                    
                    {/* Roommate match profiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {roommateRequests.map((req) => (
                        <div key={req.id} className="bg-white border border-slate-200 p-5 rounded-[2rem] shadow-sm space-y-2.5 animate-fade-in">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-extrabold text-xs text-slate-800">{req.authorName}</h4>
                              <p className="text-[9px] text-slate-500 font-mono font-semibold">{req.programme}</p>
                            </div>
                            <span className="bg-[#FFD700] text-[#003366] font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase">
                              {req.gender}
                            </span>
                          </div>
                          
                          <p className="text-[11px] font-extrabold text-[#003366]">Budget: {req.budget}</p>
                          
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {req.habits.map((h, hIdx) => (
                              <span key={hIdx} className="bg-slate-50 text-slate-600 border border-slate-100 text-[8px] px-2 py-0.5 rounded-full font-semibold">
                                {h}
                              </span>
                            ))}
                          </div>
                          <a href={`tel:${req.contact}`} className="block text-center py-2 bg-[#003366]/10 hover:bg-[#003366] hover:text-white rounded-xl text-[10px] font-bold text-[#003366] transition-all mt-3">
                            Contact {req.authorName.split(" ")[0]} o
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* Preseeded hostels */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 p-6 space-y-4 shadow-sm">
                      <p className="text-xs font-extrabold text-[#003366]">🏫 Recommended Student Hostels list:</p>
                      <div className="space-y-3">
                        {PRESEEDED_HOSTELS.map((hos) => (
                          <div key={hos.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs flex-wrap gap-2 transition-all hover:border-[#FFD700]/35">
                            <div className="space-y-1">
                              <p className="font-extrabold text-slate-800">{hos.name}</p>
                              <p className="text-[10px] text-slate-500 font-semibold">Location: {hos.location} | Semester Price: GHS {hos.pricePerSemester}</p>
                              <div className="flex gap-1.5 pt-1">
                                {hos.features.slice(0, 3).map((f, fIdx) => (
                                  <span key={fIdx} className="bg-[#003366]/10 text-[#003366] text-[8px] font-bold px-2 py-0.5 rounded-full">{f}</span>
                                ))}
                              </div>
                            </div>
                            <a href={`tel:${hos.contact}`} className="px-4 py-2 bg-[#003366] hover:bg-blue-800 text-white rounded-xl text-[10px] font-bold transition-colors">
                              Call hostel
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 6: NOTICE BOARD & EMERGENCIES */}
          {activeTab === "notice" && (
            <div className="space-y-6">
              
              {/* Emergency and anonymous reporting panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Notice Creator & Incidents reporting form */}
                <div className="space-y-4 md:col-span-1">
                  
                  {/* SRC Announcement creator */}
                  {(profile.role === "SRC Executive" || profile.role === "Admin" || profile.role === "Lecturer") && (
                    <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-3.5">
                      <h4 className="font-bold text-xs text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-[#FFD700]" />
                        Broadcast Official Notice o!
                      </h4>
                      <form onSubmit={handlePostNotice} className="space-y-2">
                        <input
                          type="text"
                          placeholder="Notice Title (e.g. Hall allocation)"
                          value={noticeTitle}
                          onChange={(e) => setNoticeTitle(e.target.value)}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white"
                          required
                        />
                        <select
                          value={noticeSender}
                          onChange={(e) => setNoticeSender(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="SRC">SRC Executives</option>
                          <option value="Library">Central Library</option>
                          <option value="Security">Security Directorate</option>
                        </select>
                        <textarea
                          rows={3}
                          placeholder="Message detail..."
                          value={noticeContent}
                          onChange={(e) => setNoticeContent(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
                          required
                        />
                        <button type="submit" className="w-full py-2.5 bg-[#003366] hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs">
                          Post Announcement
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Security Anonymous Incident Reporter */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4">
                    <div>
                      <h4 className="font-bold text-xs text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-red-600 animate-pulse" />
                        Anonymous Safety Portal o!
                      </h4>
                      <p className="text-[10px] text-slate-500">Report missing campus gadgets, faulty wiring, or emergency incidents instantly.</p>
                    </div>

                    <form onSubmit={handleReportIncident} className="space-y-3.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Incident Title</label>
                        <input
                          type="text"
                          value={incidentTitle}
                          onChange={(e) => setIncidentTitle(e.target.value)}
                          placeholder="e.g. Water leak at FOE Block"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Category</label>
                          <select
                            value={incidentCategory}
                            onChange={(e) => setIncidentCategory(e.target.value as any)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="Safety Emergency">Safety Emergency</option>
                            <option value="Medical Crisis">Medical Crisis</option>
                            <option value="Infrastructure Fault">Infra Fault</option>
                            <option value="General Alert">General Alert</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Exact Location</label>
                          <input
                            type="text"
                            value={incidentLocation}
                            onChange={(e) => setIncidentLocation(e.target.value)}
                            placeholder="J Block Room 102"
                            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Incident Description</label>
                        <textarea
                          rows={2}
                          value={incidentDesc}
                          onChange={(e) => setIncidentDesc(e.target.value)}
                          placeholder="Describe what occurred o..."
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#003366]"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                          className="w-4 h-4 text-red-600 focus:ring-0 border-slate-300"
                        />
                        <span className="text-[10px] font-bold text-slate-600">Report Anonymously o!</span>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs">
                        Submit Incident Report
                      </button>
                    </form>
                  </div>

                </div>

                {/* Notices display */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-sm font-extrabold text-[#003366] uppercase tracking-wider">Official Campus Releases o:</h3>
                  
                  <div className="space-y-4">
                    {notices.map((not) => (
                      <div key={not.id} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm space-y-3 animate-fade-in">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="bg-[#003366]/10 text-[#003366] font-mono text-[9px] px-2.5 py-1 rounded-full font-extrabold uppercase">
                              Sender: {not.sender}
                            </span>
                            <h4 className="font-extrabold text-xs text-slate-800 pt-1.5">{not.title}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold">{not.date}</p>
                          </div>
                          {not.priority === "High" && (
                            <span className="bg-red-50 text-red-700 border border-red-100 font-extrabold text-[8px] px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                              HIGH PRIORITY
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{not.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: AI ASSISTANT "KOJO" */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <AIChatbot />
            </div>
          )}

        </div>

      </main>

      {/* Embedded Career & CV Hub / Placement Info (Sticky Bottom/Triggerable Overlay or Floating Action card) */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">KsTU Placement Registry</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find technical attachments and industrial internships within Kumasi (Kaase, Adum, Bantama) or greater Accra. Tap below to build your academic resume.
            </p>
            <div className="space-y-2.5">
              {PRESEEDED_JOBS.map((job) => (
                <div key={job.id} className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1">
                  <p className="text-xs font-bold text-amber-300">{job.title}</p>
                  <p className="text-[10px] text-slate-300">{job.company} | {job.location}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Contact: {job.contactEmail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <CVBuilder profile={profile} />
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Kumasi Technical University (KsTU) Digital Ecosystem Super App o. Developed for Ghanaian academic excellence.</p>
        </div>
      </footer>

    </div>
  );
}
