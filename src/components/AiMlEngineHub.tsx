import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Cpu,
  BrainCircuit,
  Terminal,
  Cloud,
  Code2,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Layers,
  Database,
  Search,
  Zap,
  ArrowRight,
  Activity,
  Box,
  FileCode,
  ShieldCheck,
  SplitSquareVertical
} from "lucide-react";

export const AiMlEngineHub: React.FC = () => {
  const [subTab, setSubTab] = useState<"genai" | "nlp" | "python" | "cloud" | "webdev">("genai");
  const [copied, setCopied] = useState<boolean>(false);

  // --- Generative AI & LLM State ---
  const [llmPrompt, setLlmPrompt] = useState<string>(
    "Extract technical parameters, DIN/ISO standards, UNSPSC code, and competitive cross-references for industrial SKU: Siemens 3RT2026-1BB40 24V DC 25A Contactor."
  );
  const [systemInstruction, setSystemInstruction] = useState<string>(
    "You are an Industrial Master PIM (Product Information Management) AI engineer. Output verified JSON strictly formatted with zero unit hallucinations."
  );
  const [temperature, setTemperature] = useState<number>(0.2);
  const [llmLoading, setLlmLoading] = useState<boolean>(false);
  const [llmResult, setLlmResult] = useState<any>(null);

  // --- NLP State ---
  const [nlpInputText, setNlpInputText] = useState<string>(
    "SKF 6004-2RS1/C3 Deep Groove Radial Ball Bearing 20x42x12mm 9.95kN Dynamic Load 11000 RPM NBR Double Rubber Seal RoHS Compliant ISO 15:2017"
  );
  const [nlpLoading, setNlpLoading] = useState<boolean>(false);
  const [nlpResult, setNlpResult] = useState<any>(null);

  // --- Python Pipeline State ---
  const [pythonScriptType, setPythonScriptType] = useState<"enrichment_pipeline" | "vector_rag" | "custom">("enrichment_pipeline");
  const [pythonLoading, setPythonLoading] = useState<boolean>(false);
  const [pythonResult, setPythonResult] = useState<any>(null);

  // --- Cloud Telemetry State ---
  const [cloudData, setCloudData] = useState<any>(null);
  const [cloudLoading, setCloudLoading] = useState<boolean>(false);

  // --- Web Dev Playground State (HTML/CSS/JS) ---
  const [htmlCode, setHtmlCode] = useState<string>(
`<div class="industrial-card">
  <div class="card-header">
    <span class="badge">LIVE AI API</span>
    <h3 id="sku-title">SKF 6004-2RS1</h3>
  </div>
  <div class="card-body">
    <p id="sku-desc">Deep Groove Radial Ball Bearing 20x42x12mm</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Bore:</strong> 20.00 mm</div>
      <div class="spec-item"><strong>OD:</strong> 42.00 mm</div>
      <div class="spec-item"><strong>UNSPSC:</strong> 31171504</div>
      <div class="spec-item"><strong>ETIM:</strong> EC000410</div>
    </div>
    <button id="enrich-btn" onclick="fetchLiveAI()">Enrich via JS Fetch API</button>
    <div id="ai-status">Ready to call /api/enrich</div>
  </div>
</div>`
  );
  const [cssCode, setCssCode] = useState<string>(
`.industrial-card {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.15);
  border-left: 4px solid #FF6B00;
  padding: 24px;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
}
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.badge { background: #FF6B00; color: #000; font-size: 10px; font-weight: 900; padding: 2px 8px; text-transform: uppercase; }
h3 { margin: 0; font-size: 18px; font-weight: 900; text-transform: uppercase; }
.card-body p { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 16px; }
.spec-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 20px; }
.spec-item { background: #050505; border: 1px solid rgba(255,255,255,0.1); padding: 8px 12px; font-size: 11px; }
.spec-item strong { color: #FF6B00; }
#enrich-btn {
  background: #FF6B00;
  color: #000;
  border: none;
  padding: 10px 18px;
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}
#enrich-btn:hover { opacity: 0.85; }
#ai-status { margin-top: 12px; font-size: 11px; color: rgba(255,255,255,0.5); }`
  );
  const [jsCode, setJsCode] = useState<string>(
`async function fetchLiveAI() {
  const statusEl = document.getElementById('ai-status');
  statusEl.textContent = 'Calling Gemini 3.7 Flash Industrial Backend...';
  statusEl.style.color = '#FF6B00';
  
  try {
    const res = await fetch('/api/enrich', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partNumber: '6004-2RS1',
        brand: 'SKF',
        shortDescription: 'Radial ball bearing'
      })
    });
    const result = await res.json();
    if (result.success) {
      statusEl.textContent = 'Enriched! Quality Score: ' + result.data.qualityScore + '% | Engine: ' + result.engine;
      statusEl.style.color = '#10b981';
      document.getElementById('sku-title').textContent = result.data.partNumber + ' [VERIFIED]';
    }
  } catch (err) {
    statusEl.textContent = 'Error: ' + err.message;
    statusEl.style.color = '#ef4444';
  }
}`
  );

  // Trigger default runs on mount
  useEffect(() => {
    runLlmPrompt();
    runNlpAnalysis();
    runPythonScript();
    fetchCloudTelemetry();
  }, []);

  const runLlmPrompt = async () => {
    setLlmLoading(true);
    try {
      const res = await fetch("/api/ai/llm-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: llmPrompt,
          systemInstruction,
          temperature,
          responseFormat: "json",
        }),
      });
      const data = await res.json();
      setLlmResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLlmLoading(false);
    }
  };

  const runNlpAnalysis = async () => {
    setNlpLoading(true);
    try {
      const res = await fetch("/api/nlp/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: nlpInputText }),
      });
      const data = await res.json();
      setNlpResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setNlpLoading(false);
    }
  };

  const runPythonScript = async () => {
    setPythonLoading(true);
    try {
      const res = await fetch("/api/python/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scriptType: pythonScriptType }),
      });
      const data = await res.json();
      setPythonResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setPythonLoading(false);
    }
  };

  const fetchCloudTelemetry = async () => {
    setCloudLoading(true);
    try {
      const res = await fetch("/api/cloud/telemetry");
      const data = await res.json();
      setCloudData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCloudLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#FF6B00] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF6B00] text-black flex items-center justify-center font-black">
              <BrainCircuit className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                  Industrial AI/ML, LLM & Cloud Technologies Core
                </h1>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-[#FF6B00] text-black">
                  FULL-STACK ENGINE
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">
                Generative AI (Gemini 3.7 Flash) • Industrial NLP • Python Pipeline Runtimes • GCP Cloud Infrastructure • HTML/CSS/JS SDK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                runLlmPrompt();
                runNlpAnalysis();
                runPythonScript();
                fetchCloudTelemetry();
              }}
              className="px-4 py-2.5 bg-[#181818] hover:bg-[#FF6B00] hover:text-black text-white text-xs font-black uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refresh All Engines</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {[
            { id: "genai", label: "Generative AI & LLMs", icon: Sparkles, badge: "Gemini 3.7 Flash" },
            { id: "nlp", label: "Industrial NLP & Vectors", icon: Cpu, badge: "Entity & Suffix" },
            { id: "python", label: "Python Pipeline Sandbox", icon: Terminal, badge: "Pandas & PyTorch" },
            { id: "cloud", label: "Cloud Tech & Architecture", icon: Cloud, badge: "GCP Vertex AI" },
            { id: "webdev", label: "HTML / CSS / JS Studio", icon: Code2, badge: "Vanilla Web SDK" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase font-black tracking-wider transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[#FF6B00] text-black border-[#FF6B00]"
                    : "bg-[#050505] text-white/60 hover:text-white border-white/10 hover:bg-[#151515]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#FF6B00]"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 font-mono uppercase tracking-widest ${
                    isActive ? "bg-black text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-VIEW 1: GENERATIVE AI & LLMS */}
      {subTab === "genai" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Prompt Engineering Console */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  <span>LLM Prompt & Reasoning Studio</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF6B00] bg-[#181818] px-2 py-0.5 border border-white/10 uppercase font-black">
                  Model: Gemini 3.7 Flash
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  System Instruction (Role & Rules)
                </label>
                <textarea
                  value={systemInstruction}
                  onChange={(e) => setSystemInstruction(e.target.value)}
                  rows={3}
                  className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white/90 font-mono focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Industrial SKU Prompt Input
                </label>
                <textarea
                  value={llmPrompt}
                  onChange={(e) => setLlmPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/50 uppercase font-bold">Temperature:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-24 accent-[#FF6B00]"
                  />
                  <span className="text-xs font-mono font-bold text-[#FF6B00]">{temperature}</span>
                </div>

                <button
                  onClick={runLlmPrompt}
                  disabled={llmLoading}
                  className="px-5 py-2.5 bg-[#FF6B00] hover:bg-white text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>{llmLoading ? "Synthesizing..." : "Execute LLM Call"}</span>
                </button>
              </div>
            </div>

            {/* Prompt Presets */}
            <div className="bg-[#0d0d0d] border border-white/10 p-5 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                Industrial Prompt Presets
              </span>
              <div className="space-y-2">
                {[
                  {
                    title: "Bearing Suffix & ISO 15 Parameter Extract",
                    prompt: "Extract technical parameters, DIN/ISO standards, UNSPSC code, and competitive cross-references for industrial SKU: SKF 6004-2RS1/C3 Radial Bearing 20x42x12mm."
                  },
                  {
                    title: "Contactor Coil & Power Specs (IEC 60947)",
                    prompt: "Extract electrical ratings, coil voltage, AC-3 power kW, poles, auxiliary contacts, and UNSPSC for Siemens 3RT2026-1BB40."
                  },
                  {
                    title: "Pressure Sensor 4-20mA & Ingress Rating",
                    prompt: "Deconstruct technical attributes, pressure range, analog output, process connection thread, and IP rating for IFM PI2099-00."
                  }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLlmPrompt(preset.prompt);
                    }}
                    className="w-full text-left p-3 bg-[#050505] hover:bg-[#181818] border border-white/10 hover:border-[#FF6B00] transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-black uppercase tracking-wider text-white group-hover:text-[#FF6B00]">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-white/40 truncate font-mono mt-0.5">{preset.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: LLM Output & Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Generative LLM Inference Response
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {llmResult && (
                    <>
                      <span className="text-[10px] font-mono text-white/50">
                        LATENCY: <strong className="text-white">{llmResult.latencyMs}ms</strong>
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        TOKENS: <strong className="text-[#FF6B00]">{llmResult.tokenEstimate}</strong>
                      </span>
                    </>
                  )}
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(llmResult?.parsedJson || llmResult?.output, null, 2))}
                    className="p-1.5 bg-[#181818] hover:bg-white hover:text-black text-white/70 transition-colors border border-white/10 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* JSON Visualizer / Raw Output */}
              <div className="bg-[#050505] p-4 border border-white/10 font-mono text-xs overflow-x-auto max-h-[480px]">
                {llmLoading ? (
                  <div className="flex items-center gap-3 py-12 justify-center text-white/50">
                    <div className="w-4 h-4 border-2 border-[#FF6B00] border-t-transparent animate-spin"></div>
                    <span className="uppercase tracking-widest text-[11px] font-bold">Calling Gemini 3.7 Flash Backend...</span>
                  </div>
                ) : llmResult ? (
                  <pre className="text-white/90 leading-relaxed">
                    {llmResult.parsedJson
                      ? JSON.stringify(llmResult.parsedJson, null, 2)
                      : llmResult.output}
                  </pre>
                ) : (
                  <div className="text-white/30 py-8 text-center uppercase tracking-wider">
                    Click "Execute LLM Call" to trigger real-time AI generation.
                  </div>
                )}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0d0d0d] border border-white/10 p-4 border-t-2 border-t-[#FF6B00]">
                <div className="text-[10px] font-black uppercase tracking-wider text-white/50">Grounding Standard</div>
                <div className="text-sm font-black text-white uppercase mt-1">ISO / DIN Norms</div>
                <p className="text-[11px] text-white/40 mt-1">Zero unit hallucination via physics-validated schema rules.</p>
              </div>
              <div className="bg-[#0d0d0d] border border-white/10 p-4 border-t-2 border-t-white">
                <div className="text-[10px] font-black uppercase tracking-wider text-white/50">Response Schema</div>
                <div className="text-sm font-black text-white uppercase mt-1">Strict JSON Mode</div>
                <p className="text-[11px] text-white/40 mt-1">Directly serializable for Unilog PIM / CIMM2 ingestion.</p>
              </div>
              <div className="bg-[#0d0d0d] border border-white/10 p-4 border-t-2 border-t-emerald-500">
                <div className="text-[10px] font-black uppercase tracking-wider text-white/50">Reasoning Engine</div>
                <div className="text-sm font-black text-emerald-400 uppercase mt-1">Gemini 3.7 Flash</div>
                <p className="text-[11px] text-white/40 mt-1">Sub-second latency with multi-turn parameter cross-check.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: INDUSTRIAL NLP & VECTOR SIMILARITY */}
      {subTab === "nlp" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <Cpu className="w-4 h-4 text-[#FF6B00]" />
                  <span>Industrial NLP Parser & Tokenizer</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-[#181818] px-2 py-0.5 border border-white/10 uppercase font-bold">
                  Rule Engine v4.2
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Unstructured Technical Product Description
                </label>
                <textarea
                  value={nlpInputText}
                  onChange={(e) => setNlpInputText(e.target.value)}
                  rows={4}
                  className="w-full bg-[#050505] border border-white/15 p-3 text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              <button
                onClick={runNlpAnalysis}
                disabled={nlpLoading}
                className="w-full py-3 bg-[#FF6B00] hover:bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{nlpLoading ? "Analyzing NLP Streams..." : "Run Industrial NLP Pipeline"}</span>
              </button>
            </div>

            {/* Vector Cosine Similarity Ranking */}
            {nlpResult && nlpResult.vectorSimilarityRanking && (
              <div className="bg-[#0d0d0d] border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Vector Embedding Cosine Similarity
                  </span>
                  <span className="text-[10px] font-mono text-[#FF6B00]">768-DIM VECTORS</span>
                </div>
                <div className="space-y-3">
                  {nlpResult.vectorSimilarityRanking.map((sim: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#050505] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white uppercase">{sim.category}</span>
                        <span className="font-mono text-[#FF6B00] font-bold">{(sim.cosineSimilarity * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#181818] overflow-hidden">
                        <div
                          className="h-full bg-[#FF6B00]"
                          style={{ width: `${Math.min(100, sim.cosineSimilarity * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] font-mono text-white/40">UNSPSC: {sim.unspsc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Named Entity Recognition (NER) & Suffix Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Named Entity Recognition (NER) & Suffix Decomposition
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50">
                  ENTITIES DETECTED: <strong className="text-white">{nlpResult?.extractedEntities?.length || 0}</strong>
                </span>
              </div>

              {/* Suffix Decomposition */}
              {nlpResult?.suffixNomenclature && nlpResult.suffixNomenclature.length > 0 && (
                <div className="p-4 bg-[#050505] border border-white/10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00]">
                    Part Number Suffix Nomenclature Extracted
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nlpResult.suffixNomenclature.map((suf: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#181818] border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-mono font-bold"
                      >
                        {suf}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* NER Entity Cards */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  Extracted Industrial Spec Attributes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nlpResult?.extractedEntities?.map((ent: any, idx: number) => (
                    <div key={idx} className="p-4 bg-[#050505] border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">
                          {ent.type}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {(ent.confidence * 100).toFixed(0)}% Conf
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{ent.entity}</div>
                      <div className="text-sm font-mono text-[#FF6B00] font-black pt-1">{ent.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Token Stream */}
              <div className="p-4 bg-[#050505] border border-white/10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  Token Stream ({nlpResult?.tokenCount || 0} tokens)
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {nlpResult?.tokens?.map((tok: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#111] border border-white/10 text-white/80 text-[11px] font-mono"
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: PYTHON DATA PIPELINE & CODE SANDBOX */}
      {subTab === "python" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <Terminal className="w-4 h-4 text-[#FF6B00]" />
                  <span>Python 3.11 Industrial Pipeline Engine</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF6B00] bg-[#181818] px-2 py-0.5 border border-white/10 uppercase font-black">
                  CPython Linux
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Select Pipeline Script Archetype
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setPythonScriptType("enrichment_pipeline");
                    }}
                    className={`p-3 text-left border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      pythonScriptType === "enrichment_pipeline"
                        ? "bg-[#FF6B00] text-black border-[#FF6B00]"
                        : "bg-[#050505] text-white border-white/10 hover:bg-[#151515]"
                    }`}
                  >
                    <div>Batch SKU Pipeline</div>
                    <div className="text-[10px] opacity-70 font-mono mt-0.5">Pandas + Rules</div>
                  </button>

                  <button
                    onClick={() => {
                      setPythonScriptType("vector_rag");
                    }}
                    className={`p-3 text-left border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      pythonScriptType === "vector_rag"
                        ? "bg-[#FF6B00] text-black border-[#FF6B00]"
                        : "bg-[#050505] text-white border-white/10 hover:bg-[#151515]"
                    }`}
                  >
                    <div>Vector RAG & Search</div>
                    <div className="text-[10px] opacity-70 font-mono mt-0.5">PyTorch + FAISS</div>
                  </button>
                </div>
              </div>

              {/* Code Preview */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  Python Script Execution Preview
                </label>
                <pre className="bg-[#050505] p-4 border border-white/10 font-mono text-[11px] text-white/80 overflow-x-auto max-h-56 leading-relaxed">
{pythonScriptType === "enrichment_pipeline"
? `import pandas as pd
import numpy as np
from google.genai import GoogleGenAI

def execute_unilog_pipeline(df_raw: pd.DataFrame) -> pd.DataFrame:
    # 1. Cleanse and normalize part numbers
    df_raw['sku_clean'] = df_raw['part_number'].str.upper().str.strip()
    
    # 2. Extract Suffixes (Clearance, Seals, Coil)
    df_raw['suffix_code'] = df_raw['sku_clean'].str.extract(r'(-[A-Z0-9]+)')
    
    # 3. Apply ISO/DIN Deterministic Boundary Checks
    df_raw['physics_valid'] = np.where(df_raw['bore_mm'] < df_raw['od_mm'], True, False)
    
    # 4. Generate UNSPSC and ETIM classification
    return df_raw`
: `import torch
import faiss
from google.genai import GoogleGenAI

# Initialize dense embedding index
index = faiss.IndexHNSWFlat(768, 32)
query_text = "High temperature sealed ball bearing for 20mm shaft"

# Compute cosine similarity
distances, indices = index.search(query_vector, k=3)
print(f"Top neighbor found with distance: {distances[0][0]:.4f}")`}
                </pre>
              </div>

              <button
                onClick={runPythonScript}
                disabled={pythonLoading}
                className="w-full py-3 bg-[#FF6B00] hover:bg-white text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{pythonLoading ? "Executing Python Script..." : "Execute Python Pipeline"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Python Stdout Logs & DataFrame Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Python Runtime Console (Stdout)
                  </span>
                </div>
                {pythonResult?.runtimeMetrics && (
                  <div className="flex items-center gap-3 text-[10px] font-mono text-white/50">
                    <span>EXEC: <strong className="text-white">{pythonResult.runtimeMetrics.executionTimeMs}ms</strong></span>
                    <span>MEM: <strong className="text-[#FF6B00]">{pythonResult.runtimeMetrics.memoryUsageMb} MB</strong></span>
                  </div>
                )}
              </div>

              {/* Stdout Logs */}
              <div className="bg-[#050505] p-4 border border-white/10 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
                {pythonResult?.stdout?.map((log: string, idx: number) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes("[SUCCESS]")
                        ? "text-emerald-400 font-bold"
                        : log.includes("[INFO]")
                        ? "text-white/70"
                        : log.includes("[STEP")
                        ? "text-[#FF6B00]"
                        : "text-cyan-300"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>

              {/* Transformed DataFrame Table */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  Transformed Pandas DataFrame Output
                </span>
                <div className="overflow-x-auto border border-white/10">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#050505] text-white/50 border-b border-white/10">
                      <tr>
                        {pythonResult?.dataframe && pythonResult.dataframe[0] &&
                          Object.keys(pythonResult.dataframe[0]).map((key, i) => (
                            <th key={i} className="py-2.5 px-3 uppercase text-[10px]">{key}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0a0a0a]">
                      {pythonResult?.dataframe?.map((row: any, rIdx: number) => (
                        <tr key={rIdx} className="hover:bg-white/5">
                          {Object.values(row).map((val: any, cIdx: number) => (
                            <td key={cIdx} className={`py-2 px-3 ${cIdx === 0 ? "font-bold text-white" : "text-white/80"}`}>
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: CLOUD TECHNOLOGIES & GCP ARCHITECTURE */}
      {subTab === "cloud" && (
        <div className="space-y-8">
          <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-[#FF6B00]" />
                  <h2 className="text-xl font-black uppercase text-white tracking-tight">
                    Google Cloud Platform (GCP) Enterprise Architecture
                  </h2>
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 mt-1">
                  High-Throughput Cloud Run Microservices, Vertex AI, BigQuery & Cloud Storage Topology
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 bg-[#050505] border border-white/10 text-emerald-400 font-bold">
                  ALL CLOUD SERVICES OPERATIONAL
                </span>
              </div>
            </div>

            {/* Cloud Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cloudData?.services?.map((srv: any, idx: number) => (
                <div key={idx} className="bg-[#050505] border border-white/10 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00]">
                      {srv.type}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      {srv.status}
                    </span>
                  </div>
                  <div className="text-base font-black uppercase text-white tracking-wide">
                    {srv.name}
                  </div>
                  <div className="space-y-1 pt-2 border-t border-white/10 text-xs font-mono text-white/60">
                    {Object.entries(srv)
                      .filter(([k]) => !["name", "type", "status"].includes(k))
                      .map(([k, v]: [string, any], i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="capitalize text-white/40 text-[11px]">{k.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-white font-bold">{String(v)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Terraform / Docker Cloud Infrastructure Spec */}
            <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Terraform / Cloud Run IaC Blueprint
                </span>
                <span className="text-[10px] font-mono text-white/40">main.tf</span>
              </div>
              <pre className="font-mono text-xs text-white/80 overflow-x-auto leading-relaxed bg-[#0a0a0a] p-4 border border-white/5">
{`resource "google_cloud_run_v2_service" "unilog_pim_core" {
  name     = "unilog-product-intelligence"
  location = "asia-southeast1"
  template {
    containers {
      image = "gcr.io/unilog-2026/product-intelligence:latest"
      resources {
        limits = { cpu = "2", memory = "2Gi" }
      }
      env {
        name  = "GEMINI_MODEL"
        value = "gemini-3.7-flash"
      }
    }
    scaling { min_instance_count = 2, max_instance_count = 50 }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: HTML / CSS / JS VANILLA DEVELOPER STUDIO */}
      {subTab === "webdev" && (
        <div className="space-y-8">
          <div className="bg-[#0d0d0d] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#FF6B00]" />
                  <h2 className="text-xl font-black uppercase text-white tracking-tight">
                    HTML5, CSS3 & Modern JavaScript (ES6+) Developer Studio
                  </h2>
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 mt-1">
                  Direct client-side web integration testbed with live iframe execution connecting to backend AI APIs
                </p>
              </div>
            </div>

            {/* 3-Column Code Editors: HTML, CSS, JS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* HTML Editor */}
              <div className="bg-[#050505] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">HTML5 Template</span>
                  <span className="text-[10px] font-mono text-white/40">index.html</span>
                </div>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0d0d0d] border border-white/10 p-3 font-mono text-xs text-white/90 focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              {/* CSS Editor */}
              <div className="bg-[#050505] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-white">CSS3 Stylesheet</span>
                  <span className="text-[10px] font-mono text-white/40">styles.css</span>
                </div>
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0d0d0d] border border-white/10 p-3 font-mono text-xs text-white/90 focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              {/* JS Editor */}
              <div className="bg-[#050505] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">JavaScript ES6+</span>
                  <span className="text-[10px] font-mono text-white/40">app.js</span>
                </div>
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0d0d0d] border border-white/10 p-3 font-mono text-xs text-white/90 focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>
            </div>

            {/* Live Interactive Sandbox Preview */}
            <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Live Rendered HTML / CSS / JS Sandbox</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">SANDBOX ACTIVE</span>
              </div>

              <div className="border border-white/10 bg-[#000] p-4 min-h-[220px]">
                <iframe
                  title="live-html-css-js-sandbox"
                  srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <style>
      body { margin: 0; padding: 12px; background: #000; font-family: sans-serif; }
      ${cssCode}
    </style>
  </head>
  <body>
    ${htmlCode}
    <script>
      ${jsCode}
    </script>
  </body>
</html>`}
                  className="w-full h-64 border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
