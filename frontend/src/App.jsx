import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast'; 

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: '#333', // Dark background for contrast on a light site
            color: '#fff',       // White text
          },
        }}
      />
      
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}

export default App;