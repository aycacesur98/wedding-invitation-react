import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return; // Zaten açılıyorsa tekrar tetikleme
    
    // 1. Önce zarfın kapağını aç
    setIsFlapOpen(true);

    // 2. Kapak animasyonu (1.2s) bittikten sonra zarfı yavaşça kaybet
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    // 3. Ana site içeriğini ekrana getir
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
        >
          <div className="relative w-full max-w-sm h-64 mx-4 perspective-1000">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="relative w-full h-full bg-secondary shadow-2xl rounded-lg"
             >
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-[#EAEAE6] rounded-lg" />
                
                {/* Letter inside */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isFlapOpen ? { y: -120 } : { y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute inset-x-2 top-2 bottom-2 bg-white shadow-sm p-6 flex flex-col items-center justify-center text-center z-[5]"
                >
                   <h1 className="font-serif text-3xl text-text mb-2">Ayça & Çağkan</h1>
                   <p className="font-script text-xl text-text">Save the Date</p>
                   <p className="font-sans text-xs mt-4 text-text/60">22 . 08 . 2026</p>
                </motion.div>

                {/* Envelope Flaps (Front) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     {/* Bottom Flap - secondary color */}
                     <path d="M0,100 L50,48 L100,100 Z" className="fill-secondary" />
                     {/* Left Flap - darker side color */}
                     <path d="M0,0 L0,100 L45,50 Z" fill="#EAEAE6" />
                     {/* Right Flap - darker side color */}
                     <path d="M100,0 L100,100 L55,50 Z" fill="#EAEAE6" />
                   </svg>
                </div>
                
                {/* Top Flap (The one that opens) */}
                <motion.div
                   initial={{ rotateX: 0 }}
                   animate={isFlapOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                   transition={{ duration: 1.2, ease: "easeInOut" }}
                   style={{ transformOrigin: "top" }}
                   className="absolute top-0 w-full h-[55%] z-20 flex justify-center"
                 >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,0 L100,0 L50,100 Z" fill="#EAEAE6" />
                    </svg>
                 </motion.div>

                 {/* Tıklanabilir Büyük Mühür (En Üstte) */}
                 <motion.div 
                    animate={isFlapOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-40 flex items-center justify-center cursor-pointer"
                    onClick={handleOpenEnvelope}
                 >
                    <img 
                      src="/yeni-muhur.png" 
                      alt="Mühür" 
                      className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-200"
                    />
                 </motion.div>
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
