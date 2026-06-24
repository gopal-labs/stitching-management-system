import React, { useState, useEffect } from 'react';
import shopPhoto from '../assets/image.png';

import lehengaImg from '../assets/lehenga.jpg'; 
import blouseImg from '../assets/Blouse.jpg';
import anarkaliImg from '../assets/anarkali.jpg';
import kurtiImg from '../assets/kurti.jpg';

function Home({ setCurrentPage }) {
  const [shopStatus, setShopStatus] = useState({ isAcceptingOrders: true, message: "Loading status..." });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track direction and key triggers for forcing element animation re-renders
  const [direction, setDirection] = useState('forward'); 
  const [animKey, setAnimKey] = useState(0);

  const designSamples = [
    { id: 1, title: "Premium Bridal Lehenga", desc: "Heavy zari work and custom borders", color: "rgba(252, 228, 236, 0.95)", imageSource: lehengaImg },
    { id: 2, title: "Designer Katori Blouse", desc: "Perfect bridal fitting with deep neck cut", color: "rgba(243, 229, 245, 0.95)", imageSource: blouseImg },
    { id: 3, title: "Anarkali Suit Set", desc: "Full flare traditional festive wear", color: "rgba(232, 245, 233, 0.95)", imageSource: anarkaliImg },
    { id: 4, title: "Modern Front-Slit Kurti", desc: "Indo-western casual daily wear style", color: "rgba(225, 245, 254, 0.95)", imageSource: kurtiImg }
  ];

  const handleNext = () => {
    setDirection('forward');
    setAnimKey(prev => prev + 1);
    setCurrentSlide((prev) => (prev + 1) % designSamples.length);
  };

  const handlePrev = () => {
    setDirection('backward');
    setAnimKey(prev => prev + 1);
    setCurrentSlide((prev) => (prev - 1 + designSamples.length) % designSamples.length);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then(res => res.json())
      .then(data => setShopStatus(data))
      .catch(err => {
        console.error("Error fetching shop status:", err);
        setShopStatus({ isAcceptingOrders: true, message: "Welcome to our traditional tailoring shop!" });
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 4500);
    return () => clearInterval(timer);
  }, [designSamples.length]);

  const prevIndex = (currentSlide - 1 + designSamples.length) % designSamples.length;
  const nextIndex = (currentSlide + 1) % designSamples.length;

  const getAnimationClass = () => {
    return direction === 'forward' ? 'slideLeft' : 'slideRight';
  };

  const imageStyles = {
    height: '140px',
    width: '140px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
  };

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${shopPhoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', 
      fontFamily: 'sans-serif', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '50px 20px'
    }}>
      
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(30px) scale(0.95); opacity: 0.5; }
          100% { transform: translateX(0) scale(1.1); opacity: 1; }
        }
        @keyframes slideRight {
          0% { transform: translateX(-30px) scale(0.95); opacity: 0.5; }
          100% { transform: translateX(0) scale(1.1); opacity: 1; }
        }
        .animate-icon {
          animation: ${getAnimationClass()} 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: '35px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold', margin: '0 0 10px 0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Ladies Tailor Boutique
          </h1>
          <p style={{ fontStyle: 'italic', color: '#e5e4e7', fontSize: '1.2rem', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            "Stitching your imagination into beautiful reality."
          </p>
        </header>

        {/* Operational Banner */}
        <div style={{
          padding: '14px',
          margin: '0 auto 45px auto',
          maxWidth: '600px',
          borderRadius: '8px',
          fontWeight: 'bold',
          backgroundColor: shopStatus.isAcceptingOrders ? 'rgba(232, 245, 233, 0.95)' : 'rgba(255, 235, 238, 0.95)',
          color: shopStatus.isAcceptingOrders ? '#2e7d32' : '#c62828',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          {shopStatus.isAcceptingOrders 
            ? `${shopStatus.message || 'We are currently accepting new custom stitching orders!'}`
            : `${shopStatus.message || 'Shop capacity is currently full. Accepting physical measurement appointments only.'}`
          }
        </div>

        {/* Creations Slider */}
        {/* Creations Slider */}
{/* Creations Slider */}
<section style={{ marginBottom: '50px', width: '100%' }}>
  <h3 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>✨ Our Latest Creations</h3>
  
  <div style={{
    width: '100%',
    height: '320px',
    borderRadius: '16px',
    backgroundColor: designSamples[currentSlide].color,
    position: 'relative', // Keeps absolute child elements contained within this box
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    transition: 'background-color 0.6s ease-in-out',
    border: '1px solid rgba(255,255,255,0.25)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Keeps the icon track centered perfectly in the remaining space
    alignItems: 'center',
    overflow: 'hidden',
    padding: '20px'
  }}>

    {/* LEFT NAVIGATION ARROW */}
    <button 
      onClick={handlePrev}
      style={{
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0, 0, 0, 0.08)',
        color: '#08060d',
        border: 'none',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        fontSize: '1.6rem',
        cursor: 'pointer',
        zIndex: '10',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.18)'}
      onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.08)'}
    >
      ❮
    </button>

    {/* CENTERED GALLERY ICONS QUEUE */}
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '60px',
      width: '85%',
      transform: 'translateY(-20px)', // Slightly nudges icons up to balance out the bottom text space
      userSelect: 'none'
    }}>
      {/* Previous Ghost Preview Image */}
              <img 
                src={designSamples[prevIndex].imageSource} 
                alt="Previous preview"
                onClick={handlePrev}
                style={{ 
                  ...imageStyles,
                  opacity: 0.35, 
                  filter: 'blur(0.8px) grayscale(20%)', 
                  cursor: 'pointer', 
                  transform: 'scale(0.85)'
                }}
              />

              {/* Central Primary Animated Image */}
              <div 
                key={animKey} 
                className="animate-icon"
                style={{ display: 'inline-block' }}
              >
                <img 
                  src={designSamples[currentSlide].imageSource} 
                  alt={designSamples[currentSlide].title}
                  style={{
                    ...imageStyles,
                    height: '160px', // Main view stands out visually larger
                    width: '160px',
                    border: '3px solid #ffffff'
                  }}
                />
              </div>

              {/* Next Ghost Preview Image */}
              <img 
                src={designSamples[nextIndex].imageSource} 
                alt="Next preview"
                onClick={handleNext}
                style={{ 
                  ...imageStyles,
                  opacity: 0.35, 
                  filter: 'blur(0.8px) grayscale(20%)', 
                  cursor: 'pointer', 
                  transform: 'scale(0.85)'
                }}
              />
            </div>
    {/* ==================================================== */}
    {/* TEXT DETAILS POSITIONED SECURELY AT THE BOTTOM AREA   */}
    {/* ==================================================== */}
    <div style={{
      position: 'absolute',
      bottom: '25px', // Places it directly where the tracking bar used to sit
      left: '0',
      right: '0',
      textAlign: 'center',
      padding: '0 60px', // Prevents text from colliding with the side navigation arrows
      pointerEvents: 'none' // Ensures clicks seamlessly pass through back to the container if needed
    }}>
      <h2 style={{ margin: '0 0 4px 0', color: '#08060d', fontSize: '1.8rem', fontWeight: 'bold' }}>
        {designSamples[currentSlide].title}
      </h2>
      
      <p style={{ color: '#4a4352', fontSize: '1.02rem', margin: '0', fontWeight: '500' }}>
        {designSamples[currentSlide].desc}
      </p>
    </div>

    {/* RIGHT NAVIGATION ARROW */}
    <button 
      onClick={handleNext}
      style={{
        position: 'absolute',
        right: '25px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0, 0, 0, 0.08)',
        color: '#08060d',
        border: 'none',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        fontSize: '1.6rem',
        cursor: 'pointer',
        zIndex: '10',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.18)'}
      onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.08)'}
    >
      ❯
    </button>

  </div>
</section>
        {/* Action Triggers */}
        <main style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#ffffff', marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>What would you like to do today?</h3>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            <button 
              onClick={() => setCurrentPage('categories')}
              disabled={!shopStatus.isAcceptingOrders}
              style={{
                padding: '16px 28px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: shopStatus.isAcceptingOrders ? '#c2185b' : '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                cursor: shopStatus.isAcceptingOrders ? 'pointer' : 'not-allowed'
              }}
            >
              Browse Clothes & Stitch 🧵
            </button>

            <button 
              onClick={() => setCurrentPage('appointment')}
              style={{
                padding: '16px 28px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#c2185b',
                border: '2px solid #ffffff',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            >
              Book Free Measurement Appointment 🗓️
            </button>

          </div>
        </main>
      </div>

      {/* Admin Panel & Info Footer */}
<footer style={{ 
  textAlign: 'center', 
  marginTop: '20px', 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '12px', 
  alignItems: 'center' 
}}>
  
  {/* NEW CONTACT US LINK */}
  <button 
    onClick={() => setCurrentPage('contact')} 
    style={{ 
      background: 'none', 
      border: 'none', 
      color: '#ffffff', 
      cursor: 'pointer', 
      fontSize: '1.05rem', 
      fontWeight: '600',
      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
      textDecoration: 'underline',
      transition: 'color 0.2s'
    }}
    onMouseEnter={(e) => e.target.style.color = '#fce4ec'}
    onMouseLeave={(e) => e.target.style.color = '#ffffff'}
  >
    📞Contact Us & View Location
  </button>

  {/* Existing Admin Link */}
  <button 
    onClick={() => setCurrentPage('dashboard')} 
    style={{ 
      background: 'none', 
      border: 'none', 
      color: '#e5e4e7', 
      cursor: 'pointer', 
      fontSize: '0.85rem', 
      opacity: 0.7,
      textShadow: '0 1px 2px rgba(0,0,0,0.6)' 
    }}
  >
    ⚙️ Shop Management Login Panel
  </button>
</footer>

    </div>
  );
}

export default Home;