import React from "react";
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  FileText, 
  BarChart3, 
  Presentation, 
  Cpu, 
  Zap,
  Boxes,
  Shield,
  Key,
  Lock,
  ChevronDown
} from "lucide-react";
import { UserProfile } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasApiKey: boolean;
  totalEnriched: number;
  currentUser: UserProfile;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasApiKey,
  totalEnriched,
  currentUser,
  onOpenAuthModal
}) => {
  const navItems = [
    { id: "portal", label: "Event Portal", icon: Boxes, badge: "Schedule • Tracks" },
    { id: "studio", label: "SKU Studio", icon: Sparkles, badge: "Live AI" },
    { id: "aiml", label: "AI/ML Hub", icon: Cpu, badge: "GenAI • NLP" },
    { id: "batch", label: "Batch Ingest", icon: Layers, badge: "Worker Threads" },
    { id: "validation", label: "Trust Matrix", icon: ShieldCheck, badge: "Zero-Hallucination" },
    { id: "datasheet", label: "Datasheet OCR", icon: FileText, badge: "Multimodal" },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: "Drift" },
    { id: "presentation", label: "Pitch Deck", icon: Presentation, badge: "15 Slides" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505] border-b border-white/10 shadow-2xl">
      {/* Top Banner with Hackathon info and live stats */}
      <div className="bg-[#0c0c0c] px-4 sm:px-6 py-1.5 border-b border-white/5 text-xs flex flex-wrap items-center justify-between gap-3 text-white/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#FF6B00] animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-black text-white/80">
            UniHack 2026 Official Project
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/70 font-semibold text-[11px] tracking-wide">Unilog & Hack2skill Series</span>
          <span className="hidden xl:inline text-white/40 text-[11px]">— Staff L6/L7 Industrial AI Catalog Architecture</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Security Tier Badge */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
            <Lock className="w-3 h-3" />
            <span className="font-bold uppercase tracking-wider">mTLS 1.3 • FIDO2 RBAC</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Model</span>
            <span className="text-[#FF6B00] font-bold bg-[#181818] px-2 py-0.5 border border-white/10">GEMINI 3.7 FLASH</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Enriched</span>
            <span className="text-white font-bold bg-[#181818] px-2 py-0.5 border border-white/10">{totalEnriched.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab("portal")}>
          <div className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center font-black text-black text-lg">
            U
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-white">UNILOG<span className="text-[#FF6B00]">PULSE</span></span>
              <span className="text-[9px] uppercase font-black tracking-[0.2em] px-1.5 py-0.5 bg-white/10 text-white/80 border border-white/20">40+ LPA</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Enterprise Product Intelligence</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#111] p-1 border border-white/10 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#FF6B00] text-black font-black shadow-md shadow-[#FF6B00]/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-white/40"}`} />
                <span>{item.label}</span>
                {item.id === "presentation" && (
                  <span className={`px-1 py-0.2 text-[8px] font-black uppercase tracking-widest border ${
                    isActive ? "bg-black text-white border-black" : "bg-[#FF6B00]/20 text-[#FF6B00] border-[#FF6B00]/40"
                  }`}>
                    15
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side: Google Sign In / Persona Pill & Auth Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {currentUser && currentUser.isLoggedIn ? (
            <button
              id="btn-auth-persona"
              onClick={onOpenAuthModal}
              className="flex items-center gap-2.5 bg-[#141414] hover:bg-[#1c1c1c] border border-white/15 hover:border-[#FF6B00] px-3 py-1.5 transition-all cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 object-cover border border-white/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-black rounded-full"></span>
              </div>
              
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black text-white uppercase leading-tight group-hover:text-[#FF6B00] transition-colors">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  {currentUser.authProvider === "GOOGLE_OAUTH" && (
                    <span className="w-3 h-3 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="text-[9px] font-mono text-[#FF6B00] font-bold uppercase tracking-wider leading-none">
                  {currentUser.roleLevel.split("•")[0].trim()}
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
            </button>
          ) : (
            <button
              id="btn-google-auth-trigger"
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-900 px-3.5 py-2 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Mobile Tab Select */}
          <div className="flex lg:hidden items-center">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-[#111] text-white text-xs border border-white/20 px-2 py-2 uppercase font-bold tracking-wider focus:outline-none focus:border-[#FF6B00]"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
