import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams,useLocation } from 'react-router-dom'
import axios from 'axios'
import { GetClausesById } from '../../api/getapis' 
import '../../css/clauses.css'
import { Helmet } from 'react-helmet'
import SelectedClause_Loader from './selected_clause_loader'

const Selected_clause = () => {
    let { state } = useLocation();
    const id = state.id
    const[data,setdata] = useState()
    const[loading,setloading] = useState(false)
    const[clauseloading,setclauseloading] = useState(false)
    const [clauses,setclauses] = useState()
    const Fetch_Clause=async()=>{
        setloading(true)
        const Data = await GetClausesById(id)
        if(Data!=undefined && Data.data!=undefined){
          let arr =[]
           for(let i=0;i<Data.data.clauses.length;i++){
                let simple=''
                let moderate=''
                let complex=''
 
             if(Data.data.clauses[i].simple){
               const Simple =  await axios.get(Data.data.clauses[i].simple)
               simple=Simple.data
             }
             if(Data.data.clauses[i].moderate){
               const Moderate =  await axios.get(Data.data.clauses[i].moderate)
               moderate=Moderate.data
             }
             if(Data.data.clauses[i].complex){
               const Complex =  await axios.get(Data.data.clauses[i].complex)
               complex=Complex.data
             }
             let obj = {
               id:Data.data.clauses[i].id,
               clause_id:Data.data.clauses[i].clause_id,
               rationale:Data.data.clauses[i].rationale,
               explaination:Data.data.clauses[i].explaination,
               nature :Data.data.clauses[i].nature,
               status:Data.data.clauses[i].status,
               simple:simple,
               moderate:moderate,
               complex:complex,
               created_on:Data.data.clauses[i].created_on,
               updated_on:Data.data.clauses[i].updated_on
             }
             arr.push(obj)
           }
             let obj = {
               id:id,
               clause_name:Data.data.clause_name,
               definition:Data.data.definition,
               rationale:Data.data.rationale,
               clauses:arr
             }
               setdata(obj) 
         }
        // setdata(Data.data)
        setloading(false)
    }

    useEffect(()=>{
      Fetch_Clause()
    },[])

  return (
    <>
    <Helmet>
    <title>{data!=undefined?data.clause_name+' | clausesai':'clausesai'}</title>
    <meta name="description" content="get acccess to 100 and more legal clauses on clausesai" />
    <meta name='keywords' content='clauses,legal clauses,company contract clauses ,employee contract clauses,genuine clauses, types of clauses, clauses with degree'/>
    </Helmet>
    <div className='container-fluid clausealtsection p-0'>
    {
      loading ? (
        <SelectedClause_Loader/>
    ):(
      <>
      <Link to='../clauses' className='allclauses position-absolute d-inline mx-auto text-blue1 text-decoration-none'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
      <h2 className='fw-normal position-absolute heading'>{data!=undefined?data.clause_name:""}</h2>
      <div className="row p-0 m-0 justify-content-between align-items-center mt-3">
        <div className="col-sm-12 col-md-6 col-lg-auto ps-0 ms-0">
        <h2 className='fw-normal Heading'>{data!=undefined?data.clause_name:""}</h2>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-auto ps-0">
        <p className='fw-normal text-gray2 text-start text-md-end'> "{data!==undefined && data.clauses!==undefined ?data.clauses.length:""}" samples of clause "{data!=undefined?data.clause_name:""}" exists</p>
        </div>
      </div>
      <div className="question my-2 my-md-3 my-lg-4">
      <h6 className='fw-normal text-gray1'>When,Why and Where to use {data!=undefined?data.clause_name:""} ?</h6>
      <p className=' mt-2 fw-light text-gray2'>{data!=undefined?data.rationale:''}</p>
      </div>
      <div className='mt-3 ms-0'>
        <div className="nav nav-tabs scroll border-0 p-0 m-0" id='nav-tab' role="tablist">
          {
          data!=undefined && data.clauses.map((data,i)=>( 
            <small key={i} className={`cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0 ${i==0?'active':''}`} id={`nav-${data.id}-tab`} data-bs-toggle="tab" data-bs-target={`#nav-${data.id}`} type="button" role="tab" aria-controls={`nav-${data.id}`} aria-selected="true">{data.nature?data.nature:<i>clause type {i+1}</i>}</small>
          ))
          }
        </div>
      </div>
      <div className="tab-content mt-3 p-0 m-0 clause_alt" id="nav-tabContent">
      {
          data!=undefined && data.clauses.map((DATA,i)=>( 
            <div key={i} className={`tab-pane p-0 m-0 ${i==0?'fade show active':''} `} id={`nav-${DATA.id}`} role="tabpanel" aria-labelledby={`nav-${DATA.id}-tab`} tabIndex={`0`} >
                <div class="cursor-pointer text-greenmain" data-bs-toggle="collapse" data-bs-target="#collapseinfo" aria-expanded="false" aria-controls="collapseExample">
                 know more about {DATA.nature?DATA.nature:'clause type '+(i+1)} under {data!=undefined?data.clause_name:""}<img src={process.env.PUBLIC_URL+'/images/down_greenmain.png'} className='img-fluid icon-small ms-2'/>
               </div>
              <div className="collapse" id="collapseinfo">
              <div className="row justify-content-md-center justify-content-lg-start p-0 m-0 g-2 gx-lg-3 mt-2">
              <div className="col-12 col-sm-11 col-md-6 col-lg-6 col-xl-5 col-xxl-5 ps-0">
                <div className="row Card p-0 m-0 rounded-4 p-md-3 p-lg-4 bg-blue13">
                  <div className=" col-2 col-sm-2 mt-2 ms-3 mb-2 mt-md-0 ms-md-0 mb-md-0 col-lg-2 p-0 m-0">
                  <img className='img-fluid' src={process.env.PUBLIC_URL+'/images/why.png'}/>
                  </div>
                  <div className="col-12 col-sm-12 col-md-10 col-lg-10">
                  <h6 className='fw-normal text-black'>Why to choose {DATA.nature?DATA.nature:'clause type '+(i+1)} clause under <h6 className='d-inline fw-normal text-blue1'>{data!=undefined?data.clause_name:""} </h6></h6>
                  <p className='text-gray1 fw-normal'>{DATA.rationale?DATA.rationale:DATA.rationale}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-11 col-md-6 col-lg-6 col-xl-5 col-xxl-5 ps-0 ">
                <div className="row p-0 m-0 Card bg-transparentgreen1 p-md-3 p-lg-4 rounded-4">
                  <div className="col-2 col-sm-2 col-md-2 mt-2 ms-3 mb-2 mt-md-0 ms-md-0 mb-md-0 col-lg-2 p-0 m-0">
                  <img className='img-fluid' src={process.env.PUBLIC_URL+'/images/understand.png'}/>
                  </div>
                  <div className="col-12 col-sm-12 col-md-10 col-lg-10">
                  <h6 className='fw-normal text-black'>Let us understand relevance of having a <h6 className='d-inline fw-normal text-greenmain'>{data!=undefined?data.clause_name:""} </h6> under <span className='fw-normal'>{data.clauses[i].nature?data.clauses[i].nature:<i>clause type {i+1}</i>}</span>{' '} </h6>
                  <p className='text-gray1 fw-normal'>{DATA.explaination?DATA.explaination:DATA.explaination}</p> 
                  </div>
                </div>

              </div>
              </div>
              </div>
              <ul className="nav nav-pills p-0 m-0 my-3" id="pills-tab" role="tablist">
                {
                  DATA.simple  ? (
                    <li className="nav-item" role="presentation">
                    <small className="cursor-pointer active rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple`} aria-selected="true">Simple</small>
                  </li>
                  ):(<></>)
                }
                {
                  DATA.moderate ? (
                    <li className="nav-item" role="presentation">
                    <small className="cursor-pointer mx-5 mx-md-5 mx-lg-5 mx-xl-5 mx-xxl-6 rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate`} aria-selected="false">Moderate</small>
                  </li>
                  ):(<></>)
                }
                {
                  DATA.complex ? (
                  <li className="nav-item" role="presentation">
                  <small className="cursor-pointer rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex`} aria-selected="false">Complex</small>
                  </li>
                  ):(<></>)
                }
                
              </ul>
                <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple`} role="tabpanel" aria-labelledby={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple-tab`} tabIndex="0" dangerouslySetInnerHTML={{__html:DATA!=undefined?DATA.simple:''}}></div>
                <div className="tab-pane fade" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate`} role="tabpanel" aria-labelledby={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate-tab`} tabIndex="0" dangerouslySetInnerHTML={{__html:DATA!=undefined?DATA.moderate:''}}></div>
                <div className="tab-pane fade" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex`}role="tabpanel" aria-labelledby={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex-tab`} tabIndex="0" dangerouslySetInnerHTML={{__html:DATA!=undefined?DATA.complex:''}}></div>
              </div>
              </div>
                ))
      }
      </div>

  </>

    )
    }

    </div>
    </>
  ) 
  
}

export default Selected_clause