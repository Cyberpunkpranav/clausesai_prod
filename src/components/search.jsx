import React, {useState, useEffect,useDeferredValue } from 'react'
import { Search_clauses } from '../api/getapis.jsx'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { Non_user_Access } from '../api/getapis.jsx'
import toast from 'react-hot-toast'
 const Search = () => {
    const [loading,setloading] = useState()
    const [search,setsearch] = useState(null)
    const deferredsearch = useDeferredValue(search)
    const [Data,setData] = useState([])
    const non_user_token = async()=>{
      const data = await Non_user_Access()
      Cookies.set('accessToken',data.data.access_token)
    }
    const fetch = async(deferredsearch)=>{
      setloading(true)
      if(search!==null && search.length!==0){
        const data = await Search_clauses(deferredsearch)
        if(data.data.status==403){
          non_user_token()   
          toast('Refreshing page...please wait', {
            icon: '🕑',
          });
          setTimeout(()=>{
            window.location.reload()    
          },1000)
        }
        if(data.data.status==true){
          setData(data.data.data)
        }
      }
      setloading(false)
    }
    useEffect(()=>{
      fetch(deferredsearch)
      if(search!=null&&search!==undefined&&search.length==0){
        setData([])
      }
    },[deferredsearch])

      return (
        <div className='container-fluid searchsection p-0 position-relative'>
           <div className='text-center caption'>
            <h1 className='text-blue3 text-center'>EXPLORE</h1>
            <h1 className='text-greenlight mx-5 text-center'>DISCOVER</h1>
            <h1 className='text-gray2 text-center'>APPLY</h1>
            </div>
            <main className="row p-0 m-0 justify-content-center position-relative">
              <input type="text" className='rounded-pill py-2 px-3 py-lg-3 px-lg-5 bg-white text-gray2 search border border-1 bg-gray4' onChange={(e)=>setsearch(e.target.value)} placeholder='Type here to read your relavant clause....' />
              <div className="d-flex text-align-center justify-content-center w-75 mt-3 ">
              <p>Unable to identify the clause ? Click here to check out <Link className=' text-blue1 all_clauses fw-normal ' to='clauses'><p className='d-inline'>all clauses</p></Link></p>
              </div>
              {
                Data.length!==0 ? (
                  <div className="searchsuggestion scroll bg-white position-absolute">
                  <div className="container-fluid p-0 m-0">
                  {
                    loading ? (      
                    <div className="container py-2 py-md-3 py-lg-4 d-flex align-items-center">
                    <p role="status">Loading...</p>
                    <div className="spinner-border ms-auto" aria-hidden="true"></div>
                  </div>):(
                           <div className="col-12">
                           {
                             Data.map((data)=>(
                               <Link to={`/clauses/${data.clause_name}`} state={{id:data.id}} className='text-decoration-none d-block col-12 my-2 py-md-2 px-2 px-md-3 px-lg-4 border-1 search_results border-bottom border-blue1'>
                               <h6 className='text-black fw-normal p-0 m-0 text-truncate'>{data.clause_name}</h6>
                               <p className='text-blue1 fw-light p-0 m-0 text-truncate'>{data.definition}</p>
                               </Link>
                         
                             ))
                           }
                         </div>)
                  }
                  </div>
              
                </div>
                ):(
                  <></>
                )
              }
            </main>
          <p className='text-gray2 text-center position-absolute bottom-0 mb-3 px-4 px-md-0 start-0 end-0'>Get exclusive clauses to make you more productive in less time</p>
        </div>
      )
    }

    export default Search
    