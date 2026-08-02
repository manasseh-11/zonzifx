import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Program, Testimonial, TradeResult, AcademyApplication, VideoItem } from "./src/types";

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const DB_DIR = path.join(__dirname, "db");
const DB_FILE = path.join(DB_DIR, "database.json");

// Define Database Schema type
interface Schema {
  programs: Program[];
  testimonials: Testimonial[];
  tradeResults: TradeResult[];
  applications: AcademyApplication[];
  videos: VideoItem[];
  settings: {
    webhookUrl: string;
    paymentGatewayEnabled: boolean;
  };
}

// Initial default data
const INITIAL_PROGRAMS: Program[] = [
  {
    id: "foundation",
    name: "FX Foundation Masterclass",
    tagline: "Foundation & Market Mechanics",
    price: 39.99, // Updated as requested
    duration: "4 Weeks",
    description: "Understand order matching, liquidity, and participant behavior inside modern retail and institutional venues.",
    features: [
      "Order matching mechanics & auction process",
      "Retail vs Institutional venue structures",
      "Liquidity profiles & spread calculations",
      "Primary market participants classification"
    ],
    status: "active"
  },
  {
    id: "professional",
    name: "Professional Trading Program",
    tagline: "Advanced Flow & Sentiment",
    price: 59.99, // Updated as requested
    duration: "6 Weeks",
    description: "Our signature syllabus focusing on advanced volume profiling, proprietary order-flow heatmaps, and central bank sentiment tracking.",
    features: [
      "Reading Proprietary Order Flow Heatmaps",
      "Central Bank Sentiment Tracking & Speeches",
      "Inter-market Analysis (Bonds vs Equities)",
      "HFT Manipulation & Sweep Detection"
    ],
    status: "active"
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
    ],
    status: "soon" // Locked/Soon to come as requested
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
    ],
    status: "locked" // Locked/Soon to come as requested
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
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

const INITIAL_TRADE_RESULTS: TradeResult[] = [
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

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Understanding Sovereign Accumulation Cycles",
    description: "Learn how major central banks and sovereign wealth funds execute currency accumulation without disrupting average market profiles.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
    category: "Tutorial",
    createdAt: "2026-07-15"
  },
  {
    id: "v2",
    title: "NY Session Liquidity Sweep Analysis",
    description: "Detailed walkthrough of standard NY open operations tracking HFT manipulation triggers and block entry setups.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Market Review",
    createdAt: "2026-07-28"
  },
  {
    id: "v3",
    title: "Bi-Weekly Masterclass: Order-Flow Heatmaps",
    description: "Advanced webinar explaining thickness spreads, depth of book coordinates, and order matching mechanics.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Webinar",
    createdAt: "2026-08-01"
  }
];

// Helper to load/save database
function loadDatabase(): Schema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(DB_FILE)) {
      const initialDb: Schema = {
        programs: INITIAL_PROGRAMS,
        testimonials: INITIAL_TESTIMONIALS,
        tradeResults: INITIAL_TRADE_RESULTS,
        applications: [
          {
            id: "app-demo",
            fullName: "Alex Morgan",
            email: "alex@trading.com",
            phone: "+1 (555) 019-2831",
            programId: "professional",
            experience: "Intermediate",
            capital: "$10k - $100k",
            submittedAt: "Aug 02, 2026, 01:10 PM",
            status: "Approved",
            accessCode: "ZF-9021"
          }
        ],
        videos: INITIAL_VIDEOS,
        settings: { 
          webhookUrl: "", 
          paymentGatewayEnabled: false 
        }
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
      return initialDb;
    }
    
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed: Schema = JSON.parse(raw);
    
    // Auto-migrate old schemas
    if (!parsed.settings) {
      parsed.settings = { webhookUrl: "", paymentGatewayEnabled: false };
    } else if (parsed.settings.paymentGatewayEnabled === undefined) {
      parsed.settings.paymentGatewayEnabled = false;
    }
    
    return parsed;
  } catch (err) {
    console.error("Database reading error, loading defaults:", err);
    return {
      programs: INITIAL_PROGRAMS,
      testimonials: INITIAL_TESTIMONIALS,
      tradeResults: INITIAL_TRADE_RESULTS,
      applications: [],
      videos: INITIAL_VIDEOS,
      settings: { 
        webhookUrl: "", 
        paymentGatewayEnabled: false 
      }
    };
  }
}

function saveDatabase(data: Schema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Database writing error:", err);
  }
}

// REST API Endpoints

// 1. PROGRAMS API
app.get("/api/programs", (req, res) => {
  const db = loadDatabase();
  res.json(db.programs);
});

app.post("/api/programs", (req, res) => {
  const db = loadDatabase();
  const newProgram: Program = req.body;
  
  if (!newProgram.id) {
    newProgram.id = newProgram.name.toLowerCase().replace(/\s+/g, "-");
  }
  
  db.programs.push(newProgram);
  saveDatabase(db);
  res.status(201).json(newProgram);
});

app.put("/api/programs/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  const index = db.programs.findIndex(p => p.id === id);
  
  if (index !== -1) {
    db.programs[index] = { ...db.programs[index], ...req.body };
    saveDatabase(db);
    res.json(db.programs[index]);
  } else {
    res.status(404).json({ error: "Program not found" });
  }
});

app.delete("/api/programs/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  db.programs = db.programs.filter(p => p.id !== id);
  saveDatabase(db);
  res.status(204).end();
});


// 2. TESTIMONIALS API
app.get("/api/testimonials", (req, res) => {
  const db = loadDatabase();
  res.json(db.testimonials);
});

app.post("/api/testimonials", (req, res) => {
  const db = loadDatabase();
  const newTest: Testimonial = req.body;
  
  if (!newTest.id) {
    newTest.id = `test-${Date.now()}`;
  }
  
  db.testimonials.push(newTest);
  saveDatabase(db);
  res.status(201).json(newTest);
});

app.put("/api/testimonials/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  const index = db.testimonials.findIndex(t => t.id === id);
  
  if (index !== -1) {
    db.testimonials[index] = { ...db.testimonials[index], ...req.body };
    saveDatabase(db);
    res.json(db.testimonials[index]);
  } else {
    res.status(404).json({ error: "Testimonial not found" });
  }
});

app.delete("/api/testimonials/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  saveDatabase(db);
  res.status(204).end();
});


// 3. TRADE RESULTS API
app.get("/api/trade-results", (req, res) => {
  const db = loadDatabase();
  res.json(db.tradeResults);
});

app.post("/api/trade-results", (req, res) => {
  const db = loadDatabase();
  const newTrade: TradeResult = req.body;
  
  if (!newTrade.id) {
    newTrade.id = `trade-${Date.now()}`;
  }
  
  db.tradeResults.push(newTrade);
  saveDatabase(db);
  res.status(201).json(newTrade);
});

app.put("/api/trade-results/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  const index = db.tradeResults.findIndex(t => t.id === id);
  
  if (index !== -1) {
    db.tradeResults[index] = { ...db.tradeResults[index], ...req.body };
    saveDatabase(db);
    res.json(db.tradeResults[index]);
  } else {
    res.status(404).json({ error: "Trade outcome not found" });
  }
});

app.delete("/api/trade-results/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  db.tradeResults = db.tradeResults.filter(t => t.id !== id);
  saveDatabase(db);
  res.status(204).end();
});


// 4. APPLICATIONS API
app.get("/api/applications", (req, res) => {
  const db = loadDatabase();
  res.json(db.applications);
});

app.post("/api/applications", (req, res) => {
  const db = loadDatabase();
  const newApp: AcademyApplication = req.body;
  
  if (!newApp.id) {
    newApp.id = `app-${Date.now()}`;
  }
  
  if (!newApp.accessCode) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newApp.accessCode = `ZF-${randomNum}`;
  }
  
  db.applications.push(newApp);
  saveDatabase(db);
  res.status(201).json(newApp);
});

app.put("/api/applications/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  const index = db.applications.findIndex(a => a.id === id);
  
  if (index !== -1) {
    db.applications[index] = { ...db.applications[index], ...req.body };
    saveDatabase(db);
    res.json(db.applications[index]);
  } else {
    res.status(404).json({ error: "Application not found" });
  }
});

app.delete("/api/applications/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  db.applications = db.applications.filter(a => a.id !== id);
  saveDatabase(db);
  res.status(204).end();
});

app.delete("/api/applications", (req, res) => {
  const db = loadDatabase();
  db.applications = [];
  saveDatabase(db);
  res.status(204).end();
});


// 5. VIDEOS API
app.get("/api/videos", (req, res) => {
  const db = loadDatabase();
  res.json(db.videos);
});

app.post("/api/videos", (req, res) => {
  const db = loadDatabase();
  const newVideo: VideoItem = req.body;
  
  if (!newVideo.id) {
    newVideo.id = `video-${Date.now()}`;
  }
  if (!newVideo.createdAt) {
    newVideo.createdAt = new Date().toISOString().split("T")[0];
  }
  
  db.videos.push(newVideo);
  saveDatabase(db);
  res.status(201).json(newVideo);
});

app.put("/api/videos/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  const index = db.videos.findIndex(v => v.id === id);
  
  if (index !== -1) {
    db.videos[index] = { ...db.videos[index], ...req.body };
    saveDatabase(db);
    res.json(db.videos[index]);
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});

app.delete("/api/videos/:id", (req, res) => {
  const db = loadDatabase();
  const { id } = req.params;
  db.videos = db.videos.filter(v => v.id !== id);
  saveDatabase(db);
  res.status(204).end();
});


app.post("/api/auth/student", (req, res) => {
  const db = loadDatabase();
  const { email, accessCode } = req.body;
  
  if (!email || !accessCode) {
    return res.status(400).json({ error: "Missing email or access code credentials" });
  }
  
  const applicant = db.applications.find(a => 
    a.email.toLowerCase().trim() === email.toLowerCase().trim() && 
    a.accessCode?.trim() === accessCode.trim()
  );
  
  if (applicant) {
    if (applicant.status === "Approved" || applicant.status === "Contacted") {
      return res.json({ 
        success: true, 
        student: { fullName: applicant.fullName, email: applicant.email } 
      });
    } else {
      return res.status(403).json({ error: "Your application is still pending. Mentors will verify and coordinate your access code." });
    }
  }
  
  return res.status(401).json({ error: "Invalid email coordinate signature or access code." });
});


// 6. SETTINGS API
app.get("/api/settings", (req, res) => {
  const db = loadDatabase();
  res.json(db.settings);
});

app.post("/api/settings", (req, res) => {
  const db = loadDatabase();
  db.settings = { ...db.settings, ...req.body };
  saveDatabase(db);
  res.json(db.settings);
});

// Serve static files from Vite build if it exists (unified full-stack web service)
const DIST_DIR = path.join(__dirname, "dist");
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get("*", (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
}

// Run server listener
app.listen(PORT, () => {
  console.log(`ZonziFX Database Server executing on Node Port ${PORT}`);
});
