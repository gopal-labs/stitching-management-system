import React, { useState } from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const getNavLinkStyle = (pageName, alignmentGroup) => {
    const isActive = alignmentGroup.includes(currentPage);
    const isHovered = hoveredItem === pageName;

    return {
      background: 'none',
      border: 'none',
      fontSize: '0.95rem',
      // If active -> pink. If hovered -> dark pink/black. Otherwise -> gray.
      color: isActive ? '#c2185b' : isHovered ? '#08060d' : '#6b6375',
      fontWeight: isActive ? 'bold' : 'normal',
      cursor: 'pointer',
      padding: '5px 10px',
      transition: 'color 0.2s ease', // Makes color transition smooth
    };
  };
  
  
    return (
    <nav style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e4e7',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      {/* Brand Logo / Name */}
      <div 
        onClick={() => setCurrentPage('home')} 
        style={{ 
          fontSize: '1.3rem', 
          fontWeight: 'bold', 
          color: '#c2185b', 
          cursor: 'pointer',
          fontFamily: 'var(--sans)'
        }}
      >
        🧵 Ladies Tailor Boutique
      </div>

      {/* Navigation Link Options */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            backgroundColor: currentPage === 'home' ? '#c2185b' : '#f4f3ec',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: currentPage === 'home' ? 'white' : '#08060d',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'all 0.2s'
          }}
        >
          Home
        </button>

        <button 
          onClick={() => setCurrentPage('categories')}
          style={{
            backgroundColor: currentPage === 'categories' ? '#c2185b' : '#f4f3ec',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: currentPage === 'categories' ? 'white' : '#08060d',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'all 0.2s'
          }}
        >
          Order & Categories
        </button>

        <button 
          onClick={() => setCurrentPage('appointment')}
          style={{
            backgroundColor: currentPage === 'appointment' ? '#c2185b' : '#f4f3ec',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: currentPage === 'appointment' ? 'white' : '#08060d',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'all 0.2s'
          }}
        >
          Book Appointment
        </button>

        <button 
          onClick={() => setCurrentPage('dashboard')}
          style={{
            backgroundColor: currentPage === 'dashboard' ? '#c2185b' : '#f4f3ec',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: currentPage === 'dashboard' ? 'white' : '#08060d',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'all 0.2s'
          }}
        >
          Admin Dashboard
        </button>

          <button onClick={() => setCurrentPage('contact')} style={{ 
            backgroundColor: currentPage === 'contact' ? '#c2185b' : '#f4f3ec',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: currentPage === 'contact' ? 'white' : '#000000',
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'all 0.2s'
           }}>
          Contact Us
          </button>


      </div>
    </nav>
    
  );
}

export default Navbar;