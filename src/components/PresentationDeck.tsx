import React, { useState } from "react";
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  Maximize2,
  Workflow,
  Network,
  Layout,
  FileCheck
} from "lucide-react";
import { HACKATHON_SLIDES } from "../data/hackathonSlidesData";

export const PresentationDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const slide = HACKATHON_SLIDES[currentSlideIndex];
  const totalSlides = HACKATHON_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleCopySlideText = () => {
    const text = `Slide ${slide.slideNumber}: ${slide.title}\n${slide.subtitle || ""}\n\n` +
      (slide.content.heading ? `${slide.content.heading}\n\n` : "") +
      (slide.content.paragraphs ? slide.content.paragraphs.join("\n\n") + "\n\n" : "") +
      (slide.content.bulletPoints ? slide.content.bulletPoints.map(b => `• ${b}`).join("\n") + "\n\n" : "") +
      (slide.content.qaList ? slide.content.qaList.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join("\n\n") : "");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
            <Presentation className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight font-display flex items-center gap-2">
              <span>UniHack 2026 Presentation Deck</span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FF6B00] text-black">Official Deck</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
              Interactive 15-slide pitch deck formatted strictly according to Unilog & Hack2skill hackathon guidelines.
            </p>
          </div>
        </div>

        {/* Slide navigation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="p-2.5 bg-[#181818] hover:bg-white hover:text-black disabled:opacity-20 text-white transition-colors cursor-pointer border border-white/15"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-black text-[#FF6B00] bg-[#050505] px-4 py-2.5 border border-white/10 uppercase tracking-wider">
            Slide {currentSlideIndex + 1} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-2.5 bg-[#181818] hover:bg-white hover:text-black disabled:opacity-20 text-white transition-colors cursor-pointer border border-white/15"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopySlideText}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#181818] hover:bg-[#FF6B00] hover:text-black text-white text-xs font-black uppercase tracking-wider border border-white/15 transition-colors cursor-pointer ml-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Slide Text"}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Card Presentation Canvas */}
      <div className="bg-[#0a0a0a] border border-white/15 p-6 sm:p-10 shadow-2xl min-h-[520px] flex flex-col justify-between relative overflow-hidden">
        {/* Slide Category & Top Logo Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-white uppercase tracking-tighter font-display">
              UNILOG
            </span>
            <span className="text-white/30 font-light">|</span>
            <span className="text-xs font-mono font-black text-[#FF6B00] uppercase tracking-widest">
              UniHack 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-[#181818] text-white border border-white/15">
              {slide.category}
            </span>
          </div>
        </div>

        {/* Slide Main Body Content */}
        <div className="py-8 space-y-6 flex-1">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-sm text-[#FF6B00] font-bold uppercase tracking-wider mt-2">
                {slide.subtitle}
              </p>
            )}
          </div>

          {slide.content.heading && (
            <h3 className="text-base font-black uppercase tracking-wider text-white/90">
              {slide.content.heading}
            </h3>
          )}

          {/* Paragraphs */}
          {slide.content.paragraphs && (
            <div className="space-y-3">
              {slide.content.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm text-white/80 leading-relaxed max-w-4xl font-medium">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Bullet Points */}
          {slide.content.bulletPoints && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
              {slide.content.bulletPoints.map((bp, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#050505] border border-white/10">
                  <span className="w-2 h-2 bg-[#FF6B00] mt-1.5 shrink-0"></span>
                  <span className="text-xs text-white/90 leading-relaxed font-medium">{bp}</span>
                </div>
              ))}
            </div>
          )}

          {/* Q&A List */}
          {slide.content.qaList && (
            <div className="space-y-4 max-w-4xl">
              {slide.content.qaList.map((qa, idx) => (
                <div key={idx} className="p-5 bg-[#050505] border border-white/10 space-y-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                    <span>{qa.question}</span>
                  </div>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {qa.answer}
                  </div>
                  {qa.highlights && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {qa.highlights.map((hl, hIdx) => (
                        <span key={hIdx} className="text-[10px] font-mono px-2 py-0.5 bg-[#181818] text-white border border-white/15">
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Stat Cards */}
          {slide.content.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-2">
              {slide.content.stats.map((st, idx) => (
                <div key={idx} className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-[#FF6B00] text-center">
                  <div className="text-[11px] text-white/50 uppercase font-black tracking-wider">{st.label}</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#FF6B00] mt-1">
                    {st.value}
                  </div>
                  {st.change && (
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{st.change}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Custom Diagram Type Views */}
          {slide.content.diagramType === "process-flow" && (
            <div className="p-6 bg-[#050505] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6B00]">
                <Workflow className="w-4 h-4 text-[#FF6B00]" />
                <span>Autonomous 6-Stage Industrial Enrichment Pipeline</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
                {[
                  { step: "1", name: "SKU Ingestion", desc: "Part # + Brand" },
                  { step: "2", name: "Suffix Parser", desc: "Decodes 2RS, 1BB" },
                  { step: "3", name: "Gemini 3.7 AI", desc: "15+ Tech Specs" },
                  { step: "4", name: "Rule Validator", desc: "ISO/DIN Boundary" },
                  { step: "5", name: "Interchange", desc: "OEM Cross-Ref" },
                  { step: "6", name: "PIM Sync", desc: "Golden Master" }
                ].map((st, i) => (
                  <div key={i} className="p-3 bg-[#111111] border border-white/10 text-center space-y-1">
                    <div className="w-6 h-6 bg-[#FF6B00] text-black text-xs font-black mx-auto flex items-center justify-center">
                      {st.step}
                    </div>
                    <div className="text-xs font-black uppercase tracking-wider text-white">{st.name}</div>
                    <div className="text-[10px] font-mono text-white/40">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.content.diagramType === "architecture" && (
            <div className="p-6 bg-[#050505] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6B00]">
                <Network className="w-4 h-4 text-[#FF6B00]" />
                <span>Multi-Tier Cloud-Native Architecture Blueprint</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-5 bg-[#111111] border border-white/10 space-y-2">
                  <span className="font-black text-[#FF6B00] uppercase text-[10px] tracking-wider">Client / Interface Tier</span>
                  <div className="text-white font-bold text-sm">React 19 + TypeScript + Tailwind</div>
                  <p className="text-white/50 text-xs">Dynamic interactive SKU studio, HITL visual diff, batch queue manager.</p>
                </div>

                <div className="p-5 bg-[#111111] border border-white/10 space-y-2">
                  <span className="font-black text-white uppercase text-[10px] tracking-wider">AI Reasoning & Ingestion</span>
                  <div className="text-white font-bold text-sm">Gemini 3.7 Flash + Node.js</div>
                  <p className="text-white/50 text-xs">Multimodal PDF datasheet OCR, suffix nomenclature decomposition, JSON schema.</p>
                </div>

                <div className="p-5 bg-[#111111] border border-white/10 space-y-2">
                  <span className="font-black text-emerald-400 uppercase text-[10px] tracking-wider">Deterministic Rule Engine</span>
                  <div className="text-white font-bold text-sm">ISO/DIN Standards + PIM Adapters</div>
                  <p className="text-white/50 text-xs">Physics sanity formulas, UNSPSC/ETIM classification, Unilog CIMM2 export.</p>
                </div>
              </div>
            </div>
          )}

          {/* Table Data */}
          {slide.content.tables && (
            <div className="overflow-x-auto border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#050505] text-white/50 font-black uppercase tracking-wider border-b border-white/10">
                  <tr>
                    {slide.content.tables.headers.map((h, i) => (
                      <th key={i} className="py-3.5 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0e0e0e]">
                  {slide.content.tables.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`py-3.5 px-4 ${cIdx === 0 ? "font-bold text-white uppercase" : "text-white/80"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Slide Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <div className="uppercase tracking-widest font-bold text-[10px]">
            AI-Powered Product Intelligence for Industrial Commerce
          </div>
          <div className="flex items-center gap-1.5">
            {HACKATHON_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 transition-all cursor-pointer ${
                  currentSlideIndex === idx ? "bg-[#FF6B00] w-6" : "bg-white/20 w-2 hover:bg-white/50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Thumbnail Strip for Quick Navigation */}
      <div className="bg-[#0d0d0d] border border-white/10 p-4 shadow-xl overflow-x-auto flex items-center gap-2">
        {HACKATHON_SLIDES.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`px-3.5 py-2.5 text-left whitespace-nowrap border text-xs transition-all cursor-pointer shrink-0 ${
              currentSlideIndex === idx
                ? "bg-[#FF6B00] text-black border-[#FF6B00] font-black"
                : "bg-[#050505] text-white/50 hover:text-white border-white/10 hover:bg-[#181818]"
            }`}
          >
            <div className="text-[9px] uppercase font-black tracking-widest opacity-80">Slide {s.slideNumber}</div>
            <div className="font-bold uppercase tracking-wider text-[11px] mt-0.5">{s.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
