import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Section } from './Section';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  // Kutuların içindeki yazıları beyaz yaptıgımız için border rengini de hafif şeffaf beyaz (border-white/20) yaptık
  <div className="flex flex-col items-center justify-center p-4 border border-white/20 rounded-lg md:aspect-square bg-white/10 backdrop-blur-sm shadow-sm">
    <span className="font-serif text-4xl md:text-5xl text-white font-normal mb-1">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90">
      {label}
    </span>
  </div>
);

export const Countdown: React.FC = () => {
  // Target Date: August 22, 2026
  const targetDate = new Date('2026-08-22T18:30:00');
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    // bg-tertiary yerine "bg-[#4C6444]" kullanarak parlak, şık bir yaprak/doğa yeşili tonu ekledik. Yazıları da text-white yaptık.
    <Section className="text-center my-8 bg-[#4C6444] text-white rounded-xl shadow-xl relative overflow-hidden py-12">
      {/* Arka plandaki dekoratif parıltı dairesi */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[200%] bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-4 md:mx-0 relative z-10">
        <h2 className="font-script text-5xl md:text-6xl text-white mb-3 tracking-wide">Geri Sayım!</h2>
        <p className="font-serif text-white/80 text-lg md:text-xl mb-12">
          Sizi aramızda görmekten mutluluk duyarız
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          <TimeUnit value={days} label="Gün" />
          <TimeUnit value={hours} label="Saat" />
          <TimeUnit value={minutes} label="Dakika" />
          <TimeUnit value={seconds} label="Saniye" />
        </div>
      </div>
    </Section>
  );
};
