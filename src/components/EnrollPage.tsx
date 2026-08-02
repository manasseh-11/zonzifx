import { useState, FormEvent } from "react";
import { 
  MessageSquare, 
  Video, 
  FileText, 
  Star, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { motion } from "motion/react";
import { TICKER_ITEMS } from "../data";
import { EnrollmentData, Program, AcademyApplication } from "../types";

interface EnrollPageProps {
  onNavigate: (page: string) => void;
  onSubmitEnrollment: (data: EnrollmentData) => void;
  selectedProgramId: string;
  programs: Program[];
  webhookUrl: string;
  applications: AcademyApplication[];
  setApplications: (apps: AcademyApplication[]) => void;
  paymentGatewayEnabled: boolean;
}

export default function EnrollPage({ 
  onNavigate, 
  onSubmitEnrollment, 
  selectedProgramId,
  programs,
  webhookUrl,
  applications,
  setApplications,
  paymentGatewayEnabled
}: EnrollPageProps) {
  // Local state for enrollment form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [programId, setProgramId] = useState(selectedProgramId || "professional");
  const [experience, setExperience] = useState("Intermediate");
  const [capital, setCapital] = useState("$10k - $100k");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Field focus states for visual feedback
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!programId) newErrors.programId = "Please select an educational level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newApp: AcademyApplication = {
        id: `app-${Date.now()}`,
        fullName,
        email,
        phone,
        programId,
        experience,
        capital,
        submittedAt: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        status: "Pending"
      };

      // Store in App state and database
      fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp)
      })
      .then(res => res.json())
      .then(savedApp => {
        setApplications([savedApp, ...applications]);
      })
      .catch(err => {
        console.error("Failed to sync application to database:", err);
        setApplications([newApp, ...applications]);
      });

      // Route to external Forms/webhook URL if configured
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            fullName: newApp.fullName,
            email: newApp.email,
            phone: newApp.phone,
            selectedProgram: programs.find(p => p.id === newApp.programId)?.name || newApp.programId,
            tradingExperience: newApp.experience,
            intendedCapital: newApp.capital,
            submittedAt: newApp.submittedAt
          })
        })
        .then(res => {
          console.log("External form capture response:", res.status);
        })
        .catch(err => {
          console.error("External form submission link error:", err);
        });
      }

      if (paymentGatewayEnabled) {
        onSubmitEnrollment({
          fullName,
          email,
          phone,
          programId
        });
      } else {
        setShowSuccessModal(true);
      }
    }
  };

  return (
    <div className="relative pt-24 min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#e9c349]/30 pb-16">
      {/* Top Pulse Status Ticker Bar */}
      <div className="fixed top-0 left-0 w-full z-40 bg-[#0e0e0e] py-2 border-b border-white/5 overflow-hidden">
        <div className="flex items-center animate-ticker whitespace-nowrap gap-12 font-mono text-[11px]">
          {/* Ticker items from template */}
          <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-[#cfc4c5] mr-4 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400">Market Open</span>
          </div>
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center flex-shrink-0">
              <span className="text-[#cfc4c5] font-semibold">{item.symbol}</span>
              <span className={item.positive ? "text-[#ffe088]" : "text-white"}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 pt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center"
          >
            <div className="mb-10">
              <span className="font-mono text-[11px] text-[#e9c349] tracking-widest uppercase mb-2 block font-semibold">
                Institutional Enrollment // Step 1 of 2
              </span>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] text-white font-bold mb-4">
                Start Your Trading Legacy.
              </h1>
              <p className="font-sans text-sm md:text-base text-[#cfc4c5] max-w-xl leading-relaxed">
                Join an elite community of high-frequency traders and quantitative market analysts. Fill out the application below to begin your onboarding.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name input */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "fullName" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: "" });
                      }}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Alex Morgan"
                      className={`w-full bg-[#0e0e0e] border p-4 font-sans text-white placeholder-[#353535] rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] ${
                        errors.fullName ? "border-rose-500" : "border-white/10"
                      }`}
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
                  </div>
                  {errors.fullName && (
                    <p className="text-rose-400 text-xs font-mono">{errors.fullName}</p>
                  )}
                </div>

                {/* Email address input */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "email" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="morgan@trading.com"
                      className={`w-full bg-[#0e0e0e] border p-4 font-sans text-white placeholder-[#353535] rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] ${
                        errors.email ? "border-rose-500" : "border-white/10"
                      }`}
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
                  </div>
                  {errors.email && (
                    <p className="text-rose-400 text-xs font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone number input */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "phone" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full bg-[#0e0e0e] border p-4 font-sans text-white placeholder-[#353535] rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] ${
                        errors.phone ? "border-rose-500" : "border-white/10"
                      }`}
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
                  </div>
                  {errors.phone && (
                    <p className="text-rose-400 text-xs font-mono">{errors.phone}</p>
                  )}
                </div>

                {/* Program Selection input */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "programId" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Program Selection
                  </label>
                  <div className="relative">
                    <select 
                      value={programId}
                      onChange={(e) => {
                        setProgramId(e.target.value);
                        if (errors.programId) setErrors({ ...errors, programId: "" });
                      }}
                      onFocus={() => setFocusedField("programId")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-[#0e0e0e] border p-4 font-sans text-white rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] appearance-none cursor-pointer ${
                        errors.programId ? "border-rose-500" : "border-white/10"
                      }`}
                    >
                      <option disabled value="">Select a Program</option>
                      {programs.map((prog) => (
                        <option key={prog.id} value={prog.id} className="bg-[#1f1f1f]">
                          {prog.name} (${prog.price})
                        </option>
                      ))}
                    </select>
                    <BookOpen className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40 pointer-events-none" />
                  </div>
                  {errors.programId && (
                    <p className="text-rose-400 text-xs font-mono">{errors.programId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trading Experience Selector */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "experience" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Trading Experience
                  </label>
                  <div className="relative">
                    <select 
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      onFocus={() => setFocusedField("experience")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#0e0e0e] border border-white/10 p-4 font-sans text-white rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] appearance-none cursor-pointer"
                    >
                      <option value="Beginner">Beginner (&lt; 1 Year)</option>
                      <option value="Intermediate">Intermediate (1-3 Years)</option>
                      <option value="Advanced">Advanced / Funded (3+ Years)</option>
                    </select>
                    <Award className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40 pointer-events-none" />
                  </div>
                </div>

                {/* Capital Allocation Selector */}
                <div className="space-y-2">
                  <label className={`block font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    focusedField === "capital" ? "text-[#e9c349]" : "text-[#cfc4c5]"
                  }`}>
                    Intended Trading Capital
                  </label>
                  <div className="relative">
                    <select 
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      onFocus={() => setFocusedField("capital")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#0e0e0e] border border-white/10 p-4 font-sans text-white rounded transition-all focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] appearance-none cursor-pointer"
                    >
                      <option value="Under $10k">Under $10,000 USD</option>
                      <option value="$10k - $100k">$10,000 - $100,000 USD</option>
                      <option value="Over $100k">Over $100,000 USD (Institutional Tier)</option>
                    </select>
                    <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="gold-gradient text-black font-headline text-sm font-bold uppercase tracking-tight px-12 py-5 rounded-none hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 w-full md:w-auto cursor-pointer shadow-lg shadow-[#af8d11]/15"
                >
                  Apply for Membership
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="font-mono text-[10px] text-[#353535] mt-8 leading-relaxed">
                By submitting your registration details, you explicitly agree to our Academy Terms of Service, Privacy Policies, and Institutional Risk Disclosure protocols.
              </p>
            </form>
          </motion.div>

          {/* Sidebar / Member Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0"
          >
            <div className="glass-card p-8 md:p-10 space-y-8 sticky top-28 rounded-xl border border-white/5">
              <div>
                <h3 className="font-headline text-lg font-bold text-[#e9c349] mb-6 tracking-wide">
                  Member Benefits
                </h3>
                
                <div className="space-y-6">
                  {/* Benefit 1 */}
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#2a2a2a] rounded flex items-center justify-center border border-white/5 group-hover:border-[#e9c349] transition-colors">
                      <MessageSquare className="w-5 h-5 text-[#e9c349]" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-white text-sm mb-1">
                        Telegram Community Access
                      </h4>
                      <p className="text-[#cfc4c5] text-xs leading-relaxed">
                        Access real-time institutional flow signals, updates, and trade coordination chat inside our private channel.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#2a2a2a] rounded flex items-center justify-center border border-white/5 group-hover:border-[#e9c349] transition-colors">
                      <Video className="w-5 h-5 text-[#e9c349]" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-white text-sm mb-1">
                        Bi-weekly Live Webinars
                      </h4>
                      <p className="text-[#cfc4c5] text-xs leading-relaxed">
                        Interactive session reviews, London/NY opens breakdowns, and live Q&A sessions held every two weeks.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#2a2a2a] rounded flex items-center justify-center border border-white/5 group-hover:border-[#e9c349] transition-colors">
                      <FileText className="w-5 h-5 text-[#e9c349]" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-white text-sm mb-1">
                        PDF Resource Playbook
                      </h4>
                      <p className="text-[#cfc4c5] text-xs leading-relaxed">
                        Exclusive order flow templates, dynamic risk tables, and highly specific execution checklists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2.5">
                    <div className="w-8 h-8 rounded-full border border-black overflow-hidden bg-neutral-800">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6c0HzQlVbkCd-mOxwkiJHbD0FzPw2LFMrQEIF7OheopQRrHgvo8uNxjW0PLZROsEdDD7i08jZFABEd_AlotuBFUlMtVW4tSwaZQ_fWXu2Nwuk4clIdQdB_zXeWh_0YlPN_qjGi5zykKEbm0yL3U49L0vz_vhVSlYzSQ5QTak7EjlXzTLPpihAavs7paY87SkbrH8o_Htci3JgI-gwoe0G75hu_SDWzha17hmgdu38m8FDoYGKXivPjA" alt="trader-1" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-black overflow-hidden bg-neutral-800">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQxk1LlF95DavvK6RNpOTxaCdCkOd5id3gmxk8nQgKw3zFxvRTmIKdhtt3rQAm-9r36Kc4JIGJkkSpfUCYzeI86fF1ZoBiYCu-OmUWRJsUXstjN-G5a-kTGhAAWJoo7wTFfswmOJ9l0bEMQctC3Q0Azfdf-kxfN2CcqI2fZrER36p8TAH73ySJ9PpPQH4td9LicoeX2N13HsUwRj5Pw0KxzrqBnh1TWBURC9lecBF-sPjM7D9x73Wguw" alt="trader-2" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-black overflow-hidden bg-neutral-800">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2t-Cr0w_DHQ-PWMq5IYFh9Pat9Acgz8_1vjf-fPp3gHLL47GEul5nC3-7N6ailCTQ9FsaCjpC-X9OAO5mPhuGNBe5m3cpEm0SiJbwd_aInqRH-ekaJNo0sC2CmjmTFdilGvlrIuPm9zalhdssCRIcCZ6nMj4uNEpxxhT3tnECQ5vbrwGFHMebI4Fcbps4CB-5tOsGzC6umM33_zTJmx7kuCy9a-voCeWQUjujHyOIxfbSHReNG11KnQ" alt="trader-3" />
                    </div>
                  </div>
                  <span className="font-sans text-xs text-[#cfc4c5]">
                    Join <span className="text-white font-bold">100+ traders</span> globally
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#e9c349]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="font-sans text-xs text-[#cfc4c5] ml-2 font-semibold">
                    4.9/5 TrustScore
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#131313] border border-white/10 rounded-xl p-8 space-y-6 text-center relative shadow-2xl">
            <div className="w-16 h-16 bg-[#e9c349]/10 text-[#e9c349] rounded-full flex items-center justify-center mx-auto border border-[#e9c349]/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#e9c349] tracking-widest uppercase block font-bold">
                onboarding coordinate registry
              </span>
              <h2 className="font-headline text-2xl font-bold text-white leading-tight">
                Enrollment Application Logged
              </h2>
              <p className="text-xs text-[#cfc4c5] font-sans leading-relaxed">
                Your profile coordinates have been securely saved to the platform database. 
                A ZonziFX senior mentor will contact you directly via phone or email within the next 2 hours 
                to verify your credentials, coordinate tuition details, and issue your unique watchroom access key code.
              </p>
            </div>

            <div className="pt-4 font-mono">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate("landing");
                }}
                className="w-full gold-gradient text-black font-headline text-xs font-bold py-3.5 uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
