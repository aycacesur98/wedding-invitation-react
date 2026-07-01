import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Section } from './Section';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center justify-center p-4 border border-text/10 rounded-lg md:aspect-square bg-white/30 backdrop-blur-sm">
    <span className="font-serif text-4xl md:text-5xl text-text font-normal mb-1">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-text/80">
      {label}
    </span>
  </div>
);

export const Countdown: React.FC = () => {
  // Target Date: August 22, 2026
  const targetDate = new Date('2026-08-22T18:30:00');
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <Section className="text-center my-8 bg-tertiary rounded-xl shadow-lg relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[200%] bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-4 md:mx-0 relative z-10">
        <h2 className="font-script text-5xl md:text-6xl text-text mb-3">Count Down</h2>
        <p className="font-serif text-text/80 text-lg md:text-xl mb-12">
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
