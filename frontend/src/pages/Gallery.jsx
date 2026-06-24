import React from 'react';

function Gallery({ setCurrentPage, selectedCategory, setSelectedDesignId }) {
  
  // A master layout data array of designs. You can add more designs easily here.
  
  console.log("The category passed to Gallery is:", selectedCategory);
  const designDatabase = {
    'blouse': [
      { id: 'b1', name: 'Backless V-Neck', price: '₹450', imageText: '📐 Deep Cut Design' },
      { id: 'b2', name: 'Princess Cut Seam', price: '₹600', imageText: '📐 Premium Fitting' },
      { id: 'b3', name: 'High Neck Boat Cut', price: '₹500', imageText: '📐 Elegant Style' }
    ],
    'salwar-suit': [
      { id: 's1', name: 'Anarkali Flair Suit', price: '₹1200', imageText: '👗 Full Flare Design' },
      { id: 's2', name: 'Straight Palazzo Suit', price: '₹850', imageText: '👗 Modern Daily Wear' },
      { id: 's3', name: 'Patiala Shahi Punjabi', price: '₹950', imageText: '👗 Traditional Pleats' }
    ],
    'kurti': [
      { id: 'k1', name: 'A-Line Casual Kurti', price: '₹350', imageText: '👚 Simple Daily cut' },
      { id: 'k2', name: 'Front Slit Modern Kurti', price: '₹450', imageText: '👚 Indo-Western Look' }
    ],
    'lehenga': [
      { id: 'l1', name: 'Bridal Heavy Lehenga', price: '₹4500', imageText: '👑 Premium Wedding Work' }
    ]
  };

  // Safely grab designs matching our category, or default to an empty list if none match
  const activeDesigns = designDatabase[selectedCategory] || [];

  const handleSelectDesign = (designId) => {
    setSelectedDesignId(designId); // Keep track of their design asset layout
    setCurrentPage('measurementForm'); // Send them to fill out measurements next
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Navigation */}
      <button onClick={() => setCurrentPage('categories')} style={{
            background: 'none',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}>
        ❮ Back to Categories
      </button>

      <h2 style={{ color: '#c2185b', textAlign: 'center', textTransform: 'capitalize' }}>
        {selectedCategory.replace('-', ' ')} Catalog & Pricing
      </h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Pick your favorite tailoring style pattern below:</p>

      {/* Loop and Display Active Style Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center', marginTop: '30px' }}>
        {activeDesigns.map(design => (
          <div 
            key={design.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '240px',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            {/* Visual Box Placeholder */}
            <div style={{ 
              height: '160px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#888',
              marginBottom: '15px',
              border: '1px dashed #ccc'
            }}>
              {design.imageText}
            </div>

            <h4 style={{ margin: '10px 0 5px 0', color: '#333' }}>{design.name}</h4>
            <p style={{ fontWeight: 'bold', color: '#2e7d32', margin: '0 0 15px 0' }}>Stitching Cost: {design.price}</p>
            
            <button 
              onClick={() => handleSelectDesign(design.id)}
              style={{
                backgroundColor: '#c2185b',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              Select This Style
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Gallery;