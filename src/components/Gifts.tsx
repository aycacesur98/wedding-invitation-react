import React, { useState } from 'react';
import { Section } from './Section';
import { Gift, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Gifts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const iban = "ES00 0000 0000 00 0000000000";

  const handleCopy = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="gifts" className="text-center">
      <div className="flex justify-center mb-4">
        <Gift className="text-primary w-8 h-8" />
      </div>
      
      <h2 className="font-script text-4xl text-primary mb-2">Regalos</h2>
      <p className="font-sans text-text/60 mb-6 uppercase tracking-widest text-xs">Lo más importante es que esten presentes</p>
      
      <p className="font-serif text-lg text-text max-w-xl mx-auto mb-8">
        Si desean hacernos un regalo, les dejamos nuestra cuenta para contribuir a nuestra luna de miel o lo que más deseen.
      </p>
      
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white border border-primary/20 rounded-lg shadow-sm hover:bg-primary/5 transition-colors"
        >
          <span className="font-sans font-medium text-text">Hacer un regalo</span>
          {isOpen ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-primary" />}
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white p-6 rounded-lg border border-primary/20 shadow-inner">
                <p className="font-sans text-xs text-text/60 mb-2 uppercase tracking-wider">IBAN / Cuenta</p>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded border border-primary/10">
                  <code className="font-mono text-text text-sm sm:text-base">{iban}</code>
                  <button 
                    onClick={handleCopy}
                    className="ml-4 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                    title="Copiar IBAN"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="mt-4 text-xs text-text/50">
                  ¡Muchas gracias!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};
