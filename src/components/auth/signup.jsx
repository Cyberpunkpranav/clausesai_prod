import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { encryptNumber, encryptString } from '../../security/crypto';
import '../../css/signup.css'
const Signup = () => {
  const navigate = useNavigate()
  const[load,setload]=useState(false)
  const [creds,setcreds]=useState({
    username:'',
    password:'',
  })

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
      await axios.post(`/api/user/google/login`,googlecreds).then((response)=>{
        if(response.data.status==true){
          toast.success(response.data.message);
          let user_id = encryptNumber(response.data.data.id)
          let username = encryptString(response.data.data.username)
          Cookies.set('accessToken',response.data.access_token)
          Cookies.set('user_id',user_id)
          Cookies.set('username',username)
          setTimeout(() => {
            navigate('/')
          }, 1000);
        }else{
          toast.error(response.data.message);
        }
        setload(false)
      })
    }catch(e){
      setload(false)
      toast.error(e.message);
    }

};
const errorMessage = (error) => {
  toast.error(error);
};

const set_values=(user,pass)=>{
  setcreds({username:user,password:pass})
}

const Signup = async()=>{
    try{
      setload(true)
    await axios.post(`/api/user/signup`,creds).then((response)=>{
        if(response.data.status==true){
          // let user_id = encryptNumber(response.data.data.id)
          // let username = encryptNumber(response.data.data.username)
          // Cookies.set('accessToken',response.data.access_token)
          // Cookies.set('user_id',user_id)
          // Cookies.set('username',username)
          toast.success(response.data.message);
          setTimeout(() => {
            navigate('/login')
          }, 1000);
        }else{
          toast.error(response.data.message);
        }
        setload(false)
      })
    }catch(e){
      setload(false)
      toast.error(e.message);
    }
}
  return (
    <>
    <Helmet>
      <title>Signup | Discover exclusive legal clauses</title>
      <meta name="description" content="get acccess to 100 and more legal clauses on clausesai" />
      <meta name='keywords' content='clauses,legal clauses,company contract clauses ,employee contract clauses,genuine clauses, types of clauses, clauses with degree'/>
    </Helmet>
    <div className="container-fluid signupsection">
            <div className='bg-white py-3 px-4 shadow-sm rounded-3 border'>
            <div className="row p-0 m-0">
            <h4 className='text-center'>Clauses<span className='text-blue1'>AI</span>.com</h4>
            <div className="col-12 mx-auto text-center mt-4">
              <div className='d-inline-block'>
              <GoogleOAuthProvider clientId='238984833221-rc5s0bmt65pj6riarg9bd9lusvff3l24.apps.googleusercontent.com'>
              <GoogleLogin 
              onSuccess={responseMessage} 
              onError={errorMessage} 
              useOneTap={true} 
              size='medium'
               />
              </GoogleOAuthProvider>
              </div>
              <div className="d-inline-block">

              </div>
      
            </div>
            <div className="col-12 text-center my-2 text-charcoal75 position-relative">
              <hr className=''/>
            <small className='position-absolute top-0 start-0 end-0 bottom-0 align-items-center d-flex justify-content-center'><div className='bg-white px-2'>OR</div></small>
            </div>
            <div className="col-12 pb-1">
                <label htmlFor=''>Username or email</label>
                <input className='form-control' placeholder='username or email' type='text' value={creds.username?creds.username:''} onChange={(e)=>set_values(e.target.value,creds.password)}/>
            </div>
            <div className="col-12 pb-3 pt-1">
                <label htmlFor="">Password</label>
                <input className='form-control' value={creds.password?creds.password:''} onChange={(e)=>set_values(creds.username,e.target.value)} type='password' placeholder='password@123'/>
            </div>
            <div className="col-12 justify-content-center text-center d-flex mx-auto ">
              {
                load?(
                  <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>
                ):(
                  <button className='btn bg-blue2 text-white px-3 py-2 rounded-2'onClick={()=>Signup()}>Signup</button>
                )
              }
            </div>
            <div className="col-12 text-center mt-2">
              <small>Already have an account ? <a href='' onClick={()=>{navigate('/Login')}}><small>login</small></a> </small>
            </div>
            </div>
            </div>
          
    
    </div>
  
    </>
  )
}

export default Signup