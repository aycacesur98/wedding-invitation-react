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
      {/* Arka Plan Videosu (Kuşlu animasyon direkt başlayacak) */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Yazıların okunabilirliği için hafif karartma */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* İçerik Bölümü */}
      <div className="relative z-20 px-4 max-w-4xl w-full flex flex-col items-center justify-center h-full">
        
        {/* BUZLU ÇERÇEVE - 1.5 saniye gecikmeyle ekrana süzülerek gelecek */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          className="border-2 border-white/50 p-8 md:p-16 relative w-full max-w-2xl backdrop-blur-sm bg-white/5"
        >
          {/* Dekoratif Köşeler */}
          <div className="absolute top-[-10px] left-[-10px] w-16 h-16 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-[-10px] right-[-10px] w-16 h-16 border-t-2 border-r-2 border-white/80" />
          <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 border-b-2 border-l-2 border-white/80" />
          <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 border-b-2 border-r-2 border-white/80" />

          {/* Yazıların süreleri de çerçeveden sonraya (1.5s sonrasına) ötelendi */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="font-script text-4xl md:text-6xl text-white mb-6 drop-shadow-md"
          >
            Save the date
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="font-serif text-4xl md:text-7xl tracking-widest text-white mb-4 drop-shadow-lg"
          >
            Ayça <span className="text-white/80">&</span> Çağkan
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="h-px w-24 bg-white/80 mx-auto my-8" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="font-sans uppercase tracking-[0.2em] text-sm md:text-lg text-white/90 drop-shadow-md"
          >
            Davetlisiniz!
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="font-serif text-2xl md:text-4xl mt-6 text-white drop-shadow-md"
          >
             22 Ağustos 2026
          </motion.p>
        </motion.div>

        {/* Aşağı Kaydır (CTA) Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToRSVP}
            className="group flex flex-col items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            <span className="uppercase tracking-[0.2em] text-sm md:text-base font-medium">
              Katılımınızı onaylayın
            </span>
            <ChevronDown className="animate-bounce w-8 h-8" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
