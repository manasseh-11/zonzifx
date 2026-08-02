import { useState } from "react";
import { Play, Search, Video, Clock, X, ArrowLeft } from "lucide-react";
import { VideoItem } from "../types";

interface VideoVaultProps {
  videos: VideoItem[];
  onNavigate: (page: string) => void;
}

export default function VideoVault({ videos, onNavigate }: VideoVaultProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // Extract YouTube ID from various URL structures
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getThumbnailUrl = (url: string) => {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "https://lh3.googleusercontent.com/aida-public/AB6AXuB9azr6AAKXheXylVHLOqhOfd7QL9c5-pVNit78WEnMSu_TRL5Wrh_B-NovLJJrQYHj7H5EJtWS3ztTuizZB-QAM_Hu2L1ZCWTmsT0ptWlM0_PzjxngZHwGqjpc5RbiaJBLm8sjLhhRqqo7abEG-4xS55IL5ZtK-BbMCgEmuS9BC0REJqqUyL-xZ70duaEqVzDN09evywWQ6cgtCgKeZLUUFRbff05vklx_5qnVhenHK4fjZ37OAbaoRw";
  };

  const filteredVideos = videos.filter(video => {
    const matchesCategory = activeCategory === "All" || video.category === activeCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Market Review", "Webinar", "Tutorial"];

  return (
    <div className="relative pt-24 min-h-screen bg-[#0c0c0c] text-white selection:bg-[#e9c349]/30 pb-20">
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#e9c349]/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <main className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 space-y-10">
        
        {/* Navigation Breadcrumb back home */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm font-medium text-[#cfc4c5] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </button>
          
          <span className="font-mono text-[10px] text-[#e9c349] tracking-widest uppercase border border-[#e9c349]/20 px-3 py-1 bg-[#e9c349]/5 rounded-full">
            STUDENT WATCHROOM
          </span>
        </div>

        {/* Video Vault Title Area */}
        <div className="space-y-4 max-w-xl">
          <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight text-white">
            Academy <span className="gold-text-gradient">Lecture & Webinar Vault</span>
          </h1>
          <p className="text-sm text-[#cfc4c5] leading-relaxed">
            Gain full access to our comprehensive lecture library. Watch trade audits, bi-weekly webinar archives, and core tutorial courses directly on our platform.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-[#e9c349] text-black font-bold" 
                    : "bg-[#1f1f1f] text-[#cfc4c5] hover:text-white border border-white/5"
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 flex-shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures..."
              className="w-full bg-[#131313] border border-white/10 p-3 pl-10 rounded text-xs text-white placeholder-[#cfc4c5]/40 focus:border-[#e9c349] focus:outline-none"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cfc4c5]/40" />
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-xl p-16 text-center">
            <Video className="w-10 h-10 text-[#cfc4c5]/30 mx-auto mb-3" />
            <p className="text-sm text-[#cfc4c5]">No lecture videos found matching search filters.</p>
            <p className="text-xs text-[#cfc4c5]/60 mt-1">Try selecting a different filter category or search phrase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setPlayingVideo(video)}
                className="group bg-[#131313]/60 border border-white/5 rounded-xl overflow-hidden hover:border-[#e9c349]/40 hover:shadow-lg hover:shadow-[#e9c349]/2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Thumbnail Layer */}
                <div className="aspect-video relative overflow-hidden bg-neutral-900">
                  <img 
                    src={getThumbnailUrl(video.youtubeUrl)} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#e9c349] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-90 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-1 bg-black/80 rounded font-mono text-[9px] uppercase tracking-wider text-[#e9c349] border border-white/10 font-bold">
                    {video.category}
                  </span>
                </div>

                {/* Video Info Details */}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-white text-base group-hover:text-[#e9c349] transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#cfc4c5] line-clamp-3 leading-relaxed font-sans">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-[#cfc4c5]/60 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#e9c349]/70" /> {video.createdAt}
                    </span>
                    <span>WATCH ON PLATFORM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Embedded Player overlay Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-[#131313] rounded-xl border border-white/10 p-4 relative shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="font-mono text-[9px] text-[#e9c349] uppercase tracking-widest block font-bold mb-0.5">
                  Playing: {playingVideo.category} lecture
                </span>
                <h3 className="font-headline text-lg font-bold text-white leading-tight">
                  {playingVideo.title}
                </h3>
              </div>
              <button 
                onClick={() => setPlayingVideo(null)}
                className="text-[#cfc4c5] hover:text-white text-xl font-bold bg-white/5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                ✕
              </button>
            </div>

            {/* Embedded Iframe Box */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/5 shadow-inner relative">
              {getYoutubeId(playingVideo.youtubeUrl) ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${getYoutubeId(playingVideo.youtubeUrl)}?rel=0&modestbranding=1&showinfo=0&autoplay=1&iv_load_policy=3`}
                  title={playingVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-rose-400 font-mono">
                  🚨 Error: Invalid YouTube Video Identifier.
                </div>
              )}
            </div>

            <p className="text-xs text-[#cfc4c5] leading-relaxed max-w-3xl font-sans pt-1">
              {playingVideo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
