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
    
    // 1. Üst kapağı aç
    setIsFlapOpen(true);

    // 2. Mektup yukarı süzüldükten sonra zarfı ekrandan yavaşça kaldır
    setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    // 3. Davetiyenin ana içeriğini yükle
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
          // Arka plan tam istediğiniz gibi soft Sage Green (Adaçayı yeşili) tonlarında yapıldı
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#E2E8E4] to-[#C9D6CE] p-4 select-none"
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
                {/* Zarfın içi için hafif derinlik gölgesi */}
                <div className="absolute inset-0 bg-black/[0.03] shadow-inner" />
              </div>

              {/* 2. DAVETİYE MEKTUBU */}
              <motion.div
                initial={{ y: 0, zIndex: 2 }}
                animate={isFlapOpen ? { y: -130, scale: 1.02 } : { y: 0, zIndex: 2 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-lg p-6 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100"
              >
                <h1 className="font-serif text-3xl text-neutral-800 mb-1 tracking-wide">Ayça & Çağkan</h1>
                <p className="font-script text-lg text-amber-800 my-1">Düğün Davetiyesi</p>
                <p className="font-sans text-xs mt-4 tracking-widest text-neutral-500">22 . 08 . 2026</p>
              </motion.div>

              {/* 3. İÇ İÇE GEÇEN ALT VE YAN KAPAKLAR (Boşluk kalmaması için çizgiler bindirildi) */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Sol Kapak - Orta çizginin biraz sağından başlar */}
                  <path d="M0,-1 L52,50 L0,101 Z" fill="#E3DED2" />
                  {/* Sağ Kapak - Orta çizginin biraz solundan başlar */}
                  <path d="M100,-1 L48,50 L100,101 Z" fill="#E3DED2" />
                  {/* Alt Kapak - Diğer kapakların üstüne tam binecek şekilde ayarlandı */}
                  <path d="M-1,101 L50,45 L101,101 Z" fill="#DED9CC" />
                </svg>
              </div>

              {/* 4. ANİMASYONLU ÜST KAPAK (Flap) */}
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

              {/* 5. GÖZÜKÜR VE BÜYÜK PREMIUM MÜHÜR (Zarfla birlikte döner) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: 160, y: -80, scale: 0.8, opacity: 0 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ 
                  transformOrigin: "top center",
                  zIndex: 35
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 mt-[100px] w-24 h-24 flex items-center justify-center cursor-pointer"
                onClick={handleOpenEnvelope}
              >
                <img 
                  src="/yeni-muhur.png" 
                  alt="Düğün Mührü" 
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-transform duration-100"
                />
              </motion.div>

            </motion.div>

            {/* 6. ZARFIN ALTINDAKİ ŞIK BİLGİLENDİRME YAZISI */}
            <motion.p
              animate={isFlapOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-[-60px] font-serif text-sm text-neutral-600 tracking-wider text-center bg-white/40 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm"
            >
              Açmak için lütfen mühre tıklayınız
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
