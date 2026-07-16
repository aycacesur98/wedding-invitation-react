import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Hero: React.FC = () => {
  const location = useLocation();
  const isEnglish = location.pathname.includes('/en');
  
  // 3.9 Saniye Sonra Sayfayı 80px Aşağı Kaydıran Efekt (Geri eklendi)
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
        
        {/* Ortadaki Cam Kutu */}
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
            {isEnglish ? "Welcome to our" : "Düğünümüze"}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
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

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="font-script text-3xl md:text-5xl text-white drop-shadow-md mb-2"
          >
            {isEnglish ? "Wedding" : "Davetlisiniz"}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="font-serif text-2xl md:text-4xl mt-3 text-white drop-shadow-md"
          >
             {isEnglish ? "August 22, 2026" : "22 Ağustos 2026"}
          </motion.p>
        </motion.div>

        {/* ALT KISIM: Yazı üstte, buton altta. Mobilde kesilmemesi için bottom-10 kullanıldı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="absolute bottom-10 md:bottom-12 left-0 right-0 flex flex-col items-center z-30 gap-4"
        >
          
          {/* Kaydırma İpucu (Yazı ve Ok) - Kalın ve gölgeli yapıldı */}
          <div className="flex flex-col items-center">
            <span className="font-sans text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] mb-1 text-center">
              {isEnglish ? 'Scroll for details' : 'Detaylar için kaydırınız'}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]" strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Katılım Onay Butonu */}
          <button
            onClick={scrollToRSVP}
            className="px-6 py-3 bg-white/25 hover:bg-white/35 border border-white/60 backdrop-blur-md rounded-full transition-all duration-300 group cursor-pointer shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          >
            <span className="font-sans tracking-[0.2em] text-[11px] md:text-sm font-bold text-white drop-shadow-md">
              {isEnglish ? "RSVP NOW" : "KATILIMINIZI ONAYLAYIN"}
            </span>
          </button>

        </motion.div>
      </div>
    </section>
  );
};
