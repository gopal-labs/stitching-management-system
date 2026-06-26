import React, { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function MeasurementForm({ setCurrentPage, selectedCategory, selectedDesignId }) {
  // 1. Personal details state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // 2. Custom isolated measurement state fields
  const [measurements, setMeasurements] = useState({
    length: '',
    chest: '',
    waist: '',
    shoulder: '',
    hips: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The complete data package structured exactly like our MongoDB schema blueprint
    const orderData = {
      customerName,
      customerPhone,
      garmentCategory: selectedCategory,
      selectedDesignId: selectedDesignId,
      measurements: measurements
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`✨ Success! Order saved under ID: ${result._index || result._id}`);
        // Reset form inputs after successful post
        setCustomerName('');
        setCustomerPhone('');
        setMeasurements({ length: '', chest: '', waist: '', shoulder: '', hips: '' });
      } else {
        setMessage('❌ Error processing or validating order on server.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ System could not reach the backend server.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <button onClick={() => setCurrentPage('gallery')} style={{
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
          }}>
        ❮ Back to Gallery
      </button>

      <h2 style={{ color: '#c2185b', textAlign: 'center' }}>Enter Sizing Details</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        Provide details for your custom <strong>{selectedCategory}</strong> ({selectedDesignId})
      </p>

      {message && (
        <div style={{ padding: '12px', margin: '15px 0', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', backgroundColor: message.startsWith('✨') ? '#e8f5e9' : '#ffebee', color: message.startsWith('✨') ? '#2e7d32' : '#c62828' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Contact Info Block */}
        <fieldset style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '15px' }}>
          <legend style={{ color: '#c2185b', fontWeight: 'bold' }}>Contact Information</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>Full Name:</label>
            <input type="text" required value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            
            <label>Phone Number:</label>
            <input type="tel" required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </fieldset>

        {/* Custom Isolated Measurements Block */}
        <fieldset style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '15px' }}>
          <legend style={{ color: '#c2185b', fontWeight: 'bold' }}>Dimensions (Inches)</legend>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label>Length:</label>
              <input type="number" name="length" value={measurements.length} onChange={handleInputChange} style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label>Chest:</label>
              <input type="number" name="chest" value={measurements.chest} onChange={handleInputChange} style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label>Waist:</label>
              <input type="number" name="waist" value={measurements.waist} onChange={handleInputChange} style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label>Shoulder:</label>
              <input type="number" name="shoulder" value={measurements.shoulder} onChange={handleInputChange} style={{ width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Hips (Optional):</label>
              <input type="number" name="hips" value={measurements.hips} onChange={handleInputChange} style={{ width: '95%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>
        </fieldset>

        <button type="submit" style={{ padding: '12px', fontSize: '1rem', backgroundColor: '#c2185b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit Order to Shop
        </button>
      </form>
    </div>
  );
}

export default MeasurementForm;