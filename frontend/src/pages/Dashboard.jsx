import React, { useState, useEffect } from 'react';

function Dashboard({ setCurrentPage }) {
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [shopStatus, setShopStatus] = useState({ isAcceptingOrders: true, message: '' });
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all administrative layout variables on view load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, apptsRes, statusRes] = await Promise.all([
          fetch('http://localhost:5000/api/orders'),
          fetch('http://localhost:5000/api/appointments'),
          fetch('http://localhost:5000/api/status')
        ]);

        const ordersData = await ordersRes.json();
        const apptsData = await apptsRes.json();
        const statusData = await statusRes.json();

        setOrders(ordersData);
        setAppointments(apptsData);
        setShopStatus(statusData);
        setCustomMessage(statusData.message);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard modules:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Dispatch a network action to change her shop's real-time availability
  const handleStatusToggle = async (newToggleState) => {
    try {
      const response = await fetch('http://localhost:5000/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isAcceptingOrders: newToggleState,
          customMessage: customMessage
        })
      });

      if (response.ok) {
        setShopStatus(prev => ({ ...prev, isAcceptingOrders: newToggleState, message: customMessage }));
        alert("✨ Shop availability updated successfully!");
      }
    } catch (err) {
      alert("❌ Could not update shop status.");
    }
  };

  // 🚀 1. PASTED FUNCTION: Handles updating state and sending PUT request to backend
  const handleApproveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        // Loops through your orders state array and updates orderStatus locally instantly
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, orderStatus: 'Approved' } : order
          )
        );
      } else {
        alert('❌ Failed to approve order.');
      }
    } catch (err) {
      console.error('Error approving order:', err);
      alert('❌ Connection to server failed.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#666', fontFamily: 'sans-serif' }}>Loading Dashboard Data Modules...</div>;

  return (
    <div style={{ 
      width: '100%', 
      fontFamily: 'sans-serif', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 20px'
    }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '15px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#c2185b', margin: '0', fontSize: '2rem' }}>Shop Management Deck</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Track stitching queues, customer records, and system settings.</p>
        </div>
        <button onClick={() => setCurrentPage('home')} style={{
            background: '#c2185b',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            padding: '10px 16px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
          View Public Homepage →
        </button>
      </header>

      {/* SECTION 1: LIVE SHOP CAPACITY TOGGLE CARD */}
      <section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', marginBottom: '40px' }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>⚙️ Shop Availability Control</h3>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Toggle whether the shop can take on more custom orders right now or is at maximum workspace capacity.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '15px 0' }}>
          <span style={{ fontWeight: 'bold', color: '#333' }}>Current Mode:</span>
          <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', backgroundColor: shopStatus.isAcceptingOrders ? '#e8f5e9' : '#ffebee', color: shopStatus.isAcceptingOrders ? '#2e7d32' : '#c62828' }}>
            {shopStatus.isAcceptingOrders ? "🟢 OPEN (Accepting Orders)" : "🔴 FULL (Appointments Only)"}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>Custom Home Banner Text Message:</label>
          <input type="text" value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          <button onClick={() => handleStatusToggle(true)} style={{ padding: '10px 18px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}> Set to Open </button>
          <button onClick={() => handleStatusToggle(false)} style={{ padding: '10px 18px', backgroundColor: '#c62828', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}> Set to Fully Booked </button>
        </div>
      </section>

      {/* SECTION 2: LIVE ORDERS VIEW QUEUE */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#c2185b' }}>📋 Custom Stitching Orders Queue ({orders.length})</h3>
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#c2185b', color: 'white' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Customer Details</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Garment & Design</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Sizing Parameters (Inches)</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No stitching orders recorded yet.</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px', color: '#333' }}>
                      <strong>{order.customerName}</strong><br />
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>📞 {order.customerPhone}</span>
                    </td>
                    <td style={{ padding: '12px', textTransform: 'capitalize', color: '#333' }}>
                      <strong>{order.garmentCategory.replace('-', ' ')}</strong><br />
                      <span style={{ fontSize: '0.85rem', color: '#555' }}>ID Code: {order.selectedDesignId}</span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.85rem', color: '#333' }}>
                      Len: {order.measurements?.length || '-'} | Ch: {order.measurements?.chest || '-'} | Wst: {order.measurements?.waist || '-'} | Shld: {order.measurements?.shoulder || '-'} | Hip: {order.measurements?.hips || '-'}
                    </td>
                    
                    {/* 🚀 2. PASTED LAYOUT IN CELL: Dynamically updates layout and provides Approve Button */}
                    <td style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem', 
                        backgroundColor: order.orderStatus === 'Pending' ? '#fff3e0' : '#e8f5e9', 
                        color: order.orderStatus === 'Pending' ? '#e65100' : '#2e7d32', 
                        fontWeight: 'bold' 
                      }}>
                        {order.orderStatus}
                      </span>
                      
                      {order.orderStatus === 'Pending' && (
                        <button
                          onClick={() => handleApproveOrder(order._id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#2e7d32',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}
                        >
                          ✓ Approve
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: UPCOMING APPOINTMENTS QUEUE */}
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0277bd' }}>🗓️ Physical Measurements Appointments ({appointments.length})</h3>
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#0277bd', color: 'white' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Customer Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Contact Details</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Date & Time Slot</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Notes / Fabrics</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No physical measurement slots reserved yet.</td></tr>
              ) : (
                appointments.map(appt => (
                  <tr key={appt._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px', color: '#333' }}><strong>{appt.customerName}</strong></td>
                    <td style={{ padding: '12px', color: '#333' }}>📞 {appt.customerPhone}</td>
                    <td style={{ padding: '12px', color: '#333' }}>🗓️ {appt.appointmentDate} at ⏰ {appt.appointmentTime}</td>
                    <td style={{ padding: '12px', fontSize: '0.85rem', color: '#555' }}>{appt.notes || 'No extra notes provided.'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;