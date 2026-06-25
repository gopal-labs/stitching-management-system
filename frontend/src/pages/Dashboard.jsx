import React, { useState, useEffect } from 'react';

// 🌐 Dynamic API URL allocation (Uses Vite env variable if deployed, falls back to local machine)
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Dashboard({ setCurrentPage }) {
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [shopStatus, setShopStatus] = useState({ isAcceptingOrders: true, message: '' });
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Validate authentication token state on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Clean dynamic fetch array routing
      const [ordersRes, apptsRes, statusRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/orders`),
        fetch(`${API_BASE_URL}/api/appointments`),
        fetch(`${API_BASE_URL}/api/status`)
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setAuthError(data.message || 'Authentication rejected.');
      }
    } catch (err) {
      setAuthError('Cannot connect to authorization server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleStatusToggle = async (newToggleState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAcceptingOrders: newToggleState, customMessage })
      });
      if (response.ok) {
        setShopStatus(prev => ({ ...prev, isAcceptingOrders: newToggleState, message: customMessage }));
        alert("✨ Shop availability updated successfully!");
      }
    } catch (err) {
      alert("❌ Could not update shop status.");
    }
  };

  const handleApproveOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: 'Approved' } : o));
      } else {
        alert('❌ Failed to approve order.');
      }
    } catch (err) {
      alert('❌ Connection to server failed.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#666', fontFamily: 'sans-serif' }}>Loading Secure Shell...</div>;

  
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', fontFamily: 'sans-serif', backgroundColor: '#fff5f7' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ color: '#c2185b', margin: '0 0 10px 0', textAlign: 'center' }}>Admin Access Portal</h2>
          <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: '25px', textAlign: 'center' }}>Please verify credentials to manage your store lines.</p>
          
          {authError && <div style={{ color: '#c62828', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 'bold' }}>⚠️ {authError}</div>}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '15px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>Username:</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '25px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>Password:</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }} />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#c2185b', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Unlock Deck</button>
        </form>
      </div>
    );
  }

  // 🔓 STANDARD SECURE DASHBOARD UI VIEW
  return (
    <div style={{ width: '100%', fontFamily: 'sans-serif', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', padding: '40px 20px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '15px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#c2185b', margin: '0', fontSize: '2rem' }}>Shop Management Deck</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Track stitching queues, customer records, and system settings.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleLogout} style={{ background: '#666', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', padding: '10px 16px', borderRadius: '6px' }}>
            Logout 🔒
          </button>
          <button onClick={() => setCurrentPage('home')} style={{ background: '#c2185b', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', padding: '10px 16px', borderRadius: '6px' }}>
            View Public Homepage →
          </button>
        </div>
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
                    <td style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: order.orderStatus === 'Pending' ? '#fff3e0' : '#e8f5e9', color: order.orderStatus === 'Pending' ? '#e65100' : '#2e7d32', fontWeight: 'bold' }}>
                        {order.orderStatus}
                      </span>
                      {order.orderStatus === 'Pending' && (
                        <button onClick={() => handleApproveOrder(order._id)} style={{ padding: '6px 12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ Approve</button>
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