import React, { useState } from "react";
import { 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  ArrowUpDown, 
  Search, 
  Check, 
  ExternalLink,
  ShieldAlert,
  Zap,
  Filter
} from "lucide-react";
import { BatchItem, EnrichedProduct } from "../types";
import { BATCH_DEMO_ITEMS } from "../data/mockIndustrialCatalog";

interface BatchProcessorProps {
  onSelectProduct?: (prod: EnrichedProduct) => void;
}

export const BatchProcessor: React.FC<BatchProcessorProps> = () => {
  const [items, setItems] = useState<BatchItem[]>(BATCH_DEMO_ITEMS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(11);
  const [totalCount, setTotalCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bulkExportSuccess, setBulkExportSuccess] = useState(false);

  const startBatchRun = () => {
    setIsProcessing(true);
    // Reset any flagged to processing simulation
    const reset = items.map((it) => ({ ...it, status: "processing" as const }));
    setItems(reset);
    setProcessedCount(0);

    let count = 0;
    const timer = setInterval(() => {
      count++;
      setProcessedCount(count);
      setItems((prev) =>
        prev.map((it, idx) => {
          if (idx < count) {
            if (it.id === "b11") {
              return { ...it, status: "flagged", confidence: 64, qualityScore: 68 };
            }
            return { ...it, status: "completed", confidence: 98, qualityScore: 97 };
          }
          return it;
        })
      );

      if (count >= items.length) {
        clearInterval(timer);
        setIsProcessing(false);
      }
    }, 300);
  };

  const handleExportCSV = () => {
    const headers = "ID,PartNumber,Brand,ShortDescription,Category,UNSPSC,Confidence,QualityScore,Status\n";
    const rows = items.map(
      (it) => `"${it.id}","${it.partNumber}","${it.brand}","${it.shortDescription}","${it.category || ""}","${it.unspsc || ""}","${it.confidence || ""}","${it.qualityScore || ""}","${it.status}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unilog_enriched_batch_${Date.now()}.csv`;
    a.click();
    setBulkExportSuccess(true);
    setTimeout(() => setBulkExportSuccess(false), 2000);
  };

  const handleApproveFlagged = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, status: "completed", flagReason: undefined, qualityScore: 92, confidence: 95 }
          : it
      )
    );
  };

  const filteredItems = items.filter((it) => {
    const matchesSearch =
      it.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      it.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      it.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && it.status === statusFilter;
  });

  const completedItems = items.filter((it) => it.status === "completed").length;
  const flaggedItems = items.filter((it) => it.status === "flagged").length;
  const avgQuality = Math.round(
    items.reduce((acc, curr) => acc + (curr.qualityScore || 0), 0) / items.length
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
              <Layers className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                Enterprise Batch Processor
              </h1>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
                Parallelized AI catalog enrichment engine processing 10,000+ SKUs/hr with automated quality gates.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-start-batch"
              onClick={startBatchRun}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-[#FF6B00]/20"
            >
              {isProcessing ? (
                <>
                  <Pause className="w-4 h-4 animate-pulse" />
                  <span>Processing Batch...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-black fill-black" />
                  <span>Run Batch Pipeline</span>
                </>
              )}
            </button>

            <button
              id="btn-export-csv"
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-[#181818] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider border border-white/15 flex items-center gap-2 transition-colors cursor-pointer"
            >
              {bulkExportSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{bulkExportSuccess ? "CSV Exported!" : "Export Enriched CSV"}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#050505] p-5 border border-white/10">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Total SKUs in Job</div>
            <div className="text-3xl font-black font-mono text-white mt-1">{totalCount}</div>
            <div className="text-[10px] uppercase font-bold text-white/30 mt-1">Enterprise Catalog Queue</div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-emerald-500">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Auto-Enriched & Verified</div>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">{completedItems}</div>
            <div className="text-[10px] uppercase font-bold text-emerald-500/80 mt-1">&gt; 95% Confidence Rate</div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-amber-500">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Exceptions (HITL Review)</div>
            <div className="text-3xl font-black font-mono text-amber-400 mt-1">{flaggedItems}</div>
            <div className="text-[10px] uppercase font-bold text-amber-500/80 mt-1">Flagged for human audit</div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-[#FF6B00]">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Avg Quality Score</div>
            <div className="text-3xl font-black font-mono text-[#FF6B00] mt-1">{avgQuality}%</div>
            <div className="text-[10px] uppercase font-bold text-white/30 mt-1">ISO/DIN Spec Verification</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Pipeline Progress: {processedCount} / {totalCount} items</span>
            <span className="font-mono text-[#FF6B00] font-black">{Math.round((processedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#181818] overflow-hidden">
            <div
              className="h-full bg-[#FF6B00] transition-all duration-300"
              style={{ width: `${(processedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-6 bg-[#080808] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU, Brand, Description..."
              className="w-full bg-[#050505] border border-white/20 pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 uppercase font-black tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#FF6B00]" /> Status:
            </span>
            {["all", "completed", "flagged"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-3.5 py-1.5 uppercase font-bold tracking-wider transition-colors cursor-pointer border ${
                  statusFilter === st
                    ? "bg-[#FF6B00] text-black border-[#FF6B00] font-black"
                    : "bg-[#181818] text-white/60 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050505] text-white/60 font-black uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">SKU / MPN</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Input Description</th>
                <th className="py-3.5 px-4">Enriched Category</th>
                <th className="py-3.5 px-4">UNSPSC</th>
                <th className="py-3.5 px-4 text-center">Quality Score</th>
                <th className="py-3.5 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0a0a0a]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-black text-[#FF6B00]">
                    {item.partNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white uppercase tracking-wider">
                    {item.brand}
                  </td>
                  <td className="py-3.5 px-4 text-white/80 max-w-xs truncate font-medium">
                    {item.shortDescription}
                  </td>
                  <td className="py-3.5 px-4 text-white/70">
                    {item.category || "Processing..."}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-white/50">
                    {item.unspsc || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.qualityScore ? (
                      <span className={`font-mono font-black ${
                        item.qualityScore >= 95 ? "text-emerald-400" : "text-amber-400"
                      }`}>
                        {item.qualityScore}%
                      </span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.status === "completed" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    )}
                    {item.status === "processing" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#181818] text-[#FF6B00] border border-[#FF6B00]/40 animate-pulse">
                        <Zap className="w-3 h-3 text-[#FF6B00]" /> Enriching...
                      </span>
                    )}
                    {item.status === "flagged" && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          <AlertCircle className="w-3 h-3" /> Low Confidence
                        </span>
                        <button
                          onClick={() => handleApproveFlagged(item.id)}
                          className="px-2.5 py-1 text-[11px] bg-white hover:bg-[#FF6B00] text-black font-black uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
