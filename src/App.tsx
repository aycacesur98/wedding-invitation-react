import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Envelope } from './components/Envelope';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Venue } from './components/Venue';
import { Timeline } from './components/Timeline';
import { DressCode } from './components/DressCode';
import { Gifts } from './components/Gifts';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

// URL'den gelen slug'ı alıp içeriği gösteren ana taşıyıcı
const InvitationWrapper = () => {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <>
      <AudioPlayer />
      <Envelope onOpen={() => setContentVisible(true)} />
      
      {contentVisible && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Hero />
          <Countdown />
          <Venue />
          <Timeline />
          <DressCode />
          <Gifts />
          <RSVPForm />
          <Footer />
        </motion.main>
      )}
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-secondary overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          {/* Hem ana sayfa hem de /davetli/:slug rotaları aynı bileşeni kullanır */}
          <Route path="/" element={<InvitationWrapper />} />
          <Route path="/davetli/:slug" element={<InvitationWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
