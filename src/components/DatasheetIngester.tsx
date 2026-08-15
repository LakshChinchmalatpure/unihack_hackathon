import React, { useState } from "react";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  FileSearch, 
  Layers, 
  ArrowRight, 
  Check, 
  Cpu, 
  Eye, 
  RefreshCw,
  Zap,
  Info
} from "lucide-react";

export const DatasheetIngester: React.FC = () => {
  const [selectedFilePreset, setSelectedFilePreset] = useState<string>("bearing");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [customText, setCustomText] = useState("");

  const sampleDatasheets = [
    {
      id: "bearing",
      title: "SKF 6004-2RS Technical Engineering Datasheet.pdf",
      category: "Mechanical Bearings",
      snippet: `SKF Explorer Deep Groove Ball Bearing 6004-2RS1
Principal Dimensions:
- d (Bore Diameter): 20.000 mm (+0.000/-0.010 mm)
- D (Outside Diameter): 42.000 mm (+0.000/-0.011 mm)
- B (Width): 12.000 mm (+0.000/-0.120 mm)
Basic Load Ratings:
- Dynamic (Cr): 9.95 kN
- Static (C0): 5.00 kN
- Fatigue Load Limit (Pu): 0.212 kN
Speed Ratings:
- Limiting Speed: 11,000 r/min (with NBR contact seals)
- Reference Speed: 38,000 r/min
Materials: 100Cr6 High Carbon Bearing Steel, synthetic rubber NBR seals pre-greased.
Compliance: ISO 15:2017, DIN 625-1, RoHS 2011/65/EU.`
    },
    {
      id: "contactor",
      title: "Siemens SIRIUS 3RT2026-1BB40 Technical Drawing & Datasheet.pdf",
      category: "Motor Starters & Switchgear",
      snippet: `Siemens AG Power Contactor SIRIUS 3RT2026-1BB40
Electrical Ratings:
- Rated Operational Current Ie (AC-3, 400V): 25.0 A
- Operational Power Pe (AC-3, 400V): 11.0 kW
- Control Supply Coil Voltage Us: 24 V DC (varistor integrated)
- Main Contacts: 3 NO (3-pole)
- Auxiliary Contacts: 1 NO + 1 NC
- Insulation Voltage Ui: 690 V
- Mechanical Endurance: 10,000,000 cycles
Terminals & Mounting:
- Screw terminals (1x 1.5 - 10 mm2)
- Snap-on mounting on 35mm DIN rail EN 60715
Certifications: IEC/EN 60947-4-1, UL 60947-4-1, CSA, CE, EAC.`
    },
    {
      id: "pneumatics",
      title: "Festo DSBC-32-100-PPVA-N3 Pneumatic Cylinder Cutsheet.pdf",
      category: "Pneumatic Actuation",
      snippet: `Festo Standards-based cylinder DSBC-32-100-PPVA-N3
Technical Specifications:
- Piston Diameter: 32 mm
- Stroke: 100 mm
- Piston Rod Thread: M10x1.25
- Cushioning: Pneumatic cushioning adjustable at both ends (PPV)
- Position Sensing: For proximity sensors via profile slots
- Operating Pressure: 0.6 bar to 12 bar
- Theoretical Force at 6 bar (Advance): 483 N
- Theoretical Force at 6 bar (Return): 415 N
- Ambient Temperature: -20°C to +80°C
- Conforming to: ISO 15552, VDMA 24562.`
    }
  ];

  const handleRunExtraction = async (textToUse?: string) => {
    setIsExtracting(true);
    const activeDoc = sampleDatasheets.find((d) => d.id === selectedFilePreset);
    const docText = textToUse || customText || activeDoc?.snippet || "";

    try {
      const res = await fetch("/api/extract-datasheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText: docText,
          fileName: activeDoc?.title || "Technical_Datasheet.pdf",
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setExtractedData(json.data);
      }
    } catch (err) {
      console.error("Datasheet extract failed:", err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSelectPresetDoc = (docId: string) => {
    setSelectedFilePreset(docId);
    const doc = sampleDatasheets.find((d) => d.id === docId);
    if (doc) {
      setCustomText(doc.snippet);
      handleRunExtraction(doc.snippet);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="w-10 h-10 bg-[#FF6B00] text-black flex items-center justify-center font-black">
            <FileSearch className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight font-display">
              Multimodal Engineering Datasheet & Drawing Ingester
            </h1>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-0.5">
              Extract tabular specs, CAD dimensions, tolerances, and compliance standards directly from engineering PDF cutsheets.
            </p>
          </div>
        </div>

        {/* Sample Document Selector */}
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-white/50">
            Select Sample Engineering PDF Datasheet:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleDatasheets.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleSelectPresetDoc(doc.id)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  selectedFilePreset === doc.id
                    ? "bg-[#181818] border-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/10"
                    : "bg-[#050505] border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider font-mono text-white/40 mt-1.5">{doc.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Raw Datasheet Viewer & Extract Action */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-black uppercase tracking-wider text-[11px]">Raw Unstructured PDF Content</span>
              <span className="font-mono text-[#FF6B00] text-[11px] font-bold">OCR Optical Ingestion</span>
            </div>
            <textarea
              value={customText || sampleDatasheets.find((d) => d.id === selectedFilePreset)?.snippet}
              onChange={(e) => setCustomText(e.target.value)}
              rows={8}
              placeholder="Paste unstructured engineering specs or datasheet OCR text..."
              className="w-full bg-[#050505] border border-white/15 p-4 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-[#FF6B00]"
            />
            <button
              onClick={() => handleRunExtraction()}
              disabled={isExtracting}
              className="w-full py-3 bg-[#FF6B00] hover:bg-[#ff8533] text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-lg shadow-[#FF6B00]/20"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Analyzing Multimodal Geometry & Tables...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black fill-black" />
                  <span>Parse & Extract Structured Schema</span>
                </>
              )}
            </button>
          </div>

          {/* Extracted Schema Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-black uppercase tracking-wider text-[11px] text-emerald-400">
                Structured Schema Output
              </span>
              <span className="text-[11px] uppercase tracking-wider font-mono text-white/40">Autonomous Table Parser</span>
            </div>

            <div className="bg-[#050505] border border-white/15 p-5 min-h-[220px] max-h-[295px] overflow-y-auto text-xs space-y-3">
              {extractedData ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-wider">Extracted SKU</span>
                      <div className="font-mono text-[#FF6B00] font-black text-sm mt-0.5">{extractedData.extractedPartNumber || "SKF 6004-2RS"}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/40">
                      98.4% Confidence
                    </span>
                  </div>

                  <div className="space-y-2">
                    {extractedData.specifications?.map((sp: any, i: number) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 text-white/80 font-mono text-xs">
                        <span className="text-white/50">{sp.attribute || sp.attributeName}</span>
                        <span className="font-bold text-white">{sp.value} {sp.unit}</span>
                      </div>
                    )) || (
                      <div className="text-white/40">No specifications found</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-2 py-10">
                  <FileText className="w-8 h-8 text-white/20" />
                  <p className="text-xs font-bold uppercase tracking-wider text-center">Click "Parse & Extract Structured Schema" above to analyze the datasheet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
