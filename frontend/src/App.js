import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import MainBar from './components/Navbar';


import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
  useEffect(() => {
    document.title = "Bit Camp 2024"
  }, [])

  return (
    <BrowserRouter>
        <Routes>
          <Route index element = { 
            <div>
              <MainBar />
              <Home/>
            </div>

          } />
          <Route path="/about" element = {
            <div>
              <MainBar />
              <About/>
            </div>
          } />
          <Route path="/settings" element = {
            <div>
              <MainBar />
              <Settings/>
            </div>
          } />
          <Route path="*" element = {
            <Navigate to="/" />
          } />
        </Routes>
    </BrowserRouter>
  );
}

