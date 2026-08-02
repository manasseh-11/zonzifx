import { useState, FormEvent } from "react";
import { 
  Lock, 
  CreditCard, 
  Wallet, 
  Coins, 
  Check, 
  Gift, 
  Activity, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EnrollmentData, Program } from "../types";

interface CheckoutPageProps {
  enrollmentData: EnrollmentData;
  onNavigate: (page: string) => void;
  onPaymentSuccess: (receipt: {
    transactionId: string;
    programName: string;
    amountPaid: number;
    paymentMethod: string;
    promoCodeUsed: string;
  }) => void;
  programs: Program[];
}

export default function CheckoutPage({ enrollmentData, onNavigate, onPaymentSuccess, programs }: CheckoutPageProps) {
  const selectedProgram = programs.find(p => p.id === enrollmentData.programId) || programs[1];

  // Active payment method state
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "paypal">("card");

  // Credit card form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState(enrollmentData.fullName || "");

  // Crypto selections state
  const [cryptoCurrency, setCryptoCurrency] = useState<"USDT" | "BTC">("USDT");
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Promo code engine state
  const [promoInput, setPromoInput] = useState("");
  const [activePromo, setActivePromo] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Loading transaction state
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    const sanitized = promoInput.toUpperCase().trim();

    if (sanitized === "ELITE20") {
      const discount = selectedProgram.price * 0.20;
      setDiscountAmount(discount);
      setActivePromo("ELITE20");
      setPromoSuccess("ELITE20 (20% off) applied successfully!");
    } else if (sanitized === "WELCOME50") {
      const discount = Math.min(selectedProgram.price, 50);
      setDiscountAmount(discount);
      setActivePromo("WELCOME50");
      setPromoSuccess("WELCOME50 ($50 off) applied successfully!");
    } else if (sanitized === "FREE") {
      setDiscountAmount(selectedProgram.price);
      setActivePromo("FREE");
      setPromoSuccess("FREE (100% discount) applied successfully!");
    } else if (!sanitized) {
      setPromoError("Please enter a promo code");
    } else {
      setPromoError("Invalid promotional code");
    }
  };

  const copyCryptoAddress = () => {
    const address = cryptoCurrency === "USDT" 
      ? "0x9C83F72AdA2E9C1a0D1b48b1d9C54D48aC3574A7" 
      : "bc1qxy2kg3f427dx3ffv6ym95g0DpV3a7qpzxlwfjt";
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCompleteTransaction = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate highly realistic transaction review processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        transactionId: `ZFX-${Math.floor(100000 + Math.random() * 900000)}`,
        programName: selectedProgram.name,
        amountPaid: Math.max(0, selectedProgram.price - discountAmount),
        paymentMethod: paymentMethod.toUpperCase(),
        promoCodeUsed: activePromo || "None"
      });
    }, 2800);
  };

  const finalPrice = Math.max(0, selectedProgram.price - discountAmount);

  return (
    <div className="relative pt-24 min-h-screen bg-black text-white selection:bg-[#e9c349]/30 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-6">
        
        {/* Step Status Indicator */}
        <div className="mb-8 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#cfc4c5]">
          <span className="text-[#e9c349]">01 Application</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <span className="text-white font-bold">02 Payment & Review</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Secure checkout gateways */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <div>
              <span className="font-mono text-[10px] text-[#e9c349] tracking-widest uppercase mb-1.5 block font-semibold">
                Payment Gateways // SSL Encrypted
              </span>
              <h1 className="font-headline text-3xl font-bold text-white mb-2">
                Secure Checkout
              </h1>
              <p className="text-[#cfc4c5] text-sm max-w-lg">
                Complete your transaction securely. Select your preferred institutional settlement method below.
              </p>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === "card"
                    ? "border-[#e9c349] bg-[#e9c349]/5 text-[#e9c349]"
                    : "border-white/10 bg-[#0e0e0e] text-[#cfc4c5] hover:border-white/20 hover:text-white"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-headline text-[11px] font-bold tracking-wider uppercase">Card Settlement</span>
              </button>

              <button
                onClick={() => setPaymentMethod("crypto")}
                className={`p-4 rounded border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === "crypto"
                    ? "border-[#e9c349] bg-[#e9c349]/5 text-[#e9c349]"
                    : "border-white/10 bg-[#0e0e0e] text-[#cfc4c5] hover:border-white/20 hover:text-white"
                }`}
              >
                <Coins className="w-5 h-5" />
                <span className="font-headline text-[11px] font-bold tracking-wider uppercase">Crypto Transfer</span>
              </button>

              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`p-4 rounded border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === "paypal"
                    ? "border-[#e9c349] bg-[#e9c349]/5 text-[#e9c349]"
                    : "border-white/10 bg-[#0e0e0e] text-[#cfc4c5] hover:border-white/20 hover:text-white"
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="font-headline text-[11px] font-bold tracking-wider uppercase">PayPal</span>
              </button>
            </div>

            {/* Selected payment content box */}
            <div className="glass-card p-6 md:p-8 rounded-xl border border-white/5 bg-[#131313]/50">
              <AnimatePresence mode="wait">
                
                {/* CREDIT CARD DETAILS FORM */}
                {paymentMethod === "card" && (
                  <motion.form 
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleCompleteTransaction}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-2">
                      <h3 className="font-headline font-bold text-sm text-white">Credit / Debit Card Billing</h3>
                      <div className="flex gap-2 text-xs font-mono text-[#cfc4c5]/60">
                        <span>Visa</span> • <span>Mastercard</span> • <span>Amex</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-[#cfc4c5]">Cardholder Name</label>
                      <input 
                        type="text" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-black border border-white/10 p-3.5 text-white placeholder-neutral-700 text-sm focus:border-[#e9c349] focus:outline-none rounded transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-[#cfc4c5]">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            // Basic card space formater
                            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-black border border-white/10 p-3.5 text-white placeholder-neutral-700 text-sm focus:border-[#e9c349] focus:outline-none rounded transition-all font-mono"
                          required
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#cfc4c5]">Expiry Date</label>
                        <input 
                          type="text" 
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.length === 2 && !val.includes("/")) {
                              val += "/";
                            }
                            setExpiry(val);
                          }}
                          placeholder="MM/YY"
                          className="w-full bg-black border border-white/10 p-3.5 text-white placeholder-neutral-700 text-sm focus:border-[#e9c349] focus:outline-none rounded transition-all font-mono text-center"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] uppercase tracking-wider text-[#cfc4c5]">CVC / CVV</label>
                        <input 
                          type="password" 
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          placeholder="•••"
                          className="w-full bg-black border border-white/10 p-3.5 text-white placeholder-neutral-700 text-sm focus:border-[#e9c349] focus:outline-none rounded transition-all font-mono text-center"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-4 flex-wrap">
                      <span className="text-xs text-[#cfc4c5] flex items-center gap-1.5 font-mono">
                        <Lock className="w-3.5 h-3.5 text-emerald-500" /> AES-256 Bit SSL Encription
                      </span>
                      <button 
                        type="submit"
                        className="gold-gradient text-black font-headline text-sm font-bold px-8 py-3.5 rounded hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" /> Settlement Complete
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* CRYPTOCURRENCY SETTLEMENT DETAILS */}
                {paymentMethod === "crypto" && (
                  <motion.div 
                    key="crypto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <h3 className="font-headline font-bold text-sm text-white">Digital Asset Escrow Settlement</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCryptoCurrency("USDT")}
                          className={`px-3 py-1 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                            cryptoCurrency === "USDT" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          USDT (ERC20)
                        </button>
                        <button
                          onClick={() => setCryptoCurrency("BTC")}
                          className={`px-3 py-1 rounded font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                            cryptoCurrency === "BTC" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          Bitcoin
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Simulated QR Code Area */}
                      <div className="p-3 bg-white rounded-lg flex-shrink-0 border-2 border-[#e9c349]/30">
                        <div className="w-28 h-28 bg-[#131313] rounded flex flex-col items-center justify-center relative overflow-hidden p-1">
                          {/* Inner simulated pixel lines of a QR code */}
                          <div className="absolute inset-2 border-2 border-dashed border-emerald-500/25 animate-pulse"></div>
                          <Coins className="w-8 h-8 text-[#e9c349] mb-1" />
                          <span className="text-[8px] font-mono font-bold text-neutral-400">SECURE ESCROW</span>
                        </div>
                      </div>

                      <div className="space-y-4 flex-grow w-full">
                        <div className="space-y-1.5">
                          <span className="block font-mono text-[10px] uppercase text-[#cfc4c5]">Transfer Address</span>
                          <div className="flex bg-black rounded border border-white/10 p-3.5 items-center justify-between gap-4">
                            <span className="font-mono text-xs text-white overflow-hidden text-ellipsis select-all">
                              {cryptoCurrency === "USDT" 
                                ? "0x9C83F72AdA2E9C1a0D1b48b1d9C54D48aC3574A7" 
                                : "bc1qxy2kg3f427dx3ffv6ym95g0DpV3a7qpzxlwfjt"}
                            </span>
                            <button 
                              onClick={copyCryptoAddress}
                              className="text-[#e9c349] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                            >
                              {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-emerald-500/5 rounded border border-emerald-500/20 flex items-start gap-3">
                          <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 animate-pulse" />
                          <p className="text-[10px] font-mono text-[#cfc4c5] leading-normal">
                            Send exactly <span className="text-white font-bold">${finalPrice.toFixed(2)} USD</span> worth of <span className="text-white font-bold">{cryptoCurrency}</span>. Address verified as active. Escrow locks on first ledger transaction node.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                        <span className="font-mono text-[10px] text-[#cfc4c5]">Awaiting network ledger confirmation...</span>
                      </div>
                      
                      <button 
                        onClick={handleCompleteTransaction}
                        className="gold-gradient text-black font-headline text-xs font-bold px-6 py-3 rounded hover:opacity-90 transition-opacity w-full sm:w-auto"
                      >
                        Confirm Transaction Manually
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PAYPAL DIRECT GATEWAY */}
                {paymentMethod === "paypal" && (
                  <motion.div 
                    key="paypal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Wallet className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline font-bold text-lg text-white">PayPal Checkout Secure Settlement</h3>
                    <p className="text-sm text-[#cfc4c5] max-w-sm mx-auto leading-relaxed">
                      You will be redirected safely to PayPal&apos;s interface to complete the authentication and lock secure order pricing.
                    </p>

                    <div className="pt-4 max-w-xs mx-auto">
                      <button 
                        onClick={handleCompleteTransaction}
                        className="w-full bg-amber-400 hover:bg-amber-500 text-black font-headline text-xs font-extrabold uppercase py-3.5 px-6 rounded-full transition-colors tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        Pay with <span className="font-sans font-black italic text-blue-900">PayPal</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-[#cfc4c5]/40 font-mono">Instant settlement and confirmation upon redirect back.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Detailed Order Summary & Promo code engine */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="glass-card rounded-xl border border-white/5 bg-[#131313]/50 p-6 md:p-8 space-y-6">
              <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-[#cfc4c5] pb-4 border-b border-white/5">
                Order Review
              </h3>

              {/* Course brief details */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase text-[#e9c349] font-bold">Selected Enrollment Level</span>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-headline font-bold text-white text-base leading-tight">
                      {selectedProgram.name}
                    </h4>
                    <p className="text-xs text-[#cfc4c5] mt-1">Level Syllabus Course • {selectedProgram.duration}</p>
                  </div>
                  <div className="font-headline font-bold text-lg text-white">
                    ${selectedProgram.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Syllabus points */}
              <div className="bg-black/40 p-4 rounded border border-white/5 space-y-2.5">
                <span className="block font-mono text-[9px] uppercase text-[#cfc4c5] tracking-wider mb-1 font-semibold">Included Core Pillars:</span>
                {selectedProgram.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex gap-2.5 text-xs text-[#cfc4c5]">
                    <Check className="w-3.5 h-3.5 text-[#e9c349] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Promo code Form */}
              <div className="space-y-3 pt-2">
                <span className="block font-mono text-[9px] uppercase text-[#cfc4c5]">Apply Promotional Key</span>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g., ELITE20"
                    className="flex-grow bg-[#0e0e0e] border border-white/10 p-2 text-sm text-white placeholder-neutral-700 uppercase focus:border-[#e9c349] focus:outline-none rounded"
                  />
                  <button 
                    type="submit"
                    className="bg-[#2a2a2a] hover:bg-[#333333] border border-white/10 text-white font-headline text-xs px-4 rounded font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Promo messages */}
                {promoError && (
                  <p className="text-rose-400 text-xs font-mono">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" /> {promoSuccess}
                  </p>
                )}

                <div className="p-2.5 bg-[#e9c349]/5 rounded border border-[#e9c349]/20 flex gap-2 text-[10px] text-[#cfc4c5] leading-normal">
                  <Info className="w-4 h-4 text-[#e9c349] flex-shrink-0" />
                  <span>Use promo keys <span className="text-[#e9c349] font-bold">ELITE20</span> (20% off), <span className="text-[#e9c349] font-bold">WELCOME50</span> ($50 off) or <span className="text-[#e9c349] font-bold">FREE</span> to preview pricing math.</span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs">
                <div className="flex justify-between text-[#cfc4c5]">
                  <span>Subtotal Cost</span>
                  <span>${selectedProgram.price.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Code ({activePromo})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#cfc4c5]">
                  <span>Taxes & Transfer Fees</span>
                  <span>$0.00</span>
                </div>

                <div className="flex justify-between text-white font-headline font-bold text-lg pt-3 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="text-[#e9c349]">${finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex justify-center gap-6 text-[#cfc4c5]/40 font-mono text-[9px] uppercase tracking-wider text-center">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e9c349]" /> 256-Bit Escrow
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#e9c349]" /> SSL Secure Cert
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Transaction processing loading spinner modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4">
          <div className="space-y-6 text-center max-w-sm">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#e9c349] border-t-transparent animate-spin"></div>
            </div>
            
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#e9c349] uppercase tracking-widest font-semibold block animate-pulse">
                Processing Secure Node Connection
              </span>
              <h3 className="font-headline text-xl font-bold text-white">Validating Capital Ledger</h3>
              <p className="text-xs text-[#cfc4c5] leading-relaxed">
                Our cryptographic escrow handler is establishing secure SSL routing with decentralized merchant clearing pipelines. Do not close this window.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
