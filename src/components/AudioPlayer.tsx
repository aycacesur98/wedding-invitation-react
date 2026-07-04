import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
        } catch (e) {
          console.log("Tarayıcı otomatik çalmayı engelledi:", e);
        }
      }
    };

    // Zarfın açılmasını bekleyen sistem
    const checkEnvelopeInterval = setInterval(() => {
      const isEnvelopeStillHere = document.querySelector('.perspective-2000');
      
      if (!isEnvelopeStillHere) {
        clearInterval(checkEnvelopeInterval); 
        playAudio(); 
      }
    }, 500);

    return () => clearInterval(checkEnvelopeInterval);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    // Mobilde bottom-24 ile yukarı alındı, bilgisayarda md:bottom-6
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
