import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Section } from './Section';
import { motion } from 'framer-motion';

export const Venue: React.FC = () => {
  // Mia464 Google Maps Navigasyon Linki
  const googleMapsUrl = 'https://maps.app.goo.gl/3f8H7UeHpxQp3gW37'; 

  // Google Takvim Etkinlik Bilgileri (22 Ağustos 2026 - 18:30)
  const calendarEvent = {
    title: 'Ayça & Çağkan Düğün Daveti',
    description: 'Mutlu günümüzde yanımızda olmanızdan mutluluk duyarız.',
    location: 'Mia464, Polonezköy, Beykoz/İstanbul',
    start: '20260822T183000',
    end: '20260823T000000',
  };

  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: calendarEvent.title,
      dates: `${calendarEvent.start}/${calendarEvent.end}`,
      details: calendarEvent.description,
      location: calendarEvent.location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <Section id="venue" className="py-16" withPattern>
      <div className="text-center mb-10">
        <h2 className="font-script text-4xl md:text-5xl text-text mb-2">Lokasyon</h2>
        <p className="font-sans text-text/60 uppercase tracking-widest text-xs">Düğünümüzün Gerçekleşeceği Özel Mekan</p>
      </div>

      {/* İkiye Bölünen Şık Tasarım Kutusu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-primary/10 overflow-hidden">
        
        {/* SOL TARAF: Bilgiler ve Butonlar */}
        <div className="p-6 md:p-12 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <h3 className="font-serif text-3xl text-text mb-2 font-normal">Mia464</h3>
          <p className="font-sans text-primary font-medium text-sm md:text-base mb-6 tracking-wide">Polonezköy / İstanbul</p>
          
          {/* Adres Bilgisi */}
          <div className="mb-6 border-b border-neutral-100 pb-4 text-text/70 text-sm font-sans leading-relaxed">
            <p className="font-semibold text-text">Açık Adres:</p>
            <p>Polonezköy, Polonez Cd. No:64, Beykoz / İstanbul</p>
          </div>

          {/* Tarih ve Saat Bilgileri */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8 text-sm text-text/80 font-sans">
            <div className="flex items-center justify-center md:justify-start gap-2 bg-secondary/40 px-4 py-2 rounded-full">
              <Calendar size={16} className="text-primary" />
              <span className="font-medium">22 Ağustos 2026</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 bg-secondary/40 px-4 py-2 rounded-full">
              <Clock size={16} className="text-primary" />
              <span className="font-medium">18:30</span>
            </div>
          </div>

          {/* İnteraktif Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-primary text-white font-sans text-sm font-medium rounded-full hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              <span>Yol Tarifi Al</span>
            </a>
            <a 
              href={getGoogleCalendarUrl()}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 border border-primary text-primary font-sans text-sm font-medium rounded-full hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Takvime Ekle</span>
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: Mekan Fotoğrafı ve Harita Detayı */}
        <div className="relative h-64 md:h-auto min-h-[320px] bg-neutral-100 overflow-hidden order-1 md:order-2">
          <img 
            src="/mekan.jpg" 
            alt="Mia464 Polonezköy" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fotoğraf henüz yüklenmediyse kırık görünmesin, şık krem bir zemin dursun diye önlem
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fotoğrafın üzerine binen şık transparan harita butonu karartısı */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 bg-white/90 backdrop-blur-sm text-text font-sans text-xs font-semibold rounded-full shadow-lg hover:bg-white transition-all flex items-center gap-1.5 transform hover:scale-105"
            >
              <MapPin size={14} className="text-primary" />
              Google Maps'te Göster
            </a>
          </div>
        </div>

      </div>
    </Section>
  );
};
