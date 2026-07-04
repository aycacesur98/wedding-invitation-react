import React from 'react';
import { Section } from './Section';
import { Utensils, GlassWater, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Timeline: React.FC = () => {
  const events = [
    { time: '18:30', title: 'Karşılama / Kokteyl', icon: GlassWater },
    { time: '19:30', title: 'Nikah Seremonisi', icon: Heart },
    { time: '20:00', title: 'Yemek', icon: Utensils },
  ];

  return (
    <Section id="timeline" className="text-center max-w-4xl mx-auto py-12">
      <h2 className="font-script text-4xl md:text-5xl text-text mb-2">Düğün Akışı</h2>
      
      <div className="relative mt-12 px-4">
        {/* Yatay Çizgi (Masaüstü Ekranlar İçin) */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-primary/30 -translate-y-1/2 z-0" />
        
        {/* Dikey Çizgi (Mobil Ekranlar İçin) */}
        <div className="md:hidden absolute left-1/2 top-0 h-full w-px bg-primary/30 -translate-x-1/2 z-0" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative z-10">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center w-full md:w-1/3 bg-secondary md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-10"
              >
                {/* Saat Rozeti */}
                <div className="mb-3 md:mb-6 bg-white md:bg-secondary px-4 py-1 rounded-full border border-primary/20 shadow-sm md:shadow-none md:border-transparent">
                   <span className="font-serif text-lg md:text-xl text-text font-bold">{event.time}</span>
                </div>
                
                {/* İkon Yuvarlağı */}
                <div className="w-16 h-16 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-md hover:scale-110 transition-transform duration-300 mb-3 md:mb-6">
                  <Icon size={26} />
                </div>
                
                {/* Etkinlik Adı */}
                <span className="font-sans text-base md:text-sm font-medium text-text tracking-wide">{event.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
