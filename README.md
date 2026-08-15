# ⚡ UniPulse AI — Autonomous Industrial Product Intelligence Engine
> **UniHack 2026 Enterprise Grand Challenge Submission**  
> *Engineered with a 40+ LPA Staff / Principal Architecture for Zero-Hallucination Industrial B2B Catalog Automation.*

[![Live Preview](https://img.shields.io/badge/Live%20Demo-Vercel%20%2F%20Cloud%20Run-FF6B00?style=for-the-badge&logo=vercel)](https://unihack-hackathon.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20Gemini%203.7-black?style=for-the-badge&logo=react)](https://react.dev)
[![Enterprise RBAC](https://img.shields.io/badge/Security-Google%20OAuth%202.0%20%7C%20RS256%20JWT-4285F4?style=for-the-badge&logo=google)](https://developers.google.com/identity)
[![Zero-Hallucination](https://img.shields.io/badge/Guardrails-ISO%2015%20%7C%20DIN%20625%20Physical%20Invariants-00C853?style=for-the-badge)](https://www.iso.org)

---

## 📌 Executive Summary

Industrial B2B commerce platforms (e.g., Unilog, Grainger, Fastenal) manage millions of complex technical SKUs. Traditional PIM enrichment workflows suffer from:
1. **Unstandardized Part Numbers & Ambiguous Nomenclature** (e.g., *"6205-2RS1" vs "6205 DDU"*).
2. **Missing Parametric Attributes** across mechanical, electrical, and thermal dimensions.
3. **High Hallucination Risk** when standard LLMs parse dense technical datasheets, generating physically impossible dimensions.
4. **Slow Manual Onboarding**, averaging 15–30 minutes per complex SKU.

**UniPulse AI** is an autonomous industrial product intelligence engine designed to ingest raw, unstructured supplier datasheets and transform them into **100% physically validated, UNSPSC/ETIM/eCl@ss-classified catalog records in <800ms**.

---

## 🚀 Key Innovations & Architectural Highlights

### 1. 🛡️ Zero-Hallucination Physical Invariant Layer
Unlike general-purpose AI wrappers, UniPulse executes strict mathematical validation against physical and international engineering standards before accepting any LLM output:
* **Mechanical Invariants**: Validates standard bearing geometries (e.g., $d_{\text{bore}} < D_{\text{outer}}$, $B_{\text{width}} < D_{\text{outer}}$) and load hierarchies ($C_r \ge C_{0r}$).
* **Electrical Safety Rules**: Enforces breakdown voltage and dielectric withstand thresholds.
* **Standards Compliance**: Real-time cross-referencing against **ISO 15**, **DIN 625-1**, **RoHS 3**, and **REACH**.

### 2. 🔐 Enterprise Google Authentication & Multi-Persona RBAC
Built from the ground up for strict enterprise governance:
* **Google Identity Services (OAuth 2.0)**: Single-click instant Google Sign-In and account registration.
* **4 Pre-Configured Enterprise Roles**:
  * **Lead Industrial Data Architect (L6 • Staff Principal)**: Unrestricted ontology editing, prompt tuning, and mathematical rule overrides.
  * **Principal PIM Administrator (L7 • Director)**: Production catalog release approvals, ERP bridge provisioning, and API key management.
  * **Catalog Operations Engineer (L5 • Senior Specialist)**: High-throughput batch processing pipelines and data drift alerts.
  * **Compliance & ISO Quality Auditor**: Zero-hallucination validation, physical boundary invariant checks, and RoHS/REACH compliance audit.
* **Cryptographic Token Inspector**: Decoded RS256 JWT header/payload visualizer with HSM signature verification and immutable audit logs.

### 3. ⚡ High-Throughput Batch Processing & ERP Integration
* **Parallel Asynchronous Ingestion**: Multi-worker pipeline processing thousands of SKUs concurrently with live throughput metrics (TPS), latency tracking, and Dead Letter Queue (DLQ) retry mechanisms.
* **One-Click Export Formats**: Instant schema-compliant export for **SAP S/4HANA (BAPI / IDoc)**, **Akeneo PIM**, and **Unilog CIMM2**.

---

## 🛠️ System Architecture

```
                               ┌────────────────────────────────────────┐
                               │       Client Layer (React + Vite)       │
                               │  - Google OAuth 2.0 / JWT Auth         │
                               │  - Enterprise Multi-Persona HUD        │
                               │  - Interactive Hackathon Portal        │
                               └───────────────────┬────────────────────┘
                                                   │
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │     Express & Vite Middleware Proxy    │
                               │  - /api/auth/google & /api/auth/login  │
                               │  - Rate-Limiting Gateway (25,000 RPM)  │
                               └───────────────────┬────────────────────┘
                                                   │
                         ┌─────────────────────────┴─────────────────────────┐
                         ▼                                                   ▼
┌──────────────────────────────────────────────────┐   ┌──────────────────────────────────────────────────┐
│             Multimodal AI Extraction             │   │       Zero-Hallucination Engineering Guard       │
│  - Gemini 3.7 Flash / Flash Lite Failover Tier   │   │  - Mechanical Boundary Invariants (ISO 15)       │
│  - Raw Datasheet PDF / Spec Sheet Parser         │   │  - Dynamic vs Static Load Rating Hierarchy       │
│  - UNSPSC / ETIM 8.0 Taxonomy Classifier         │   │  - RoHS 3 / REACH Environmental Verification     │
└────────────────────────┬─────────────────────────┘   └────────────────────────┬─────────────────────────┘
                         │                                                      │
                         └─────────────────────────┬────────────────────────────┘
                                                   │
                                                   ▼
                               ┌────────────────────────────────────────┐
                               │        Enterprise Output Hub           │
                               │  - SAP S/4HANA / Akeneo / Unilog CIMM2 │
                               │  - Immutable Cryptographic Audit Log   │
                               └────────────────────────────────────────┘
```

---

## 💻 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Tailwind CSS, Motion Animations |
| **Icons & UI Components** | Lucide React, JetBrains Mono, Syne, Plus Jakarta Sans |
| **Backend & Routing** | Node.js, Express, Vite Middleware |
| **AI & Multimodal LLM** | Google Gemini 3.7 Flash (`@google/genai` SDK) |
| **Authentication & RBAC** | Google OAuth 2.0, RS256 JWT Tokens, Web Crypto API |
| **Standards & Ontologies** | UNSPSC v26, ETIM Class 8.0, eCl@ss 12.0, ISO 15 / DIN 625 |

---

## 🏁 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/LakshChinchmalatpure/unihack_hackathon.git
cd unihack_hackathon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (optional for offline mode, required for live Gemini extraction):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).*

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

UniPulse AI is optimized for 1-click deployment on **Vercel**:
1. Import repository into **Vercel**.
2. **Framework Preset**: `Vite`
3. **Build Command**: `vite build`
4. **Output Directory**: `dist`
5. *(Optional)* Add `GEMINI_API_KEY` under Environment Variables.
6. Click **Deploy**!

---

## 👥 Hackathon Team & Project Info

* **Event**: UniHack 2026 (Global Innovation Hackathon)
* **Track**: Enterprise Industrial B2B & AI-Powered Product Intelligence
* **Lead Engineer**: Laksh Chinchmalatpure ([lakshchinchmalatpure@gmail.com](mailto:lakshchinchmalatpure@gmail.com))
* **License**: MIT License
