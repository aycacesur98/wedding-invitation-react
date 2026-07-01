import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Section } from './Section';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  // Kutuların kenarlıklarını (border) biraz daha belirginleştirip, iç gölge vererek oymalı bir lüks hava kattık
  <div className="flex flex-col items-center justify-center p-4 border border-white/30 rounded-xl md:aspect-square bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.1)]">
    <span className="font-serif text-4xl md:text-5xl text-white font-normal mb-1 drop-shadow-sm">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90">
      {label}
    </span>
  </div>
);

export const Countdown: React.FC = () => {
  // Hedef Tarih: 22 Ağustos 2026
  const targetDate = new Date('2026-08-22T18:30:00');
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    // Kutuyu daha yuvarlak (rounded-2xl) ve tok bir gölgeyle (shadow-2xl) vurguladık
    <Section className="text-center my-10 relative overflow-hidden py-14 rounded-2xl shadow-[0_20px_40px_-15px_rgba(76,100,68,0.5)] mx-4 md:mx-auto max-w-4xl border border-[#4C6444]/30">
      
      {/* 1. ANA YEŞİL ARKA PLAN VE LÜKS KABARTMA DOKUSU */}
      <div 
        className="absolute inset-0 bg-[#4C6444]"
        style={{
          // Kendinden kabartmalı şık kağıt lifi dokusu (texture)
          backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
          opacity: 0.95
        }}
      />

      {/* 2. İÇ GÖLGE (Kutuya derinlik ve preslenmiş kağıt hissi verir) */}
      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.35)] pointer-events-none" />

      {/* 3. MERKEZİ PARILTI (Hafifletildi ki dokuyu bozmasın, sadece asil bir ışık versin) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-white/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="mx-4 md:mx-0 relative z-10">
        <h2 className="font-script text-5xl md:text-6xl text-[#F9F9F6] mb-4 tracking-wide drop-shadow-md">
          Geri Sayım!
        </h2>
        <p className="font-serif text-[#F9F9F6]/90 text-lg md:text-xl mb-12 drop-shadow-sm tracking-wide">
          Sizi aramızda görmekten mutluluk duyarız
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
          <TimeUnit value={days} label="Gün" />
          <TimeUnit value={hours} label="Saat" />
          <TimeUnit value={minutes} label="Dakika" />
          <TimeUnit value={seconds} label="Saniye" />
        </div>
      </div>
    </Section>
  );
};
