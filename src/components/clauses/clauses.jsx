import React, { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { GetClauses } from '../../api/getapis' 
import { Non_user_Access } from '../../api/getapis'
import '../../css/clauses.css'
import Clauses_Loader from './loader'

const Clauses = () => {
  const [req,setreq] = useState({
    search:'',
    limit:12,
    offset:0
  })
  const [loading,setloading] = useState(0)
  const [repeatloading,setrepeatloading]= useState(false)
  const [loadmore,setloadmore] = useState(true)
  const [data,setdata] = useState([])

  const non_user_token = async()=>{
    const data = await Non_user_Access()
    Cookies.set('accessToken',data.data.access_token)
  }
  const Fetch=async()=>{
    setrepeatloading(true)
    const Data = await GetClauses(req)
          if(Data.data.status==403){
        non_user_token()   
        toast('Refreshing page...please wait', {
          icon: '🕑',
        });
        setTimeout(()=>{
          window.location.reload()    
        },1000)
      }
    if(data.length!==0){

      if(Data.data.data.length==0){
        setloadmore(false)
      }
      setdata(prevState=>[...prevState,...Data.data.data])
    }else{
      setdata(Data.data.data)
      setloading(1)
    }
    setrepeatloading(false)
  }

  useEffect(()=>{
    Fetch()
  },[req.offset])
  return (
    <div className='container-fluid p-0 clausesection'>
        <Link to='/' className='text-decoration-none position-absolute back_to_search text-blue1 ps-3'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
     <Helmet>
      <title>clauses | clausesai</title>
      <meta name="description" content="get acccess to 100 and more legal clauses on clausesai" />
      <meta name='keywords' content='clauses,legal clauses,company contract clauses ,employee contract clauses,genuine clauses, types of clauses, clauses with degree'/>
      </Helmet>
     {
    loading == 0 ?(
      <Clauses_Loader/>
    ):(   
          data!==undefined ? (
            <div className="container-fluid ps-2 p-0 mt-lg-3">
              {
            data.length!=0 && data.map((data)=>(
            <div className="clauses ps-2 py-2 my-lg-4 my-1">
            <Link to={`/clauses/${data.clause_name}`} state={{id:data.id}} className="col-12 text-decoration-none">
              <h3 className='text-black fw-normal'>{data.clause_name?data.clause_name:''}</h3>
              <p className='text-gray2 fw-normal'>{data.definition?data.definition:''}</p>
            </Link>
            </div>
            ))
              }
              {
                repeatloading ? (
                  <div className="row justify-content-center">
                    <div className="col-12 text-center">
                    <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                  </div>
            
                ):(
                  
                    loadmore ? (
                      <div className="row justify-content-center">
                      <div className="col-4"><hr/></div>
                      <button className='btn text-gray1 col-auto' onClick={(e)=>{setreq(prevState=>({...prevState,offset:req.offset+12}))}}>load more</button>
                      <div className="col-4"><hr/></div>
                    </div>
                    ):(
                      <></>
                    )
                  
            
                )
              }
        
            </div>
  
          ):(
            <div className="container text-center justify-content-center d-flex align-items-center fw-semibold text-gray2" style={{height:'50vh'}}>No Clauses found</div>
          )
    
  )
}
  </div>
  )
}

export default Clauses