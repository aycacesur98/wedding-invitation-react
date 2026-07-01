import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return; // Zaten açılıyorsa işlemi tekrarlama
    
    // 1. Önce zarfın üst kapağını aç
    setIsFlapOpen(true);

    // 2. Kapak açıldıktan sonra (1.5 saniye bekleyip) zarfı yavaşça ekrandan kaybet
    setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    // 3. Ana web sitesi içeriğini ekrana getir
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary p-4"
        >
          {/* Dokulu Zarf Kutusu */}
          <div 
            className="relative w-full max-w-sm h-64 mx-4 perspective-1000 shadow-2xl rounded-lg overflow-hidden"
            style={{ 
              backgroundImage: 'url(/creamy_paper.png)',
              backgroundColor: '#EAEAE6', // Görsel yüklenirken arkada duracak yumuşak renk
              backgroundSize: 'cover'
            }}
          >
             <div className="relative w-full h-full">
                
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-[#EAEAE6]/20 rounded-lg shadow-inner pointer-events-none" />
                
                {/* Letter inside (Zarf açılınca hafifçe yukarı kayan mektup) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isFlapOpen ? { y: -110 } : { y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="absolute inset-x-3 top-3 bottom-3 bg-white shadow-md p-6 flex flex-col items-center justify-center text-center z-[5] rounded"
                >
                   <h1 className="font-serif text-3xl text-text mb-2">Ayça & Çağkan</h1>
                   <p className="font-script text-xl text-text">Save the Date</p>
                   <p className="font-sans text-xs mt-4 text-text/60">22 . 08 . 2026</p>
                </motion.div>

                {/* Envelope Flaps (Ön Kapaklar) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     {/* Bottom Flap */}
                     <path d="M0,100 L50,48 L100,100 Z" className="fill-secondary/95 shadow-lg" />
                     {/* Left Flap */}
                     <path d="M0,0 L0,100 L45,50 Z" fill="#EAEAE6" opacity="0.9" />
                     {/* Right Flap */}
                     <path d="M100,0 L100,100 L55,50 Z" fill="#EAEAE6" opacity="0.9" />
                   </svg>
                </div>
                
                {/* Top Flap (Yukarı doğru açılan kapak) */}
                <motion.div
                   initial={{ rotateX: 0 }}
                   animate={isFlapOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                   transition={{ duration: 1.2, ease: "easeInOut" }}
                   style={{ transformOrigin: "top" }}
                   className="absolute top-0 w-full h-[55%] z-20 flex justify-center pointer-events-none"
                 >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,0 L100,0 L50,100 Z" fill="#EAEAE6" />
                    </svg>
                 </motion.div>

                 {/* Tıklanabilir Yeni Mühür Görseliniz (En Üst Katmanda) */}
                 <motion.div 
                    animate={isFlapOpen ? { opacity: 0, scale: 0.7, y: 20 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-40 flex items-center justify-center cursor-pointer"
                    onClick={handleOpenEnvelope}
                 >
                    <img 
                      src="/yeni-muhur.png" 
                      alt="Düğün Mührü" 
                      className="w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-200"
                    />
                 </motion.div>
                 
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
