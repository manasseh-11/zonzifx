export interface Program {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  status?: "active" | "soon" | "locked";
}


export interface EnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  programId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface TradeResult {
  id: string;
  pair: string;
  profit: number;
  time: string;
  type: string;
  image: string;
}

export interface LiveSignal {
  pair: string;
  direction: "BUY" | "SELL";
  price: string;
  zone: string;
  timestamp: string;
}

export interface AcademyApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  experience: string;
  capital: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected" | "Contacted";
  accessCode?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  createdAt: string;
}

