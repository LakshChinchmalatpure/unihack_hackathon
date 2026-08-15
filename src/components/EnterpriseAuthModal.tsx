import React, { useState } from "react";
import {
  Shield,
  Key,
  Lock,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Copy,
  ExternalLink,
  Code,
  FileText,
  Activity,
  Layers,
  Zap,
  Check,
  X,
  Fingerprint,
  ChevronRight,
  Sliders,
  LogOut,
  Sparkles,
  Server,
  Database
} from "lucide-react";
import { UserProfile, EnterpriseRole, AuditLogEntry, ApiKeyRecord } from "../types";
import { PRESET_USERS, ROLE_PERMISSIONS_MAP } from "../data/authContextData";

interface EnterpriseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  auditLogs: AuditLogEntry[];
  apiKeys: ApiKeyRecord[];
  onAddAuditLog: (log: Omit<AuditLogEntry, "id" | "timestamp" | "hashSignature">) => void;
  onGenerateApiKey: (name: string, env: "PRODUCTION" | "STAGING" | "SANDBOX") => void;
  onRevokeApiKey: (id: string) => void;
}

export const EnterpriseAuthModal: React.FC<EnterpriseAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
  auditLogs,
  apiKeys,
  onAddAuditLog,
  onGenerateApiKey,
  onRevokeApiKey,
}) => {
  const [activeTab, setActiveTab] = useState<"roles" | "jwt" | "apikeys" | "audit" | "login">("roles");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Custom API key generator form
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<"PRODUCTION" | "STAGING" | "SANDBOX">("PRODUCTION");
  const [customKeySuccess, setCustomKeySuccess] = useState(false);

  // Manual login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [ssoProcessing, setSsoProcessing] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRoleSwitch = (roleKey: EnterpriseRole) => {
    const targetUser = PRESET_USERS[roleKey];
    onSelectUser(targetUser);
    onAddAuditLog({
      action: "USER_SESSION_ROLE_SWITCH",
      actor: targetUser.name,
      actorRole: targetUser.role,
      status: "SUCCESS",
      ipAddress: "192.168.44.12 (mTLS Gateway)",
      latencyMs: 14,
      details: `Switched active RBAC context to ${targetUser.roleTitle} (${targetUser.roleLevel}).`,
    });
    setAuthSuccessMsg(`Active identity switched to ${targetUser.name}`);
    setTimeout(() => setAuthSuccessMsg(""), 3000);
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    onGenerateApiKey(newKeyName.trim(), newKeyEnv);
    setNewKeyName("");
    setCustomKeySuccess(true);
    setTimeout(() => setCustomKeySuccess(false), 3000);
  };

  const handleSsoLogin = (provider: string) => {
    setSsoProcessing(true);
    setTimeout(() => {
      setSsoProcessing(false);
      handleRoleSwitch("STAFF_DATA_ARCHITECT");
      setAuthSuccessMsg(`Authenticated via ${provider} SSO (Mutual TLS 1.3 & FIDO2)`);
      setTimeout(() => setAuthSuccessMsg(""), 3000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0a0a0a] border border-white/20 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with identity badge */}
        <div className="bg-[#111] border-b border-white/10 p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] text-black font-black flex items-center justify-center text-lg">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black uppercase text-white tracking-tight">
                  Enterprise Security & Auth Engine
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 font-bold uppercase">
                  Staff L6/L7 RBAC
                </span>
              </div>
              <p className="text-xs text-white/50 font-medium">
                Mutual TLS • Hardware YubiKey MFA • RS256 JWT Tokens • ISO 15 / CIMM2 RBAC Guard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#1c1c1c] hover:bg-white hover:text-black text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global Notification Banner */}
        {authSuccessMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 px-6 py-2 text-xs font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{authSuccessMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-[#0d0d0d] border-b border-white/10 px-4 sm:px-6 flex flex-wrap gap-1">
          {[
            { id: "roles", label: "40+ LPA Staff Roles & RBAC", icon: Users },
            { id: "jwt", label: "JWT Token & Claims Inspector", icon: Code },
            { id: "apikeys", label: "API Keys & Gateway Tokens", icon: Key },
            { id: "audit", label: "Immutable Audit Log", icon: Activity },
            { id: "login", label: "SSO & Custom Login", icon: Fingerprint },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#FF6B00] text-white bg-white/5"
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B00]" : "text-white/40"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* ================= TAB 1: ROLES & RBAC SWITCHER ================= */}
          {activeTab === "roles" && (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-mono text-[#FF6B00] font-black uppercase tracking-widest">
                  ROLE-BASED ACCESS CONTROL (RBAC)
                </div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight mt-0.5">
                  Select Active Enterprise Persona
                </h3>
                <p className="text-white/60 text-xs">
                  Switching personas dynamically updates backend permissions, batch limits, API rate-limits, and audit signatures.
                </p>
              </div>

              {/* 4 Role Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(PRESET_USERS).map(([roleKey, user]) => {
                  const isCurrent = currentUser.role === user.role;
                  return (
                    <div
                      key={roleKey}
                      onClick={() => handleRoleSwitch(roleKey as EnterpriseRole)}
                      className={`p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        isCurrent
                          ? "bg-[#141414] border-[#FF6B00] shadow-lg shadow-[#FF6B00]/10"
                          : "bg-[#080808] border-white/10 hover:border-white/30 hover:bg-[#0f0f0f]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-11 h-11 border border-white/20 object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-white text-sm uppercase">{user.name}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 bg-[#FF6B00] text-black font-black text-[9px] uppercase tracking-wider">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <div className="text-[#FF6B00] font-mono text-[11px] font-bold">
                              {user.roleLevel}
                            </div>
                            <div className="text-white/50 text-[10px] font-medium">{user.department}</div>
                          </div>
                        </div>

                        <div className="text-right font-mono text-[9px]">
                          <span className="px-2 py-0.5 bg-[#181818] border border-white/10 text-white/70 font-bold uppercase">
                            {user.clearanceLevel.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Capabilities pill matrix */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/10">
                        <div className="flex items-center gap-1.5">
                          {user.permissions.canEditOntology ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <X className="w-3 h-3 text-white/30" />
                          )}
                          <span className={user.permissions.canEditOntology ? "text-white/90" : "text-white/40"}>
                            Ontology Editing
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {user.permissions.canApproveProduction ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <X className="w-3 h-3 text-white/30" />
                          )}
                          <span className={user.permissions.canApproveProduction ? "text-white/90" : "text-white/40"}>
                            Prod Sign-off
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {user.permissions.canExecutePythonSandbox ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <X className="w-3 h-3 text-white/30" />
                          )}
                          <span className={user.permissions.canExecutePythonSandbox ? "text-white/90" : "text-white/40"}>
                            Python Sandbox
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[#FF6B00] font-bold">
                            Max: {user.permissions.maxBatchSize.toLocaleString()} SKUs
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-full py-2 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                          isCurrent
                            ? "bg-[#FF6B00] text-black"
                            : "bg-[#181818] text-white hover:bg-white hover:text-black"
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Currently Active Persona</span>
                          </>
                        ) : (
                          <>
                            <span>Impersonate This Persona</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Active Session Status Bar */}
              <div className="bg-[#050505] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60">ACTIVE TOKEN ISSUER:</span>
                  <span className="text-white font-bold">https://auth.unihack.unilog.ai (FIPS 140-2 Level 3)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60">MFA VERIFICATION:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {currentUser.mfaMethod} (ENFORCED)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60">SESSION EXPIRATION:</span>
                  <span className="text-[#FF6B00] font-bold">{currentUser.sessionExpiry}</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: JWT TOKEN INSPECTOR ================= */}
          {activeTab === "jwt" && (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#FF6B00] font-black uppercase tracking-widest">
                    CRYPTOGRAPHIC SESSION TOKEN
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-tight mt-0.5">
                    Decoded RS256 JSON Web Token
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(currentUser.jwtToken, "jwt-raw")}
                  className="px-3 py-1.5 bg-[#181818] hover:bg-white hover:text-black text-white text-xs uppercase font-bold border border-white/20 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === "jwt-raw" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Raw Token</span>
                </button>
              </div>

              {/* Encoded Token Strip */}
              <div className="space-y-1">
                <div className="text-[10px] text-white/50 uppercase font-bold">Encoded Token String (Bearer)</div>
                <div className="p-3 bg-[#050505] border border-white/10 text-[11px] break-all text-[#FF6B00] leading-relaxed select-all">
                  {currentUser.jwtToken}
                </div>
              </div>

              {/* Decoded Header & Payload Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase font-bold">Decoded Header (Algorithm & Key ID)</div>
                  <div className="p-3 bg-[#050505] border border-white/10 text-xs text-emerald-400 space-y-1">
                    <div>&#123;</div>
                    <div className="pl-4">"alg": "RS256",</div>
                    <div className="pl-4">"typ": "JWT",</div>
                    <div className="pl-4">"kid": "unihack-2026-secure-hsm"</div>
                    <div>&#125;</div>
                  </div>
                </div>

                {/* Payload */}
                <div className="space-y-1">
                  <div className="text-[10px] text-white/50 uppercase font-bold">Decoded Claims Payload</div>
                  <div className="p-3 bg-[#050505] border border-white/10 text-xs text-blue-300 space-y-0.5 overflow-x-auto">
                    <div>&#123;</div>
                    <div className="pl-4">"sub": "{currentUser.id}",</div>
                    <div className="pl-4">"name": "{currentUser.name}",</div>
                    <div className="pl-4">"email": "{currentUser.email}",</div>
                    <div className="pl-4">"role": "{currentUser.role}",</div>
                    <div className="pl-4">"level": "{currentUser.roleLevel}",</div>
                    <div className="pl-4">"clearance": "{currentUser.clearanceLevel}",</div>
                    <div className="pl-4">"tenant": "UNILOG-GLOBAL-USEAST1",</div>
                    <div className="pl-4">"mfa": true,</div>
                    <div className="pl-4">"iss": "https://auth.unihack.unilog.ai",</div>
                    <div className="pl-4">"aud": "unipulse-pim-gateway",</div>
                    <div className="pl-4">"iat": 1787343600,</div>
                    <div className="pl-4">"exp": 1787347200</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>

              {/* Cryptographic Verification Badge */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>RS256 Signature Verified against Unilog Public Key (SHA-256 Fingerprint: 98:FA:12:00:FE...)</span>
                </div>
                <span className="font-black text-[10px] px-2 py-0.5 bg-emerald-500/20 uppercase">Valid</span>
              </div>
            </div>
          )}

          {/* ================= TAB 3: API KEYS & SECRETS ================= */}
          {activeTab === "apikeys" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF6B00] font-black uppercase tracking-widest">
                    PROGRAMMATIC INGESTION KEYS
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-tight mt-0.5">
                    Gateway API Bearer Credentials
                  </h3>
                </div>
              </div>

              {/* Create new API Key Form */}
              <form onSubmit={handleCreateApiKey} className="p-4 bg-[#050505] border border-white/15 space-y-3">
                <div className="text-xs font-black uppercase text-white">Generate High-Throughput API Key</div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Key Identifier (e.g. ERP Databricks Exporter)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="sm:col-span-7 bg-[#111] border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                  <select
                    value={newKeyEnv}
                    onChange={(e) => setNewKeyEnv(e.target.value as any)}
                    className="sm:col-span-3 bg-[#111] border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] uppercase font-mono"
                  >
                    <option value="PRODUCTION">Production (25k RPM)</option>
                    <option value="STAGING">Staging (10k RPM)</option>
                    <option value="SANDBOX">Sandbox (5k RPM)</option>
                  </select>
                  <button
                    type="submit"
                    className="sm:col-span-2 py-2.5 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
                  >
                    Generate
                  </button>
                </div>
                {customKeySuccess && (
                  <div className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>New cryptographic token issued and registered with API Gateway.</span>
                  </div>
                )}
              </form>

              {/* Active API Keys List */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-white/60 uppercase">Registered API Tokens ({apiKeys.length})</div>
                {apiKeys.map((k) => (
                  <div
                    key={k.id}
                    className="p-4 bg-[#080808] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm uppercase">{k.name}</span>
                        <span className={`px-1.5 py-0.2 text-[9px] font-bold uppercase border ${
                          k.environment === "PRODUCTION"
                            ? "bg-red-950/60 text-red-400 border-red-500/40"
                            : "bg-blue-950/60 text-blue-400 border-blue-500/40"
                        }`}>
                          {k.environment}
                        </span>
                        <span className={`px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                          k.status === "ACTIVE" ? "bg-emerald-950 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {k.status}
                        </span>
                      </div>

                      <div className="text-white/60 text-xs">{k.keyMasked}</div>
                      <div className="text-[10px] text-white/40 flex items-center gap-3 pt-0.5">
                        <span>Created: {k.createdAt}</span>
                        <span>•</span>
                        <span>Last used: {k.lastUsed}</span>
                        <span>•</span>
                        <span>Rate limit: {k.rateLimitRpm.toLocaleString()} RPM</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyToClipboard(k.keyMasked, k.id)}
                        className="px-3 py-1.5 bg-[#181818] hover:bg-white hover:text-black text-white text-xs uppercase font-bold border border-white/20 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === k.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>

                      {k.status === "ACTIVE" && (
                        <button
                          onClick={() => onRevokeApiKey(k.id)}
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs uppercase font-bold border border-red-500/30 transition-colors cursor-pointer"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: IMMUTABLE AUDIT LOGS ================= */}
          {activeTab === "audit" && (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#FF6B00] font-black uppercase tracking-widest">
                    COMPLIANCE & TRACEABILITY
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-tight mt-0.5">
                    Cryptographic Audit Trail
                  </h3>
                </div>
                <span className="text-[10px] px-2.5 py-1 bg-[#181818] border border-white/10 text-white/60">
                  {auditLogs.length} Verified Entries
                </span>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 bg-[#050505] border border-white/10 space-y-1 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white uppercase">{log.action}</span>
                        <span className={`px-1.5 py-0.2 text-[9px] font-black uppercase ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-950 text-emerald-400"
                            : log.status === "BLOCKED_RBAC"
                            ? "bg-red-950 text-red-400"
                            : "bg-amber-950 text-amber-400"
                        }`}>
                          {log.status}
                        </span>
                      </div>

                      <div className="text-white/40 text-[10px]">{log.timestamp}</div>
                    </div>

                    <div className="text-white/70">{log.details}</div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] text-white/40 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span>Actor: <strong className="text-white/80">{log.actor}</strong> ({log.actorRole})</span>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>•</span>
                        <span>Latency: {log.latencyMs}ms</span>
                      </div>
                      <div className="text-[#FF6B00]">Sig: {log.hashSignature}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: ENTERPRISE SSO LOGIN ================= */}
          {activeTab === "login" && (
            <div className="space-y-6 max-w-xl mx-auto py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-[#FF6B00] text-black mx-auto flex items-center justify-center font-black">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  Single Sign-On (SSO) Portal
                </h3>
                <p className="text-xs text-white/60">
                  Authenticate via enterprise SAML 2.0 or OIDC Identity Provider with FIDO2 MFA.
                </p>
              </div>

              {/* SSO Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={ssoProcessing}
                  onClick={() => handleSsoLogin("Google Workspace Cloud Identity")}
                  className="w-full py-3 bg-[#181818] hover:bg-white hover:text-black text-white border border-white/20 font-black uppercase text-xs tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Server className="w-4 h-4 text-[#FF6B00]" />
                  <span>{ssoProcessing ? "Connecting to SAML Gateway..." : "Sign in with Google Cloud Identity (mTLS)"}</span>
                </button>

                <button
                  disabled={ssoProcessing}
                  onClick={() => handleSsoLogin("Unilog Enterprise Okta AD")}
                  className="w-full py-3 bg-[#181818] hover:bg-white hover:text-black text-white border border-white/20 font-black uppercase text-xs tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>{ssoProcessing ? "Verifying YubiKey FIDO2..." : "Sign in with Unilog Okta / Azure AD SAML"}</span>
                </button>
              </div>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <span className="relative px-3 bg-[#0a0a0a] text-[10px] font-mono text-white/40 uppercase font-bold">
                  OR CREDENTIAL SIGN-IN
                </span>
              </div>

              {/* Direct email login */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-white/60">Work Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@unilogcorp.com"
                    className="w-full bg-[#050505] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-white/60">Password & Hardware Key</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-[#050505] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <button
                  onClick={() => handleRoleSwitch("STAFF_DATA_ARCHITECT")}
                  className="w-full py-3 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  Authenticate & Launch Session
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#111] border-t border-white/10 p-3 sm:px-6 flex flex-wrap items-center justify-between text-xs text-white/50 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>Identity: <strong className="text-white">{currentUser.name}</strong> ({currentUser.roleTitle})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1c1c1c] hover:bg-white hover:text-black text-white text-xs uppercase font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
