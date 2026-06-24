import React from 'react';

function Categories({ setCurrentPage, setSelectedCategory }) {
  // Hardcoded list of garments your mother tailors
  const items = [
    { id: 'blouse', name: 'Designer Blouse', description: 'Choli cut, Katori, High-neck, and traditional styles.' },
    { id: 'salwar-suit', name: 'Salwar Suit', description: 'Anarkali, Punjabi suits, Straight-cut palazzos.' },
    { id: 'kurti', name: 'Custom Kurti', description: 'A-line, straight kurtis, and casual everyday tunics.' },
    { id: 'lehenga', name: 'Lehenga Choli', description: 'Custom wedding, party, and festive bridal wear.' }
  ];

  const handleSelect = (categoryId) => {
    console.log("Category clicked:", categoryId);
    setSelectedCategory(categoryId); // Save what they want to stitch
    setCurrentPage('gallery');       // Push them forward to the design gallery page
  };

  return (
    <div style={{ 
      width: '100%', 
      fontFamily: 'sans-serif', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 20px'
    }}>

      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Navigation Row */}
        <button 
          onClick={() => setCurrentPage('home')} 
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff', // Changed to your signature pink so it's visible on light backgrounds
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '0'
          }}
        >
          ❮ Back to Home
        </button>

        <h1 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold', margin: '10 0 20px 0', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Select a Garment Category
          </h1>
        <p style={{ textAlign: 'center', color: '#ffffff', margin: '0 0 30px 0', fontSize: '1.05rem', fontWeight: '500' }}>
          What would you like us to custom-stitch for you?
        </p>

        {/* Grid of Categories */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => handleSelect(item.id)}
              style={{
                padding: '25px',
                backgroundColor: '#ffffff', // Gives the cards a clean white base elevated off the off-white page background
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#c2185b';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(194, 24, 91, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{ color: '#c2185b', marginTop: '0', marginBottom: '10px', fontSize: '1.3rem' }}>
                {item.name}
              </h3>
              <p style={{ color: '#555555', fontSize: '0.95rem', margin: '0', lineHeight: '1.4' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;