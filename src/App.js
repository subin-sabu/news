
import React from 'react';
import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import News from './Pages/News';
import Entertainment from './Pages/Entertainment';
import Events from './Pages/Events';
import LifeStyle from './Pages/LifeStyle';
import Sports from './Pages/Sports';
import Auto from './Pages/Auto';
import Tech from './Pages/Tech';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Home' element={<Home/>}/>
        <Route path='/News' element={<News />} />
        <Route path='/Entertainment' element={<Entertainment />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/LifeStyle' element={<LifeStyle />} />
        <Route path='/Sports' element={<Sports />} />
        <Route path='/Tech' element={<Tech />} />
        <Route path='/Auto' element={<Auto />} />
      </Routes>
    </div>
  );
}

export default App;
