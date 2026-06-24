import React, { useState } from 'react';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Gallery from './pages/Gallery';
import MeasurementForm from './pages/MeasurementForm';
import Appointment from './pages/Appointment';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import shopPhoto from './assets/image.png';

function App() {
  // This state variable will control which page is currently active on screen
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDesignId, setSelectedDesignId] = useState('');
  
  const navigateTo = (pageName) => {
    console.log("Navigating directly to page:", pageName);
    setCurrentPage(pageName);
  };

  const getAppBackgroundStyle = () => {
    if (currentPage === 'home' || currentPage === 'contact' || currentPage === 'appointment' || currentPage === 'categories' || currentPage === 'Gallery' || currentPage === 'MeasurementForm' ) {
      // Pages that use the full cinematic dark boutique photo background
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${shopPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#ffffff'
      };
    } else {
      // Default plain background layout for 'categories', 'gallery', 'dashboard', etc.
      return {
        backgroundColor: '#f8f9fa', // Light workspace gray (or change to your choice)
        color: '#08060d'
      };
    }
  };

  return (
    <div className="app-container" style={{ 
      minHeight: '100vh', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.3s ease',
      ...getAppBackgroundStyle() 
    }}>
      {/* For now, we render the Home component directly */}
      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} />
      
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}

      {currentPage === 'categories' && (
        <Categories 
          setCurrentPage={navigateTo} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}
      {currentPage === 'gallery' && (
        <Gallery 
          setCurrentPage={navigateTo} 
          selectedCategory={selectedCategory} 
          setSelectedDesignId={setSelectedDesignId}
        />
      )}

      {currentPage === 'measurementForm' && (
  <MeasurementForm 
    setCurrentPage={navigateTo} 
    selectedCategory={selectedCategory} 
    selectedDesignId={selectedDesignId} 
  />
      )}
      {currentPage === 'appointment' && (
        <Appointment setCurrentPage={navigateTo} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard setCurrentPage={navigateTo} />
      )}

      {currentPage === 'contact' && <Contact setCurrentPage={setCurrentPage} />}
    
    </div>
    
  );
}

export default App;