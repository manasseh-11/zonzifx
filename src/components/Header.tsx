import { Lock, ArrowLeft, Shield } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl border-b border-white/5 shadow-sm">
      <div className="flex items-center justify-between px-6 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={() => onNavigate("landing")}
          className="font-headline text-xl md:text-2xl font-bold text-white tracking-tighter cursor-pointer flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="gold-text-gradient">ZonziFX</span>
          <span className="text-white font-light text-lg">Academy</span>
        </div>

        {/* Dynamic Navigation Options */}
        {currentPage === "landing" && (
          <div className="hidden md:flex items-center gap-8 font-headline text-sm font-medium">
            <a href="#curriculum" className="text-[#cfc4c5] hover:text-white transition-colors">
              Programs
            </a>
            <a href="#results" className="text-[#cfc4c5] hover:text-white transition-colors">
              Market Insights
            </a>
            <a href="#why-us" className="text-[#cfc4c5] hover:text-white transition-colors">
              Mentorship
            </a>
            <a href="#testimonials" className="text-[#cfc4c5] hover:text-white transition-colors">
              About
            </a>
            <a onClick={() => onNavigate("vault")} className="text-[#cfc4c5] hover:text-[#e9c349] transition-colors cursor-pointer font-bold">
              Lectures
            </a>
          </div>
        )}

        {(currentPage === "enroll" || currentPage === "admin" || currentPage === "vault") && (
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm font-medium text-[#cfc4c5] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </button>
        )}

        {currentPage === "checkout" && (
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate("enroll")}
              className="flex items-center gap-1 text-sm font-medium text-[#cfc4c5] hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Application</span>
              <span className="sm:hidden">Back</span>
            </button>
            <span className="w-[1px] h-4 bg-white/10 hidden sm:block"></span>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#e9c349]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#cfc4c5]">
                Secure Checkout
              </span>
            </div>
          </div>
        )}

        {currentPage === "success" && (
          <div className="flex items-center gap-2 text-[#e9c349]">
            <Shield className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest">
              Enrollment Confirmed
            </span>
          </div>
        )}

        {/* Dynamic Join CTA for Landing */}
        {currentPage === "landing" && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("admin")}
              className="text-[#cfc4c5] hover:text-[#e9c349] hover:bg-white/5 transition-all p-2 rounded cursor-pointer"
              title="Operator Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("enroll")}
              className="gold-gradient text-black font-headline text-xs md:text-sm px-5 py-2.5 rounded font-bold hover:scale-[1.03] active:scale-95 transition-all inner-glow cursor-pointer"
            >
              Join Academy
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
