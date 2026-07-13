import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GUEST_API_URL = 'https://script.google.com/macros/s/AKfycbwRHNQ9rH-Aa48lp-jBMbejWDzhpxzb00pD1fZPoRwmHx6Bh22l62N541j5_jk49zeY6g/exec';

interface EnvelopeProps {
  onOpen: () => void;
  slug?: string; // Hata veren yer burasıydı, burayı ekledik.
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, slug }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [guestName, setGuestName] = useState<string>('');

  // Google'dan ismi çekme
  useEffect(() => {
    if (slug) {
      fetch(`${GUEST_API_URL}?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setGuestName(data.isim);
          }
        })
        .catch(err => console.error("İsim çekilemedi:", err));
    }
  }, [slug]);

  const handleOpenEnvelope = () => {
    if (isFlapOpen) return;
    setIsFlapOpen(true);
    setTimeout(() => { setIsVisible(false); }, 2800);
    setTimeout(() => { onOpen(); }, 3400);
  };

  return (
    <AnimatePresence>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet" />

      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 select-none bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: 'url(/floral_bg.png)' }}
        >
          {guestName && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 px-6 py-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 text-center"
            >
              <h2 className="font-serif text-[#1E3B2B] text-lg md:text-xl tracking-wide">
                Sevgili <span className="font-bold">{guestName}</span>, <br/>
                Düğünümüze davetlisiniz!
              </h2>
            </motion.div>
          )}

          <div className="relative w-full max-w-md h-64 mx-4 perspective-2000 flex flex-col items-center">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-lg">
              <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#D4E2EC]" style={{ backgroundImage: 'url(/creamy_paper.png)', backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}>
                <div className="absolute inset-0 bg-black/[0.02] shadow-inner" />
              </div>

              <motion.div initial={{ y: 0, scale: 1, zIndex: 2 }} animate={isFlapOpen ? { y: -140, scale: 1.03, zIndex: 2 } : { y: 0, scale: 1, zIndex: 2 }} transition={{ delay: 0.25, duration: 1.6, ease: "easeOut" }} className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-lg p-5 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100">
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <h1 className="mb-1 tracking-wide font-normal" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.85rem', color: '#1E3B2B' }}>Ayça & Çağkan</h1>
                  <p className="my-1 tracking-[0.2em] text-xs uppercase" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#b45309' }}>Düğün Davetiyesi</p>
                </div>
              </motion.div>

              <motion.div initial={{ rotateX: 0 }} animate={isFlapOpen ? { rotateX: 155 } : { rotateX: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ transformOrigin: "top center", zIndex: isFlapOpen ? 1 : 30 }} className="absolute top-0 inset-x-0 h-[55%] cursor-pointer" onClick={handleOpenEnvelope}>
                <svg className="w-full h-full drop-shadow-[0_4px_5px_rgba(0,0,0,0.08)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M-1,-1 L101,-1 L50,102 Z" fill="#D4E2EC" />
                </svg>
              </motion.div>

              <motion.div initial={{ rotateX: 0, opacity: 1 }} animate={isFlapOpen ? { rotateX: 155, y: -70, scale: 0.85, opacity: 0 } : { rotateX: 0, opacity: 1 }} transition={{ duration: 1.3, ease: "easeOut" }} style={{ transformOrigin: "top center", zIndex: 35 }} className="absolute top-0 left-1/2 -translate-x-1/2 mt-[75px] w-36 h-36 flex items-center justify-center cursor-pointer" onClick={handleOpenEnvelope}>
                <img src="/yeni-muhur.png" alt="Düğün Mührü" className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]" />
              </motion.div>
            </motion.div>

            <motion.p animate={isFlapOpen ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }} className="absolute bottom-[-60px] font-serif text-sm text-neutral-600 tracking-wider text-center bg-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
              Açmak için lütfen zarfa tıklayınız
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
