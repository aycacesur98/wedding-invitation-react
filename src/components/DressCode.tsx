import React from 'react';
import { Section } from './Section';
import { Shirt } from 'lucide-react';
import { motion } from 'framer-motion';

export const DressCode: React.FC = () => {

  return (
    <Section id="dress-code" className="text-center relative overflow-hidden" withPattern>
      <div className="flex justify-center mb-4 relative z-10">
        <Shirt className="text-primary w-8 h-8" />
      </div>
      
      <h2 className="font-script text-4xl text-primary mb-2 relative z-10">Dress Code</h2>
      <p className="font-sans text-text/60 mb-8 uppercase tracking-widest text-xs relative z-10">Código de Vestimenta</p>
      
      {/* Decorative "Formal" text background */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-0 opacity-5 select-none pointer-events-none w-full overflow-hidden">
        <span className="font-script text-[6rem] md:text-[10rem] whitespace-nowrap text-primary block text-center">Formal</span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10"
      >
        {/* Ellos - Left Column */}
        <div className="order-2 md:order-1 text-center md:text-right space-y-6">
            <div>
                <h3 className="font-serif text-2xl text-primary mb-4">Ellos</h3>
                <ul className="font-sans text-text/80 space-y-3">
                    <li className="font-semibold tracking-wide uppercase">Traje Formal</li>
                    <li className="text-sm text-text/60">NO BEIGE</li>
                    <li className="uppercase text-sm">Corbata o Corbatín</li>
                    <li className="uppercase text-sm">Zapatos</li>
                </ul>
            </div>
        </div>

        {/* Image - Center Column */}
        <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-[300px] md:max-w-full aspect-[3/4] md:aspect-auto">
              <img 
                src="/dresscodeall.webp" 
                alt="Código de vestimenta formal para pareja" 
                className="w-full h-auto rounded-xl object-contain max-h-[500px]"
              />
            </div>
        </div>

        {/* Ellas - Right Column */}
        <div className="order-3 text-center md:text-left space-y-6">
            <div>
                <h3 className="font-serif text-2xl text-primary mb-4">Ellas</h3>
                <ul className="font-sans text-text/80 space-y-3">
                    <li className="font-semibold tracking-wide uppercase">Vestido Largo</li>
                    <li className="text-xs uppercase leading-relaxed max-w-[200px] mx-auto md:mx-0 text-text/60">
                        No Blanco, Beige, Crema, Plateado, Rosado, Dorado
                    </li>
                    <li className="uppercase text-sm">Tacones abiertos o cerrados</li>
                </ul>
            </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 relative z-10"
      >
        <p className="font-serif text-text/80 italic text-xl mb-4">
            "Etiqueta Rigurosa"
        </p>
        <p className="font-sans text-sm text-text/60 max-w-xl mx-auto leading-relaxed">
            En nuestra boda, los trajes y vestidos largos son el dresscode principal. 
            <br />
            ¡Prepárate para brillar!
        </p>
      </motion.div>
    </Section>
  );
};
