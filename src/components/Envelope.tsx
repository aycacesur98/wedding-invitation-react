import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return;
    
    // 1. Kapak animasyonunu başlat
    setIsFlapOpen(true);

    // 2. Kapak tamamen açılıp mektup yukarı süzülünce zarfı ekrandan kaldır
    setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    // 3. Ana siteyi göster
    setTimeout(() => {
      onOpen();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          // Arka planı şık, koyu eskitme bir tona çektik ki krem rengi zarf ön plana çıksın
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1e1e1a] to-[#121210] p-4 select-none"
        >
          {/* 3D Perspektif Yuvası */}
          <div className="relative w-full max-w-md h-64 mx-4 perspective-2000">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] rounded-lg"
            >
              
              {/* 1. ZARF ARKA DUVARI & KAĞIT DOKUSU */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden bg-[#eae5d9] border border-black/10"
                style={{ 
                  backgroundImage: 'url(/creamy_paper.png)',
                  backgroundSize: 'cover'
                }}
              >
                {/* Zarfın içindeki derinlik gölgesi */}
                <div className="absolute inset-0 bg-black/5 shadow-inner" />
              </div>

              {/* 2. DAVETİYE MEKTUBU (Zarfın içinde gizli, açılınca yukarı çıkıyor) */}
              <motion.div
                initial={{ y: 0, zIndex: 2 }}
                animate={isFlapOpen ? { y: -130, scale: 1.02 } : { y: 0, zIndex: 2 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-xl p-6 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100"
              >
                <h1 className="font-serif text-3xl text-neutral-800 mb-1 tracking-wide">Ayça & Çağkan</h1>
                <p className="font-script text-lg text-amber-800 my-1">Düğün Davetiyesi</p>
                <p className="font-sans text-xs mt-4 tracking-widest text-neutral-500">22 . 08 . 2026</p>
              </motion.div>

              {/* 3. SABİT ALT VE YAN KAPAKLAR (Araları boşluk kalmayacak şekilde tam oturtuldu) */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_5px_rgba(0,0,0,0.1)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Sol Kapak */}
                  <path d="M0,0 L46,50 L0,100 Z" fill="#e3ded2" />
                  {/* Sağ Kapak */}
                  <path d="M100,0 L54,50 L100,100 Z" fill="#e3ded2" />
                  {/* Alt Kapak (En üstte binmesi için en alta yazıldı) */}
                  <path d="M0,100 L50,48 L100,100 Z" fill="#ded9cc" />
                </svg>
              </div>

              {/* 4. KALİTELİ KATLANMA ANİMASYONLU ÜST KAPAK (Flap) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 160 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  transformOrigin: "top",
                  transformStyle: "preserve-3d",
                  zIndex: isFlapOpen ? 1 : 30 // Açılınca mektubun arkasına geçmesi için zIndex değişiyor
                }}
                className="absolute top-0 inset-x-0 h-[52%] cursor-pointer"
              >
                <svg className="w-full h-full drop-shadow-[0_4px_5px_rgba(0,0,0,0.15)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Üst Üçgen Kapak */}
                  <path d="M0,0 L100,0 L50,100 Z" fill="#eae5d9" />
                </svg>
              </motion.div>

              {/* 5. TIKLANABİLİR PREMIUM MÜHÜR (Zarf kapağıyla birlikte gerçekçi şekilde döner) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 160, y: -75, scale: 0.9, opacity: 0 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  transformOrigin: "top center",
                  zIndex: 35
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 mt-[105px] w-20 h-20 flex items-center justify-center cursor-pointer"
                onClick={handleOpenEnvelope}
              >
                <img 
                  src="/yeni-muhur.png" 
                  alt="Düğün Mührü" 
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] active:scale-95 transition-transform duration-100"
                />
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
