import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.log("Tarayıcı otomatik çalmayı bekletiyor:", e);
          // Tarayıcı ekstra tıklama isterse devreye girecek yedek sistem
          const forcePlay = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
                document.removeEventListener('click', forcePlay);
                document.removeEventListener('touchstart', forcePlay);
              } catch (err) {}
            }
          };
          document.addEventListener('click', forcePlay);
          document.addEventListener('touchstart', forcePlay);
        }
      }
    };

    // AKILLI ZARF BEKLEME SİSTEMİ
    // Eskiden burada direkt playAudio() vardı ve site açılır açılmaz çalıyordu.
    // Şimdi zarfın ekrandan tamamen kaybolmasını bekliyoruz.
    const checkEnvelopeInterval = setInterval(() => {
      // Zarfın kodundaki özel "perspective-2000" sınıfını ekranda arıyoruz
      const isEnvelopeStillHere = document.querySelector('.perspective-2000');
      
      if (!isEnvelopeStillHere) {
        // Zarf ekrandan silindi! (Yani zarf açıldı ve ana sayfa geldi)
        clearInterval(checkEnvelopeInterval); // Aramayı durdur
        playAudio(); // Müziği tam bu saniyede başlat!
      }
    }, 500);

    return () => clearInterval(checkEnvelopeInterval);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-primary/20">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-11176.mp3" 
      />
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
        aria-label={isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={toggleMute}
        className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
        aria-label={isMuted ? "Sesi Aç" : "Sesi Kapat"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};
