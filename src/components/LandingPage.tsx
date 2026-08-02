import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { 
  TrendingUp, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Download, 
  Calendar, 
  Clock, 
  User, 
  Globe, 
  Share2, 
  Activity, 
  BookOpen, 
  Search,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TICKER_ITEMS } from "../data";
import { Program, Testimonial, TradeResult } from "../types";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectProgram: (id: string) => void;
  programs: Program[];
  testimonials: Testimonial[];
  tradeResults: TradeResult[];
}


export default function LandingPage({ onNavigate, onSelectProgram, programs, testimonials, tradeResults }: LandingPageProps) {
  // State for dynamic curriculum accordion
  const [expandedModule, setExpandedModule] = useState<number | null>(3); // Level 3 open by default as in mock

  // Consultation scheduler state
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [schedulerStep, setSchedulerStep] = useState(1); // 1 = form, 2 = success

  // Filter state for trade results
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleScheduleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      setSchedulerStep(2);
    }
  };

  const handleDownloadSyllabus = () => {
    // Simulate downloading syllabus with toast
    alert("📥 Download Started: ZonziFX_Academy_Institutional_Syllabus.pdf");
  };

  const toggleModule = (levelNum: number) => {
    if (expandedModule === levelNum) {
      setExpandedModule(null);
    } else {
      setExpandedModule(levelNum);
    }
  };

  const filteredTrades = activeFilter === "All" 
    ? tradeResults 
    : tradeResults.filter(t => t.pair.toLowerCase().includes(activeFilter.toLowerCase()) || t.type.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="relative pt-20 overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-16 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#e9c349]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[#e9c349] font-mono text-xs uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#e9c349]"></span>
              Institutional Standard Education
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl md:text-[56px] leading-[1.1] font-bold tracking-tight text-white">
              Master the Art of <br />
              <span className="gold-text-gradient">Institutional Trading</span>
            </h1>

            <p className="text-[#cfc4c5] text-lg leading-relaxed max-w-lg font-sans">
              Bridge the gap between retail trading and professional finance. Access elite-level strategies, real-time proprietary order book heatmaps, and direct mentorship from hedge fund veterans.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate("enroll")}
                className="gold-gradient text-black font-headline text-sm px-8 py-4 rounded font-bold hover:scale-105 active:scale-95 transition-all inner-glow cursor-pointer shadow-lg shadow-[#af8d11]/15"
              >
                Get Started Now
              </button>
              <a
                href="#curriculum"
                className="border border-white/20 hover:border-white/40 text-white font-headline text-sm px-8 py-4 rounded transition-all active:scale-95 flex items-center gap-2"
              >
                View Curriculum
              </a>
            </div>

            <div className="flex items-center gap-8 pt-10 border-t border-white/5">
              <div>
                <div className="text-[#e9c349] font-headline text-2xl font-bold">100+</div>
                <div className="text-[#cfc4c5] text-xs font-mono uppercase tracking-wider">Active Users</div>
              </div>
              <div>
                <div className="text-[#e9c349] font-headline text-2xl font-bold">80%</div>
                <div className="text-[#cfc4c5] text-xs font-mono uppercase tracking-wider">Success Rate</div>
              </div>
              <div>
                <div className="text-[#e9c349] font-headline text-2xl font-bold">24/7</div>
                <div className="text-[#cfc4c5] text-xs font-mono uppercase tracking-wider">Trade Support</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#e9c349]/10 rounded-xl blur-[100px] pointer-events-none"></div>
            
            {/* Mock Screen Artwork */}
            <div className="relative glass-card p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden group">
              <img 
                className="w-full h-auto rounded-lg opacity-85 group-hover:opacity-95 transition-opacity" 
                alt="Institutional Dashboard Preview"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVfws1saIbAgQwabrzZBDCQluxqHYBCcthJd46QKEBVperjIOta7n86oRJdKAgamJqWNutBfwqEOvacAxopzXuzaMFkuE6e7VbXRR9wzeIhB_uisvDGUlWd0H2zlBXZj0-ctdZvd19YCmq9DuRKkn5UE_5sVzXEFthrozEMnJJSGqmz3ThrT1oKgiS8o_si4HwVyoTwvkmd5CObDvVDNLZ5fh8slP85r9ot2YSnG5wVgcr-aQo-vXnSA" 
              />
              
              {/* Floating Signal Indicator */}
              <div className="absolute bottom-8 left-8 p-5 glass-card rounded-lg border border-[#e9c349]/20 max-w-xs shadow-xl animate-pulse">
                <div className="flex items-center gap-2 mb-1.5">
                  <TrendingUp className="w-5 h-5 text-[#e9c349]" />
                  <span className="font-bold text-[#e9c349] text-xs font-headline uppercase tracking-wider">Live Alpha Signal</span>
                </div>
                <p className="text-[11px] text-[#cfc4c5] leading-relaxed">
                  Institutional long position detected on <span className="text-white font-semibold">EUR/USD</span> at key institutional block zone. <span className="text-[#e9c349] font-mono">1.0845 entry</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Ticker Segment */}
      <div className="w-full bg-[#0e0e0e] py-3.5 border-y border-white/5 overflow-hidden relative">
        <div className="flex items-center animate-ticker whitespace-nowrap gap-12 font-mono text-xs">
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center flex-shrink-0">
              <span className="text-[#cfc4c5] font-semibold">{item.symbol}</span> 
              <span className="text-white">{item.value}</span>
              <span className={item.positive ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real Results & Interactive Showcase Section */}
      <section id="results" className="py-20 bg-[#0e0e0e] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-3 text-white">
                Real Results from the <span className="text-[#e9c349]">Trading Floor</span>
              </h2>
              <p className="text-[#cfc4c5] max-w-xl text-sm leading-relaxed">
                Transparency is our core currency. View certified payout proofs and actual profit withdrawals from our global community of institutional traders.
              </p>
            </div>
            
            {/* Filter Tabs for Interactive feel */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2">
              {["All", "USD", "Gold", "Swing", "Student"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeFilter === filter 
                      ? "bg-[#e9c349] text-black font-bold" 
                      : "bg-[#1f1f1f] text-[#cfc4c5] hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredTrades.map((trade) => (
              <div 
                key={trade.id} 
                className="group relative rounded-lg overflow-hidden border border-white/10 bg-[#2a2a2a] hover:border-[#e9c349]/50 transition-all duration-300 shadow-lg"
              >
                <div className="aspect-video bg-[#353535] relative overflow-hidden">
                  <img 
                    alt={trade.pair} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500" 
                    src={trade.image} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3">
                    <div className="text-emerald-400 font-mono text-[10px] flex items-center gap-1 font-bold tracking-wider mb-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED OUTCOME
                    </div>
                    <div className="text-xl font-bold text-[#e9c349] font-headline">
                      +${trade.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">{trade.pair}</span>
                  <span className="text-[#cfc4c5]/60 font-mono text-[10px]">{trade.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Success Upload Panel - Replaced with Admin notice */}
          <div className="bg-[#131313] p-8 rounded-xl border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h4 className="font-headline text-lg font-bold text-white mb-2">Verified Trading Record Disclaimer</h4>
              <p className="text-[#cfc4c5] text-sm max-w-xl leading-relaxed font-sans">
                All listed payout credentials and trade charts are audited and uploaded exclusively by ZonziFX compliance officials. To protect system integrity, retail student uploads are verified via administrative authentication pipelines.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e9c349]/80 border border-[#e9c349]/20 bg-[#e9c349]/5 px-4 py-3 rounded">
              <ShieldCheck className="w-4 h-4 text-[#e9c349]" /> Verified Audit Active
            </div>
          </div>
        </div>
      </section>

      {/* Elite Trading Ecosystem */}
      <section className="py-20 bg-[#0c0c0c] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl font-bold mb-4 text-white">
              Elite Trading <span className="text-[#e9c349]">Ecosystem</span>
            </h2>
            <p className="text-[#cfc4c5] max-w-2xl mx-auto text-sm leading-relaxed">
              We don't just teach general trading; we provide the professional, mathematical framework used by leading currency desks and proprietary algorithmic firms worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-[#1b1b1b] border border-white/5 rounded-xl transition-all duration-300 hover:border-[#e9c349]/40 hover:shadow-lg hover:shadow-[#e9c349]/5">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center mb-6 group-hover:bg-[#e9c349]/10 transition-colors">
                <Award className="w-6 h-6 text-[#e9c349]" />
              </div>
              <h3 className="font-headline text-lg font-bold text-white mb-3">Institutional Grade Mentorship</h3>
              <p className="text-[#cfc4c5] text-sm leading-relaxed mb-6">
                Direct daily desk sessions with verified traders managing large institutional allocations. Unlock the true mathematical &quot;why&quot; behind localized sweeps.
              </p>
              <a 
                href="#curriculum"
                className="text-[#e9c349] font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:translate-x-1.5 transition-transform"
              >
                Explore Mentorship <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-[#1b1b1b] border border-white/5 rounded-xl transition-all duration-300 hover:border-[#e9c349]/40 hover:shadow-lg hover:shadow-[#e9c349]/5">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center mb-6 group-hover:bg-[#e9c349]/10 transition-colors">
                <Activity className="w-6 h-6 text-[#e9c349]" />
              </div>
              <h3 className="font-headline text-lg font-bold text-white mb-3">Real-time Market Insights</h3>
              <p className="text-[#cfc4c5] text-sm leading-relaxed mb-6">
                Gain a stark informational edge utilizing custom order book thickness heatmaps, intermarket spread differentials, and central bank transcript monitors.
              </p>
              <a 
                onClick={() => onNavigate("enroll")}
                className="text-[#e9c349] font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:translate-x-1.5 transition-transform cursor-pointer"
              >
                Access Real-Time Tools <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-[#1b1b1b] border border-white/5 rounded-xl transition-all duration-300 hover:border-[#e9c349]/40 hover:shadow-lg hover:shadow-[#e9c349]/5">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded flex items-center justify-center mb-6 group-hover:bg-[#e9c349]/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#e9c349]" />
              </div>
              <h3 className="font-headline text-lg font-bold text-white mb-3">Certified Professional Programs</h3>
              <p className="text-[#cfc4c5] text-sm leading-relaxed mb-6">
                A highly structured curriculum that progresses through specific, vetted, and auditable stages: from order-flow mechanics up to complex risk parameters.
              </p>
              <a 
                href="#curriculum"
                className="text-[#e9c349] font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:translate-x-1.5 transition-transform"
              >
                Browse Curriculums <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us / Bento Grid */}
      <section id="why-us" className="py-20 bg-[#0e0e0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
            {/* Large Cover Card */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9azr6AAKXheXylVHLOqhOfd7QL9c5-pVNit78WEnMSu_TRL5Wrh_B-NovLJJrQYHj7H5EJtWS3ztTuizZB-QAM_Hu2L1ZCWTmsT0ptWlM0_PzjxngZHwGqjpc5RbiaJBLm8sjLhhRqqo7abEG-4xS55IL5ZtK-BbMCgEmuS9BC0REJqqUyL-xZ70duaEqVzDN09evywWQ6cgtCgKeZLUUFRbff05vklx_5qnVhenHK4fjZ37OAbaoRw')" }}
              ></div>
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Why Join Us?</h3>
                <p className="text-[#cfc4c5] text-sm max-w-sm leading-relaxed">
                  We supply the concrete structure, advanced mathematical tooling, and direct oversight required to safely transition from random retail strategies to systematic institutional trading.
                </p>
              </div>
            </div>

            {/* Live Trading Floor status info */}
            <div className="md:col-span-2 p-8 bg-[#1b1b1b] rounded-xl border border-white/5 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold mb-4">
                  MARKET STREAM LIVE
                </span>
                <h4 className="font-headline text-lg font-bold text-white mb-2">The Trading Floor</h4>
                <p className="text-[#cfc4c5] text-sm leading-relaxed">
                  Join our active daily webinars and live streaming floor sessions where we dissect the New York and London opens, tick by tick.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full border border-black bg-neutral-600 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                  <div className="w-8 h-8 rounded-full border border-black bg-yellow-600 flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                  <div className="w-8 h-8 rounded-full border border-black bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">SA</div>
                </div>
                <span className="text-[#cfc4c5] text-xs font-mono">+142 active members streaming</span>
              </div>
            </div>

            {/* Bento small grid 1 */}
            <div className="p-8 bg-[#1b1b1b] rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="font-mono text-[#e9c349] font-bold text-sm tracking-wide">01 // PSYCH</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Trading Psychology</h4>
                <p className="text-xs text-[#cfc4c5] leading-relaxed">
                  Formulate rigorous emotional detachment utilizing fixed rules sheets.
                </p>
              </div>
            </div>

            {/* Bento small grid 2 */}
            <div className="p-8 bg-[#1b1b1b] rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="font-mono text-[#e9c349] font-bold text-sm tracking-wide">02 // RISK</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Risk Protocols</h4>
                <p className="text-xs text-[#cfc4c5] leading-relaxed">
                  Rigid professional risk parameter tables designed to safely defend capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl font-bold mb-4 text-white">
              Success Stories <span className="text-[#e9c349]">from the Floor</span>
            </h2>
            <p className="text-[#cfc4c5] max-w-2xl mx-auto text-sm leading-relaxed">
              Read verified feedback and structured reviews from our disciplined traders who have made the transition to funded portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="p-8 bg-[#1b1b1b] border border-white/5 rounded-xl flex flex-col justify-between gap-6 hover:border-[#e9c349]/20 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#e9c349] fill-[#e9c349]" />
                    ))}
                  </div>
                  <p className="text-[#cfc4c5] italic text-sm leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden">
                    <img alt={test.name} className="w-full h-full object-cover" src={test.avatar} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{test.name}</h4>
                    <p className="text-[10px] text-[#e9c349] font-mono uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section id="curriculum" className="py-20 bg-[#0e0e0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="font-headline text-3xl font-bold mb-4 text-white">
                Our <span className="text-[#e9c349]">Curriculum Syllabus</span>
              </h2>
              <p className="text-[#cfc4c5] text-sm leading-relaxed">
                A highly detailed path from raw market mechanics up to complex institutional capital management. Select a level to expand its full syllabus timeline.
              </p>
            </div>
            <button 
              onClick={handleDownloadSyllabus}
              className="text-[#e9c349] font-mono text-xs uppercase tracking-wider border border-[#e9c349] px-6 py-3 rounded hover:bg-[#e9c349]/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" /> Download Syllabus PDF
            </button>
          </div>

          <div className="space-y-4">
            {programs.map((program, idx) => {
              const levelNum = idx + 1;
              const isExpanded = expandedModule === levelNum;
              return (
                <div 
                  key={program.id}
                  className={`group bg-[#1f1f1f] border border-white/5 rounded-xl transition-all ${
                    isExpanded ? "border-l-4 border-l-[#e9c349] shadow-lg shadow-[#e9c349]/2" : "hover:bg-[#252525]"
                  }`}
                >
                  <div 
                    onClick={() => toggleModule(levelNum)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-3xl font-headline font-bold transition-colors ${
                        isExpanded ? "text-[#e9c349]" : "text-white/10 group-hover:text-[#e9c349]/20"
                      }`}>
                        0{levelNum}
                      </span>
                      <div>
                        <h4 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                          {program.name}
                          {program.status && program.status !== "active" && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              {program.status === "soon" ? "Soon to Come" : "Locked"}
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-[#cfc4c5]">{program.tagline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 self-end md:self-auto">
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#e9c349]/10 text-[#e9c349] border border-[#e9c349]/20">
                        ${program.price}
                      </span>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold ${
                        isExpanded ? "bg-[#e9c349]/20 text-[#e9c349]" : "bg-[#2a2a2a] text-[#cfc4c5]"
                      }`}>
                        {program.duration === "Ongoing" ? "Pro Module" : program.duration}
                      </span>
                      <span className={`text-white transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5">
                          <p className="text-sm text-[#cfc4c5] mb-6 leading-relaxed max-w-3xl">
                            {program.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {program.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#e9c349] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-[#cfc4c5]">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 flex justify-end">
                            {program.status === "active" || !program.status ? (
                              <button
                                onClick={() => {
                                  onSelectProgram(program.id);
                                  onNavigate("enroll");
                                }}
                                className="gold-gradient text-black font-headline text-xs px-5 py-2.5 rounded font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                              >
                                Enroll in this Level <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-white/40 text-xs font-headline font-bold flex items-center gap-2 select-none">
                                🔒 {program.status === "soon" ? "Soon to Come" : "Locked for Now"}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c0c0c] to-[#0e0e0e]">
        <div className="absolute inset-0 bg-[#e9c349]/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to Trade Like the <br />
            <span className="gold-text-gradient">Top 1%?</span>
          </h2>
          <p className="text-[#cfc4c5] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Stop gambling with unvetted retail setups. Join the academy today and acquire verified institutional trading mastery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate("enroll")}
              className="gold-gradient text-black font-headline text-sm px-10 py-4 rounded font-bold shadow-xl inner-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Apply for Membership
            </button>
            <button
              onClick={() => {
                setSchedulerStep(1);
                setIsSchedulerOpen(true);
              }}
              className="bg-white/5 hover:bg-white/10 text-white font-headline text-sm px-10 py-4 rounded active:scale-95 transition-all cursor-pointer border border-white/10 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Schedule a Consultation
            </button>
          </div>
        </div>
      </section>



      {/* Consultation Scheduler Modal */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1f1f1f] rounded-xl border border-[#e9c349]/20 w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsSchedulerOpen(false)}
              className="absolute top-4 right-4 text-[#cfc4c5] hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {schedulerStep === 1 ? (
              <div>
                <h3 className="font-headline text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#e9c349]" /> Private Advisory Session
                </h3>
                <p className="text-[#cfc4c5] text-xs leading-relaxed mb-4">
                  Schedule a personal consult call with an Academy counselor to audit your retail history and select the correct syllabus tier.
                </p>

                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#cfc4c5] mb-1">Select Consultation Date</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#0e0e0e] border border-white/10 p-3 rounded text-white text-sm focus:border-[#e9c349] focus:outline-none"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#cfc4c5] mb-1">Preferred Time Zone Slot</label>
                    <select 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#0e0e0e] border border-white/10 p-3 rounded text-white text-sm focus:border-[#e9c349] focus:outline-none"
                      required
                    >
                      <option value="">Select Time Slot</option>
                      <option value="09:00 AM EST">09:00 AM EST (London Session Review)</option>
                      <option value="11:30 AM EST">11:30 AM EST (NY Session Open)</option>
                      <option value="02:00 PM EST">02:00 PM EST (NY Midday Recap)</option>
                      <option value="04:30 PM EST">04:30 PM EST (Equity Close)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-[#2a2a2a] rounded border border-white/5 space-y-2">
                    <div className="flex gap-2 text-xs text-[#cfc4c5]">
                      <Clock className="w-4 h-4 text-[#e9c349] flex-shrink-0" />
                      <span>Duration: 20 Minutes (Zoom Audio Call)</span>
                    </div>
                    <div className="flex gap-2 text-xs text-[#cfc4c5]">
                      <User className="w-4 h-4 text-[#e9c349] flex-shrink-0" />
                      <span>Led by Lead Floor Analyst</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full gold-gradient text-black font-headline text-sm py-3 rounded font-bold hover:opacity-90 transition-opacity"
                  >
                    Confirm Private Booking
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold text-white">Private Session Booked!</h3>
                <p className="text-sm text-[#cfc4c5] leading-relaxed">
                  Your private consultation is locked for <span className="text-[#e9c349] font-bold">{selectedDate}</span> at <span className="text-white font-bold">{selectedTime}</span>.
                </p>
                <p className="text-xs text-[#cfc4c5]/60">
                  An email invite with link access keys has been dispatched to your registered address.
                </p>
                <button 
                  onClick={() => setIsSchedulerOpen(false)}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-headline text-xs py-2.5 rounded transition-all mt-4"
                >
                  Dismiss Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
