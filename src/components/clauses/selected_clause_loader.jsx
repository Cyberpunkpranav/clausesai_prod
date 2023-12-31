import React from 'react'
import '../../css/clauses.css'
const SelectedClause_Loader = () => {
  return (
    <>
    <div className="row p-0 m-0 justify-content-between align-items-end p-0 m-0 mt-5">
    <div className="col-sm-12 col-md-6 ps-0 ms-0 col-lg-5 placeholder-glow">
    <h2 className='fw-normal col-3 col-md-5 col-lg-6 p-0 placeholder'></h2>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-7 text-end ps-0 placeholder-glow">
    <p className='fw-normal col-8 text-gray2 text-start p-0 text-md-end placeholder'></p>
    </div>
  </div>
  <hr className='p-0 m-0'/>
     <div className="question my-2 my-md-3 my-lg-4 placeholder-glow">
     <h6 className='fw-normal text-gray1 col-9 placeholder'></h6>
     <p className=' mt-2 fw-light text-gray2 col-7 placeholder'></p>
     </div>
     <div className='mt-5 ms-0'>
        <div className="nav nav-tabs scroll border-0 p-0 m-0 placeholder-glow" id='nav-tab' role="tablist">
        <small className='col-6 col-sm-6 col-md-4 col-lg-2 placeholder cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0' id='nav-1-tab' data-bs-toggle="tab" data-bs-target='#nav-1' type="button" role="tab" aria-controls='nav-1' aria-selected="true"></small>
        <small className='col-6 col-sm-6 col-md-4 col-lg-2 placeholder cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0 ' id='nav-2-tab' data-bs-toggle="tab" data-bs-target='#nav-2' type="button" role="tab" aria-controls='nav-2' aria-selected="true"></small>
        </div>
      </div> 

      <div className='mt-5 ms-0'>
        <div className="nav nav-tabs scroll border-0 p-0 m-0 placeholder-glow" id='nav-tab' role="tablist">
        <small className='col-6 col-sm-6 col-md-4 col-lg-2 placeholder cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0' id='nav-1-tab' data-bs-toggle="tab" data-bs-target='#nav-1' type="button" role="tab" aria-controls='nav-1' aria-selected="true"></small>
        <small className='col-6 col-sm-6 col-md-4 col-lg-2 placeholder cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0 ' id='nav-2-tab' data-bs-toggle="tab" data-bs-target='#nav-2' type="button" role="tab" aria-controls='nav-2' aria-selected="true"></small>
        <small className='col-6 col-sm-6 col-md-4 col-lg-2 placeholder cursor-pointer p-0 m-0 me-3 me-md-3 me-lg-5 border-start-0 border-end-0 border-top-0 rounded-0 ' id='nav-3-tab' data-bs-toggle="tab" data-bs-target='#nav-3' type="button" role="tab" aria-controls='nav-3' aria-selected="true"></small>
        </div>
      </div> 
      <div className="placeholder-glow mt-3">
      <p className=' mt-2 fw-light text-gray2 col-11 placeholder'></p>
      <p className=' mt-2 fw-light text-gray2 col-11 placeholder'></p>
      <p className=' mt-2 fw-light text-gray2 col-11 placeholder'></p>

      </div>
    </> 
  )
}

export default SelectedClause_Loader