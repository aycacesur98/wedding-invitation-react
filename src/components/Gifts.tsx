import React from 'react';
import { Section } from './Section';
import { Gift, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Gifts: React.FC = () => {
  return (
    <Section id="gifts" className="text-center">
      <div className="flex justify-center mb-4">
        <Gift className="text-primary w-8 h-8" />
      </div>
      
      <h2 className="font-script text-4xl text-text mb-2">Regalos</h2>
      <p className="font-sans text-text/60 mb-8 uppercase tracking-widest text-xs">Lo más importante es que estén presentes</p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-lg border border-primary/20 shadow-sm max-w-lg mx-auto relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/5 rounded-full">
                <Mail className="text-primary w-10 h-10" strokeWidth={1.5} />
            </div>
        </div>
        
        <h3 className="font-serif text-2xl text-text mb-4">Lluvia de Sobres</h3>
        
        <p className="font-sans text-text/80 leading-relaxed text-lg">
          Su presencia es nuestro mayor regalo.
        </p>
        
        <p className="font-sans text-text/60 leading-relaxed mt-4">
          Si desean tener un detalle con nosotros, dispondremos de un buzón para lluvia de sobres en la recepción el día de la boda.
        </p>

        <p className="font-script text-2xl text-primary/60 mt-8">
            ¡Gracias!
        </p>
      </motion.div>
    </Section>
  );
};
