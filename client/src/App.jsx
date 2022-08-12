import React from 'react';
import NotFound from './NotFound';
import {
    BrowserRouter,
    Routes,
    Route,
  } from 'react-router-dom'

import Home from './pages/home';
import CountClick from './pages/click';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:click" element={<CountClick/>}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App; 
