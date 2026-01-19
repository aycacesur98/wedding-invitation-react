import React from 'react';
import { MapPin, Calendar, Clock, Church, PartyPopper } from 'lucide-react';
import { Section } from './Section';

interface EventDetails {
  title: string;
  location: string;
  address: string;
  city: string;
  date: string;
  time: string;
  googleMapsUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    start: string;
    end: string;
  };
  icon: React.ReactNode;
}

export const Venue: React.FC = () => {
  const events: EventDetails[] = [
    {
      title: 'Ceremonia',
      location: 'Parroquia Nuestra Señora de la Candelaria',
      address: 'Pie de la Popa',
      city: 'Cartagena de Indias, Bolívar',
      date: '28 de marzo de 2026',
      time: '03:30 pm',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parroquia+Nuestra+Se%C3%B1ora+de+la+Candelaria+Pie+de+la+Popa+Cartagena',
      calendarEvent: {
        title: 'Boda Karla & Juan - Ceremonia',
        description: 'Ceremonia religiosa',
        location: 'Parroquia Nuestra Señora de la Candelaria, Pie de la Popa, Cartagena',
        start: '20260328T153000',
        end: '20260328T170000',
      },
      icon: <Church className="text-primary w-8 h-8" />,
    },
    {
      title: 'Celebración',
      location: 'Casa Del Marqués De Premio Real',
      address: 'Cra. 5 #30 49, El Centro',
      city: 'Cartagena de Indias, Bolívar',
      date: '28 de marzo de 2026',
      time: '06:00 pm',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Del+Marqu%C3%A9s+De+Premio+Real+Cartagena',
      calendarEvent: {
        title: 'Boda Karla & Juan - Celebración',
        description: 'Recepción y fiesta',
        location: 'Casa Del Marqués De Premio Real, Cartagena',
        start: '20260328T180000',
        end: '20260329T020000',
      },
      icon: <PartyPopper className="text-primary w-8 h-8" />,
    },
  ];

  const getGoogleCalendarUrl = (event: EventDetails['calendarEvent']) => {
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
      <h2 className="font-script text-4xl text-text mb-2">El lugar</h2>
      <p className="font-sans text-text/60 mb-8 uppercase tracking-widest text-xs">Dónde celebrar este momento especial</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-primary/20 flex flex-col h-full">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary p-4 rounded-full">
                {event.icon}
              </div>
            </div>
            
            <h3 className="font-serif text-2xl text-text mb-2">{event.title}</h3>
            
            <div className="mb-4">
              <p className="font-semibold text-text/90">{event.location}</p>
              <p className="font-sans text-text/70 text-sm">{event.address}</p>
              <p className="font-sans text-text/70 text-sm">{event.city}</p>
            </div>
            
            <div className="flex justify-center gap-4 my-4 text-sm text-text/80">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-accent" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-accent" />
                <span>{event.time}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
              <a 
                href={event.googleMapsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-6 py-2 bg-primary text-white font-sans text-sm rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin size={16} />
                Cómo llegar
              </a>
              <a 
                href={getGoogleCalendarUrl(event.calendarEvent)}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-6 py-2 border border-primary text-primary font-sans text-sm rounded-full hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Añadir al calendario
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
