import { Program, Testimonial, TradeResult } from "./types";

export const PROGRAMS: Program[] = [
  {
    id: "foundation",
    name: "FX Foundation Masterclass",
    tagline: "Foundation & Market Mechanics",
    price: 299,
    duration: "4 Weeks",
    description: "Understand order matching, liquidity, and participant behavior inside modern retail and institutional venues.",
    features: [
      "Order matching mechanics & auction process",
      "Retail vs Institutional venue structures",
      "Liquidity profiles & spread calculations",
      "Primary market participants classification"
    ]
  },
  {
    id: "professional",
    name: "Professional Trading Program",
    tagline: "Advanced Flow & Sentiment",
    price: 499,
    duration: "6 Weeks",
    description: "Our signature syllabus focusing on advanced volume profiling, proprietary order-flow heatmaps, and central bank sentiment tracking.",
    features: [
      "Reading Proprietary Order Flow Heatmaps",
      "Central Bank Sentiment Tracking & Speeches",
      "Inter-market Analysis (Bonds vs Equities)",
      "HFT Manipulation & Sweep Detection"
    ]
  },
  {
    id: "institutional",
    name: "Institutional Order Flow",
    tagline: "Institutional Supply & Demand",
    price: 699,
    duration: "8 Weeks",
    description: "Identify large-scale accumulation and distribution zones driven by sovereign funds and reserve desks.",
    features: [
      "Sovereign wealth fund footprint tracking",
      "Reserve desk algorithmic zone tracing",
      "Accumulation & Distribution cycle modeling",
      "Block trade execution anomalies analysis"
    ]
  },
  {
    id: "elite",
    name: "Elite Mentorship Circle",
    tagline: "The Professional's Edge",
    price: 899,
    duration: "Ongoing",
    description: "Direct elite access, portfolio management protocols, prop firm capital backing routes, and customized automated indicators.",
    features: [
      "Daily active trading floor access",
      "Personal trade portfolio review audits",
      "Prop firm backing pre-evaluation routines",
      "Custom algorithmic execution templates"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "Forex Specialist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnbW28xe8TJetFpEMZvT3qghuTWJ0Kqy4cniK7KhtDX6hzz5jbtJb57FC7YDlhWZojz7C-FfFb6Y9mNy2C8w0uB2rVjGfk9KEZv15hXfeWfyr-HbfQo_cuskh447I4TEvTes7ldDndWMxlg3THoWi7NGstj01OIiJL74xWT8HYINtdFbDl5ZYEy7MeFNzhVuWiEHJAGmmaZvY0f4WnhH5QZyavtAE_S5-2Az2vfxMTOQFPXDyoAzWdLg",
    rating: 5,
    quote: "The order flow tools alone paid for the membership in the first week. I finally understand where the big players are entering."
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Institutional Analyst",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl82bylqozM4wD6UL7XwUbavYNKiiEZUXR4AMqpkUMCgPKPsTjbrmX9ag7ZXnjTf02HXDZ2JUE4Mhl_Kj1reUB4kWYE9iOlvK44G9TPymw6oqKhY2VAby9z3o3TWG-GliKnUwD6AjK-ZMgsA3KZLgkIgvO1C8g_CCXxLqp7AeEcCem5B8nZfahOLnD5l2GeKHeU6sAulSzx3wnBtmKdoeCBYQRdSSpGPt2LvWqQ2zso_W7mZ6rsoLvTA",
    rating: 5,
    quote: "The mentorship is unparalleled. Having a professional look over your trades daily is the fastest way to grow as a trader."
  },
  {
    id: "david",
    name: "David Miller",
    role: "Commodities Trader",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKOH1nZI8peUo1-6txz12axegiiqTT772y3XFpgUL-oKzmi1vRMquVeS0SjRw4YKGIx6Q7LATILEtJy-fb1BvaOFGdMiwJ1-hBgEPEy-yX55_TaDzjM--XP3Qj5HVmQkfRx20Eij6NNH7d2lU37ivjw3n3-LkDlyTo2TnO5wQ99CHVFhJskRUmmiO6Z3gAcVwmAcyFKkvM0mpiJmgnkBlFfkqeyj9o6zoPxEbTedEwQ-DFA_sfTBTOvQ",
    rating: 5,
    quote: "ZonziFX stripped away the retail noise. I'm now funded with a top-tier prop firm thanks to their risk protocols."
  }
];

export const TRADE_RESULTS: TradeResult[] = [
  {
    id: "r1",
    pair: "EUR/USD Scalp",
    profit: 1240.50,
    time: "2h ago",
    type: "Scalp",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbk9JQStyfDlCgVwcO-405y7XHIN5JJAvPh4qlenkF58YtsX8-YPF7glUjId70hZpPUEgoOsU3vZ_tq5S2L7oZ36svSI975T3ZDPcRkJICKHZvb4qicc6cgSp8wpBax4znKIwRetMwrZoOFEv4nnNI9zQA2o6G6SeC9iUsGiHMm6Q6HPaI7LajRoTasR5QQIB8zAkztYMKmcus_2nUtkxTq0Z4gp6pgYjSUHJ-bb_kjSjYE5OTmGnjOw"
  },
  {
    id: "r2",
    pair: "Gold (XAUUSD)",
    profit: 3892.00,
    time: "5h ago",
    type: "Swing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8XHH6iXE5ctnnM_w_cD0dcI1atHx0SIDAyzsncYV9YjzEkTtpm2XmzKgxfjoXpoWqK0ifpv-mb5-xagTTEeI7snc5Sve7ud4uFTQz9Z9-pavl5fxI3bnWyhju0MGD8I1iCbp-ixyaJUmoQ2P8yQ0Vxjw8OnSolZQS8ce4xk4UHu_uAK8s4w-yuknj0hVL0X-hbslj5u1J6ezYoJwFDSJ--sO6t9qPfgrTZAyufVMFXnS8EhzCI0qxZw"
  },
  {
    id: "r3",
    pair: "GBP/JPY Swing",
    profit: 850.25,
    time: "12h ago",
    type: "Intraday",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVtgQdTlvS8HPSYRZ6UluO-G3rJ2XKXHZ2-bceIF1LQI4LuwRfoYYgbdHbV4opFtaNRKpJLKsdnjinqk5sVSDj-vm-_O9ASr2aliEZaXZh7ajFF_j9OhXl2D9apOvj92sV7PHAWip3K_30lcn8-72zp_-KAIpPZikiNo17psvjuL5g5uF7vfv9yNIvWuyIZfZfprbanIYnEJmY6eLaNqo-V9QywZ0HiAycIWs_Iu5sqFYPzXqr0dY1VA"
  },
  {
    id: "r4",
    pair: "Prop Firm Payout",
    profit: 12400.00,
    time: "1d ago",
    type: "Payout",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa6fRO59gL41shX_SpzZjfZe0YZFC9LQUUsDKAJmpmgQp7UoI88lztxNC0zrh2tsBe1cD8mh1ObebMPgK1q_t9y9WyE2Ii4tixOU8R6xV55bqaK7G9xIiQL6gJ_ogJgspEJsDZ8_DAgD_E4IFeAnAPX8B_1xQZRWWHsQ2hlGqfaPd6yf6s6djNsgovjc-jDc6qMcaou3G9RUESZ34fY-SFYS8ReNhR8hUOznohTMz_-ctSI_NAB5h_3A"
  }
];

export const TICKER_ITEMS = [
  { symbol: "EURUSD", value: "1.0845", change: "+0.12%", positive: true },
  { symbol: "GBPUSD", value: "1.2634", change: "-0.05%", positive: false },
  { symbol: "USDJPY", value: "149.82", change: "+0.45%", positive: true },
  { symbol: "GOLD", value: "2024.12", change: "+0.82%", positive: true },
  { symbol: "BTCUSD", value: "52,342", change: "+2.11%", positive: true },
  { symbol: "NASDAQ", value: "17,842", change: "-0.22%", positive: false },
  { symbol: "XAUUSD", value: "2024.50", change: "+1.24%", positive: true },
  { symbol: "NAS100", value: "18,211", change: "+0.94%", positive: true }
];
