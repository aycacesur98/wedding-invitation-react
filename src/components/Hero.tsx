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
      {/* Arka Plan Videosu */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/35 z-10" /> 
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
      <div className="relative z-20 px-4 max-w-4xl w-full flex flex-col items-center justify-center h-full">
        
        {/* YENİ: Kemerli (Arch) Vintage Tabela Tasarımı */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.25, 1, 0.5, 1] }} // Pürüzsüz süzülme
          // Üst köşeleri çok yuvarlak (kemer), alt köşeleri hafif yuvarlak yaparak arch şeklini oluşturuyoruz
          className="relative w-full max-w-xl backdrop-blur-[6px] bg-white/10 p-10 md:p-14"
          style={{
            borderTopLeftRadius: '140px',
            borderTopRightRadius: '140px',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* İnce iç çerçeve detayı (Arch şekline uyumlu) */}
          <div 
            className="absolute inset-2 pointer-events-none"
            style={{
              borderTopLeftRadius: '130px',
              borderTopRightRadius: '130px',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}
          />

          {/* Yazılar */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="font-script text-4xl md:text-5xl text-[#F9F9F6] mb-6 drop-shadow-md"
          >
            Save the date
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl tracking-widest text-white mb-4 drop-shadow-lg"
          >
            Ayça <span className="text-white/60 text-4xl mx-1">&</span> Çağkan
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="h-px w-20 bg-white/60 mx-auto my-6" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
            className="font-sans uppercase tracking-[0.25em] text-[11px] md:text-sm text-white/90 drop-shadow-md"
          >
            Davetlisiniz!
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9 }}
            className="font-serif text-2xl md:text-3xl mt-4 text-[#F9F9F6] drop-shadow-md tracking-wider"
          >
             22 Ağustos 2026
          </motion.p>
        </motion.div>

        {/* YENİ: Daha Vurgulu ve Tok Aşağı Kaydır (CTA) Butonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-30"
        >
          <button
            onClick={scrollToRSVP}
            // Gözden kaçmaması için drop-shadow ve kalınlık eklendi
            className="group flex flex-col items-center gap-2 text-white hover:text-[#D4AF37] transition-colors drop-shadow-xl cursor-pointer"
          >
            <span className="font-sans uppercase tracking-[0.2em] text-sm md:text-base font-semibold drop-shadow-2xl">
              Katılımınızı Onaylayın
            </span>
            <ChevronDown className="animate-bounce w-8 h-8 opacity-90 drop-shadow-lg mt-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
