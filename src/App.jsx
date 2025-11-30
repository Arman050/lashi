import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Star, Instagram, Phone, MapPin } from 'lucide-react';

// Import des images depuis public/
import imgAvant from '/img.png';
import imgApres from '/img_1.png';
import logoImg from '/logo.png';
import lashExtImg from '/lashext.png';
import lashLiftImg from '/lashlift.png';
import lashBrowsImg from '/lashbrows.png';

// ============================================
// COMPOSANT: MagneticButton
// ============================================
const MagneticButton = ({ children, className = '', ...props }) => {
  const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============================================
// COMPOSANT: CTAButton (réutilisable pour tous les CTA)
// ============================================
const CTAButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-warm-gold to-hot-pink text-white',
    ghost: 'bg-white/50 backdrop-blur-sm text-matte-black border-2 border-warm-gold',
    solidDark: 'bg-matte-black text-white',
    icon: 'bg-white/10 text-matte-black',
  };

  const base = 'inline-flex items-center justify-center font-lora transition-shadow focus:outline-none focus:ring-4 focus:ring-warm-gold/20';

  return (
    <motion.button
      whileHover={{ scale: 1.06, boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============================================
// COMPOSANT: ComparisonSlider
// ============================================
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.8 };
  const animatedPosition = useSpring(sliderPosition, springConfig);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  React.useEffect(() => {
    animatedPosition.set(sliderPosition);
  }, [sliderPosition, animatedPosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl cursor-ew-resize select-none shadow-2xl bg-matte-black/5"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >{/* Image Avant - fond (toujours visible) */}
      <div className="absolute inset-0 z-0 bg-neutral-100">
        <img
          src={imgAvant}
          alt="Avant"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>

      {/* Overlay Après - sa largeur est animée par la valeur du slider */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 z-10 overflow-hidden"
        style={{ width: useTransform(animatedPosition, (pos) => `${pos}%`) }}
      >
        <img
          src={imgApres}
          alt="Après"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </motion.div>

      {/* Séparateur avec bouton */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white/60 shadow-2xl z-20"
        style={{
          left: useTransform(animatedPosition, (pos) => `${pos}%`),
          x: '-50%'
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-warm-gold to-hot-pink rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
        >
          <div className="flex gap-1.5">
            <motion.div
              className="w-0.5 h-5 bg-white rounded"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-0.5 h-5 bg-white rounded"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ============================================
// COMPOSANT: FloatingLights (Fond animé)
// ============================================
const FloatingLights = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-warm-gold/20 to-hot-pink/20 blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 150 - 75, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.2, 0.5, 0.3, 0.2],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// COMPOSANT: MorphingImage (Image avec forme changeante)
// ============================================
const MorphingImage = () => {
  const shapes = [
    '50% 50% 50% 50% / 50% 50% 50% 50%',
    '30% 70% 70% 30% / 40% 60% 40% 60%',
    '70% 30% 30% 70% / 60% 40% 60% 40%',
    '40% 60% 60% 40% / 50% 50% 50% 50%',
    '60% 40% 50% 50% / 50% 60% 40% 50%',
    '50% 50% 40% 60% / 60% 40% 50% 50%',
  ];

  const [currentShape, setCurrentShape] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full h-[500px] md:h-[600px] overflow-hidden shadow-2xl relative"
      animate={{ borderRadius: shapes[currentShape] }}
      transition={{
        duration: 3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <motion.img
        src={logoImg}
        alt="Extensions de cils luxueuses"
        className="w-full h-full object-cover"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-warm-gold/10 to-hot-pink/10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// ============================================
// COMPOSANT: BookingModal (réutilisable)
// ============================================
const BookingModal = ({ isOpen, onClose, defaultService = '' }) => {
  const nameRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && nameRef.current) nameRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log('Reservering verzonden:', Object.fromEntries(form.entries()));
    alert('Bedankt — uw reserveringsaanvraag is ontvangen. Wij nemen contact met u op.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 z-10" initial={{ y: 40, scale: 0.98 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} role="dialog" aria-modal="true">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-playfair text-xl">Reservering</h3>
          <button onClick={onClose} aria-label="Sluit venster" className="text-matte-black/60">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input ref={nameRef} name="name" required placeholder="Uw naam" className="w-full p-3 rounded-md border" />
          <input name="phone" required placeholder="Telefoon" className="w-full p-3 rounded-md border" />
          <select name="service" defaultValue={defaultService || 'Lash extensions'} className="w-full p-3 rounded-md border">
            <option>Natuurlijke Look</option>
            <option>Lash extensions</option>
            <option>Lash Lift</option>
            <option>Brows & Lashes</option>
          </select>
          <input name="date" type="date" className="w-full p-3 rounded-md border" />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Annuleren</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-warm-gold to-hot-pink text-white">Verzenden</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// COMPOSANT PRINCIPAL: App
// ============================================
function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBooking = (service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-rose-powder text-matte-black font-lora overflow-x-hidden">

      {/* ============================================
          NAVIGATION - Glassmorphism
          ============================================ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
            </motion.div>
            <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent">
              Lashi By Hasi
            </span>
          </motion.div>

          <div className="hidden md:flex gap-8 font-lora text-sm">
            <motion.a
              href="#services"
              whileHover={{ scale: 1.1, color: '#ff69b4' }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Diensten
            </motion.a>
            <motion.a
              href="#transformation"
              whileHover={{ scale: 1.1, color: '#ff69b4' }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Transformaties
            </motion.a>
            <motion.a
              href="#galerie"
              whileHover={{ scale: 1.1, color: '#ff69b4' }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Galerij
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1, color: '#ff69b4' }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </motion.a>
          </div>

          <MagneticButton onClick={() => openBooking()} className="bg-gradient-to-r from-warm-gold to-hot-pink text-white px-6 py-2 rounded-full font-lora text-sm hover:shadow-xl transition-shadow" aria-label="Reserveren">
            Reserveren
          </MagneticButton>
        </div>
      </motion.nav>

      {/* ============================================
          SECTION HERO - L'Art Absolu
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        <FloatingLights />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.h1
              className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              De{' '}
              <span className="bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent animate-gradient">
                Absolute
              </span>
              <br />
              Kunst van Schoonheid
            </motion.h1>

            <p className="text-lg md:text-xl text-matte-black/80 mb-8 leading-relaxed">
              Verfraai uw blik met onze op maat gemaakte wimperextensions.
              Elke blik verdient een vleugje <span className="font-semibold text-hot-pink">absolute luxe</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton variant="primary" className="px-8 py-4 rounded-full text-lg flex items-center justify-center gap-2 relative overflow-hidden" onClick={() => scrollTo('services')} aria-label="Ontdek onze Diensten">
                <Star size={20} fill="currentColor" />
                Ontdek onze Diensten
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
              </CTAButton>

              <CTAButton variant="ghost" className="px-8 py-4 rounded-full text-lg" onClick={() => scrollTo('galerie')} aria-label="Bekijk de Galerij">
                Bekijk de Galerij
              </CTAButton>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="font-playfair text-3xl font-bold text-warm-gold">50+</div>
                <div className="text-sm text-matte-black/70">Tevreden Klanten</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="font-playfair text-3xl font-bold text-hot-pink">2+</div>
                <div className="text-sm text-matte-black/70">Jaar Ervaring</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="font-playfair text-3xl font-bold text-warm-gold">100%</div>
                <div className="text-sm text-matte-black/70">Natuurlijk & Veilig</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Morphing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MorphingImage />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-warm-gold rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-warm-gold rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          SECTION TRANSFORMATION - Slider Avant/Après
          ============================================ */}
      <section id="transformation" className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Spectaculaire{' '}
              <span className="bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent">
                Transformaties
              </span>
            </h2>
            <p className="text-lg text-matte-black/70 max-w-2xl mx-auto">
              Ontdek de transformerende kracht van onze wimperextensions.
              Swipe om de magie te onthullen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <ComparisonSlider />
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION SERVICES - Collections
          ============================================ */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Onze{' '}
              <span className="bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent">
                Exclusieve
              </span>
              {' '}Collecties
            </h2>
            <p className="text-lg text-matte-black/70 max-w-2xl mx-auto">
              Elke techniek is een kunstwerk, aangepast aan uw unieke stijl.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte 1 - Naturel */}
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{
                 duration: 0.6,
                 delay: 0,
                 ease: [0.22, 1, 0.36, 1]
               }}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
               className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
             >
              <div className="h-64 overflow-hidden">
                <motion.img
                  src={lashBrowsImg}
                  alt="Look Naturel"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="p-6">
                <motion.h3
                  className="font-playfair text-2xl font-bold mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Brows & Lashes
                </motion.h3>
                <p className="text-matte-black/70 mb-4">
                  Delicate extensions die uw blik op natuurlijke wijze verfijnen zonder kunstmatigheid.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span className="font-playfair text-2xl font-bold text-warm-gold">120€</motion.span>
                  <CTAButton variant="solidDark" className="px-6 py-2 rounded-full text-sm" onClick={() => openBooking('Natuurlijke Look')}>Kiezen</CTAButton>
                  </div>
               </div>
             </motion.div>

            {/* Carte 2 - Volume Russe (Best Seller) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -15, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
               className="bg-gradient-to-br from-warm-gold/10 to-hot-pink/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-2 border-warm-gold hover:shadow-2xl transition-all relative"
            >
              <motion.div
                className="absolute top-4 right-4 bg-gradient-to-r from-warm-gold to-hot-pink text-white px-4 py-1 rounded-full text-sm font-bold z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(212, 175, 55, 0)',
                    '0 0 0 8px rgba(212, 175, 55, 0.2)',
                    '0 0 0 0 rgba(212, 175, 55, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⭐ Best Seller
              </motion.div>
              <div className="h-64 overflow-hidden">
                <motion.img
                  src={lashExtImg}
                  alt="Volume Russe"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="p-6">
                <motion.h3
                  className="font-playfair text-2xl font-bold mb-2 bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Lash extensions
                </motion.h3>
                <p className="text-matte-black/70 mb-4">
                  De premium techniek voor een intense en glamoureuze blik. Onze signature.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span className="font-playfair text-2xl font-bold bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent">180€</motion.span>
                  <CTAButton variant="primary" className="px-6 py-2 rounded-full text-sm" onClick={() => openBooking('Lash extensions')}>Kiezen</CTAButton>
                  </div>
               </div>
             </motion.div>

            {/* Carte 3 - Mega Volume */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
               className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
             >
              <div className="h-64 overflow-hidden">
                <motion.img
                  src={lashLiftImg}
                  alt="Mega Volume"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="p-6">
                <motion.h3
                  className="font-playfair text-2xl font-bold mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Lash Lift
                </motion.h3>
                <p className="text-matte-black/70 mb-4">
                  De ultieme ervaring voor een spectaculaire en onvergetelijke blik.
                </p>
                <div className="flex items-center justify-between">
                  <motion.span className="font-playfair text-2xl font-bold text-hot-pink">220€</motion.span>
                  <CTAButton variant="solidDark" className="px-6 py-2 rounded-full text-sm" style={{backgroundColor:'#111827'}} onClick={() => openBooking('Lash Lift')}>
                    Kiezen
                  </CTAButton>
                   </div>
               </div>
             </motion.div>
           </div>
         </div>
       </section>

      {/* ============================================
          SECTION GALERIE
          ============================================ */}
      <section id="galerie" className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Onze{' '}
              <span className="bg-gradient-to-r from-warm-gold to-hot-pink bg-clip-text text-transparent">
                Galerij
              </span>
            </h2>
            <p className="text-lg text-matte-black/70">
              Elke creatie vertelt een uniek verhaal
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              logoImg,
              lashExtImg,
              lashLiftImg,
              lashBrowsImg,
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5
                }}
                className="rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow relative group"
              >
                <motion.img
                  src={src}
                  alt={`Galerij ${index + 1}`}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer id="contact" className="bg-matte-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo et Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-playfair text-3xl font-bold text-warm-gold">
                  Lashi By Hasi
                </span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Uw luxe bestemming voor uitzonderlijke wimperextensions.
                Verfraai uw natuurlijke schoonheid met onze unieke expertise.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-warm-gold">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-hot-pink" />
                  <span>+32 445 45 45 45</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-hot-pink" />
                  <span>8600 Diksmuide</span>
                </div>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4 text-warm-gold">Volg ons</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/lashi_byhasi/">
                    <CTAButton variant="icon" className="p-3 rounded-full">
                        <Instagram size={24} />
                    </CTAButton>
                 </a>
               </div>

              <div className="mt-8">
                <h4 className="font-playfair text-lg mb-3">Openingstijden</h4>
                <div className="text-white/70 text-sm space-y-1">
                  <p>Ma - Vr: 9u - 19u</p>
                  <p>Za: 10u - 18u</p>
                  <p>Zo: Gesloten</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>© 2025 Lashi By Hasi. Alle rechten voorbehouden. Gemaakt met passie om uw schoonheid te verfijnen.</p>
          </div>
        </div>
      </footer>

      {/* Style pour l'animation du gradient */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* ============================================
          MODAL: BookingModal
          ============================================ */}
      {isBookingOpen && (
        <BookingModal isOpen={isBookingOpen} onClose={closeBooking} defaultService={selectedService} />
      )}
    </div>
  );
}

export default App;

