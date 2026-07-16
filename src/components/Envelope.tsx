import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GUEST_API_URL = 'https://script.google.com/macros/s/AKfycbwRHNQ9rH-Aa48lp-jBMbejWDzhpxzb00pD1fZPoRwmHx6Bh22l62N541j5_jk49zeY6g/exec';

interface EnvelopeProps {
  onOpen: () => void;
  slug?: string;
  lang?: 'tr' | 'en'; // Dil seçeneği
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, slug, lang = 'tr' }) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [guestName, setGuestName] = useState<string>('');
  
  // Excel'den veri gelene kadar ekranı bekleten durum (State)
  const [isReady, setIsReady] = useState(!slug);

  const isEnglish = lang === 'en';

  useEffect(() => {
    if (slug) {
      fetch(`${GUEST_API_URL}?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setGuestName(data.isim);
          }
        })
        .catch(err => console.error("Bağlantı hatası:", err))
        .finally(() => {
          // İsim gelse de gelmese de artık zarfı ve yazıyı aynı anda gösterebiliriz
          setIsReady(true);
        });
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
          
          {/* isReady true olana kadar zarfı ve metni saklıyoruz */}
          {isReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }} 
              className="w-full flex flex-col items-center justify-center"
            >
              
              {/* İSİM KISMI */}
              {guestName && (
                <div className="absolute top-[130px] md:top-28 inset-x-0 z-[60] flex flex-col items-center text-center px-4 pointer-events-none">
                  <h2 className="font-serif text-[#1E3B2B] text-xl md:text-2xl tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
                    {isEnglish ? "Dear" : "Sevgili"} <span className="font-bold">{guestName}</span>,<br/>
                    {isEnglish ? "you are invited to our wedding" : "düğünümüze davetlisiniz"}
                  </h2>
                </div>
              )}

              {/* ZARF KISMI */}
              <div className="relative w-full max-w-md h-64 mx-4 perspective-2000 flex flex-col items-center mt-[120px] md:mt-24">
                <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-lg">
                  <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#D4E2EC]" style={{ backgroundImage: 'url(/creamy_paper.png)', backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}>
                    <div className="absolute inset-0 bg-black/[0.02] shadow-inner" />
                  </div>

                  {/* İÇİNDEKİ KART (TARİH BURAYA EKLENDİ) */}
                  <motion.div initial={{ y: 0, scale: 1, zIndex: 2 }} animate={isFlapOpen ? { y: -140, scale: 1.03, zIndex: 2 } : { y: 0, scale: 1, zIndex: 2 }} transition={{ delay: 0.25, duration: 1.6, ease: "easeOut" }} className="absolute inset-x-4 top-3 bottom-3 bg-white shadow-lg p-5 flex flex-col items-center justify-center text-center rounded-md border border-neutral-100">
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <h1 className="mb-1 tracking-wide font-normal" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.85rem', color: '#1E3B2B' }}>Ayça & Çağkan</h1>
                      <p className="my-1 tracking-[0.2em] text-xs uppercase" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#b45309' }}>
                        {isEnglish ? "Wedding Invitation" : "Düğün Davetiyesi"}
                      </p>
                      {/* EKLENEN TARİH KISMI */}
                      <p className="mt-1 tracking-widest text-[11px] font-sans text-[#1E3B2B]/70">
                        22.08.2026
                      </p>
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full drop-shadow-[0_-2px_4px_rgba(0,0,0,0.06)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,-1 L52,50 L0,101 Z" fill="#CBDCE7" />
                      <path d="M100,-1 L48,50 L100,101 Z" fill="#CBDCE7" />
                      <path d="M-1,101 L50,45 L101,101 Z" fill="#C2D5E2" />
                    </svg>
                  </div>

                  <motion.div initial={{ rotateX: 0 }} animate={isFlapOpen ? { rotateX: 155 } : { rotateX: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: isFlapOpen ? 1 : 30 }} className="absolute top-0 inset-x-0 h-[55%] cursor-pointer" onClick={handleOpenEnvelope}>
                    <svg className="w-full h-full drop-shadow-[0_4px_5px_rgba(0,0,0,0.08)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M-1,-1 L101,-1 L50,102 Z" fill="#D4E2EC" />
                    </svg>
                  </motion.div>

                  <motion.div initial={{ rotateX: 0, opacity: 1 }} animate={isFlapOpen ? { rotateX: 155, y: -70, scale: 0.85, opacity: 0 } : { rotateX: 0, opacity: 1 }} transition={{ duration: 1.3, ease: "easeOut" }} style={{ transformOrigin: "top center", zIndex: 35 }} className="absolute top-0 left-1/2 -translate-x-1/2 mt-[75px] w-36 h-36 flex items-center justify-center cursor-pointer" onClick={handleOpenEnvelope}>
                    <img src="/yeni-muhur.png" alt="Düğün Mührü" className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] active:scale-95 transition-transform duration-100" />
                  </motion.div>
                </motion.div>

                <motion.p animate={isFlapOpen ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="absolute bottom-[-60px] font-serif text-sm text-neutral-600 tracking-wider text-center bg-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                  {isEnglish ? "Please tap the envelope to open" : "Açmak için lütfen zarfa tıklayınız"}
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
