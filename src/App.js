
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
import Tech from './Pages/Tech';
import TopNav from './Components/Navbar/TopNav';
import Footer from './Components/Footer/Footer';
import NewsScroll from './Components/NewsScroll/NewsScroll';
import NewsManager from './Pages/NewsManager';
import Admin from './Pages/Admin';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Admin Login/Login';
import ReportNews from './Pages/ReportNews';





function App() {
  return (
    <div>

      <Navbar />
      <TopNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Home' element={<Home />} />
        <Route path='/News/:id' element={<News />} />
        <Route path='/Entertainment' element={<Entertainment />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/LifeStyle' element={<LifeStyle />} />
        <Route path='/Sports' element={<Sports />} />
        <Route path='/Tech' element={<Tech />} />
        <Route path='/login' element={<Login/>} />
        {/* Protected route wrap for admin routes */}
        <Route path='/Admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/ReportNews' element={<ProtectedRoute><ReportNews/></ProtectedRoute>} />
        <Route path='/NewsManager' element={<ProtectedRoute><NewsManager /></ProtectedRoute>} />
        

      </Routes>
      <Footer />
      <NewsScroll />
    </div>
  );
}

export default App;
