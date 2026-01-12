import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Section } from './Section';

export const Venue: React.FC = () => {
  const event = {
    title: 'Boda de Karla & Juan',
    location: 'Casa Real Del Márquez, Cartagena de Indias',
    description: '¡Nos casamos! Esperamos contar con tu presencia.',
    start: '20260328T153000',
    end: '20260329T020000',
  };

  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${event.start}/${event.end}`,
      details: event.description,
      location: event.location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <Section id="venue" className="text-center" withPattern>
      <h2 className="font-script text-4xl text-primary mb-2">El lugar</h2>
      <p className="font-sans text-text/60 mb-8 uppercase tracking-widest text-xs">Dónde celebrar este momento especial</p>
      
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto border border-primary/20">
        <div className="flex justify-center mb-4">
          <div className="bg-secondary p-4 rounded-full">
            <MapPin className="text-primary w-8 h-8" />
          </div>
        </div>
        
        <h3 className="font-serif text-2xl text-text mb-2">Casa Real Del Márquez</h3>
        <p className="font-sans text-text/70 mb-1">Cra. 4a #36-08, El Centro</p>
        <p className="font-sans text-text/70 mb-1">Cartagena de Indias, Bolívar</p>
        
        <div className="flex justify-center gap-4 my-6 text-sm text-text/80">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-accent" />
            <span>28 de marzo de 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-accent" />
            <span>03:30 pm</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <a 
            href="https://maps.app.goo.gl/cNqBoZDj2wwPe4Dc8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-white font-sans text-sm rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin size={16} />
            Cómo llegar
          </a>
          <a 
            href={getGoogleCalendarUrl()}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2 border border-primary text-primary font-sans text-sm rounded-full hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Añadir al calendario
          </a>
        </div>
      </div>
      
      {/* Optional Embedded Map */}
      <div className="mt-8 rounded-lg overflow-hidden shadow-sm border border-gray-200 h-64 max-w-md mx-auto">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }} 
          src="https://maps.google.com/maps?q=Casa+Real+Del+Márquez+Cartagena&t=&z=17&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          title="Map"
        ></iframe>
      </div>
    </Section>
  );
};
