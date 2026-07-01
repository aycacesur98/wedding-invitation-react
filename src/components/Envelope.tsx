import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Linkten kişiye özel isim çekme mantığı
  const urlParams = new URLSearchParams(window.location.search);
  const misafirIsmi = urlParams.get('kisi')?.replace(/_/g, ' ') || ''; 

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return;
    
    setIsFlapOpen(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    setTimeout(() => {
      onOpen();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          // Yeni çiçekli arka plan görseliniz buraya esnek şekilde entegre edildi
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 select-none bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: 'url(/floral_bg.png)' }}
        >
          {/* 3D Perspektif Alanı */}
          <div className="relative w-full max-w-md h-64 mx-4 perspective-2000 flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-lg"
            >
              
              {/* 1. ZARF ARKA DUVARI & CREAMY PAPER DOKUSU */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden bg-[#EAEAE6]"
                style={{ 
                  backgroundImage: 'url(/creamy_paper.png)',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-black/[0.03] shadow-inner" />
              </div>

              {/* 2. DAVETİYE MEKTUBU */}
              <motion.div
                initial={{ y: 0, zIndex: 2 }}
                animate={isFlapOpen ? { y: -130, scale: 1.02 } : { y: 0, zIndex: 2 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-lg p-6 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100"
              >
                {/* Linkte isim varsa mektubun en üstünde zarifçe görünür */}
                {misafirIsmi && (
                  <p className="font-sans text-[11px] text-amber-800/80 uppercase tracking-[0.2em] mb-2">
                    Sn. {misafirIsmi}
                  </p>
                )}
                <h1 className="font-serif text-3xl text-neutral-800 mb-1 tracking-wide">Ayça & Çağkan</h1>
                <p className="font-script text-lg text-amber-800 my-1">Düğün Davetiyesi</p>
                <p className="font-sans text-xs mt-4 tracking-widest text-neutral-500">22 . 08 . 2026</p>
              </motion.div>

              {/* 3. İÇ İÇE GEÇEN ALT VE YAN KAPAKLAR */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,-1 L52,50 L0,101 Z" fill="#E3DED2" />
                  <path d="M100,-1 L48,50 L100,101 Z" fill="#E3DED2" />
                  <path d="M-1,101 L50,45 L101,101 Z" fill="#DED9CC" />
                </svg>
              </div>

              {/* 4. ANİMASYONLU ÜST KAPAK */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 160 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  zIndex: isFlapOpen ? 1 : 30
                }}
                className="absolute top-0 inset-x-0 h-[55%] cursor-pointer"
              >
                <svg className="w-full h-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M-1,-1 L101,-1 L50,102 Z" fill="#EAEAE6" />
                </svg>
              </motion.div>

              {/* 5. PREMIUM MÜHÜR */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 160, y: -90, scale: 0.8, opacity: 0 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
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
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] active:scale-95 transition-transform duration-100"
                />
              </motion.div>

            </motion.div>

            {/* 6. ZARFIN ALTINDAKİ ŞIK BİLGİLENDİRME YAZISI */}
            <motion.p
              animate={isFlapOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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
