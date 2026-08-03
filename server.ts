import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Program, Testimonial, TradeResult, AcademyApplication, VideoItem } from "./src/types";

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const DB_DIR = path.join(__dirname, "db");
const DB_FILE = path.join(DB_DIR, "database.json");

// Firebase Configuration & Initialization
let firebaseDb: any = null;
let isFirebaseActive = false;

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
if (serviceAccountEnv) {
  try {
    const serviceAccount = JSON.parse(serviceAccountEnv);
    initializeApp({
      credential: cert(serviceAccount)
    });
    firebaseDb = getFirestore();
    isFirebaseActive = true;
    console.log("Firebase Firestore adapter successfully initialized and connected.");
  } catch (err) {
    console.error("Failed to parse or initialize Firebase Admin with service account keys:", err);
  }
} else {
  console.log("Firebase credentials environment key not detected. Operating in local JSON file mode.");
}

// Define Database Schema type for local JSON database
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

// Initial default seed templates
const INITIAL_PROGRAMS: Program[] = [
  {
    id: "foundation",
    name: "FX Foundation Masterclass",
    tagline: "Foundation & Market Mechanics",
    price: 39.99,
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
    price: 59.99,
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
    status: "soon"
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
    status: "locked"
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "Verified Student",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnbW28xe8TJetFpEMZvT3qghuTWJ0Kqy4cniK7KhtDX6hzz5jbtJb57FC7YDlhWZojz7C-FfFb6Y9mNy2C8w0uB2rVjGfk9KEZv15hXfeWfyr-HbfQo_cuskh447I4TEvTes7ldDndWMxlg3THoWi7NGstj01OIiJL74xWT8HYINtdFbDl5ZYEy7MeFNzhVuWiEHJAGmmaZvY0f4WnhH5QZyavtAE_S5-2Az2vfxMTOQFPXDyoAzWdLg",
    rating: 5,
    quote: "The Order Flow Module completely clarified retail vs institutional manipulation profiles. I got funded in 4 weeks."
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Intraday Participant",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA3-G3Z8p6F3s-Wd7Qc1l6u-1H1q-WJgBq-KqJd1_Z8T-W-L3d4G9F5b7c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1",
    rating: 5,
    quote: "Webinars address actual execution thickness. The bi-weekly updates keep me aligned with macro sentiment."
  }
];

const INITIAL_TRADE_RESULTS: TradeResult[] = [
  {
    id: "r1",
    pair: "EUR/USD Long",
    profit: 1420.50,
    time: "2h ago",
    type: "Intraday",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa3-G3Z8p6F3s-Wd7Qc1l6u-1H1q-WJgBq-KqJd1_Z8T-W-L3d4G9F5b7c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1"
  },
  {
    id: "r2",
    pair: "USD/CAD Short",
    profit: 980.00,
    time: "5h ago",
    type: "Scalp",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa3-G3Z8p6F3s-Wd7Qc1l6u-1H1q-WJgBq-KqJd1_Z8T-W-L3d4G9F5b7c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1"
  }
];

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Understanding Sovereign Accumulation Cycles",
    description: "Learn how major central banks and sovereign wealth funds execute currency accumulation without disrupting average market profiles.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Tutorial",
    createdAt: "2026-07-15"
  },
  {
    id: "v2",
    title: "NY Session Liquidity Sweep Analysis",
    description: "Detailed walkthrough of NY session open operations tracking HFT manipulation triggers and block entry setups.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Market Review",
    createdAt: "2026-07-28"
  }
];

// Local JSON File Database Helpers
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
    
    if (!parsed.settings) {
      parsed.settings = { webhookUrl: "", paymentGatewayEnabled: false };
    }
    return parsed;
  } catch (err) {
    console.error("Local database reading error, loading defaults:", err);
    return {
      programs: INITIAL_PROGRAMS,
      testimonials: INITIAL_TESTIMONIALS,
      tradeResults: INITIAL_TRADE_RESULTS,
      applications: [],
      videos: INITIAL_VIDEOS,
      settings: { webhookUrl: "", paymentGatewayEnabled: false }
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
    console.error("Local database writing error:", err);
  }
}

// Firebase Cloud Database Helpers
async function seedFirestoreIfEmpty() {
  if (!isFirebaseActive) return;
  try {
    const settingsRef = firebaseDb.collection("settings").doc("global");
    const settingsDoc = await settingsRef.get();
    if (!settingsDoc.exists) {
      await settingsRef.set({ webhookUrl: "", paymentGatewayEnabled: false });
    }

    const progSnap = await firebaseDb.collection("programs").limit(1).get();
    if (progSnap.empty) {
      for (const p of INITIAL_PROGRAMS) {
        await firebaseDb.collection("programs").doc(p.id).set(p);
      }
    }

    const testSnap = await firebaseDb.collection("testimonials").limit(1).get();
    if (testSnap.empty) {
      for (const t of INITIAL_TESTIMONIALS) {
        await firebaseDb.collection("testimonials").doc(t.id).set(t);
      }
    }

    const tradeSnap = await firebaseDb.collection("trade-results").limit(1).get();
    if (tradeSnap.empty) {
      for (const r of INITIAL_TRADE_RESULTS) {
        await firebaseDb.collection("trade-results").doc(r.id).set(r);
      }
    }

    const vidSnap = await firebaseDb.collection("videos").limit(1).get();
    if (vidSnap.empty) {
      for (const v of INITIAL_VIDEOS) {
        await firebaseDb.collection("videos").doc(v.id).set(v);
      }
    }

    const appSnap = await firebaseDb.collection("applications").limit(1).get();
    if (appSnap.empty) {
      await firebaseDb.collection("applications").doc("app-demo").set({
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
      });
    }
    console.log("Firebase Firestore defaults successfully checked/seeded.");
  } catch (err) {
    console.error("Firestore seeding error:", err);
  }
}

if (isFirebaseActive) {
  seedFirestoreIfEmpty();
}

// Dynamic Cloud / Local Database Interface Adapters

// --- Programs ---
async function getPrograms(): Promise<Program[]> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("programs").get();
    const list: Program[] = [];
    snap.forEach((doc: any) => list.push({ ...doc.data() } as Program));
    return list;
  }
  return loadDatabase().programs;
}

async function saveProgram(p: Program): Promise<Program> {
  if (isFirebaseActive) {
    await firebaseDb.collection("programs").doc(p.id).set(p);
    return p;
  }
  const db = loadDatabase();
  const index = db.programs.findIndex(x => x.id === p.id);
  if (index >= 0) db.programs[index] = p;
  else db.programs.push(p);
  saveDatabase(db);
  return p;
}

async function deleteProgram(id: string): Promise<boolean> {
  if (isFirebaseActive) {
    await firebaseDb.collection("programs").doc(id).delete();
    return true;
  }
  const db = loadDatabase();
  db.programs = db.programs.filter(x => x.id !== id);
  saveDatabase(db);
  return true;
}

// --- Testimonials ---
async function getTestimonials(): Promise<Testimonial[]> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("testimonials").get();
    const list: Testimonial[] = [];
    snap.forEach((doc: any) => list.push({ ...doc.data() } as Testimonial));
    return list;
  }
  return loadDatabase().testimonials;
}

async function saveTestimonial(t: Testimonial): Promise<Testimonial> {
  if (isFirebaseActive) {
    await firebaseDb.collection("testimonials").doc(t.id).set(t);
    return t;
  }
  const db = loadDatabase();
  const index = db.testimonials.findIndex(x => x.id === t.id);
  if (index >= 0) db.testimonials[index] = t;
  else db.testimonials.push(t);
  saveDatabase(db);
  return t;
}

async function deleteTestimonial(id: string): Promise<boolean> {
  if (isFirebaseActive) {
    await firebaseDb.collection("testimonials").doc(id).delete();
    return true;
  }
  const db = loadDatabase();
  db.testimonials = db.testimonials.filter(x => x.id !== id);
  saveDatabase(db);
  return true;
}

// --- Trade Results ---
async function getTradeResults(): Promise<TradeResult[]> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("trade-results").get();
    const list: TradeResult[] = [];
    snap.forEach((doc: any) => list.push({ ...doc.data() } as TradeResult));
    return list;
  }
  return loadDatabase().tradeResults;
}

async function saveTradeResult(r: TradeResult): Promise<TradeResult> {
  if (isFirebaseActive) {
    await firebaseDb.collection("trade-results").doc(r.id).set(r);
    return r;
  }
  const db = loadDatabase();
  const index = db.tradeResults.findIndex(x => x.id === r.id);
  if (index >= 0) db.tradeResults[index] = r;
  else db.tradeResults.push(r);
  saveDatabase(db);
  return r;
}

async function deleteTradeResult(id: string): Promise<boolean> {
  if (isFirebaseActive) {
    await firebaseDb.collection("trade-results").doc(id).delete();
    return true;
  }
  const db = loadDatabase();
  db.tradeResults = db.tradeResults.filter(x => x.id !== id);
  saveDatabase(db);
  return true;
}

// --- Applications ---
async function getApplications(): Promise<AcademyApplication[]> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("applications").get();
    const list: AcademyApplication[] = [];
    snap.forEach((doc: any) => list.push({ ...doc.data() } as AcademyApplication));
    return list;
  }
  return loadDatabase().applications;
}

async function saveApplication(a: AcademyApplication): Promise<AcademyApplication> {
  if (isFirebaseActive) {
    await firebaseDb.collection("applications").doc(a.id).set(a);
    return a;
  }
  const db = loadDatabase();
  const index = db.applications.findIndex(x => x.id === a.id);
  if (index >= 0) db.applications[index] = a;
  else db.applications.push(a);
  saveDatabase(db);
  return a;
}

async function deleteApplication(id: string): Promise<boolean> {
  if (isFirebaseActive) {
    await firebaseDb.collection("applications").doc(id).delete();
    return true;
  }
  const db = loadDatabase();
  db.applications = db.applications.filter(x => x.id !== id);
  saveDatabase(db);
  return true;
}

async function clearApplications(): Promise<boolean> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("applications").get();
    const batch = firebaseDb.batch();
    snap.forEach((doc: any) => batch.delete(doc.ref));
    await batch.commit();
    return true;
  }
  const db = loadDatabase();
  db.applications = [];
  saveDatabase(db);
  return true;
}

// --- Videos ---
async function getVideos(): Promise<VideoItem[]> {
  if (isFirebaseActive) {
    const snap = await firebaseDb.collection("videos").get();
    const list: VideoItem[] = [];
    snap.forEach((doc: any) => list.push({ ...doc.data() } as VideoItem));
    return list;
  }
  return loadDatabase().videos;
}

async function saveVideo(v: VideoItem): Promise<VideoItem> {
  if (isFirebaseActive) {
    await firebaseDb.collection("videos").doc(v.id).set(v);
    return v;
  }
  const db = loadDatabase();
  const index = db.videos.findIndex(x => x.id === v.id);
  if (index >= 0) db.videos[index] = v;
  else db.videos.push(v);
  saveDatabase(db);
  return v;
}

async function deleteVideo(id: string): Promise<boolean> {
  if (isFirebaseActive) {
    await firebaseDb.collection("videos").doc(id).delete();
    return true;
  }
  const db = loadDatabase();
  db.videos = db.videos.filter(x => x.id !== id);
  saveDatabase(db);
  return true;
}

// --- Settings ---
async function getSettings(): Promise<any> {
  if (isFirebaseActive) {
    const doc = await firebaseDb.collection("settings").doc("global").get();
    if (doc.exists) return doc.data();
    return { webhookUrl: "", paymentGatewayEnabled: false };
  }
  return loadDatabase().settings;
}

async function saveSettings(s: any): Promise<any> {
  if (isFirebaseActive) {
    await firebaseDb.collection("settings").doc("global").set(s, { merge: true });
    return s;
  }
  const db = loadDatabase();
  db.settings = { ...db.settings, ...s };
  saveDatabase(db);
  return db.settings;
}

// REST API Endpoints Router

// 1. PROGRAMS API
app.get("/api/programs", async (req, res) => {
  try {
    const data = await getPrograms();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read programs node" });
  }
});

app.post("/api/programs", async (req, res) => {
  try {
    const newProgram: Program = req.body;
    if (!newProgram.id) {
      newProgram.id = newProgram.name.toLowerCase().replace(/\s+/g, "-");
    }
    const saved = await saveProgram(newProgram);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create program node" });
  }
});

app.put("/api/programs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const current = await getPrograms();
    const existing = current.find(p => p.id === id);
    if (!existing) {
      return res.status(404).json({ error: "Program not found" });
    }
    const updated = { ...existing, ...req.body };
    const saved = await saveProgram(updated);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to edit program node" });
  }
});

app.delete("/api/programs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProgram(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete program node" });
  }
});

// 2. TESTIMONIALS API
app.get("/api/testimonials", async (req, res) => {
  try {
    const data = await getTestimonials();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read testimonials" });
  }
});

app.post("/api/testimonials", async (req, res) => {
  try {
    const newTest: Testimonial = req.body;
    if (!newTest.id) {
      newTest.id = `test-${Date.now()}`;
    }
    const saved = await saveTestimonial(newTest);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to write testimonial" });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTestimonial(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

// 3. TRADE RESULTS API
app.get("/api/trade-results", async (req, res) => {
  try {
    const data = await getTradeResults();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trade outcomes" });
  }
});

app.post("/api/trade-results", async (req, res) => {
  try {
    const newResult: TradeResult = req.body;
    if (!newResult.id) {
      newResult.id = `trade-${Date.now()}`;
    }
    const saved = await saveTradeResult(newResult);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to write trade result" });
  }
});

app.delete("/api/trade-results/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTradeResult(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete trade record" });
  }
});

// 4. APPLICATIONS (ENROLLMENT INQUIRIES) API
app.get("/api/applications", async (req, res) => {
  try {
    const data = await getApplications();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read registrations" });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const newApp: AcademyApplication = req.body;
    if (!newApp.id) {
      newApp.id = `app-${Date.now()}`;
    }
    if (!newApp.accessCode) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      newApp.accessCode = `ZF-${randomNum}`;
    }
    const saved = await saveApplication(newApp);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to write registration" });
  }
});

app.put("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const current = await getApplications();
    const existing = current.find(a => a.id === id);
    if (!existing) {
      return res.status(404).json({ error: "Application not found" });
    }
    const updated = { ...existing, ...req.body };
    const saved = await saveApplication(updated);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

app.delete("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteApplication(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

app.delete("/api/applications", async (req, res) => {
  try {
    await clearApplications();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to clear registrations" });
  }
});

// 5. VIDEOS API
app.get("/api/videos", async (req, res) => {
  try {
    const data = await getVideos();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video catalog" });
  }
});

app.post("/api/videos", async (req, res) => {
  try {
    const newVideo: VideoItem = req.body;
    if (!newVideo.id) {
      newVideo.id = `video-${Date.now()}`;
    }
    if (!newVideo.createdAt) {
      newVideo.createdAt = new Date().toISOString().split("T")[0];
    }
    const saved = await saveVideo(newVideo);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to write video details" });
  }
});

app.put("/api/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const current = await getVideos();
    const existing = current.find(v => v.id === id);
    if (!existing) {
      return res.status(404).json({ error: "Video record not found" });
    }
    const updated = { ...existing, ...req.body };
    const saved = await saveVideo(updated);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to edit video metadata" });
  }
});

app.delete("/api/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteVideo(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
});

// 6. STUDENT LOGIN SECURITY GATE
app.post("/api/auth/student", async (req, res) => {
  try {
    const { email, accessCode } = req.body;
    if (!email || !accessCode) {
      return res.status(400).json({ error: "Missing email or access code credentials" });
    }
    const current = await getApplications();
    const applicant = current.find(a => 
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
  } catch (err) {
    res.status(500).json({ error: "Verification gate error" });
  }
});

// 7. SETTINGS API
app.get("/api/settings", async (req, res) => {
  try {
    const data = await getSettings();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read settings configuration" });
  }
});

app.post("/api/settings", async (req, res) => {
  try {
    const saved = await saveSettings(req.body);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings configuration" });
  }
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
