import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';

// Mia 464 Fotoğrafları
const VENUE_PHOTOS = [
  '/Mia_01.jpg',
  '/Mia_02.jpg',
  '/Mia_03.jpg',
  '/Mia_04.jpg'
];

export const Venue: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // YENİ: SIFIR KASILMA İÇİN PRELOAD (Önceden Yükleme) MOTORU
  // Sayfa açıldığı an tüm fotoğrafları arka planda sessizce indirip hafızaya alır
  useEffect(() => {
    VENUE_PHOTOS.forEach((photoSrc) => {
      const img = new Image();
      img.src = photoSrc;
    });
  }, []);

  // Mia464 Google Maps Navigasyon Linki
  const googleMapsUrl = 'https://maps.google.com/?q=Mia464+Polonezk%C3%B6y'; 

  // Google Takvim Etkinlik Bilgileri (22 Ağustos 2026 - 18:30)
  const calendarEvent = {
    title: 'Ayça & Çağkan Düğün Daveti',
    description: 'Mutlu günümüzde yanımızda olmanızdan mutluluk duyarız.',
    location: 'Mia 464, Polonezköy, Beykoz/İstanbul',
    start: '20260822T183000',
    end: '20260823T000000',
  };

  // 5 saniyede bir otomatik slayt geçişi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev === VENUE_PHOTOS.length - 1 ? 0 : prev + 1));
    }, 5000); // 5000ms = 5 saniye
    return () => clearInterval(timer);
  }, [currentPhotoIndex]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === VENUE_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? VENUE_PHOTOS.length - 1 : prev - 1));
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
        <p className="font-sans text-text/60 tracking-widest text-[11px] md:text-xs">
          
        </p>
      </div>

      {/* İkiye Bölünen Şık Tasarım Kutusu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-primary/10 overflow-hidden">
        
        {/* SOL TARAF: Bilgiler ve Butonlar */}
        <div className="p-6 md:p-12 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <h3 className="font-serif text-3xl text-text mb-2 font-normal">Mia 464</h3>
          <p className="font-sans text-[#4C6444] font-medium text-sm md:text-base mb-6 tracking-wide">Polonezköy / İstanbul</p>
          
          {/* Adres Bilgisi */}
          <div className="mb-6 border-b border-neutral-100 pb-4 text-text/70 text-sm font-sans leading-relaxed">
            <p className="font-semibold text-text">Açık Adres:</p>
            <p>Polonezköy, Polonez Cd. No:64, Beykoz / İstanbul</p>
          </div>

          {/* Tarih ve Saat Bilgileri */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8 text-sm text-text/80 font-sans">
            <div className="flex items-center justify-center md:justify-start gap-2 bg-secondary/40 px-4 py-2 rounded-full">
              <Calendar size={16} className="text-[#4C6444]" />
              <span className="font-medium">22 Ağustos 2026</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 bg-secondary/40 px-4 py-2 rounded-full">
              <Clock size={16} className="text-[#4C6444]" />
              <span className="font-medium">18:30</span>
            </div>
          </div>

          {/* İnteraktif Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-[#4C6444] text-white font-sans text-sm font-medium rounded-full hover:bg-[#4C6444]/90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              <span>Yol Tarifi Al</span>
            </a>
            <a 
              href={getGoogleCalendarUrl()}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 border border-[#4C6444] text-[#4C6444] font-sans text-sm font-medium rounded-full hover:bg-[#4C6444]/5 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Takvime Ekle</span>
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: DİNAMİK FOTOĞRAF GALERİSİ (CAROUSEL) */}
        <div className="relative h-72 md:h-auto min-h-[350px] bg-neutral-100 overflow-hidden order-1 md:order-2 group">
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhotoIndex}
              src={VENUE_PHOTOS[currentPhotoIndex]}
              alt={`Mia 464 - ${currentPhotoIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </AnimatePresence>

          {/* Carousel Kontrol Okları */}
          <button 
            onClick={prevPhoto} 
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextPhoto} 
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Alt Noktalar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {VENUE_PHOTOS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentPhotoIndex === index 
                    ? 'bg-white w-4 shadow-sm' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Harita Butonu Karartısı */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6 pointer-events-none">
            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 bg-white/90 backdrop-blur-sm text-text font-sans text-xs font-semibold rounded-full shadow-lg hover:bg-white transition-all flex items-center gap-1.5 transform hover:scale-105 pointer-events-auto"
            >
              <MapPin size={14} className="text-[#4C6444]" />
              Google Maps'te Göster
            </a>
          </div>
        </div>

      </div>
    </Section>
  );
};
