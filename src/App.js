import React, { useEffect } from 'react';
import './App.css';
import Home from './Pages/Home/Home';


function App() {
  useEffect(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Assuming you want to show a static message or you'll need to adjust this
        new Notification("Sample Notification Message");
      }
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>


      <Home />

    </div>
  );
}

export default App;
