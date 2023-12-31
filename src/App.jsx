import React,{Suspense, lazy, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Non_user_Access } from './api/getapis';
import './css/App.css'
import './css/navbar.css'
import toast from 'react-hot-toast';
const Search = lazy(()=>import('./components/search'))
const NotFound  = lazy(()=>import('./not_found'))
const Clauses = lazy(()=>import('./components/clauses/clauses'))
const Login = lazy(()=>import('./components/auth/login'))
const Signup = lazy(()=>import('./components/auth/signup'))
const Selected_clause = lazy(()=>import('./components/clauses/selected_clause'))
const Know_about_us = lazy(()=>import('./components/know_about_us'))

const App =  ()=>{

  useEffect(() => {
    const handleCopyPaste = (event) => {
      event.preventDefault();
      toast("Copying and pasting the content is prohibited",{
        icon:'🚫',
      })
    };

    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    return () => {
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, []);
  const access_token = Cookies.get('accessToken')
  const non_user_token = async()=>{
    const data = await Non_user_Access()
    Cookies.set('accessToken',data.data.access_token)
  }
  useEffect(()=>{
    if(access_token==undefined || access_token.length<4 ){
      non_user_token()
    }
  },[])
  return(
<Suspense fallback={<div className="text-charcoal75 fs-6 fw-bold text-center"> {" "} loading..{" "} </div>} >
  <Routes>
  <Route path='/' element={<Search/>}/>
  <Route path='/clauses' element={<Clauses/>}/>
  <Route path='/clauses/:clause_name' element={<Selected_clause/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/know_about_us' element={<Know_about_us/>}/>
  <Route path="/*" element={<NotFound/>}/>
</Routes>
</Suspense>
  )
}
export default App
