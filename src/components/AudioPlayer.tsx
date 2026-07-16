import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Müziği başlatan fonksiyon
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        // Kullanıcı dokunduğu an müziği çal
        audioRef.current.play().catch((e) => {
          console.log("Tarayıcı otomatik çalmayı engelledi:", e);
        });
      }
      // Müzik başladıktan sonra bu dinleyicileri kaldır (tek seferlik çalışsın)
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };

    // Kullanıcı siteye girip zarfı açmak için ekrana DOKUNDUĞU AN müziği başlat
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio, { passive: true });

    // Temizlik
    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex bg-white/90 backdrop-blur-md p-1 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#1A3354]/10">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-11176.mp3" 
      />
      <button
        onClick={toggleMute}
        className="p-3 hover:bg-[#1A3354]/5 rounded-full transition-colors text-[#1A3354] flex items-center justify-center"
        aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </div>
  );
};
