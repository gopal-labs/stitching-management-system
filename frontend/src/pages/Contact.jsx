import React from 'react';
import shopPhoto from '../assets/image.png';

function Contact({ setCurrentPage }) {
  // Replace these with your actual shop coordinates or Google Maps link
  const googleMapsUrl = "https://maps.app.goo.gl/BkvkaED9jzXwgXc3A";

  return (
    <div style={{ 
      width: '100%', 
      // minHeight: '100vh',
      // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${shopPhoto})`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // backgroundAttachment: 'fixed', 
      fontFamily: 'sans-serif', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '50px 20px'
    }}>
      
      <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}
        >
          ❮ Back to Home
        </button>

        {/* Header Section */}
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold', margin: '0 0 20px 0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Contact Our Boutique
          </h1>
          <p style={{ fontStyle: 'italic', color: '#f3e5f5', fontSize: '1.2rem', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Serving generations with premium custom fitting since 2000.
          </p>
        </header>

        {/* Info Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          width: '100%',
          marginBottom: '40px'
        }}>
          
          {/* Card 1: Reach Us Directly */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            boxSizing: 'border-box'
          }}>
            <h2 style={{ color: '#c2185b', margin: '0 0 20px 0', fontSize: '1.5rem', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>
              📞 Get In Touch
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <strong style={{ color: '#08060d', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp</strong>
                <a href="tel:+91 9079662011" style={{ color: '#c2185b', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '600' }}>
                  +91 98765-43210
                </a>
              </div>

              <div>
                <strong style={{ color: '#08060d', display: 'block', marginBottom: '4px' }}>Email Address</strong>
                <a href="mailto:sitajakhar85@gmail.com" style={{ color: '#c2185b', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '600' }}>
                  sitajakhar85@gmail.com
                </a>
              </div>

              <div>
                <strong style={{ color: '#08060d', display: 'block', marginBottom: '4px' }}>Boutique Timings</strong>
                <p style={{ margin: '0', color: '#4a4352', fontSize: '1rem', lineHeight: '1.4' }}>
                  Monday - Saturday: 10:00 AM - 8:30 PM <br />
                  <span style={{ color: '#c62828', fontWeight: '500' }}>Sunday: Closed (By Prior Appointment Only)</span>
                </p>
              </div>
            </div>
          </div>
        

          {/* Card 2: Location & Map Link */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ color: '#c2185b', margin: '0 0 20px 0', fontSize: '1.5rem', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>
                 Visit Our Workshop
              </h2>
              
              <strong style={{ color: '#08060d', display: 'block', marginBottom: '8px' }}>Store Address</strong>
              <p style={{ margin: '0 0 20px 0', color: '#4a4352', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Ladies Tailor Boutique,<br />
                Sureshiya Coloney, Hanumangarh Junction <br />
                Rajasthan, India
              </p>

              <p style={{ fontStyle: 'italic', color: '#6a1b9a', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
                 Landmark: Near Hanuman Mandir 
              </p>
            </div>

            {/* Direct Open in Google Maps Call To Action Button */}
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 20px',
                backgroundColor: '#c2185b',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(194, 24, 91, 0.3)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ad1457'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#c2185b'}
            >
               Open in Google Maps
            </a>
          </div>

        </div>

        {/* Heritage Trust Banner */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'rgba(243, 229, 245, 0.95)',
          borderRadius: '12px',
          color: '#4a148c',
          fontWeight: '500',
          fontSize: '1.05rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          ✨ Celebrating <strong>26 Years</strong> of crafting perfect alignments and custom heritage wear.
        </div>

      </div>

      {/* Embedded Simple Footer styling */}
      <footer style={{ textAlign: 'center', marginTop: '30px' }}>
        <p style={{ color: '#e5e4e7', fontSize: '0.85rem', margin: '0', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
          © {new Date().getFullYear()} Ladies Tailor Boutique. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default Contact;