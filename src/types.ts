export interface TechnicalSpecification {
  attributeName: string;
  value: string;
  unit?: string;
  confidenceScore: number; // 0 - 100
  source: string; // e.g. "ISO 15 Standard", "Manufacturer Spec Sheet", "Heuristic Parser"
  validationRule?: string;
  verified?: boolean;
  isEdited?: boolean;
}

export interface CrossReference {
  competitorBrand: string;
  competitorPartNumber: string;
  matchType: "Direct OEM Exact" | "Functional Equivalent" | "Superceded Upgrade" | "Dimensionally Interchangeable";
  confidence: number;
  notes: string;
  priceRatio?: string; // e.g. "0.85x vs OEM"
}

export interface ComplianceInfo {
  rohs: "Compliant" | "Non-Compliant" | "Exempt" | "Pending";
  reach: "SVHC Free" | "Contains SVHC (<0.1%)" | "Unknown";
  prop65: "No Warning Required" | "Cancer Warning" | "Reproductive Harm";
  certifications: string[];
}

export interface ValidationSummary {
  ruleChecksPassed: number;
  ruleChecksTotal: number;
  multiSourceVerified: boolean;
  hallucinationRisk: "Low" | "Medium" | "High";
  notes: string;
  auditTrail?: {
    checkName: string;
    passed: boolean;
    detail: string;
  }[];
}

export interface EnrichedProduct {
  id?: string;
  partNumber: string;
  brand: string;
  standardizedTitle: string;
  category: string;
  unspscCode: string;
  unspscTitle: string;
  etimClassCode: string;
  etimClassName: string;
  eclassCode?: string;
  longDescription: string;
  featuresAndBenefits: string[];
  applications: string[];
  targetIndustries: string[];
  specifications: TechnicalSpecification[];
  crossReferences: CrossReference[];
  compliance: ComplianceInfo;
  qualityScore: number; // 0 - 100
  validationSummary: ValidationSummary;
  rawInput?: {
    partNumber?: string;
    brand?: string;
    shortDescription?: string;
    categoryHint?: string;
  };
  status?: "Approved" | "Needs Review" | "Pending" | "Enriched";
  timestamp?: string;
}

export interface BatchItem {
  id: string;
  partNumber: string;
  brand: string;
  shortDescription: string;
  status: "queued" | "processing" | "completed" | "flagged" | "error";
  qualityScore?: number;
  enrichedData?: EnrichedProduct;
  category?: string;
  unspsc?: string;
  confidence?: number;
  flagReason?: string;
}

export interface HackathonSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: string;
  content: {
    heading?: string;
    paragraphs?: string[];
    bulletPoints?: string[];
    qaList?: { question: string; answer: string; highlights?: string[] }[];
    diagramType?: "process-flow" | "architecture" | "wireframe" | "cost-model" | "snapshots";
    stats?: { label: string; value: string; change?: string }[];
    tables?: { headers: string[]; rows: string[][] };
  };
}

// ==========================================
// 40+ LPA ENTERPRISE AUTH & SECURITY ENGINE
// ==========================================

export type EnterpriseRole = 
  | "STAFF_DATA_ARCHITECT"       // L6 / Staff Engineer: Full ontology, rules, raw prompt tuning
  | "PRINCIPAL_PIM_ADMIN"        // L7 / Director: Prod approvals, ERP bridge, secret keys
  | "CATALOG_OPS_ENGINEER"       // L4-L5 / Data Engineer: Batch ingestion, drift tracking
  | "COMPLIANCE_QUALITY_AUDITOR"; // Security & Quality: Zero-hallucination validation, ISO audit

export interface RolePermission {
  canEditOntology: boolean;
  canApproveProduction: boolean;
  canExecutePythonSandbox: boolean;
  canExportGoldenMaster: boolean;
  canManageApiKeys: boolean;
  canOverrideRules: boolean;
  canViewAuditLogs: boolean;
  maxBatchSize: number;
  rateLimitPerMinute: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: EnterpriseRole;
  roleTitle: string;
  roleLevel: string; // e.g. "L6 - Staff Engineer"
  department: string;
  organization: string;
  clearanceLevel: "LEVEL_4_RESTRICTED" | "LEVEL_3_INTERNAL" | "LEVEL_2_OPERATIONAL";
  avatar: string;
  jwtToken: string;
  mfaEnabled: boolean;
  mfaMethod: "TOTP_AUTHENTICATOR" | "HARDWARE_YUBIKEY" | "SAML_SSO" | "GOOGLE_AUTHENTICATOR";
  apiKey: string;
  lastLogin: string;
  sessionExpiry: string;
  permissions: RolePermission;
  authProvider?: "GOOGLE_OAUTH" | "EMAIL_PASSWORD" | "ENTERPRISE_SSO";
  googleId?: string;
  emailVerified?: boolean;
  isLoggedIn?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorRole: string;
  targetSku?: string;
  status: "SUCCESS" | "BLOCKED_RBAC" | "WARNING" | "CRITICAL";
  ipAddress: string;
  latencyMs: number;
  details: string;
  hashSignature: string;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  keyMasked: string;
  createdAt: string;
  lastUsed: string;
  rateLimitRpm: number;
  scopes: string[];
  environment: "PRODUCTION" | "STAGING" | "SANDBOX";
  status: "ACTIVE" | "REVOKED";
}
