import React, { useState } from "react";
import { Search, MapPin, Compass, Info, Building, School, Landmark } from "lucide-react";
import { PRESEEDED_CAMPUS_LOCATIONS } from "../data";
import { CampusLocation } from "../types";

export default function CampusMap() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLoc, setSelectedLoc] = useState<CampusLocation | null>(PRESEEDED_CAMPUS_LOCATIONS[0]);

  const filteredLocations = PRESEEDED_CAMPUS_LOCATIONS.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase()) || 
                          loc.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-6" id="campus-map-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#003366] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#FFD700] animate-spin-slow" />
            Interactive KsTU Campus Map
          </h2>
          <p className="text-xs text-slate-500">Locate departments, lecture halls, administrative blocks, and hostel structures instantly o!</p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          {["All", "Admin", "Lecture Hall", "Department", "Hostel", "Facility"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat 
                  ? "bg-[#003366] text-white shadow-xs" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Search & Locations List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search building, library, bank, clinic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all"
            />
          </div>

          <div className="overflow-y-auto max-h-[380px] space-y-2 pr-1">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  selectedLoc?.id === loc.id 
                    ? "bg-[#FFD700]/10 border-[#FFD700]/30 text-slate-900 shadow-xs" 
                    : "border-slate-100 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  selectedLoc?.id === loc.id ? "bg-[#FFD700]/20 text-[#003366]" : "bg-slate-100 text-slate-500"
                }`}>
                  {loc.category === "Admin" ? <Landmark className="w-4 h-4" /> : 
                   loc.category === "Lecture Hall" ? <School className="w-4 h-4" /> : 
                   <Building className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs truncate">{loc.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium capitalize mt-0.5">{loc.category}</p>
                </div>
              </button>
            ))}

            {filteredLocations.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-8">Chale, no campus locations found for your search.</p>
            )}
          </div>
        </div>

        {/* Center: Beautiful Interactive Vector Map */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="relative bg-slate-100 rounded-2xl border border-slate-200 p-4 aspect-[16/10] flex items-center justify-center overflow-hidden">
            {/* Visual Vector Campus Representation */}
            <svg 
              viewBox="0 0 100 60" 
              className="w-full h-full select-none"
              style={{ maxHeight: "350px" }}
            >
              {/* Background Campus Roads & Walkways */}
              <rect x="0" y="0" width="100" height="60" fill="#f8fafc" rx="4" />
              
              {/* Central Ring Road / Loop */}
              <ellipse cx="50" cy="45" rx="35" ry="12" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
              <path d="M 50 5 L 50 55" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="2 2" />
              <path d="M 5 45 L 95 45" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="2 2" />

              {/* Campus Main Gate */}
              <g transform="translate(50, 56)">
                <rect x="-8" y="-2" width="16" height="4" fill="#64748b" rx="1" />
                <text x="0" y="-3" fontSize="2" fill="#475569" fontWeight="bold" textAnchor="middle">KsTU MAIN GATE</text>
              </g>

              {/* Map Locations Pins / Markers */}
              {PRESEEDED_CAMPUS_LOCATIONS.map((loc) => {
                const isSelected = selectedLoc?.id === loc.id;
                // Scale Y coordinate to fit our aspect ratio (max height 60)
                const mappedY = (loc.coordinates.y / 100) * 60;
                
                return (
                  <g 
                    key={loc.id} 
                    transform={`translate(${loc.coordinates.x}, ${mappedY})`}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedLoc(loc)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle r="6" fill="none" stroke="#FFD700" strokeWidth="0.8" className="animate-ping" style={{ transformOrigin: '0px 0px' }} />
                    )}
                    
                    {/* Building Marker */}
                    <circle 
                      r="4" 
                      fill={isSelected ? "#FFD700" : "#003366"} 
                      stroke="#ffffff" 
                      strokeWidth="1" 
                      className="hover:scale-125 transition-transform"
                    />

                    {/* Simple Landmark Icon / Character representation */}
                    <text 
                      y="1.5" 
                      fontSize="3.5" 
                      fill="#ffffff" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {loc.name[0]}
                    </text>

                    {/* Label */}
                    <text 
                      y="-6" 
                      fontSize="2.2" 
                      fill={isSelected ? "#003366" : "#334155"} 
                      fontWeight="bold" 
                      textAnchor="middle"
                      className="bg-white/80 p-0.5 rounded"
                    >
                      {loc.name.split(" ").slice(0, 2).join(" ")}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float Legend */}
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-slate-200 text-[10px] text-slate-600 space-y-1 shadow-xs">
              <div className="font-semibold text-slate-800 border-b border-slate-100 pb-0.5 mb-1 text-center">Map Key</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#003366] rounded-full inline-block" />
                <span>Standard Location</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#FFD700] rounded-full inline-block" />
                <span>Selected Block</span>
              </div>
            </div>
          </div>

          {/* Details Panel for Selected Location */}
          {selectedLoc && (
            <div className="p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl space-y-2 animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-[#FFD700] text-[#003366] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                    {selectedLoc.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-800 mt-2">{selectedLoc.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#003366] font-bold bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                  <span>X: {selectedLoc.coordinates.x}, Y: {selectedLoc.coordinates.y}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedLoc.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
