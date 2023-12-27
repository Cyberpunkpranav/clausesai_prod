import React, {useState, useEffect } from 'react'
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import axios from '../api/axios';
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import {userData} from '../security/decryption'
import { encryptNumber,encryptString } from '../security/crypto';
import '../css/navbar.css'

const Navbar = () => {
  const[load,setload]=useState(false)
  
    const logout = ()=>{
        Cookies.remove('accessToken')
        Cookies.remove('user_id')
        Cookies.remove('username')
        Cookies.remove('blog_view')
        toast.success('Logged out')
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }
      const responseMessage = async(response) => {
        const decoded_creds = jwt_decode(response.credential)
        const googlecreds = {
          username:decoded_creds.name,
          email:decoded_creds.email,
          email_verified:decoded_creds.email_verified,
          password:decoded_creds.sub,
        }
        try{
          setload(true)
           axios.post(`/api/user/google/login`,googlecreds).then((response)=>{
            if(response.data.status){
              toast.success(response.data.message);
              let user_id = encryptNumber(response.data.data.id)
              let username = encryptString(response.data.data.username)
              Cookies.set('accessToken',response.data.access_token)
              Cookies.set('user_id',user_id)
              Cookies.set('username',username)
              window.location.reload()
            }else{
              toast.error(response.data.message);
            }
            setload(false)
          })
        }catch(e){
          setload(false)
          toast.error(e.message)
        }
    }
    const errorMessage = (error) => {
      toast.error(error);
    }
    
  return (

  <nav class="container-fluid navbar py-0 mt-2">
    <Link to='/' class="navbar-brand"><img src={process.env.PUBLIC_URL+'/images/logo.png'} className='img-fluid logo' alt="" /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Clauses<h5 className='text-blue1 d-inline'>AI</h5>.com</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column justify-content-between">
        <div className="login_signup">
        {
          userData.username !=undefined  ? (
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className='nav-item mt-3' data-bs-dismiss="offcanvas" aria-label="Close"><h4 className='fw-normal'>{userData.username}</h4></li>
              <li className='nav-item mt-3' data-bs-dismiss="offcanvas" aria-label="Close">
              <Link to='know_about_us' className='d-block text-black text-decoration-none'><img src={process.env.PUBLIC_URL+'/images/info.png'} className='img-fluid icons me-2'/>Know About Us</Link>
              </li>
              <li className='nav-item text-redlight mt-3 cursor-pointer' data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=>logout()}><img src={process.env.PUBLIC_URL+'/images/logout.png'} className='img-fluid icons me-2'/>Logout</li>
            </ul>
          
          ):(
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className='nav-item'>
            <GoogleOAuthProvider clientId='238984833221-rc5s0bmt65pj6riarg9bd9lusvff3l24.apps.googleusercontent.com'>
             <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
            useOneTap={true} 
            theme='outline'
            size='large'
            shape='rectangle'
            text='continue_with'
             />
            </GoogleOAuthProvider>
            </li>
            <li class="nav-item mt-3 pt-2" data-bs-dismiss="offcanvas" aria-label="Close">
            <Link to='login' className='text-decoration-none text-blue1'><img src={process.env.PUBLIC_URL+'/images/login.png'} className='img-fluid icons me-2'/><h6 className='d-inline fw-normal text-black'>Login with clausesai</h6></Link></li>
            <li class="nav-item py-2 mt-2" data-bs-dismiss="offcanvas" aria-label="Close">
            <Link to='signup' className='text-decoration-none text-blue1'><img src={process.env.PUBLIC_URL+'/images/create_account.png'} className='img-fluid icons me-2'/><h6 className='d-inline fw-normal text-black'>Create Account</h6></Link></li>
            <li className='nav-item mt-2' data-bs-dismiss="offcanvas" aria-label="Close">
            <Link to='know_about_us' className='d-block text-black text-decoration-none'><img src={process.env.PUBLIC_URL+'/images/info.png'} className='img-fluid icons me-2'/>Know About Us</Link></li>
          </ul>
          )
        }
        </div>
        <div className="terms_andConditions">
        <Link className='text-gray1 text-decoration-none d-block py-2'><small>Privacy Policy</small></Link>
        <Link className='text-gray1 text-decoration-none d-block py-2'><small>Terms and Conditions</small></Link>
        
        </div>
      
      </div>
    </div>
</nav>
  )
}

export default Navbar