import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-secondary/90 backdrop-blur-md border-t border-primary/20 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex flex-row items-center justify-center gap-3 md:gap-4 select-none">
      
      <h2 className="font-script text-2xl md:text-3xl text-text drop-shadow-sm">
        Ayça & Çağkan
      </h2>
      
      <span className="text-text/30 text-xs md:text-sm">|</span>
      
      <p className="font-sans text-[10px] md:text-xs text-text/70 uppercase tracking-[0.2em] mt-1 md:mt-1.5">
        22 Ağustos 2026
      </p>

    </footer>
  );
};
