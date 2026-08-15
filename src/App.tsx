import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HackathonPortal } from "./components/HackathonPortal";
import { EnrichmentStudio } from "./components/EnrichmentStudio";
import { AiMlEngineHub } from "./components/AiMlEngineHub";
import { BatchProcessor } from "./components/BatchProcessor";
import { ValidationMatrix } from "./components/ValidationMatrix";
import { DatasheetIngester } from "./components/DatasheetIngester";
import { CatalogAnalytics } from "./components/CatalogAnalytics";
import { PresentationDeck } from "./components/PresentationDeck";
import { EnterpriseAuthModal } from "./components/EnterpriseAuthModal";
import { GoogleAuthModal } from "./components/GoogleAuthModal";
import { SAMPLE_PRODUCTS } from "./data/mockIndustrialCatalog";
import { PRESET_USERS, INITIAL_AUDIT_LOGS, INITIAL_API_KEYS } from "./data/authContextData";
import { EnrichedProduct, UserProfile, AuditLogEntry, ApiKeyRecord } from "./types";
import { Sparkles, Layers, ShieldCheck, FileText, BarChart3, Presentation, Zap } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("portal");
  const [currentProduct, setCurrentProduct] = useState<EnrichedProduct>(SAMPLE_PRODUCTS[0]);
  const [totalEnriched, setTotalEnriched] = useState<number>(6240);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Enterprise Auth & Security States with localStorage persistence
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("unipulse_user_session");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read stored session:", e);
    }
    // Default logged-in user with Google OAuth identity
    return {
      ...PRESET_USERS.STAFF_DATA_ARCHITECT,
      name: "Laksh Chinchmalatpure",
      email: "lakshchinchmalatpure@gmail.com",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=lakshchinchmalatpure@gmail.com",
      authProvider: "GOOGLE_OAUTH",
      googleId: "google-oauth2-1089382109823",
      emailVerified: true,
      isLoggedIn: true,
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [apiKeys, setApiKeys] = useState<ApiKeyRecord[]>(INITIAL_API_KEYS);

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("unipulse_user_session", JSON.stringify(currentUser));
      }
    } catch (e) {
      console.warn("Could not persist session:", e);
    }
  }, [currentUser]);

  // Check health and API status
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasGeminiKey === "boolean") {
          setHasApiKey(data.hasGeminiKey);
        }
      })
      .catch((err) => console.log("Health check note:", err));
  }, []);

  const handleProductEnriched = (prod: EnrichedProduct) => {
    setCurrentProduct(prod);
    setTotalEnriched((prev) => prev + 1);
    
    // Add real audit log
    handleAddAuditLog({
      action: "SKU_ENRICHMENT_EXECUTED",
      actor: currentUser.name,
      actorRole: currentUser.role,
      targetSku: prod.partNumber,
      status: "SUCCESS",
      ipAddress: "192.168.44.12",
      latencyMs: 38,
      details: `Enriched ${prod.partNumber} (${prod.brand}) with confidence ${prod.qualityScore}%. UNSPSC: ${prod.unspscCode}, ETIM: ${prod.etimClassCode}.`,
    });
  };

  const handleAddAuditLog = (logData: Omit<AuditLogEntry, "id" | "timestamp" | "hashSignature">) => {
    const newLog: AuditLogEntry = {
      ...logData,
      id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
      hashSignature: "0x" + Math.random().toString(16).substring(2, 10) + "..." + Math.random().toString(16).substring(2, 7),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleGenerateApiKey = (name: string, env: "PRODUCTION" | "STAGING" | "SANDBOX") => {
    const rawSecret = `uni_${env.toLowerCase().slice(0, 4)}_sec_${Math.random().toString(16).substring(2, 14)}`;
    const newKey: ApiKeyRecord = {
      id: `KEY-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      prefix: `${rawSecret.slice(0, 14)}...`,
      keyMasked: `${rawSecret}_active`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Just now",
      rateLimitRpm: env === "PRODUCTION" ? 25000 : env === "STAGING" ? 10000 : 5000,
      scopes: ["catalog:read", "catalog:write", "ai:inference"],
      environment: env,
      status: "ACTIVE",
    };
    setApiKeys((prev) => [newKey, ...prev]);
    handleAddAuditLog({
      action: "API_KEY_GENERATED",
      actor: currentUser.name,
      actorRole: currentUser.role,
      status: "SUCCESS",
      ipAddress: "192.168.44.12",
      latencyMs: 12,
      details: `Generated new API key '${name}' (${env}) with rate limit ${newKey.rateLimitRpm} RPM.`,
    });
  };

  const handleRevokeApiKey = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "REVOKED" } : k))
    );
    handleAddAuditLog({
      action: "API_KEY_REVOKED",
      actor: currentUser.name,
      actorRole: currentUser.role,
      status: "WARNING",
      ipAddress: "192.168.44.12",
      latencyMs: 9,
      details: `Revoked API credential with ID ${id}.`,
    });
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    try {
      localStorage.removeItem("unipulse_user_session");
    } catch {}
    handleAddAuditLog({
      action: "USER_LOGOUT_SESSION_CLEARED",
      actor: currentUser.name,
      actorRole: currentUser.role,
      status: "SUCCESS",
      ipAddress: "192.168.44.12",
      latencyMs: 6,
      details: `User session logged out for ${currentUser.email}.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#FF6B00] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasApiKey={hasApiKey}
        totalEnriched={totalEnriched}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === "portal" && (
          <HackathonPortal
            onOpenApp={(tab = "studio") => setActiveTab(tab)}
          />
        )}

        {activeTab === "studio" && (
          <EnrichmentStudio
            currentProduct={currentProduct}
            setCurrentProduct={handleProductEnriched}
          />
        )}

        {activeTab === "aiml" && (
          <AiMlEngineHub />
        )}

        {activeTab === "batch" && (
          <BatchProcessor />
        )}

        {activeTab === "validation" && (
          <ValidationMatrix />
        )}

        {activeTab === "datasheet" && (
          <DatasheetIngester />
        )}

        {activeTab === "analytics" && (
          <CatalogAnalytics />
        )}

        {activeTab === "presentation" && (
          <PresentationDeck />
        )}
      </main>

      {/* Primary Google Authentication & Registration Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onLogout={handleLogout}
        onAddAuditLog={handleAddAuditLog}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-8 text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 bg-[#FF6B00]"></div>
            <span className="font-black text-white uppercase tracking-wider">UNILOG<span className="text-[#FF6B00]">2026</span></span>
            <span className="text-white/20">|</span>
            <span className="text-white/70 uppercase tracking-widest text-[10px] font-bold">UniPulse AI Enterprise Catalog Engine (Google Auth Enabled)</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/40">
            <span>AUTHENTICATED AS: <strong className="text-[#FF6B00]">{currentUser.name}</strong> ({currentUser.email})</span>
            <span>•</span>
            <span>POWERED BY <strong className="text-white">GEMINI 3.7 FLASH</strong></span>
            <span>•</span>
            <span>UNILOG PIM MASTER</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
