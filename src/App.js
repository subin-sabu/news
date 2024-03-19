
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
import UserSignUp from './Pages/UserSignUp';
import UserLogin from './Pages/UserLogin';
import ResetPassword from './Pages/ResetPassword';
import NewsForm from './Components/NewsForm/NewsForm';
import NewsManager from './Pages/NewsManager';





function App() {
  return (
    <div>
      
      <Navbar />
      <TopNav/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Home' element={<Home/>}/>
        <Route path='/News/:id' element={<News />} />
        <Route path='/Entertainment' element={<Entertainment />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/LifeStyle' element={<LifeStyle />} />
        <Route path='/Sports' element={<Sports />} />
        <Route path='/Tech' element={<Tech />} />
        <Route path='/NewsManager' element={<NewsManager />} />
        <Route path='/SignUp' element={<UserSignUp/>} />
        <Route path='/Login' element= {<UserLogin/>} />
        <Route path='/Forgot' element= {<ResetPassword/>} />
        <Route path='/ReportNews' element= {<NewsForm/>} />
      </Routes>
      <Footer/>
    <NewsScroll/>
    </div>
  );
}

export default App;
