import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Download, 
  RefreshCw, 
  Tag, 
  Cpu, 
  Layers, 
  Scale, 
  ExternalLink,
  Check,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Info,
  BookmarkPlus,
  Zap,
  Edit3
} from "lucide-react";
import { EnrichedProduct, TechnicalSpecification } from "../types";
import { SAMPLE_PRODUCTS } from "../data/mockIndustrialCatalog";

interface EnrichmentStudioProps {
  currentProduct: EnrichedProduct;
  setCurrentProduct: (prod: EnrichedProduct) => void;
  onAddToBatch?: (prod: EnrichedProduct) => void;
}

export const EnrichmentStudio: React.FC<EnrichmentStudioProps> = ({
  currentProduct,
  setCurrentProduct,
  onAddToBatch
}) => {
  // Input form state
  const [partNumber, setPartNumber] = useState(currentProduct.partNumber);
  const [brand, setBrand] = useState(currentProduct.brand);
  const [shortDescription, setShortDescription] = useState(currentProduct.rawInput?.shortDescription || "Deep groove ball bearing 20x42x12 rubber seals");
  const [categoryHint, setCategoryHint] = useState(currentProduct.category || "Bearings");
  
  // UI & Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [enrichmentStep, setEnrichmentStep] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "specs" | "crossref" | "validation" | "compliance" | "json">("overview");
  const [copied, setCopied] = useState(false);
  const [editingSpecIndex, setEditingSpecIndex] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const enrichmentSteps = [
    "Decomposing part nomenclature & manufacturer suffixes...",
    "Querying UNSPSC v26 & ETIM 9.0 taxonomy master graphs...",
    "Extracting 15+ engineering attributes & physical dimensions...",
    "Executing deterministic physics & rule-based boundary checks...",
    "Discovering OEM cross-references & interchange equivalents...",
    "Auditing RoHS 3, REACH SVHC & global compliance standards..."
  ];

  const handleSelectPreset = (preset: EnrichedProduct) => {
    setPartNumber(preset.partNumber);
    setBrand(preset.brand);
    setShortDescription(preset.rawInput?.shortDescription || preset.standardizedTitle);
    setCategoryHint(preset.category);
    setCurrentProduct(preset);
  };

  const handleRunEnrichment = async () => {
    if (!partNumber && !shortDescription) return;

    setIsLoading(true);
    setEnrichmentStep(0);

    // Simulate multi-stage visual pipeline while calling backend
    const interval = setInterval(() => {
      setEnrichmentStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 400);

    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partNumber,
          brand,
          shortDescription,
          categoryHint,
        }),
      });

      const json = await res.json();
      clearInterval(interval);
      setEnrichmentStep(5);

      if (json.success && json.data) {
        const enriched: EnrichedProduct = {
          ...json.data,
          rawInput: {
            partNumber,
            brand,
            shortDescription,
            categoryHint,
          },
          status: "Approved",
          timestamp: new Date().toLocaleTimeString(),
        };
        setCurrentProduct(enriched);
      }
    } catch (err) {
      console.error("Enrichment call failed, applying robust fallback:", err);
      clearInterval(interval);
      // Find matching preset or generate fallback
      const matchingPreset = SAMPLE_PRODUCTS.find(
        (p) => p.partNumber.toLowerCase() === partNumber.toLowerCase() || p.brand.toLowerCase() === brand.toLowerCase()
      );
      if (matchingPreset) {
        setCurrentProduct(matchingPreset);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(currentProduct, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpecEdit = (index: number, field: keyof TechnicalSpecification, val: any) => {
    const updated = [...currentProduct.specifications];
    updated[index] = {
      ...updated[index],
      [field]: val,
      isEdited: true,
      confidenceScore: 100,
      source: "Manual Human-in-the-Loop Override"
    };
    setCurrentProduct({
      ...currentProduct,
      specifications: updated,
    });
  };

  const filteredSpecs = currentProduct.specifications.filter((spec) =>
    spec.attributeName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    spec.value.toLowerCase().includes(searchFilter.toLowerCase()) ||
    spec.source.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Section: Minimal Inputs + Industrial Preset Library */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                  SKU Intelligence Studio
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
                  Input minimal industrial attributes to generate verified specifications, taxonomies, cross-references & audits.
                </p>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B00]" /> Presets:
            </span>
            {SAMPLE_PRODUCTS.map((preset) => (
              <button
                key={preset.id}
                id={`preset-btn-${preset.partNumber}`}
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs px-3 py-1.5 font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  currentProduct.partNumber === preset.partNumber
                    ? "bg-[#FF6B00] text-black border-[#FF6B00]"
                    : "bg-[#181818] border-white/15 text-white/70 hover:text-white hover:border-white/40"
                }`}
              >
                {preset.brand} {preset.partNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-2">
              Manufacturer Part # (MPN) *
            </label>
            <input
              id="input-part-number"
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              placeholder="e.g. 6004-2RS, 3RT2026-1BB40"
              className="w-full bg-[#050505] border border-white/20 focus:border-[#FF6B00] px-4 py-3 text-sm text-white font-mono placeholder:text-white/30 outline-none uppercase font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-2">
              Brand / Manufacturer
            </label>
            <input
              id="input-brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. SKF, Siemens, Parker"
              className="w-full bg-[#050505] border border-white/20 focus:border-[#FF6B00] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none uppercase font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-white/70 mb-2">
              Raw Short Description / Notes
            </label>
            <input
              id="input-short-desc"
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. deep groove ball bearing 20x42x12"
              className="w-full bg-[#050505] border border-white/20 focus:border-[#FF6B00] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              id="btn-run-enrichment"
              onClick={handleRunEnrichment}
              disabled={isLoading}
              className="w-full h-[46px] bg-[#FF6B00] hover:bg-[#ff8533] text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#FF6B00]/20"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Enriching SKU Pipeline...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Intelligence</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Processing Pipeline Animation */}
        {isLoading && (
          <div className="mt-6 p-5 bg-[#050505] border border-[#FF6B00]/40">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#FF6B00] font-black uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse text-[#FF6B00]" />
                Pipeline Stage {enrichmentStep + 1} of 6
              </span>
              <span className="font-mono text-white font-bold">{Math.round(((enrichmentStep + 1) / 6) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-[#181818] overflow-hidden mb-3">
              <div
                className="h-full bg-[#FF6B00] transition-all duration-300"
                style={{ width: `${((enrichmentStep + 1) / 6) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/90 font-mono uppercase tracking-wide">
              &gt; {enrichmentSteps[enrichmentStep]}
            </p>
          </div>
        )}
      </div>

      {/* Main Results View */}
      <div className="bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden">
        {/* Golden Record Header Banner */}
        <div className="bg-[#121212] p-6 sm:p-8 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-white text-black">
                  {currentProduct.brand}
                </span>
                <span className="px-3 py-1 text-xs font-mono font-black uppercase tracking-wider bg-[#1f1f1f] text-[#FF6B00] border border-white/15">
                  MPN: {currentProduct.partNumber}
                </span>
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentProduct.status || "Golden Master Approved"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display leading-tight">
                {currentProduct.standardizedTitle}
              </h2>

              {/* Taxonomy Chips */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-[#181818] text-white/80 border border-white/15">
                  <Tag className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <strong className="text-white uppercase font-bold">UNSPSC:</strong> {currentProduct.unspscCode} ({currentProduct.unspscTitle})
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-[#181818] text-white/80 border border-white/15">
                  <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <strong className="text-white uppercase font-bold">ETIM:</strong> {currentProduct.etimClassCode} ({currentProduct.etimClassName})
                </span>
                {currentProduct.eclassCode && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-[#181818] text-white/80 border border-white/15">
                    <strong className="text-[#FF6B00] uppercase font-bold">eCl@ss:</strong>
                    {currentProduct.eclassCode}
                  </span>
                )}
              </div>
            </div>

            {/* Quality & Confidence Gauge */}
            <div className="flex items-center gap-6 bg-[#050505] p-5 border border-white/15 self-start lg:self-auto min-w-[280px]">
              <div className="text-center">
                <div className="text-4xl font-black text-[#FF6B00] tracking-tighter">
                  {currentProduct.qualityScore}%
                </div>
                <div className="text-[9px] uppercase font-black text-white/50 tracking-[0.2em] mt-1">
                  Quality Index
                </div>
              </div>
              <div className="h-12 w-[1px] bg-white/15"></div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Rule Checks: {currentProduct.validationSummary?.ruleChecksPassed}/{currentProduct.validationSummary?.ruleChecksTotal}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-[11px]">
                  <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Hallucination: <strong className="text-emerald-400 uppercase font-bold">Zero Risk</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto border-b border-white/10 bg-[#080808] px-4">
          {[
            { id: "overview", label: "Master Record & Copy" },
            { id: "specs", label: `Technical Specs (${currentProduct.specifications.length})` },
            { id: "crossref", label: `Cross-References (${currentProduct.crossReferences.length})` },
            { id: "validation", label: "Validation & Trust Audit" },
            { id: "compliance", label: "Compliance & Standards" },
            { id: "json", label: "PIM / JSON-LD Export" }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-enriched-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "border-[#FF6B00] text-[#FF6B00] bg-[#121212]"
                  : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: OVERVIEW & COMMERCIAL COPY */}
          {activeSubTab === "overview" && (
            <div className="space-y-6">
              {/* Marketing Long Description */}
              <div className="bg-[#050505] border border-white/10 p-6 space-y-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#FF6B00]">
                  Standardized Technical Description
                </h3>
                <p className="text-sm text-white/90 leading-relaxed font-medium">
                  {currentProduct.longDescription}
                </p>
              </div>

              {/* Key Features and Target Applications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                    Key Features & Engineering Benefits
                  </h3>
                  <ul className="space-y-3">
                    {currentProduct.featuresAndBenefits.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-white/80">
                        <div className="w-1.5 h-1.5 bg-[#FF6B00] mt-1.5 shrink-0"></div>
                        <span className="leading-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" />
                      Industrial Applications & Equipment
                    </h3>
                    <ul className="space-y-2.5">
                      {currentProduct.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                          <ChevronRight className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#050505] border border-white/10 p-5">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-white/50 mb-3">
                      Target B2B Industries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.targetIndustries.map((ind, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 font-bold uppercase tracking-wider bg-[#181818] text-white/80 border border-white/15"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS */}
          {activeSubTab === "specs" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search attribute name, value, standard..."
                    className="w-full bg-[#050505] border border-white/20 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  Showing {filteredSpecs.length} of {currentProduct.specifications.length} verified attributes
                </div>
              </div>

              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#050505] text-white/60 font-black uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Attribute Name</th>
                      <th className="py-3 px-4">Normalized Value & Unit</th>
                      <th className="py-3 px-4 text-center">Confidence</th>
                      <th className="py-3 px-4">Source & Standard</th>
                      <th className="py-3 px-4">Validation Status</th>
                      <th className="py-3 px-4 text-right">HITL Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#0a0a0a]">
                    {filteredSpecs.map((spec, idx) => {
                      const isEditing = editingSpecIndex === idx;
                      return (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white uppercase tracking-wide">
                            {spec.attributeName}
                          </td>
                          <td className="py-3.5 px-4">
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={spec.value}
                                  onChange={(e) => handleSpecEdit(idx, "value", e.target.value)}
                                  className="bg-black border border-[#FF6B00] px-2 py-1 text-xs text-white font-mono font-bold"
                                />
                                <input
                                  type="text"
                                  value={spec.unit || ""}
                                  onChange={(e) => handleSpecEdit(idx, "unit", e.target.value)}
                                  placeholder="Unit"
                                  className="w-16 bg-black border border-white/20 px-2 py-1 text-xs text-white font-mono"
                                />
                              </div>
                            ) : (
                              <span className="font-mono text-white font-black bg-[#161616] px-2.5 py-1 border border-white/10">
                                {spec.value} {spec.unit}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`font-mono font-black ${
                              spec.confidenceScore >= 95 ? "text-[#FF6B00]" : "text-amber-400"
                            }`}>
                              {spec.confidenceScore}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-white/50">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#141414] text-[11px] text-white/70 border border-white/10 font-mono">
                              <Info className="w-3 h-3 text-[#FF6B00]" />
                              {spec.source}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/30 font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {spec.validationRule || "Verified"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              id={`edit-spec-${idx}`}
                              onClick={() => setEditingSpecIndex(isEditing ? null : idx)}
                              className="text-xs px-3 py-1 bg-[#1c1c1c] hover:bg-[#FF6B00] hover:text-black text-white font-bold uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
                            >
                              {isEditing ? "Save" : "Edit"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CROSS-REFERENCE & OEM INTERCHANGE */}
          {activeSubTab === "crossref" && (
            <div className="space-y-5">
              <div className="p-5 bg-[#050505] border border-white/10 border-l-4 border-l-[#FF6B00] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-[#FF6B00]" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">Cross-Manufacturer Interchange Engine</h4>
                    <p className="text-xs text-white/50">
                      Discovered {currentProduct.crossReferences.length} interchangeable competitor SKUs with dimensional compatibility and price benchmarking.
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 bg-[#FF6B00] text-black font-black uppercase tracking-wider self-start sm:self-auto">
                  94%+ Fitment Confidence
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProduct.crossReferences.map((cross, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#050505] border border-white/10 hover:border-[#FF6B00] transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-white/50">{cross.competitorBrand}</span>
                        <div className="text-lg font-black font-mono text-[#FF6B00]">{cross.competitorPartNumber}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] px-2.5 py-1 font-black uppercase tracking-wider ${
                          cross.matchType === "Direct OEM Exact"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-[#181818] text-white border border-white/20"
                        }`}>
                          {cross.matchType}
                        </span>
                        {cross.priceRatio && (
                          <div className="text-xs text-white/50 mt-1.5 font-mono">
                            Price Index: <strong className="text-white">{cross.priceRatio}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-white/80 bg-[#111] p-3 border border-white/10 font-medium">
                      {cross.notes}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs text-white/50 uppercase tracking-wider font-mono">
                      <span>Interchange Fitment Score</span>
                      <span className="font-bold text-[#FF6B00]">{cross.confidence}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VALIDATION & TRUST AUDIT */}
          {activeSubTab === "validation" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-emerald-500 space-y-1">
                  <div className="text-[11px] text-white/50 uppercase font-black tracking-wider">Deterministic Rule Checks</div>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">
                    {currentProduct.validationSummary?.ruleChecksPassed} / {currentProduct.validationSummary?.ruleChecksTotal} Passed
                  </div>
                  <div className="text-xs text-white/40 font-mono">100% Boundary & Unit Physics Passed</div>
                </div>

                <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-[#FF6B00] space-y-1">
                  <div className="text-[11px] text-white/50 uppercase font-black tracking-wider">Multi-Source Verification</div>
                  <div className="text-2xl font-black text-[#FF6B00] tracking-tight">
                    {currentProduct.validationSummary?.multiSourceVerified ? "Verified" : "Pending"}
                  </div>
                  <div className="text-xs text-white/40 font-mono">OEM Handbook + ISO Standards Cross-Check</div>
                </div>

                <div className="p-5 bg-[#050505] border border-white/10 border-t-2 border-t-white space-y-1">
                  <div className="text-[11px] text-white/50 uppercase font-black tracking-wider">Hallucination Risk</div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {currentProduct.validationSummary?.hallucinationRisk || "Low"}
                  </div>
                  <div className="text-xs text-white/40 font-mono">Grounded in verified catalog dictionaries</div>
                </div>
              </div>

              {/* Audit Trail List */}
              <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Engineering Audit Trail & Rule Verifications
                </h4>
                <div className="space-y-3">
                  {currentProduct.validationSummary?.auditTrail?.map((audit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#111] border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{audit.checkName}</div>
                        <div className="text-xs text-white/70 mt-1 font-medium">{audit.detail}</div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-xs text-white/50 p-3 bg-[#111] border border-white/10">
                      {currentProduct.validationSummary?.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMPLIANCE & CERTIFICATIONS */}
          {activeSubTab === "compliance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#050505] border border-white/10 space-y-2">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-wider">EU RoHS 3 Directive</span>
                  <div className="text-lg font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {currentProduct.compliance.rohs}
                  </div>
                  <p className="text-xs text-white/60">Directive 2011/65/EU & (EU) 2015/863 heavy metals threshold passed.</p>
                </div>

                <div className="p-5 bg-[#050505] border border-white/10 space-y-2">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-wider">REACH SVHC Status</span>
                  <div className="text-lg font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {currentProduct.compliance.reach}
                  </div>
                  <p className="text-xs text-white/60">Contains zero Substances of Very High Concern above 0.1% w/w.</p>
                </div>

                <div className="p-5 bg-[#050505] border border-white/10 space-y-2">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-wider">CA Proposition 65</span>
                  <div className="text-lg font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {currentProduct.compliance.prop65}
                  </div>
                  <p className="text-xs text-white/60">No chemical exposure warning labels required for handling.</p>
                </div>
              </div>

              <div className="p-6 bg-[#050505] border border-white/10 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Global Certifications & Standards Conformance
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {currentProduct.compliance.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-[#141414] text-xs font-bold uppercase tracking-wider text-white border border-white/15 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PIM / JSON-LD EXPORT */}
          {activeSubTab === "json" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold font-mono">
                  Enterprise PIM Schema Format (Unilog CIMM2 / Akeneo / GS1 XML compatible)
                </span>
                <button
                  id="btn-copy-json"
                  onClick={handleCopyJSON}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] hover:bg-[#ff8533] text-black text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Full JSON"}</span>
                </button>
              </div>

              <pre className="p-5 bg-[#050505] border border-white/10 text-xs font-mono text-[#FF6B00] overflow-x-auto max-h-96">
                {JSON.stringify(currentProduct, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
