import React, { useState } from "react";
import {
  Calendar,
  Award,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Clock,
  MapPin,
  Flame,
  Shield,
  Layers,
  Cpu,
  Zap,
  ChevronRight,
  X,
  Send,
  Download,
  Share2,
  Terminal
} from "lucide-react";

interface HackathonPortalProps {
  onOpenApp: (tab?: string) => void;
}

export const HackathonPortal: React.FC<HackathonPortalProps> = ({ onOpenApp }) => {
  const [activeModal, setActiveModal] = useState<"schedule" | "tracks" | "mentors" | "prizes" | "register" | null>(null);
  
  // Registration Form State
  const [teamName, setTeamName] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("Industrial AI Product Intelligence (UniPulse)");
  const [registeredBadge, setRegisteredBadge] = useState<any | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);

  // AI Mentor Chat State
  const [mentorQuery, setMentorQuery] = useState("");
  const [mentorMessages, setMentorMessages] = useState<Array<{ role: "user" | "mentor"; text: string }>>([
    {
      role: "mentor",
      text: "Hello Hacker! I'm your Unilog AI Technical Mentor. Ask me about catalog normalization schemas, UNSPSC/ETIM classification rules, or Gemini 3.7 Flash integration for your hackathon prototype!"
    }
  ]);
  const [mentorLoading, setMentorLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    const badgeData = {
      id: `UNILOG-${Math.floor(100000 + Math.random() * 900000)}`,
      teamName: teamName || `${leadName}'s Innovators`,
      leadName,
      leadEmail,
      track: selectedTrack,
      registeredAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "CONFIRMED_HACKER"
    };

    setRegisteredBadge(badgeData);
    setRegSuccess(true);
  };

  const handleSendMentorQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorQuery.trim() || mentorLoading) return;

    const userText = mentorQuery;
    setMentorMessages((prev) => [...prev, { role: "user", text: userText }]);
    setMentorQuery("");
    setMentorLoading(true);

    try {
      const res = await fetch("/api/ai/llm-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert Unilog Hackathon Technical Mentor. Provide actionable architectural advice for: "${userText}". Keep it concrete, referencing UNSPSC, ETIM, Gemini 3.7 Flash, or supply chain APIs.`,
          systemInstruction: "You are an encouraging, technical, hackathon mentor for Unilog 2026.",
          responseFormat: "text"
        })
      });
      const data = await res.json();
      setMentorMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          text: data.output || "Great hackathon idea! Ensure you validate physical boundary constraints (e.g. Bore < OD for mechanical parts) and output strict JSON for PIM interoperability."
        }
      ]);
    } catch {
      setMentorMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          text: "Recommended Approach: Use Gemini 3.7 Flash to extract unstructured specifications from supplier datasheets, parse suffix codes, and cross-reference with standard ISO/DIN taxonomy tables."
        }
      ]);
    } finally {
      setMentorLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Top Hackathon Portal Navigation Strip */}
      <div className="bg-[#0c0c0c] border border-white/10 p-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF6B00] text-black font-black flex items-center justify-center text-sm">
            U26
          </div>
          <span className="text-lg font-black uppercase text-white tracking-tighter">
            UNILOG<span className="text-[#FF6B00]">2026</span>
          </span>
        </div>

        {/* Action Navigation Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveModal("schedule")}
            className="px-3.5 py-2 text-xs uppercase font-black tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            SCHEDULE
          </button>
          <button
            onClick={() => setActiveModal("tracks")}
            className="px-3.5 py-2 text-xs uppercase font-black tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            TRACKS
          </button>
          <button
            onClick={() => setActiveModal("mentors")}
            className="px-3.5 py-2 text-xs uppercase font-black tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            MENTORS
          </button>
          <button
            onClick={() => setActiveModal("prizes")}
            className="px-3.5 py-2 text-xs uppercase font-black tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            PRIZES
          </button>
          <button
            onClick={() => onOpenApp("studio")}
            className="px-4 py-2 bg-transparent hover:bg-white text-white hover:text-black border border-white/30 text-xs uppercase font-black tracking-widest transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>OPEN EVENT / APP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Visual Section (Matching Screenshot) */}
      <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Display Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#181818] border border-white/10 text-xs font-mono text-[#FF6B00] uppercase font-bold tracking-wider mb-4">
                <span className="w-2 h-2 bg-[#FF6B00] animate-ping"></span>
                UNILOG GLOBAL HACKATHON SERIES 2026
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none font-display">
                FUTURE <br />
                <span className="text-white">OF</span> <br />
                <span className="text-[#FF6B00]">LOGISTICS</span>
              </h1>
            </div>

            <p className="text-sm uppercase tracking-widest text-white/60 font-bold max-w-xl">
              Unilog Global Hackathon Series — Building autonomous AI catalog intelligence, resilient supply chains, and green last-mile commerce.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="btn-register-now-hero"
                onClick={() => setActiveModal("register")}
                className="px-8 py-4 bg-[#FF6B00] hover:bg-white text-black font-black text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#FF6B00]/20"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-launch-ai-studio"
                onClick={() => onOpenApp("studio")}
                className="px-8 py-4 bg-[#181818] hover:bg-[#FF6B00] hover:text-black text-white border border-white/20 font-black text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>LAUNCH AI STUDIO</span>
              </button>
            </div>
          </div>

          {/* Right Column: Prize Pool & Key Meta Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Total Prize Pool Card */}
            <div className="bg-[#050505] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 space-y-2">
              <div className="text-[11px] font-black uppercase tracking-widest text-[#FF6B00]">
                TOTAL PRIZE POOL
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                $25,000
              </div>
              <p className="text-xs text-white/50 font-medium pt-1">
                Including innovation grants, hardware bundles, and cloud compute credits for winning teams.
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveModal("prizes")}
                  className="text-[#FF6B00] hover:text-white font-black uppercase tracking-wider text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>View Breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Registration & Location Meta Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#050505] border border-white/10 p-5 space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  REGISTRATION
                </div>
                <div className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                  FEB 14
                </div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">Open Now</div>
              </div>

              <div className="bg-[#050505] border border-white/10 p-5 space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  LOCATION
                </div>
                <div className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                  ONLINE
                </div>
                <div className="text-[10px] text-white/50 font-bold uppercase">Global Virtual</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Banner (Matching Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10 text-xs">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
              POWERED BY
            </div>
            <div className="text-sm font-black text-white uppercase">
              Hack2Skill Platform
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
              ACTIVE TRACKS
            </div>
            <div className="text-sm font-black text-white uppercase">
              Smart City • Green SC • Last Mile • AI PIM
            </div>
          </div>

          <div className="space-y-1 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                STATUS
              </div>
              <div className="text-sm font-black text-emerald-400 uppercase">
                Accepting Innovators
              </div>
            </div>
            <button
              onClick={() => setActiveModal("register")}
              className="px-4 py-2 bg-[#FF6B00] text-black font-black uppercase tracking-wider text-xs hover:bg-white cursor-pointer"
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>

      {/* Direct Interactive Features Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-black uppercase text-white tracking-tight font-display">
              Interactive Hackathon Modules & Tools
            </h2>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
              Click any module to launch live workflows, explore resources, or run AI tests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => onOpenApp("studio")}
            className="bg-[#0d0d0d] hover:bg-[#141414] border border-white/10 hover:border-[#FF6B00] p-6 space-y-4 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-black text-[#FF6B00] uppercase tracking-widest">
                LIVE GEMINI 3.7 FLASH
              </div>
              <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF6B00]">
                SKU Intelligence Studio
              </h3>
              <p className="text-xs text-white/60 font-medium">
                Live multimodal attribute enrichment, suffix decomposition, and confidence scoring.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-[#FF6B00] flex items-center gap-1">
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onOpenApp("aiml")}
            className="bg-[#0d0d0d] hover:bg-[#141414] border border-white/10 hover:border-[#FF6B00] p-6 space-y-4 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 bg-[#181818] border border-white/15 text-[#FF6B00] flex items-center justify-center font-black">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest">
                GENAI • PYTHON • NLP
              </div>
              <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF6B00]">
                AI/ML & Python Hub
              </h3>
              <p className="text-xs text-white/60 font-medium">
                Execute Python dataframes, industrial NLP tokenizers, and GCP cloud architecture tests.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#FF6B00] flex items-center gap-1">
              <span>Open AI/ML Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActiveModal("schedule")}
            className="bg-[#0d0d0d] hover:bg-[#141414] border border-white/10 hover:border-[#FF6B00] p-6 space-y-4 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 bg-[#181818] border border-white/15 text-emerald-400 flex items-center justify-center font-black">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                TIMELINE & AGENDA
              </div>
              <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF6B00]">
                Interactive Schedule
              </h3>
              <p className="text-xs text-white/60 font-medium">
                Live workshop dates, mentor office hours, hacking deadlines, and Demo Day schedule.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#FF6B00] flex items-center gap-1">
              <span>View Full Agenda</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onOpenApp("presentation")}
            className="bg-[#0d0d0d] hover:bg-[#141414] border border-white/10 hover:border-[#FF6B00] p-6 space-y-4 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 bg-[#181818] border border-white/15 text-purple-400 flex items-center justify-center font-black">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest">
                15 OFFICIAL SLIDES
              </div>
              <h3 className="text-lg font-black uppercase text-white group-hover:text-[#FF6B00]">
                Hackathon Pitch Deck
              </h3>
              <p className="text-xs text-white/60 font-medium">
                Complete pitch presentation compliant with Unilog & Hack2skill judging guidelines.
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#FF6B00] flex items-center gap-1">
              <span>Open Pitch Deck</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: REGISTRATION ================= */}
      {activeModal === "register" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/20 p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#181818] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!regSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                    OFFICIAL APPLICATION
                  </div>
                  <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                    Register for UniHack 2026
                  </h2>
                  <p className="text-xs text-white/50 font-medium">
                    Secure your entry into the $25,000 Unilog Global Hackathon.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-white/70">
                      Team / Project Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., UniPulse AI Innovators"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-white/70">
                      Team Lead Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex Johnson"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-white/70">
                      Work / Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@organization.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-white/70">
                      Selected Competition Track
                    </label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="Industrial AI Product Intelligence (UniPulse)">Industrial AI Product Intelligence (UniPulse)</option>
                      <option value="Smart City Logistics & Autonomous Fulfillment">Smart City Logistics & Autonomous Fulfillment</option>
                      <option value="Green Supply Chain & Carbon Optimization">Green Supply Chain & Carbon Optimization</option>
                      <option value="Last Mile Delivery & Robotics Routing">Last Mile Delivery & Robotics Routing</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40">100% Free Registration</span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FF6B00] hover:bg-white text-black font-black uppercase text-xs tracking-wider transition-colors cursor-pointer"
                  >
                    Confirm & Generate Pass
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-500 text-black mx-auto flex items-center justify-center font-black">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                    Registration Confirmed!
                  </h2>
                  <p className="text-xs text-white/60">
                    Your team is officially registered for UniHack 2026.
                  </p>
                </div>

                {/* Digital Ticket / Badge */}
                <div className="bg-[#050505] border-2 border-[#FF6B00] p-6 space-y-4 relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-black uppercase text-white">UNILOG2026 HACKER PASS</span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00]">{registeredBadge?.id}</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Team</div>
                      <div className="text-base font-black text-white uppercase">{registeredBadge?.teamName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase">Lead</div>
                        <div className="font-bold text-white/90">{registeredBadge?.leadName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase">Date</div>
                        <div className="font-mono text-white/90">{registeredBadge?.registeredAt}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Track</div>
                      <div className="text-xs font-mono text-[#FF6B00] font-bold">{registeredBadge?.track}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onOpenApp("studio");
                    }}
                    className="flex-1 py-3 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    Enter Live AI Studio Now
                  </button>
                  <button
                    onClick={() => setRegSuccess(false)}
                    className="px-4 py-3 bg-[#181818] text-white font-bold uppercase text-xs border border-white/15 hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: SCHEDULE ================= */}
      {activeModal === "schedule" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#181818] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                OFFICIAL HACKATHON AGENDA
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                UniHack 2026 Timeline & Schedule
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  day: "DAY 1 • FEB 14",
                  time: "10:00 AM EST",
                  title: "Opening Ceremony & Unilog Problem Statements",
                  desc: "Keynotes from Unilog Leadership, release of industrial catalog dataset APIs, and team check-ins."
                },
                {
                  day: "DAY 1 • FEB 14",
                  time: "02:00 PM EST",
                  title: "Workshop: Building with Gemini 3.7 Flash & PIM APIs",
                  desc: "Hands-on coding session demonstrating multimodal PDF OCR extraction and deterministic sanity rules."
                },
                {
                  day: "DAY 2 • FEB 15",
                  time: "11:00 AM EST",
                  title: "1:1 Technical Mentor Office Hours",
                  desc: "Review taxonomy mapping, UNSPSC/ETIM classification accuracy, and high-throughput batch pipelines."
                },
                {
                  day: "DAY 2 • FEB 15",
                  time: "08:00 PM EST",
                  title: "Mid-Hack Milestone & Prototype Check-in",
                  desc: "Submit initial GitHub repository links and working demo video checkpoints."
                },
                {
                  day: "DAY 3 • FEB 16",
                  time: "04:00 PM EST",
                  title: "Final Code Freeze & Demo Submissions",
                  desc: "Final deadline for live applications, test logs, and pitch presentations."
                },
                {
                  day: "DAY 3 • FEB 16",
                  time: "07:00 PM EST",
                  title: "Live Grand Finale & $25,000 Award Ceremony",
                  desc: "Top 5 teams present live to judges from Unilog, Google AI Studio, and supply chain venture funds."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#050505] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#FF6B00]">{item.day}</span>
                    <span className="font-mono text-white/50">{item.time}</span>
                  </div>
                  <div className="text-sm font-black uppercase text-white">{item.title}</div>
                  <p className="text-xs text-white/60 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenApp("studio")}
              className="w-full py-3 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Start Building Now
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: TRACKS ================= */}
      {activeModal === "tracks" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/20 p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#181818] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                INNOVATION CHALLENGES
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                4 Official Competition Tracks
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "1. Industrial AI Product Intelligence (UniPulse)",
                  badge: "FEATURED TRACK",
                  prize: "$10,000",
                  desc: "Autonomous enrichment of complex engineering SKUs, suffix decoding, physical unit validation, and UNSPSC/ETIM classification."
                },
                {
                  title: "2. Smart City Logistics & Fulfillment",
                  badge: "TRACK 2",
                  prize: "$5,000",
                  desc: "Predictive warehousing, dynamic slotting, autonomous inventory replenishment, and robotics warehouse orchestration."
                },
                {
                  title: "3. Green Supply Chain & Carbon Optimization",
                  badge: "TRACK 3",
                  prize: "$5,000",
                  desc: "Scope 3 carbon calculation per SKU shipment, eco-friendly supplier scoring, and route decarbonization algorithms."
                },
                {
                  title: "4. Last Mile Delivery & Dynamic Routing",
                  badge: "TRACK 4",
                  prize: "$5,000",
                  desc: "Real-time traffic adaptation, micro-hub distribution, and drone/autonomous delivery vehicle dispatch systems."
                }
              ].map((t, idx) => (
                <div key={idx} className="p-5 bg-[#050505] border border-white/10 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#FF6B00] font-bold">{t.badge}</span>
                      <span className="text-white font-bold bg-[#181818] px-2 py-0.5 border border-white/10">{t.prize}</span>
                    </div>
                    <div className="text-base font-black uppercase text-white mt-1">{t.title}</div>
                    <p className="text-xs text-white/60 font-medium mt-1">{t.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onOpenApp("studio");
                    }}
                    className="mt-4 w-full py-2 bg-[#181818] hover:bg-[#FF6B00] hover:text-black text-white text-xs font-black uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
                  >
                    Build for this Track
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MENTORS ================= */}
      {activeModal === "mentors" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#181818] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                24/7 TECHNICAL ADVISORY
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                Ask Unilog AI Technical Mentor
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="bg-[#050505] border border-white/10 p-4 space-y-3 max-h-64 overflow-y-auto font-mono text-xs">
              {mentorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 border ${
                    msg.role === "mentor"
                      ? "bg-[#0d0d0d] border-[#FF6B00]/40 text-white/90"
                      : "bg-[#181818] border-white/20 text-[#FF6B00]"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">
                    {msg.role === "mentor" ? "🤖 UNILOG AI MENTOR" : "👤 YOU"}
                  </div>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMentorQuery} className="flex items-center gap-2">
              <input
                type="text"
                value={mentorQuery}
                onChange={(e) => setMentorQuery(e.target.value)}
                placeholder="Ask technical question about PIM schemas, UNSPSC, or Gemini SDK..."
                className="flex-1 bg-[#050505] border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                type="submit"
                disabled={mentorLoading}
                className="px-5 py-3 bg-[#FF6B00] hover:bg-white text-black font-black uppercase text-xs tracking-wider transition-colors cursor-pointer disabled:opacity-50"
              >
                {mentorLoading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PRIZES ================= */}
      {activeModal === "prizes" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#181818] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                AWARDS & INCENTIVES
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                $25,000 Prize Pool Breakdown
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  place: "🏆 GRAND PRIZE CHAMPION",
                  amount: "$12,000",
                  desc: "Overall best end-to-end industrial commerce AI product with live demo and verified accuracy."
                },
                {
                  place: "🥈 1ST RUNNER UP",
                  amount: "$6,000",
                  desc: "Top technical execution across high-throughput catalog batch enrichment."
                },
                {
                  place: "⚡ BEST GENERATIVE AI INNOVATION",
                  amount: "$4,000",
                  desc: "Most innovative utilization of Gemini 3.7 Flash multimodal OCR and reasoning."
                },
                {
                  place: "☁️ CLOUD & DEVELOPER GRANTS",
                  amount: "$3,000",
                  desc: "Direct Google Cloud compute credits and fast-track interviews with Unilog engineering."
                }
              ].map((p, idx) => (
                <div key={idx} className="p-4 bg-[#050505] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-black uppercase text-white">{p.place}</div>
                    <p className="text-xs text-white/60 font-medium">{p.desc}</p>
                  </div>
                  <div className="text-xl font-black font-mono text-[#FF6B00] shrink-0">{p.amount}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModal("register");
              }}
              className="w-full py-3 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Register for the Prize Pool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
