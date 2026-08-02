import React, { useState } from "react";
import { Lock, Mail, ShieldAlert, KeyRound, ArrowLeft, ShieldCheck } from "lucide-react";

interface StudentLoginProps {
  onLoginSuccess: (student: { fullName: string; email: string }) => void;
  onNavigate: (page: string) => void;
}

export default function StudentLogin({ onLoginSuccess, onNavigate }: StudentLoginProps) {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !accessCode.trim()) {
      setError("Please complete all authentication key parameters.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accessCode })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.student);
      } else {
        setError(data.error || "Verification failed. Invalid coordinates.");
      }
    } catch (err) {
      console.error("Student login error:", err);
      setError("Connection to security gate database disrupted.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutofillDemo = () => {
    setEmail("alex@trading.com");
    setAccessCode("ZF-9021");
    setError("");
  };

  return (
    <div className="relative pt-24 min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center p-4 select-none font-mono">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#e9c349]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#131313]/90 rounded-xl border border-white/5 p-8 backdrop-blur-xl relative z-10 shadow-2xl space-y-6">
        
        {/* Navigation back */}
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 text-xs text-[#cfc4c5] hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Home</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#e9c349]/10 text-[#e9c349] rounded-full flex items-center justify-center mx-auto border border-[#e9c349]/20 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <span className="font-mono text-[9px] text-[#e9c349] tracking-widest uppercase block font-bold">
            ZonziFX Watchroom Access
          </span>
          <h2 className="font-headline text-xl font-bold text-white">
            Student Authentication Gate
          </h2>
          <p className="text-xs text-[#cfc4c5]/60 max-w-xs mx-auto font-sans leading-relaxed">
            Please authenticate using your registered email and the unique access code issued by your ZonziFX mentor.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-[11px] font-mono leading-normal flex gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-1.5 font-mono">
            <label className={`block text-[9px] uppercase tracking-wider transition-colors ${
              focusedField === "email" ? "text-[#e9c349]" : "text-[#cfc4c5]"
            }`}>
              Registered Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="registered@email.com"
                className="w-full bg-black border border-white/10 p-3 pl-10 rounded text-white text-xs focus:border-[#e9c349] focus:outline-none"
                required
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
            </div>
          </div>

          {/* Access Code input */}
          <div className="space-y-1.5 font-mono">
            <label className={`block text-[9px] uppercase tracking-wider transition-colors ${
              focusedField === "code" ? "text-[#e9c349]" : "text-[#cfc4c5]"
            }`}>
              Unique Access Code
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onFocus={() => setFocusedField("code")}
                onBlur={() => setFocusedField(null)}
                placeholder="ZF-XXXX"
                className="w-full bg-black border border-white/10 p-3 pl-10 rounded text-white text-xs focus:border-[#e9c349] focus:outline-none font-mono"
                required
              />
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full gold-gradient text-black font-headline text-xs py-3.5 rounded font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#af8d11]/15 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Verify Access
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <button 
            onClick={handleAutofillDemo}
            className="text-[10px] font-mono text-[#e9c349]/70 hover:text-[#e9c349] transition-colors border border-[#e9c349]/20 hover:border-[#e9c349]/50 px-3 py-1.5 rounded bg-white/5 active:scale-95 cursor-pointer"
          >
            💡 Quick Demo Login (Pre-Approved Student)
          </button>
          <p className="text-[9px] text-[#cfc4c5]/40 mt-3 font-sans">
            Demo account: <code className="text-white select-all">alex@trading.com</code> / code <code className="text-white select-all">ZF-9021</code>
          </p>
        </div>

      </div>
    </div>
  );
}
