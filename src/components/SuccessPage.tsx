import { useState } from "react";
import { 
  Award, 
  CheckCircle2, 
  MessageSquare, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import { motion } from "motion/react";

interface SuccessPageProps {
  receipt: {
    transactionId: string;
    programName: string;
    amountPaid: number;
    paymentMethod: string;
    promoCodeUsed: string;
  };
  onReset: () => void;
}

export default function SuccessPage({ receipt, onReset }: SuccessPageProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Verify registered email coordinates", completed: true },
    { id: 2, text: "Connect private Discord floor keys", completed: false },
    { id: 3, text: "Download Institutional Level Playbook", completed: false },
    { id: 4, text: "Book onboarding 1-on-1 welcome session", completed: false }
  ]);

  const copyLicenseKey = () => {
    navigator.clipboard.writeText("ZONZI-FLOW-MEMBER-KEY-99A82");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const connectDiscord = () => {
    setDiscordConnected(true);
    // Complete task 2 automatically
    setTasks(prev => prev.map(t => t.id === 2 ? { ...t, completed: true } : t));
    alert("🔗 Discord connected! Your account has been assigned the 'Academy Student' role keys.");
  };

  const downloadStarterKit = () => {
    setTasks(prev => prev.map(t => t.id === 3 ? { ...t, completed: true } : t));
    alert("📥 Starter Pack Downloaded: ZonziFX_VIP_Playbook.pdf");
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="relative pt-24 min-h-screen bg-black text-white selection:bg-[#e9c349]/30 pb-20">
      {/* Visual background sparkles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#e9c349]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 pt-8 relative z-10 space-y-10">
        
        {/* Success Splash Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-[#e9c349]/10 text-[#e9c349] rounded-full flex items-center justify-center mx-auto border border-[#e9c349]/30 shadow-lg shadow-[#af8d11]/5 animate-bounce">
            <Award className="w-8 h-8" />
          </div>
          
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#e9c349] tracking-widest uppercase font-semibold">
              TRANSACTION CAPTURED SUCCESSFULLY
            </span>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-white">
              Welcome to the <span className="gold-text-gradient">ZonziFX Floor</span>
            </h1>
            <p className="text-sm text-[#cfc4c5] max-w-md mx-auto leading-relaxed">
              Your license keys have been initialized. You are now authorized to stream and trade under the Academy curriculum protocols.
            </p>
          </div>
        </motion.div>

        {/* Dynamic Receipt & License Key Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Receipt detail block */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 bg-[#131313]/50 border border-white/5 rounded-xl p-6 space-y-5"
          >
            <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-[#cfc4c5] pb-3 border-b border-white/5">
              Settlement Receipt
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[#cfc4c5]/50 text-[10px]">TRANSACTION NODE</span>
                <p className="text-white font-bold">{receipt.transactionId}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#cfc4c5]/50 text-[10px]">SYLLABUS CLASS</span>
                <p className="text-[#e9c349] font-bold font-headline">{receipt.programName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#cfc4c5]/50 text-[10px]">SETTLEMENT METHOD</span>
                <p className="text-white font-bold">{receipt.paymentMethod}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#cfc4c5]/50 text-[10px]">TOTAL DISPATCHED</span>
                <p className="text-white font-bold text-base">
                  ${receipt.amountPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[#cfc4c5]/50 text-[10px]">PROMO KEY USED</span>
                <p className="text-emerald-400 font-bold">{receipt.promoCodeUsed}</p>
              </div>
            </div>
          </motion.div>

          {/* Member Credentials and License key */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 bg-[#131313]/50 border border-[#e9c349]/20 rounded-xl p-6 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-[#e9c349]">
                Member Authorization Keys
              </h3>
              
              <p className="text-xs text-[#cfc4c5] leading-relaxed">
                This cryptographic token is your unique pass for indicator access. Keep it secure; sharing this signature key results in prompt terminal lockout.
              </p>

              <div className="space-y-1.5">
                <span className="block font-mono text-[9px] text-[#cfc4c5] uppercase">Member Access License</span>
                <div className="flex bg-black rounded border border-white/10 p-3 items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#e9c349] font-bold select-all overflow-hidden text-ellipsis">
                    ZONZI-FLOW-MEMBER-KEY-99A82
                  </span>
                  <button 
                    onClick={copyLicenseKey}
                    className="text-[#e9c349] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedKey ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#e9c349]/5 rounded border border-[#e9c349]/20 flex items-start gap-3">
              <UserCheck className="w-4 h-4 text-[#e9c349] flex-shrink-0 mt-0.5" />
              <p className="text-[10px] font-mono text-[#cfc4c5] leading-normal">
                Credentials successfully dispatched to server nodes. Access indices are now syncing with TradingView and Discord pipelines.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Interactive Onboarding Road tasks */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#131313]/30 border border-white/5 rounded-xl p-6 md:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline font-bold text-lg text-white">Your Onboarding Roadmap</h3>
              <p className="text-xs text-[#cfc4c5]">Complete these primary tasks to finalize your integration on the floor.</p>
            </div>
            
            <span className="px-3 py-1 bg-[#e9c349]/10 text-[#e9c349] font-mono text-[10px] rounded border border-[#e9c349]/20 uppercase tracking-wider font-bold">
              In Progress
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-center justify-between gap-4 p-4 rounded bg-black/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    task.completed 
                      ? "bg-emerald-500 border-emerald-500 text-black" 
                      : "border-white/20 group-hover:border-[#e9c349]"
                  }`}>
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-sm ${task.completed ? "text-[#cfc4c5]/60 line-through" : "text-[#cfc4c5]"}`}>
                    {task.text}
                  </span>
                </div>

                {/* Task secondary interactive buttons */}
                {task.id === 2 && !discordConnected && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      connectDiscord();
                    }}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-headline text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded transition-all flex items-center gap-1.5"
                  >
                    Connect <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                )}
                {task.id === 3 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadStarterKit();
                    }}
                    className="text-[#e9c349] hover:text-white transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer actions Return */}
        <div className="flex justify-center pt-4">
          <button 
            onClick={onReset}
            className="border border-white/20 hover:border-white/40 text-white font-headline text-sm px-10 py-4 rounded transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            Go to Trading Floor <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
