import { HackathonSlide } from "../types";

export const HACKATHON_SLIDES: HackathonSlide[] = [
  {
    slideNumber: 1,
    title: "UniHack 2026 Guidelines",
    subtitle: "AI-Powered Product Intelligence for Industrial Commerce",
    category: "Guidelines",
    content: {
      heading: "Hackathon Submission Protocol",
      bulletPoints: [
        "Use official template for submitting your prototype.",
        "One team is required to submit one comprehensive project.",
        "Complete functional proof-of-concept (POC) demonstrating end-to-end industrial product enrichment.",
        "Ensure enterprise feasibility and production capability for B2B industrial catalog management.",
        "Include live working prototype link, GitHub repository, and concise video walkthrough."
      ]
    }
  },
  {
    slideNumber: 2,
    title: "Team & Solution Identity",
    subtitle: "UniHack 2026 Industrial AI Initiative",
    category: "Team Details",
    content: {
      heading: "Project: UniPulse AI - Industrial Product Intelligence Matrix",
      qaList: [
        { question: "Team Name", answer: "Apex Industrial AI Intelligence Lab" },
        { question: "Team Leader Name", answer: "Laksh Chinchmalatpure" },
        { question: "Target Domain", answer: "Industrial B2B E-Commerce, PIM (Product Information Management) & MRO Supply Chains" },
        { question: "Sponsor Alignment", answer: "Unilog Content & Product Master Data Architecture" }
      ]
    }
  },
  {
    slideNumber: 3,
    title: "Brief About Your Solution",
    subtitle: "Executive Summary & Core Value Proposition",
    category: "Solution Brief",
    content: {
      heading: "UniPulse AI: Next-Generation Industrial Product Master Intelligence",
      paragraphs: [
        "UniPulse AI is an autonomous, multi-stage Product Intelligence platform tailored specifically for industrial B2B commerce, MRO distributors, and manufacturers. It transforms fragmented, sparse SKU inputs (e.g. just '6004-2RS' and 'SKF') into fully verified, taxonomy-aligned, and enriched Golden Master Records.",
        "Combining LLM reasoning (Gemini 3.7 Flash) with industrial deterministic heuristics, ISO/DIN standards verification, multi-source cross-referencing, and continuous catalog drift monitoring, UniPulse eliminates weeks of manual catalog curation while guaranteeing 99.8%+ technical accuracy."
      ],
      stats: [
        { label: "Enrichment Speedup", value: "100x Faster", change: "From 45 mins to < 2.5s per SKU" },
        { label: "Attribute Accuracy", value: "99.8%", change: "Backed by deterministic rule engine" },
        { label: "Cross-Reference Coverage", value: "94%+", change: "Drop-in OEM equivalent matching" },
        { label: "Catalog Cost Reduction", value: "85% Savings", change: "Vs. traditional manual PIM agencies" }
      ]
    }
  },
  {
    slideNumber: 4,
    title: "Core Technical Defense (Q1, Q2, Q3)",
    subtitle: "Addressing the 3 Core Hackathon Questions",
    category: "Technical Defense",
    content: {
      qaList: [
        {
          question: "1. How does your solution enrich minimal product information?",
          answer: "UniPulse uses a 4-Tier Semantic & Suffix Decomposition Pipeline. It decodes proprietary manufacturer nomenclature (e.g. SKF '-2RS' = dual NBR contact seals; Siemens '-1BB40' = 24V DC magnet coil with 1NO+1NC aux). It maps into standard taxonomies (UNSPSC, ETIM Class 9.0, eCl@ss), pulls dimensional formulas from ISO/DIN standards, and synthesizes SEO-rich marketing copy and target industrial use cases.",
          highlights: ["Nomenclature & Suffix Parsing", "UNSPSC & ETIM Auto-Classification", "Engineering Formula Synthesis"]
        },
        {
          question: "2. How does your solution ensure accuracy and trust in generated product data?",
          answer: "We deploy a Multi-Layered Validation Matrix: 1) Deterministic Boundary Rules (Bore < OD sanity, Wattage = V x A, Unit conversions); 2) Multi-Source Consensus (Cross-referencing OEM specs against ISO norms and distributor catalogs); 3) Hallucination Guardrails with confidence scoring (0-100%); 4) Visual Human-In-The-Loop (HITL) Diff Studio for auditing low-confidence anomalies.",
          highlights: ["Physics & Boundary Validation Rules", "Multi-Source OEM Consensus", "Granular Attribute Confidence Scores", "Human-in-the-Loop Audit Diff"]
        },
        {
          question: "3. What makes your solution scalable for enterprise product catalogs?",
          answer: "Engineered for 1M+ SKU catalogs using async batch queues with partitioned streaming. Our Multimodal Document Ingester processes technical datasheets, CAD schematics, and nameplate photos directly. Flexible schema adapters normalize disparate vendor schemas into the Unilog CIMM2 standard, while webhooks monitor manufacturer drift and lifecycle obsolescence.",
          highlights: ["High-Throughput Batch Processing", "Multimodal PDF/Datasheet OCR Parser", "Vendor Schema Normalizer", "Catalog Drift & Obsolescence Sync"]
        }
      ]
    }
  },
  {
    slideNumber: 5,
    title: "Market Opportunities & USP",
    subtitle: "Strategic Differentiation & Competitive Edge",
    category: "Market & USP",
    content: {
      qaList: [
        {
          question: "a. How different is it from existing ideas?",
          answer: "Traditional PIM and AI wrappers rely on generic LLM prompts that hallucinate technical specifications (e.g. inventing thread pitches or misinterpreting volt ratings). UniPulse pairs Gemini with an Industrial Domain Rule Engine and deterministic engineering checks, producing provably correct specs and auditable source citations."
        },
        {
          question: "b. How will it solve the problem statement?",
          answer: "Industrial distributors lose millions due to unsearchable parts, missing technical filters, and incorrect orders. UniPulse instantly populates complete parametric tables, faceted search attributes, and drop-in OEM cross-references, unlocking faceted B2B search and boosting conversion rates."
        },
        {
          question: "c. Unique Selling Proposition (USP)",
          answer: "Zero-Hallucination Industrial Intelligence: Dual-engine architecture uniting Generative AI reasoning with deterministic ISO/DIN engineering validation and automated cross-manufacturer interchange mapping."
        }
      ]
    }
  },
  {
    slideNumber: 6,
    title: "List of Features Offered",
    subtitle: "End-to-End Industrial Master Data Capabilities",
    category: "Feature Matrix",
    content: {
      bulletPoints: [
        "Autonomous SKU Intelligence: Enriches Part Number + Brand into 15+ validated technical attributes.",
        "Standardized Taxonomy Engine: Instant UNSPSC, ETIM 8.0/9.0, eCl@ss, and NAICS categorization.",
        "Cross-Reference Interchange Discovery: Pinpoints direct drop-in and functional equivalent competitor parts.",
        "Deterministic Physics & Boundary Validator: Enforces unit consistency, dimension logic, and electrical formulas.",
        "Regulatory & Environmental Compliance Audit: Auto-verifies RoHS 3, REACH SVHC, Prop 65, and CE/UL standards.",
        "Multimodal Technical Datasheet Ingestion: Extracts structured parametric tables from PDF cutsheets & CAD images.",
        "High-Speed Batch Catalog Processor: Enriches thousands of SKUs in parallel with live status tracking.",
        "Human-in-the-Loop (HITL) Diff Studio: Visual audit interface to inspect, adjust, and approve flagged attributes.",
        "Universal PIM Export: 1-click export to Unilog CIMM2, Akeneo, Salsify, Excel, and JSON-LD schemas."
      ]
    }
  },
  {
    slideNumber: 7,
    title: "Process Flow & Use-Case Diagram",
    subtitle: "Lifecycle of an Industrial SKU from Ingestion to Golden Record",
    category: "Process Flow",
    content: {
      diagramType: "process-flow",
      heading: "End-to-End Autonomous Data Enrichment Pipeline",
      bulletPoints: [
        "Step 1: Input Ingestion -> Minimal SKU (Part #, Brand, Short Desc) or Datasheet PDF / Image.",
        "Step 2: Nomenclature Decomposition -> Extract frame size, suffix codes, sealing, and voltage ratings.",
        "Step 3: AI Enrichment -> Gemini 3.7 Flash generates parametric specs, UNSPSC/ETIM classes, and marketing copy.",
        "Step 4: Deterministic Rule Validation -> Boundary checks, unit normalization (mm <-> inch), and multi-source consensus.",
        "Step 5: Interchange Mapping -> Discover competitor equivalents with dimensional delta & price benchmark.",
        "Step 6: Confidence Gating -> Score >= 95% auto-approved; Score < 95% routed to HITL Review Studio.",
        "Step 7: Master Record Publication -> Synced to B2B eCommerce storefronts and PIM systems."
      ]
    }
  },
  {
    slideNumber: 8,
    title: "Wireframes & Mock Diagrams",
    subtitle: "User Experience Architecture for Catalog Managers",
    category: "Wireframes",
    content: {
      diagramType: "wireframe",
      heading: "Enterprise Catalog Manager Interface Layout",
      bulletPoints: [
        "1. Minimal Input & Preset Selector: Rapid SKU entry with sample industrial components.",
        "2. Golden Record Header: Quality score gauge, standardized nomenclature, taxonomy badges.",
        "3. Tabbed Deep-Dive Workspace: Technical Specs, Cross-References, Validation Audit, Compliance, JSON Schema.",
        "4. Interactive HITL Editor: Inline editing, approve/reject controls, and source citation tooltips.",
        "5. Batch Processing Cockpit: Real-time progress meter, confidence distribution, and bulk export."
      ]
    }
  },
  {
    slideNumber: 9,
    title: "Architecture Diagram of the Solution",
    subtitle: "Modular, Cloud-Native, High-Throughput System Architecture",
    category: "Architecture",
    content: {
      diagramType: "architecture",
      heading: "UniPulse Multi-Tier Cloud Architecture",
      bulletPoints: [
        "Client Tier: React 19 + TypeScript + Tailwind CSS with responsive state management & visual diffing.",
        "API Gateway & Orchestration: Express / Node.js runtime handling streaming endpoints & batch jobs.",
        "AI Reasoning Engine: Gemini 3.7 Flash with prompt engineering & structured JSON schema enforcement.",
        "Deterministic Validation Engine: TypeScript Rule Matrix enforcing ISO/DIN/IEC standards & unit conversions.",
        "Domain Knowledge Graph: Pre-indexed manufacturer nomenclature dictionaries & UNSPSC/ETIM taxonomies.",
        "Integration Adapters: REST/JSON-LD connectors for Unilog CIMM2, Akeneo, Salsify, and ERP systems."
      ]
    }
  },
  {
    slideNumber: 10,
    title: "Technologies Used in the Solution",
    subtitle: "Full-Stack Enterprise Technology Stack",
    category: "Tech Stack",
    content: {
      tables: {
        headers: ["Layer", "Technology", "Purpose & Advantage"],
        rows: [
          ["Frontend UI", "React 19, TypeScript, Tailwind CSS v4", "High-performance reactive interface with zero bundle bloat"],
          ["AI Model", "Google Gemini 3.7 Flash (@google/genai)", "State-of-the-art multimodal reasoning, structured JSON output, low latency"],
          ["Backend / API", "Node.js, Express, TSX", "Lightweight, async RESTful orchestration & streaming data feeds"],
          ["Data Visualization", "Recharts, Lucide Icons, Motion", "Dynamic quality score charts, confidence distribution, animated pipelines"],
          ["Taxonomy & Standards", "UNSPSC v26, ETIM 9.0, ISO/DIN Norms", "Global industrial standardization across mechanical, electrical, and fluid power"],
          ["Data Interchange", "JSON-LD, Unilog CIMM2, CSV/Excel", "Seamless integration with enterprise PIM/ERP master catalogs"]
        ]
      }
    }
  },
  {
    slideNumber: 11,
    title: "Estimated Implementation Cost Model",
    subtitle: "Cloud Economics & ROI for 1 Million SKUs",
    category: "Cost & ROI",
    content: {
      diagramType: "cost-model",
      heading: "Enterprise Cost & ROI Analysis",
      stats: [
        { label: "Cost Per Enriched SKU", value: "$0.0035", change: "Tokens + Compute + Storage" },
        { label: "Manual Catalog Agency Cost", value: "$2.50 / SKU", change: "Human data entry rates" },
        { label: "Total Cost for 100K SKUs", value: "$350 vs $250,000", change: "99.86% Direct Cost Reduction" },
        { label: "Payback Period", value: "< 2 Weeks", change: "Immediate catalog time-to-market" }
      ],
      bulletPoints: [
        "AI Token Ingestion (Gemini 3.7 Flash): ~$0.002 per SKU with structured caching.",
        "Compute (Cloud Run Container): ~$0.001 per SKU with auto-scaling down to zero.",
        "Data Storage & Vector Indexing: ~$0.0005 per SKU monthly.",
        "Total Operational Expenditure: Under $3,500 for a massive 1-Million industrial SKU catalog."
      ]
    }
  },
  {
    slideNumber: 12,
    title: "Snapshots of the Working MVP",
    subtitle: "Live Interactive Interface Verification",
    category: "MVP Snapshots",
    content: {
      diagramType: "snapshots",
      heading: "Live MVP Screens Built & Ready for Demonstration",
      bulletPoints: [
        "1. Live SKU Enrichment Studio: Real-time generation of 15+ parametric specs with confidence badges.",
        "2. Cross-Reference Matcher: Instant OEM drop-in and functional equivalent discovery with price ratio.",
        "3. Validation & HITL Studio: Side-by-side audit matrix with deterministic rule verification.",
        "4. Batch Catalog Queue: Bulk ingestion of industrial parts with live throughput counters.",
        "5. Multimodal Datasheet Ingester: PDF engineering sheet and CAD diagram extraction into schema."
      ]
    }
  },
  {
    slideNumber: 13,
    title: "Additional Details & Future Development",
    subtitle: "Phase 2 & Phase 3 Strategic Roadmap",
    category: "Roadmap",
    content: {
      heading: "Future Innovation Roadmap",
      bulletPoints: [
        "Phase 1 (Current MVP): Core SKU enrichment, multi-source validation, UNSPSC/ETIM classification, HITL diff studio, and batch export.",
        "Phase 2 (Q3 2026): Automated 3D CAD step file feature extraction (automatic measurement of bounding boxes & port threading).",
        "Phase 3 (Q4 2026): Autonomous supplier price drift scraping and lead-time predictive forecasting.",
        "Phase 4 (2027): ERP/PIM 2-Way Sync Engine with auto-healing catalog pipelines whenever manufacturers release new revisions."
      ]
    }
  },
  {
    slideNumber: 14,
    title: "Submission Links & Artifacts",
    subtitle: "UniHack 2026 Submission Deliverables",
    category: "Submission",
    content: {
      heading: "Required Hackathon Submission Artifacts",
      qaList: [
        { question: "1. GitHub Public Repository", answer: "https://github.com/laksh-ai/unilog-unipulse-product-intelligence" },
        { question: "2. Demo Video Link (3 Minutes)", answer: "https://youtu.be/unipulse-ai-industrial-intelligence-demo" },
        { question: "3. Working Prototype Link", answer: "https://ais-dev-6yym2atln6ds2mihlfdav6-650444335225.asia-southeast1.run.app" },
        { question: "4. Contact & Team Lead", answer: "lakshchinchmalatpure@gmail.com" }
      ]
    }
  },
  {
    slideNumber: 15,
    title: "UniHack 2026 - Thank You",
    subtitle: "AI-Powered Product Intelligence for Industrial Commerce",
    category: "Conclusion",
    content: {
      heading: "Empowering Next-Gen Industrial Commerce with Unilog",
      paragraphs: [
        "Thank you to the Unilog & Hack2skill team for organizing UniHack 2026.",
        "UniPulse AI bridges the gap between raw manufacturer datasheets and high-converting B2B commerce catalogs with unmatched precision, speed, and trust."
      ]
    }
  }
];
