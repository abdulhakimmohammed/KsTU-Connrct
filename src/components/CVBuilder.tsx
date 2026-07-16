import React, { useState } from "react";
import { Briefcase, Download, GraduationCap, Code, FileText, Send, CheckCircle } from "lucide-react";
import { UserProfile } from "../types";

interface CVData {
  fullName: string;
  email: string;
  phone: string;
  programme: string;
  studentID: string;
  summary: string;
  skills: string;
  projects: string;
  experience: string;
}

export default function CVBuilder({ profile }: { profile: UserProfile }) {
  const [cv, setCv] = useState<CVData>({
    fullName: profile.name,
    email: profile.email,
    phone: "+233 24 ",
    programme: profile.programme || "Computer Science",
    studentID: profile.studentIdOrStaffId,
    summary: profile.bio || "Ambitious and practical technical student at Kumasi Technical University (KsTU). Experienced in hands-on design and building real-world software modules.",
    skills: profile.skills.join(", ") || "TypeScript, React, Node.js, SQL, Tailoring, Digital Illustration",
    projects: "1. KsTU Digital Ecosystem Applet - Fully collaborative portal system with AI assistant.\n2. Ghana Health Clinic Directory - Localized clinic tracking database.",
    experience: "Student Attachment Intern - Kumasi Brewing Co. (2 Months)\n- Assisted with local database operations and workstation network configurations."
  });

  const [preview, setPreview] = useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-6" id="cv-builder-section">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-[#003366] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#FFD700]" />
          KsTU Career Center - Academic CV Builder
        </h2>
        <p className="text-xs text-slate-500">
          Instantly generate a standardized technical resume to apply for local internships and Industrial Attachment.
        </p>
      </div>

      {!preview ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={cv.fullName}
                onChange={(e) => setCv({ ...cv, fullName: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={cv.email}
                onChange={(e) => setCv({ ...cv, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={cv.phone}
                onChange={(e) => setCv({ ...cv, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Programme of Study</label>
              <input
                type="text"
                value={cv.programme}
                onChange={(e) => setCv({ ...cv, programme: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Professional / Academic Summary</label>
            <textarea
              rows={3}
              value={cv.summary}
              onChange={(e) => setCv({ ...cv, summary: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
              placeholder="Tell employers about your academic goals, drives, and work ethics."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Core Skills (comma separated)</label>
            <input
              type="text"
              value={cv.skills}
              onChange={(e) => setCv({ ...cv, skills: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Engineering or Class Projects (one per line)</label>
            <textarea
              rows={3}
              value={cv.projects}
              onChange={(e) => setCv({ ...cv, projects: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Work History / Teaching Assistant / Prior Internships</label>
            <textarea
              rows={3}
              value={cv.experience}
              onChange={(e) => setCv({ ...cv, experience: e.target.value })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#003366] focus:bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setPreview(true)}
              className="px-5 py-2.5 bg-[#003366] text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Generate Professional CV Draft
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Action Header */}
          <div className="flex items-center justify-between bg-[#FFD700]/10 p-4 rounded-2xl border border-[#FFD700]/20">
            <span className="text-xs text-[#003366] font-bold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#003366]" /> CV generated! You can copy or print.
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPreview(false)}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
              >
                Edit Details
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-[#003366] text-white hover:bg-blue-800 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Print CV
              </button>
            </div>
          </div>

          {/* Paper Draft Template (Standard Academic Layout) */}
          <div className="border border-slate-300 p-8 rounded-[2rem] shadow-sm bg-white max-w-2xl mx-auto space-y-6 text-slate-900 font-sans print:border-0 print:p-0">
            {/* Header */}
            <div className="text-center border-b-2 border-[#003366] pb-4">
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#003366]">{cv.fullName}</h1>
              <p className="text-xs font-mono text-slate-600 mt-1">KsTU Student ID: {cv.studentID} | {cv.programme}</p>
              <p className="text-xs text-slate-600 mt-1">Email: {cv.email} | Tel: {cv.phone}</p>
            </div>

            {/* Profile Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">Professional Profile</h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{cv.summary}</p>
            </div>

            {/* Education */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">Education</h3>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-800">Kumasi Technical University (KsTU)</p>
                  <p className="text-[11px] text-slate-600">Bachelor of Technology / HND in {cv.programme}</p>
                  <p className="text-[10px] text-slate-500">Current CGPA: {profile.xp > 500 ? "3.85" : "3.42"} | Level: {profile.level || "200"}</p>
                </div>
                <p className="text-[11px] font-semibold text-slate-500">Kumasi, Ghana</p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">Technical Skills</h3>
              <p className="text-xs text-slate-700 font-mono">{cv.skills}</p>
            </div>

            {/* Work Experience */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">Professional Experience</h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{cv.experience}</p>
            </div>

            {/* Academic Projects */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">Key Tech Projects</h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{cv.projects}</p>
            </div>

            {/* Reference */}
            <div className="space-y-1.5 pt-2">
              <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider border-b border-slate-200 pb-1">References</h3>
              <p className="text-[11px] italic text-slate-600">Academic & industrial references available upon request from the Dean's Office, Kumasi Technical University.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
