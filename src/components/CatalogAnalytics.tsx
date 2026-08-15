import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from "recharts";

export const CatalogAnalytics: React.FC = () => {
  // Sample analytics data for enterprise B2B catalog
  const categoryCompletenessData = [
    { category: "Bearings", completeness: 99.4, count: 1420 },
    { category: "Motor Controls", completeness: 98.1, count: 980 },
    { category: "Hydraulics", completeness: 97.6, count: 850 },
    { category: "Pneumatics", completeness: 99.0, count: 1120 },
    { category: "Sensors", completeness: 96.8, count: 740 },
    { category: "Adhesives", completeness: 98.9, count: 520 },
    { category: "VFD Drives", completeness: 97.2, count: 610 }
  ];

  const taxonomyBreakdown = [
    { name: "UNSPSC v26", value: 45, color: "#FF6B00" },
    { name: "ETIM 9.0 Class", value: 30, color: "#ffffff" },
    { name: "eCl@ss 14.0", value: 15, color: "#888888" },
    { name: "NAICS / Custom", value: 10, color: "#333333" }
  ];

  const driftAlerts = [
    {
      id: "d1",
      brand: "Schneider Electric",
      series: "Altivar ATV312",
      status: "Obsolescence Notice (EOL)",
      recommendation: "Auto-migrated 140 SKUs to Next-Gen Altivar Machine ATV320 with direct cross-reference mapping.",
      severity: "high"
    },
    {
      id: "d2",
      brand: "SKF Group",
      series: "6200 Series Bearings",
      status: "Grease Spec Update",
      recommendation: "Updated factory fill polyurea grease temperature ceiling to +130°C across 45 catalog SKUs.",
      severity: "medium"
    },
    {
      id: "d3",
      brand: "Parker Hannifin",
      series: "D1VW Valves",
      status: "RoHS 3 Certificate Refresh",
      recommendation: "Automated compliance document ingestion verified with zero SVHC exemptions.",
      severity: "low"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
            <BarChart3 className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight font-display">
              Enterprise Catalog Quality & Drift Analytics
            </h1>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
              Real-time monitoring of catalog completeness, taxonomy classification coverage, confidence distributions, and obsolescence alerts.
            </p>
          </div>
        </div>

        {/* High-Level Scorecards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#050505] p-5 border border-white/10">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Master Catalog SKUs</div>
            <div className="text-3xl font-black font-mono text-white mt-1">6,240</div>
            <div className="text-xs font-mono text-[#FF6B00] flex items-center gap-1 mt-1 font-bold">
              <TrendingUp className="w-3 h-3" /> +18% this quarter
            </div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-emerald-500">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Avg Completeness Index</div>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">98.4%</div>
            <div className="text-xs font-mono text-white/40 mt-1">15+ attributes / SKU</div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-[#FF6B00]">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Taxonomy Standardized</div>
            <div className="text-3xl font-black font-mono text-[#FF6B00] mt-1">100%</div>
            <div className="text-xs font-mono text-white/40 mt-1">UNSPSC & ETIM Ready</div>
          </div>

          <div className="bg-[#050505] p-5 border border-white/10 border-t-2 border-t-white">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/50">Drift Auto-Remediated</div>
            <div className="text-3xl font-black font-mono text-white mt-1">185 SKUs</div>
            <div className="text-xs font-mono text-white/40 mt-1">Zero manual intervention</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Completeness by Category */}
        <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">Attribute Completeness by Category</h3>
              <p className="text-xs text-white/50">Percentage of required engineering attributes fully enriched and verified.</p>
            </div>
            <span className="text-xs font-mono font-black text-black bg-[#FF6B00] px-3 py-1 uppercase tracking-wider">
              Avg 98.4%
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryCompletenessData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" opacity={0.8} />
                <XAxis dataKey="category" stroke="#888888" fontSize={11} angle={-15} textAnchor="end" tick={{ fill: "#aaaaaa" }} />
                <YAxis stroke="#888888" fontSize={11} domain={[90, 100]} tick={{ fill: "#aaaaaa" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#050505", borderColor: "#333333", borderRadius: "0px", fontSize: "12px", color: "#ffffff" }}
                  formatter={(val: any) => [`${val}% Completeness`, "Enrichment Index"]}
                />
                <Bar dataKey="completeness" fill="#FF6B00" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Taxonomy Breakdown */}
        <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">Taxonomy Classification Mix</h3>
            <p className="text-xs text-white/50">Standardized categorization across global schemes.</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxonomyBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {taxonomyBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#050505", borderColor: "#333333", borderRadius: "0px", fontSize: "12px", color: "#ffffff" }}
                  formatter={(val: any) => [`${val}% Coverage`, "Taxonomy Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
            {taxonomyBreakdown.map((t, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-white/70">
                <span className="w-2.5 h-2.5" style={{ backgroundColor: t.color }}></span>
                <span className="truncate uppercase font-bold text-[11px]">{t.name}: <strong className="text-white font-mono">{t.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Drift & Obsolescence Alerts */}
      <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold border border-[#FF6B00]/40">
              <Activity className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-white">Manufacturer Drift & Obsolescence Webhooks</h3>
              <p className="text-xs text-white/50">Automated alerts detecting supplier spec revisions, phase-outs, and replacements.</p>
            </div>
          </div>
          <span className="text-[10px] px-3 py-1 bg-[#181818] text-white font-mono uppercase font-black tracking-wider border border-white/10">
            3 Active Updates
          </span>
        </div>

        <div className="space-y-3">
          {driftAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 bg-[#050505] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white">{alert.brand}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-mono text-[#FF6B00] font-bold">{alert.series}</span>
                  <span className={`text-[9px] px-2 py-0.5 font-black uppercase tracking-wider border ${
                    alert.severity === "high"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : alert.severity === "medium"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-[#181818] text-white border-white/20"
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-xs text-white/70 font-medium">{alert.recommendation}</p>
              </div>

              <button className="text-xs px-4 py-2 bg-[#181818] hover:bg-[#FF6B00] hover:text-black text-white font-black uppercase tracking-wider border border-white/15 shrink-0 self-start sm:self-auto cursor-pointer transition-colors">
                Apply Auto-Patch
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
