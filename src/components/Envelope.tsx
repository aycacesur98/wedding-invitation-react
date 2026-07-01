import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const misafirIsmi = urlParams.get('kisi')?.replace(/_/g, ' ') || ''; 

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return;
    
    setIsFlapOpen(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    setTimeout(() => {
      onOpen();
    }, 3400);
  };

  const smoothTransition = {
    duration: 1.5,
    ease: [0.25, 1, 0.5, 1]
  };

  return (
    <AnimatePresence>
      {/* Şık El Yazısı Fontunu Dışarıdan Doğrudan Yüklüyoruz */}
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />

      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 select-none bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: 'url(/floral_bg.png)' }}
        >
          <div className="relative w-full max-w-md h-64 mx-4 perspective-2000 flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-lg"
            >
              
              {/* 1. ZARF ARKA DUVARI */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden bg-[#D4E2EC]"
                style={{ 
                  backgroundImage: 'url(/creamy_paper.png)',
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'multiply'
                }}
              >
                <div className="absolute inset-0 bg-black/[0.02] shadow-inner" />
              </div>

              {/* 2. DAVETİYE MEKTUBU (GARANTİLİ STİL ENTEGRASYONU) */}
              <motion.div
                initial={{ y: 0, scale: 1, zIndex: 2 }}
                animate={isFlapOpen ? { y: -140, scale: 1.03, zIndex: 2 } : { y: 0, scale: 1, zIndex: 2 }}
                transition={{ 
                  delay: 0.25,
                  duration: 1.6,
                  ease: [0.25, 1, 0.5, 1] 
                }}
                className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-lg p-5 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100"
              >
                {/* KESİN ÇALIŞAN ALTIN ÇERÇEVE İŞLEMELERİ */}
                <div 
                  className="absolute inset-2 rounded-sm pointer-events-none" 
                  style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }} // Altın Rengi Çerçeve 1
                />
                <div 
                  className="absolute inset-3 rounded-sm pointer-events-none" 
                  style={{ border: '1.5px double rgba(212, 175, 55, 0.25)' }} // Çift Çizgili Altın Çerçeve 2
                />
                
                {/* Köşe İşlemeleri */}
                <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none" style={{ borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
                <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none" style={{ borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />
                <div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none" style={{ borderBottom: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
                <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none" style={{ borderBottom: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  {misafirIsmi && (
                    <p className="font-sans text-[10px] text-stone-400 uppercase tracking-[0.25em] mb-1">
                      Sn. {misafirIsmi}
                    </p>
                  )}
                  
                  {/* KESİN ÇALIŞAN KOYU YEŞİL EL YAZISI */}
                  <h1 
                    className="mb-1 tracking-wide"
                    style={{ 
                      fontFamily: "'Great Vibes', cursive", 
                      fontSize: '3rem', 
                      color: '#1E3B2B',
                      lineHeight: '1.2'
                    }}
                  >
                    Ayça & Çağkan
                  </h1>
                  
                  <p className="font-serif italic text-sm text-amber-800/80 my-0.5 tracking-wider">
                    Düğün Davetiyesi
                  </p>
                  
                  <p className="font-sans text-[11px] mt-2 tracking-[0.3em] text-stone-500 font-light">
                    22 . 08 . 2026
                  </p>
                </div>
              </motion.div>

              {/* 3. İÇ İÇE GEÇEN ALT VE YAN KAPAKLAR */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_4px_rgba(0,0,0,0.06)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,-1 L52,50 L0,101 Z" fill="#CBDCE7" />
                  <path d="M100,-1 L48,50 L100,101 Z" fill="#CBDCE7" />
                  <path d="M-1,101 L50,45 L101,101 Z" fill="#C2D5E2" />
                </svg>
              </div>

              {/* 4. ANİMASYONLU ÜST KAPAK */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 155 } : { rotateX: 0 }}
                transition={smoothTransition}
                style={{ 
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  zIndex: isFlapOpen ? 1 : 30
                }}
                className="absolute top-0 inset-x-0 h-[55%] cursor-pointer"
              >
                <svg className="w-full h-full drop-shadow-[0_4px_5px_rgba(0,0,0,0.08)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M-1,-1 L101,-1 L50,102 Z" fill="#D4E2EC" />
                </svg>
              </motion.div>

              {/* 5. PREMIUM MÜHÜR */}
              <motion.div
                initial={{ rotateX: 0, opacity: 1 }}
                animate={isFlapOpen ? { rotateX: 155, y: -70, scale: 0.85, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
                style={{ 
                  transformOrigin: "top center",
                  zIndex: 35
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 mt-[75px] w-36 h-36 flex items-center justify-center cursor-pointer"
                onClick={handleOpenEnvelope}
              >
                <img 
                  src="/yeni-muhur.png" 
                  alt="Düğün Mührü" 
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] active:scale-95 transition-transform duration-100"
                />
              </motion.div>

            </motion.div>

            {/* 6. ZARFIN ALTINDAKİ ŞIK BİLGİLENDİRME YAZISI */}
            <motion.p
              animate={isFlapOpen ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-[-60px] font-serif text-sm text-neutral-600 tracking-wider text-center bg-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm"
            >
              Açmak için lütfen zarfa tıklayınız
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
