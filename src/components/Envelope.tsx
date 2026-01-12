import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Wait a bit, then open flap
    const openTimer = setTimeout(() => {
      setIsFlapOpen(true);
    }, 1000);

    // 2. Wait for open animation (1.5s) + some reading time, then fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    // 3. Notify parent to show content
    const finishTimer = setTimeout(() => {
      onOpen();
    }, 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
        >
          <div className="relative w-full max-w-sm h-64 mx-4 perspective-1000">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="relative w-full h-full bg-[#F5F1ED] shadow-2xl rounded-lg"
             >
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-[#E8E2D9] rounded-lg" />
                
                {/* Letter inside */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={isFlapOpen ? { y: -120 } : { y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute inset-x-2 top-2 bottom-2 bg-white shadow-sm p-6 flex flex-col items-center justify-center text-center z-[5]"
                >
                   <h1 className="font-serif text-3xl text-primary mb-2">Karla & Juan</h1>
                   <p className="font-script text-xl text-text">Save the Date</p>
                   <p className="font-sans text-xs mt-4 text-text/60">28 . 03 . 2026</p>
                </motion.div>

                {/* Envelope Flaps (Front) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                   {/* Bottom */}
                   <div className="absolute bottom-0 w-full h-0 border-l-[190px] border-r-[190px] border-b-[130px] border-l-transparent border-r-transparent border-b-[#F2EFE9] rounded-b-lg shadow-sm" />
                   {/* Left */}
                   <div className="absolute left-0 top-0 h-full w-0 border-t-[128px] border-b-[128px] border-l-[160px] border-t-transparent border-b-transparent border-l-[#EBE5DE] rounded-l-lg" />
                   {/* Right */}
                   <div className="absolute right-0 top-0 h-full w-0 border-t-[128px] border-b-[128px] border-r-[160px] border-t-transparent border-b-transparent border-r-[#EBE5DE] rounded-r-lg" />
                </div>
                
                {/* Top Flap (The one that opens) */}
                <motion.div
                   initial={{ rotateX: 0 }}
                   animate={isFlapOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                   transition={{ duration: 1.2, ease: "easeInOut" }}
                   style={{ transformOrigin: "top" }}
                   className="absolute top-0 w-full h-0 border-l-[192px] border-r-[192px] border-t-[140px] border-l-transparent border-r-transparent border-t-[#D4A5A5] z-20 flex justify-center"
                 >
                    {/* Wax Seal */}
                    <div className="absolute -top-[100px] w-20 h-20 rounded-full bg-[#C88A8A] shadow-lg flex items-center justify-center border-4 border-[#B07070]/30">
                       <span className="font-script text-white text-3xl pt-1">J&K</span>
                    </div>
                 </motion.div>
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
