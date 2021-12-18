import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import NotFound from './NotFound';
import {
    BrowserRouter,
    Routes,
    Route,
  } from 'react-router-dom'


ReactDOM.render(

    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>,
   document.getElementById('root')
);

