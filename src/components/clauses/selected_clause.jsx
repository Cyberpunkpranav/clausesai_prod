import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useParams,useLocation } from 'react-router-dom'
import axios from 'axios'
import { GetClausesByName } from '../../api/getapis' 
import '../../css/clauses.css'
import { Helmet } from 'react-helmet'
import SelectedClause_Loader from './selected_clause_loader'

const Selected_clause = () => {
  const approach_ref = useRef(null)
    const {clause_name} = useParams()
    // let { state } = useLocation();
    // const id = state.id
    const[data,setdata] = useState()
    const[index,setindex] =useState(0)
    const[loading,setloading] = useState(false)
    const Fetch_Clause=async()=>{
        setloading(true)
        const Data = await GetClausesByName(clause_name)
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
              //  id:id,
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
      {/* <Link to='../clauses' className='allclauses position-absolute d-inline mx-auto text-blue1 text-decoration-none'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link> */}
      {/* <h2 className='fw-normal position-absolute heading'>{data!=undefined?data.clause_name:""}</h2> */}
      <Link to='../clauses' className='d-flex align-items-center justify-content-end text-blue1 text-decoration-none'><img src={process.env.PUBLIC_URL+'/images/all_blue1.png'} className='img-fluid icon-small me-1'/><small className='text-end'>All clauses</small></Link>
      <div className="row p-0 m-0 justify-content-between mt-2 align-items-end">
        <div className="col-sm-12 col-md-6 col-lg-auto ps-0 ms-0">
        <h1 className='fw-normal'>{data!=undefined?data.clause_name:""}</h1>
        </div>
        <div className="col-sm-12 col-md-6 text-end col-lg-auto mb-2 p-0">
        <small className=' text-gray2 text-start text-sm-end fw-light'> "{data!==undefined && data.clauses!==undefined ?data.clauses.length:""}" approaches of "{data!=undefined?data.clause_name:""}" exists</small>
        </div>
      </div>
      <hr className='p-0 m-0'/>

      <div className="question row align-items-center mt-4 p-0 m-0">
        <div className="col-1 p-0 d-flex justify-content-center align-items-center">
        <img className='img-fluid icon-mid' src={process.env.PUBLIC_URL+'/images/question.png'}/>
        </div>
        <div className="col-11 pe-0">
        <p className='fw-normal p-0 m-0 text-gray2'>{data!=undefined?data.rationale:''}</p>
        </div>
      {/* <h6 className='fw-normal text-black'>When,Why and Where to use {data!=undefined?data.clause_name:""} ?</h6> */}
      </div>
      
      <div className='approaches pt-4 ms-0'>
        <div className="nav nav-tabs pt-2 align-items-end scroll border-0 p-0 m-0" id='nav-tab' role="tablist">
          {
          data!=undefined && data.clauses.map((data,i)=>( 
            <p key={i} onClick={()=>setindex(i)} className={`p-0 m-0 px-3 py-2 fw-semibold position-relative cursor-pointer me-5 me-md-5 me-lg-5 text-gray2 ${i==0?'active':''}`} id={`nav-${data.id}-tab`} data-bs-toggle="tab" data-bs-target={`#nav-${data.id}`} type="button" role="tab" aria-controls={`nav-${data.id}`} aria-selected="true">
              {data.nature?data.nature:<i>clause type {i+1}</i>}
          </p>
          ))
          }
        </div>
      </div>
      <div className="tab-content bg-blue13 px-3 pb-3 pt-2 p-0 m-0 clause_alt" id="nav-tabContent">
      {
          data!=undefined && data.clauses.map((DATA,i)=>( 
            <div key={i} className={`tab-pane p-0 m-0 ${i==0?'fade show active':''} `} id={`nav-${DATA.id}`} role="tabpanel" aria-labelledby={`nav-${DATA.id}-tab`} tabIndex={`0`} >
            <div className="d-flex justify-content-end align-items-center cursor-pointer py-2" data-bs-toggle="collapse" data-bs-target="#collapseinfo" aria-expanded="false" aria-controls="collapseExample">
            <small className='fw-normal text-end text-blue1 p-0 m-0'>Know more about {DATA.nature?DATA.nature.toLowerCase():'clause type '+(i+1)} </small>
            <img src={process.env.PUBLIC_URL+'/images/info_blue1.png'} className={`ms-1 img-fluid icon-small`} />
            </div>
              <div className="collapse" id="collapseinfo">
              <div className="row justify-content-md-center justify-content-lg-between p-0 m-0 g-2 gx-lg-3">
              <div className="col-12 col-sm-11 col-md-6 col-lg-6 col-xl-5 col-xxl-5 ps-0">
                <div className="row Card p-0 m-0 rounded-4 p-md-3 p-lg-4 bg-blue12">
                  <div className=" col-2 col-sm-2 mt-2 ms-3 mb-2 mt-md-0 ms-md-0 mb-md-0 col-lg-2 p-0 m-0">
                  <img className='img-fluid' src={process.env.PUBLIC_URL+'/images/why.png'}/>
                  </div>
                  <div className="col-12 col-sm-12 col-md-10 col-lg-10">
                  <h6 className='fw-normal text-black'>Why to choose {DATA.nature?DATA.nature.toLowerCase():'clause type '+(i+1)} clause under <h6 className='d-inline fw-normal text-blue1'>{data!=undefined?data.clause_name.toLowerCase():""} </h6></h6>
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
                  <h6 className='fw-normal text-black'>Let us understand relevance of having a <h6 className='d-inline fw-normal text-greenmain'>{data!=undefined?data.clause_name.toLowerCase():""} </h6> under <span className='fw-normal'>{data.clauses[i].nature?data.clauses[i].nature.toLowerCase():<i>clause type {i+1}</i>}</span>{' '} </h6>
                  <p className='text-gray1 fw-normal'>{DATA.explaination?DATA.explaination:DATA.explaination}</p> 
                  </div>
                </div>

              </div>
              </div>
              </div>
              <ul className="nav nav-pills scroll ps-3 pt-2 mt-1 flex-nowrap align-items-end p-0 m-0" id="pills-tab" role="tablist">
                {
                  DATA.simple  ? (
                    <li className="nav-item" role="presentation">
                    <p className="cursor-pointer active mb-0 rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-simple`} aria-selected="true">Simple</p>
                  </li>
                  ):(<></>)
                }
                {
                  DATA.moderate ? (
                    <li className="nav-item" role="presentation">
                    <p className="cursor-pointer text-gray2 mb-0 ms-5 ms-md-5 ms-lg-5 mxs-xl-5 ms-xxl-6 rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-moderate`} aria-selected="false">Moderate</p>
                  </li>
                  ):(<></>)
                }
                {
                  DATA.complex ? (
                  <li className="nav-item" role="presentation">
                  <p className="cursor-pointer mb-0 text-gray2 ms-5 ms-md-5 ms-lg-5 mxs-xl-5 ms-xxl-6 rounded-0" id={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex`} role="tab" aria-controls={`pills-${DATA.nature?DATA.nature.replace(" ",'-'):`clausetype${DATA.id}`}-complex`} aria-selected="false">Complex</p>
                  </li>
                  ):(<></>)
                }
                
              </ul>
                <div className="tab-content border-1 border-start-0 border-end-0 border-bottom-0 border-blue1 bg-white py-4 ps-3" id="pills-tabContent">
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