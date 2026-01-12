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
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay for better text readability */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 px-4 max-w-4xl w-full flex flex-col items-center justify-center h-full">
        <div className="border-2 border-white/50 p-8 md:p-16 relative w-full max-w-2xl backdrop-blur-sm bg-white/5">
          {/* Decorative corners */}
          <div className="absolute top-[-10px] left-[-10px] w-16 h-16 border-t-2 border-l-2 border-white/80" />
          <div className="absolute top-[-10px] right-[-10px] w-16 h-16 border-t-2 border-r-2 border-white/80" />
          <div className="absolute bottom-[-10px] left-[-10px] w-16 h-16 border-b-2 border-l-2 border-white/80" />
          <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 border-b-2 border-r-2 border-white/80" />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-script text-4xl md:text-6xl text-white mb-6 drop-shadow-md"
          >
            Save the date
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-serif text-4xl md:text-7xl tracking-widest text-white mb-4 drop-shadow-lg"
          >
            Karla <span className="text-white/80">&</span> Juan
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-px w-24 bg-white/80 mx-auto my-8" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-sans uppercase tracking-[0.2em] text-sm md:text-lg text-white/90 drop-shadow-md"
          >
            ¡Nos casamos!
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-serif text-2xl md:text-4xl mt-6 text-white drop-shadow-md"
          >
            Sábado 28 de Marzo de 2026
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToRSVP}
            className="group flex flex-col items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            <span className="uppercase tracking-[0.2em] text-sm md:text-base font-medium">
              Confirma tu asistencia
            </span>
            <ChevronDown className="animate-bounce w-8 h-8" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
