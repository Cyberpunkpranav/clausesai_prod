import React from 'react';
import { hydrate, render } from "react-dom";
import ReactDOM from 'react-dom/client';
import './css/bootstrap.css'
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Toaster/>
        <Navbar/>
        <Routes>
       <Route path='/*' element={<App />}/>
        </Routes>
      </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
