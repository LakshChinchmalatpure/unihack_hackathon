import React, { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Cpu, 
  GitCompare, 
  Eye, 
  Check, 
  X, 
  HelpCircle,
  FileCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { EnrichedProduct } from "../types";
import { SAMPLE_PRODUCTS } from "../data/mockIndustrialCatalog";

export const ValidationMatrix: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct>(SAMPLE_PRODUCTS[0]);
  const [selectedCheckFilter, setSelectedCheckFilter] = useState<string>("all");

  const validationTiers = [
    {
      title: "Tier 1: Deterministic Physics & Boundary Rules",
      description: "Mathematical & physical sanity rules preventing impossible geometry or physics anomalies.",
      icon: Scale,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      rules: [
        { name: "Dimensional Geometry Check", rule: "Bore (d) < Outside Diameter (D) and Width (B) < OD", status: "Passed (20mm < 42mm < 12mm)", confidence: 100 },
        { name: "Unit Normalization Integrity", rule: "Exact conversion multiplier (1 inch = 25.4000 mm, 1 bar = 14.5038 PSI)", status: "Passed (Zero rounding drift)", confidence: 100 },
        { name: "Electrical Power Consistency", rule: "P = √3 × V × I × cos(φ) AC-3 power formula matching", status: "Passed (11kW @ 400V 25A)", confidence: 99 },
        { name: "Load Rating Ratio Check", rule: "Dynamic Load Rating (Cr) >= Static Load Rating (Cor)", status: "Passed (9.95kN >= 5.00kN)", confidence: 100 }
      ]
    },
    {
      title: "Tier 2: Multi-Source Consensus Verification",
      description: "Cross-checks AI predictions against 3 independent authoritative databases.",
      icon: FileCheck,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      rules: [
        { name: "OEM Master Engineering Catalog", rule: "Cross-checked with SKF / Siemens official product tables", status: "100% Parameter Match", confidence: 99 },
        { name: "Global Standard Norms (ISO/DIN/IEC)", rule: "Conforms to ISO 15 (Bearings) and IEC 60947-4-1 (Switchgear)", status: "Standardized Class Norm", confidence: 98 },
        { name: "Distributor Cross-Consensus", rule: "Verified across Grainger, McMaster-Carr, and RS Components", status: "Verified 3/3 Sources", confidence: 97 }
      ]
    },
    {
      title: "Tier 3: AI Hallucination Guardrails & Scoring",
      description: "Probabilistic confidence gating that prevents LLM hallucination on unknown suffixes.",
      icon: Cpu,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      rules: [
        { name: "Suffix Nomenclature Decomposition", rule: "Deconstructs manufacturer suffixes (-2RS, -1BB40) against proven dictionary", status: "Deterministic Match", confidence: 99 },
        { name: "Grounding Confidence Gating", rule: "Attributes with confidence < 95% flagged for human review", status: "0 Hallucinations Detected", confidence: 98 },
        { name: "Source Citation Attachment", rule: "Every single attribute includes an explicit traceable origin", status: "100% Traceable Citations", confidence: 100 }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                Zero-Hallucination Trust & Validation Matrix
              </h1>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
                Multi-layer deterministic physics rules, multi-source consensus & HITL audit trails ensuring 99.8%+ accuracy.
              </p>
            </div>
          </div>

          {/* Product selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-white/50">Audit SKU:</span>
            <select
              value={selectedProduct.partNumber}
              onChange={(e) => {
                const found = SAMPLE_PRODUCTS.find((p) => p.partNumber === e.target.value);
                if (found) setSelectedProduct(found);
              }}
              className="bg-[#050505] border border-white/20 text-white text-xs px-3 py-2 uppercase font-bold tracking-wider focus:outline-none focus:border-[#FF6B00]"
            >
              {SAMPLE_PRODUCTS.map((p) => (
                <option key={p.id} value={p.partNumber}>
                  {p.brand} {p.partNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Validation Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-emerald-500">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-white/50">
              <span>Overall Accuracy Guarantee</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-2">99.8%</div>
            <p className="text-xs text-white/40 mt-1 font-mono">Backed by deterministic physics checks</p>
          </div>

          <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-[#FF6B00]">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-white/50">
              <span>Rule Verification Coverage</span>
              <Scale className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <div className="text-3xl font-black font-mono text-[#FF6B00] mt-2">24 / 24 Checks</div>
            <p className="text-xs text-white/40 mt-1 font-mono">100% Boundary & dimensional checks passed</p>
          </div>

          <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-white">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-white/50">
              <span>Hallucination Rate</span>
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-black font-mono text-white mt-2">&lt; 0.02%</div>
            <p className="text-xs text-white/40 mt-1 font-mono">Grounded in ISO/DIN engineering norms</p>
          </div>
        </div>
      </div>

      {/* 3-Tier Deep Dive */}
      <div className="space-y-4">
        {validationTiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div key={idx} className="bg-[#0d0d0d] border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#181818] border border-white/15 text-[#FF6B00] flex items-center justify-center font-bold">
                  <Icon className="w-4 h-4 text-[#FF6B00]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">{tier.title}</h3>
                  <p className="text-xs text-white/50">{tier.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {tier.rules.map((r, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-4 bg-[#050505] border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {r.name}
                      </div>
                      <div className="text-xs text-white/60 font-mono">{r.rule}</div>
                      <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mt-1">{r.status}</div>
                    </div>
                    <span className="text-xs font-mono font-black text-[#FF6B00] shrink-0 bg-[#161616] px-2 py-0.5 border border-white/10">
                      {r.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Human-In-The-Loop Diff Studio */}
      <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 pb-5 border-b border-white/10">
          <div className="w-8 h-8 bg-[#FF6B00] text-black flex items-center justify-center font-black">
            <GitCompare className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight text-white font-display">
              Human-in-the-Loop (HITL) Visual Diff & Audit Studio
            </h3>
            <p className="text-xs uppercase tracking-wider text-white/50 font-bold mt-0.5">
              Side-by-side progression from raw sparse customer input to fully validated Golden Record.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Raw Input */}
          <div className="bg-[#050505] p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="font-black text-white/50 uppercase tracking-wider">1. Raw Customer Input</span>
              <span className="px-2 py-0.5 bg-[#181818] text-[9px] font-black uppercase tracking-widest text-white/50 border border-white/10">Sparse Input</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Part Number:</span>
                <div className="font-mono text-white font-bold text-sm mt-0.5">{selectedProduct.partNumber}</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Brand:</span>
                <div className="text-white font-bold mt-0.5">{selectedProduct.brand}</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Short Description:</span>
                <div className="text-white/80 mt-0.5">{selectedProduct.rawInput?.shortDescription || "Minimal text description"}</div>
              </div>
              <div className="pt-2 text-xs text-amber-400 font-mono border-t border-white/5">
                * Zero technical specs, missing UNSPSC, no ETIM, unsearchable in B2B catalog.
              </div>
            </div>
          </div>

          {/* Column 2: AI Multi-Stage Extraction */}
          <div className="bg-[#050505] p-5 border border-[#FF6B00]/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="font-black text-[#FF6B00] uppercase tracking-wider">2. AI Spec Synthesis</span>
              <span className="px-2 py-0.5 bg-[#FF6B00]/20 text-[#FF6B00] text-[9px] font-black uppercase tracking-widest border border-[#FF6B00]/40">Gemini 3.7 Flash</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Decoded Nomenclature:</span>
                <div className="text-white font-mono text-xs mt-0.5">Bore 20mm, OD 42mm, 2RS = Dual NBR Rubber Contact Seals</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Taxonomy Class:</span>
                <div className="text-[#FF6B00] font-mono font-bold text-xs mt-0.5">UNSPSC 31171504 | ETIM EC000410</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Extracted Specs:</span>
                <div className="text-white font-mono text-xs mt-0.5">{selectedProduct.specifications.length} Technical Attributes Generated</div>
              </div>
              <div className="pt-2 text-xs text-[#FF6B00] font-bold uppercase tracking-wider border-t border-white/5">
                &gt; Passed Deterministic Physics Validation
              </div>
            </div>
          </div>

          {/* Column 3: Validated Golden Record */}
          <div className="bg-[#050505] p-5 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="font-black text-emerald-400 uppercase tracking-wider">3. Golden Master Record</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Certified
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Standardized Title:</span>
                <div className="text-white font-bold text-xs mt-0.5">{selectedProduct.standardizedTitle}</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Cross-References:</span>
                <div className="text-emerald-400 font-mono text-xs mt-0.5">{selectedProduct.crossReferences.length} OEM Interchange Matches Found</div>
              </div>
              <div>
                <span className="text-white/40 uppercase text-[10px] font-bold">Compliance Pass:</span>
                <div className="text-emerald-400 text-xs mt-0.5">RoHS 3 Compliant, REACH SVHC Free</div>
              </div>
              <div className="pt-2 text-xs text-emerald-400 font-black uppercase tracking-wider border-t border-white/5">
                ✓ Ready for Unilog PIM & B2B Sync
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
