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
    // h-[90vh] yaparak ekranın altından birkaç cm boşluk bıraktık, böylece insanlar aşağıyı görüp kaydırmak isteyecek
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex flex-col justify-center items-center text-center">
      
      {/* VINTAGE TABELA ŞEKLİNİ OLUŞTURAN GİZLİ VEKTÖR MASKESİ */}
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
      <div className="relative z-20 px-4 max-w-5xl w-full flex flex-col items-center justify-center h-full pt-10">
        
        {/* BUZLU VINTAGE CAM TABELA - Opaklık artırıldı, çok daha net ve belirgin bir buzlu cam yapıldı */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-lg md:max-w-3xl"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35))' }}
        >
          <div 
            className="w-full h-full backdrop-blur-md bg-white/25 flex flex-col items-center justify-center px-10 py-16 md:px-16 md:py-20"
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
              className="h-px w-16 md:w-24 bg-white/70 mx-auto my-4 md:my-6" 
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              className="font-sans uppercase tracking-[0.25em] text-[10px] md:text-sm text-white/95 drop-shadow-md"
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

        {/* İNCE DİKDÖRTGEN BUZLU CAMLI VE VURGULU CTA BUTONU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-30"
        >
          <button
            onClick={scrollToRSVP}
            // Butonun arkasına yatay, ince ve şık bir buzlu cam eklendi
            className="group flex flex-col items-center gap-1 text-white hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-md bg-white/15 border border-white/30 px-8 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <span className="font-sans uppercase tracking-[0.2em] text-[11px] md:text-sm font-semibold drop-shadow-lg mt-0.5">
              Katılımınızı Onaylayın
            </span>
            <ChevronDown className="animate-bounce w-6 h-6 opacity-90 drop-shadow-md" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
