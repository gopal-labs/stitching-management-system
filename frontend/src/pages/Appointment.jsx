import React, { useState } from 'react';

function Appointment({ setCurrentPage }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const bookingData = {
      customerName,
      customerPhone,
      appointmentDate,
      appointmentTime,
      notes
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        setMessage('✨ Appointment booked successfully! We look forward to seeing you.');
        setCustomerName('');
        setCustomerPhone('');
        setAppointmentDate('');
        setAppointmentTime('');
        setNotes('');
      } else {
        setMessage('❌ Failed to reserve slot. Please check your inputs.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Cannot connect to backend server right now.');
    }
  };

  return (
    // <div style={{ padding: '40px 20px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box' }}>
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => setCurrentPage('home')} style={{ 
        
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
         ❮ Back to Home
      </button>
       {/* </div> */}
       <h1 style={{ color: '#ffffff', fontSize: '3rem', fontWeight: 'bold', margin: '0 0 30px 0', textShadow: '0 2px 8px rgba(0,0,10,0.5)',whiteSpace: 'nowrap' }}>
          Book Free Physical Measurement
          </h1>
        
      <p style={{ textAlign: 'center', color: '#ffffff', fontSize: '0.9rem' }}>
        Pick a date and time to visit our shop. We'll handle all the measuring for you!
      </p>

      {message && (
        <div style={{
          padding: '20px', margin: '15px 0', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold',
          backgroundColor: message.startsWith('✨') ? '#e8f5e9' : '#ffebee',
          color: message.startsWith('✨') ? '#2e7d32' : '#c62828'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleBookAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Your Name:</label>
        <input type="text" required value={customerName} onChange={e => setCustomerName(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label>Phone Number:</label>
        <input type="tel" required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label>Select Date:</label>
        <input type="date" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label>Select Time Slot:</label>
        <input type="time" required value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label>Special Instructions (Optional):</label>
        <textarea rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g., Bringing my own cloth fabric, silk material, etc." style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'sans-serif' }} />

        <button type="submit" style={{ padding: '12px', fontSize: '1rem', backgroundColor: '#c2185b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Confirm Free Booking
        </button>
      </form>
    </div>
  );
}

export default Appointment;