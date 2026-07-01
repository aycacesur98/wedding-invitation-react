import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  
  // 3.5 Saniye Sonra Sayfayı 2 cm (80px) Aşağı Kaydıran Efekt
  useEffect(() => {
    const autoScrollTimer = setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollBy({ top: 80, behavior: 'smooth' });
      }
    }, 3900);

    return () => clearTimeout(autoScrollTimer);
  }, []);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col justify-center items-center text-center">
      
      {/* Arka Plan Videosu */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/30 z-10" /> 
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.webm" type="video/webm" />
        </video>
      </div>

      {/* İçerik Bölümü */}
      <div className="relative z-20 px-4 max-w-5xl w-full flex flex-col items-center justify-center h-full pt-6">
        
        {/* EN İLK HALİ GİBİ: Köşeleri yuvarlatılmış temiz dikdörtgen ve orijinal buzlu cam */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          className="border-2 border-white/50 p-8 sm:p-12 md:p-16 relative w-full max-w-2xl backdrop-blur-sm bg-white/5 rounded-[2rem] shadow-2xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="font-script text-4xl md:text-6xl text-white mb-4 md:mb-6 drop-shadow-md"
          >
            Düğünümüze
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            // MOBİLDE DE SIĞMASI İÇİN: text-3xl ile başlıyor, md ekranda text-6xl oluyor. whitespace-nowrap ile tek satıra kilitleniyor.
            className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-widest text-white mb-4 drop-shadow-lg whitespace-nowrap"
          >
            Ayça <span className="text-white/80 text-2xl sm:text-3xl md:text-4xl mx-1 md:mx-2">&</span> Çağkan
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="h-px w-20 md:w-24 bg-white/80 mx-auto my-6" 
          />

          {/* DÜZELTİLDİ: "Düğünümüze" ile tamamen aynı font (font-script) yapıldı ve uppercase kaldırıldı. */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="font-script text-3xl md:text-5xl text-white drop-shadow-md mb-2"
          >
            Davetlisiniz
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="font-serif text-2xl md:text-4xl mt-3 text-white drop-shadow-md"
          >
             22 Ağustos 2026
          </motion.p>
        </motion.div>

        {/* BUTON: uppercase tag'i silindi, doğru Türkçe karakterlerle el ile yazıldı. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-30"
        >
          <button
            onClick={scrollToRSVP}
            className="group flex flex-col items-center gap-2 text-white hover:text-white/80 transition-colors drop-shadow-xl cursor-pointer"
          >
            <span className="font-sans tracking-[0.2em] text-[11px] md:text-sm font-bold drop-shadow-lg">
              KATILIMINIZI ONAYLAYIN
            </span>
            <ChevronDown className="animate-bounce w-7 h-7 md:w-8 md:h-8 opacity-90 drop-shadow-md mt-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
