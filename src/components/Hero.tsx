import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center">
      
      {/* VINTAGE TABELA ŞEKLİNİ OLUŞTURAN GİZLİ VEKTÖR MASKESİ (SİLMEYİN) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="vintage-plaque" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0 
                     C 0.55 0, 0.58 0.08, 0.65 0.08 
                     L 0.88 0.08 
                     C 0.95 0.08, 0.98 0.11, 0.98 0.18 
                     L 0.98 0.35 
                     C 0.98 0.42, 0.92 0.45, 0.92 0.5 
                     C 0.92 0.55, 0.98 0.58, 0.98 0.65 
                     L 0.98 0.82 
                     C 0.98 0.89, 0.95 0.92, 0.88 0.92 
                     L 0.65 0.92 
                     C 0.58 0.92, 0.55 1, 0.5 1 
                     C 0.45 1, 0.42 0.92, 0.35 0.92 
                     L 0.12 0.92 
                     C 0.05 0.92, 0.02 0.89, 0.02 0.82 
                     L 0.02 0.65 
                     C 0.02 0.58, 0.08 0.55, 0.08 0.5 
                     C 0.08 0.45, 0.02 0.42, 0.02 0.35 
                     L 0.02 0.18 
                     C 0.02 0.11, 0.05 0.08, 0.12 0.08 
                     L 0.35 0.08 
                     C 0.42 0.08, 0.45 0, 0.5 0 Z" />
          </clipPath>
        </defs>
      </svg>

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
      <div className="relative z-20 px-4 max-w-5xl w-full flex flex-col items-center justify-center h-full">
        
        {/* BUZLU VINTAGE CAM TABELA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-lg md:max-w-3xl"
          // Tabela şekline tam oturan, havada asılı gibi durmasını sağlayan gölge
          style={{ filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))' }}
        >
          <div 
            className="w-full h-full backdrop-blur-[6px] bg-gradient-to-b from-white/15 to-white/5 flex flex-col items-center justify-center px-10 py-16 md:px-16 md:py-20"
            // Üstteki görünmez vektör maskesini cama uyguluyoruz
            style={{ clipPath: 'url(#vintage-plaque)' }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="font-script text-4xl md:text-5xl text-[#F9F9F6] mb-5 md:mb-7 drop-shadow-md"
            >
              Save the date
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest text-white mb-3 md:mb-5 drop-shadow-lg whitespace-nowrap"
            >
              Ayça <span className="text-white/60 text-3xl md:text-4xl mx-1 md:mx-3">&</span> Çağkan
            </motion.h1>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="h-px w-16 md:w-24 bg-white/60 mx-auto my-4 md:my-6" 
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              className="font-sans uppercase tracking-[0.25em] text-[10px] md:text-sm text-white/90 drop-shadow-md"
            >
              Davetlisiniz!
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9 }}
              className="font-serif text-2xl md:text-3xl mt-3 md:mt-4 text-[#F9F9F6] drop-shadow-md tracking-wider"
            >
               22 Ağustos 2026
            </motion.p>
          </div>
        </motion.div>

        {/* Daha Vurgulu Aşağı Kaydır (CTA) Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-30"
        >
          <button
            onClick={scrollToRSVP}
            className="group flex flex-col items-center gap-2 text-white hover:text-[#D4AF37] transition-colors drop-shadow-2xl cursor-pointer"
          >
            <span className="font-sans uppercase tracking-[0.2em] text-sm md:text-base font-bold drop-shadow-lg">
              Katılımınızı Onaylayın
            </span>
            <ChevronDown className="animate-bounce w-8 h-8 opacity-90 drop-shadow-lg mt-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
