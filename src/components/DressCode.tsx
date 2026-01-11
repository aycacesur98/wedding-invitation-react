import React from 'react';
import { Section } from './Section';
import { Shirt } from 'lucide-react';
import { motion } from 'framer-motion';

export const DressCode: React.FC = () => {
  return (
    <Section id="dress-code" className="text-center" withPattern>
      <div className="flex justify-center mb-4">
        <Shirt className="text-primary w-8 h-8" />
      </div>
      
      <h2 className="font-script text-4xl text-primary mb-2">Dress Code</h2>
      <p className="font-sans text-text/60 mb-8 uppercase tracking-widest text-xs">Código de Vestimenta</p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white p-4 rounded-lg border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 mb-4 overflow-hidden rounded-md">
              <img 
                src="/dress1.jpeg" 
                alt="Vestido largo" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-xl text-primary mb-2">Ellas</h3>
            <p className="font-sans text-text/80">
                Vestido largo
            </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 mb-4 overflow-hidden rounded-md">
              <img 
                src="/pan.png" 
                alt="Traje formal con corbata negra" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-xl text-primary mb-2">Ellos</h3>
            <p className="font-sans text-text/80">
                Traje formal
            </p>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 font-serif text-text/80 italic"
      >
        "Etiqueta Rigurosa"
      </motion.p>
    </Section>
  );
};
