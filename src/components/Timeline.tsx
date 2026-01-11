import React from 'react';
import { Section } from './Section';
import { DoorOpen, Wine, Utensils, Users, Music, Moon, Church } from 'lucide-react';
import { motion } from 'framer-motion';

export const Timeline: React.FC = () => {
  const events = [
    { time: '3:30 pm', title: 'Llegada', icon: DoorOpen },
    { time: '4:00 pm', title: 'Ceremonia', icon: Church },
    { time: '6:00 pm', title: 'Cóctel', icon: Wine },
    { time: '7:00 pm', title: 'Cena', icon: Utensils },
    { time: '9:00 pm', title: 'Primer baile', icon: Users },
    { time: '10:00 pm', title: 'Fiesta', icon: Music },
    { time: '2:00 am', title: 'Fin de fiesta', icon: Moon },
  ];

  return (
    <Section id="timeline" className="text-center max-w-6xl mx-auto">
      <h2 className="font-script text-4xl text-primary mb-2">Programación del día</h2>
      <p className="font-sans text-text/60 mb-12 uppercase tracking-widest text-xs">Momentos especiales del gran día</p>
      
      <div className="relative mt-12">
        {/* Horizontal Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-primary/30 -translate-y-1/2 z-0" />
        
        {/* Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-1/2 top-0 h-full w-px bg-primary/30 -translate-x-1/2 z-0" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative z-10">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center w-full md:w-auto bg-secondary md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none z-10"
              >
                {/* Time Badge - Top on Desktop */}
                <div className="mb-2 md:mb-6 bg-white/80 md:bg-secondary px-3 py-1 rounded-full border border-primary/20 shadow-sm md:shadow-none md:border-transparent">
                   <span className="font-serif text-lg md:text-xl text-primary font-bold">{event.time}</span>
                </div>
                
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center text-primary shadow-md hover:scale-110 transition-transform duration-300 mb-2 md:mb-6">
                  <Icon size={24} />
                </div>
                
                {/* Title */}
                <span className="font-sans text-base md:text-sm font-medium text-text">{event.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
