import React from 'react'
import "./HomeDash.css";
import { lady, blacky, bash, tallest } from '../../assets';

const HomeDash = () => {
  return (
    <div className='--flex-center _homeDashCon'>
    <div className='__paraCon'>
     <h1 className='__paraHeader'>Welcome back, Jackie!</h1>
    </div>

     <div className='__secondCon'>
       <h3 className='__quickTitle'>Quick Starts</h3>

       <div className='__flex __boards'>
         <div className='__board'>
           <p className='__boardHead'>120</p>
           <p className='__boardDetails'>Total students</p>
         </div>
         <div className='__board'>
           <p className='__boardHead'>100</p>
           <p className='__boardDetails'>Active students</p>
         </div>
         <div className='__board'>
           <p className='__boardHead'>20</p>
           <p className='__boardDetails'>Inactive students</p>
         </div>
         <div className='__board'>
           <p className='__boardHead'>$20,000</p>
           <p className='__boardDetails'>Total revenue</p>
         </div>
       </div>
     </div>

     <div className="--flex-center __firstCon">

      <h4 className="__title">Recent Activity</h4>

      <div className="__users">
        <div className="__firstUserPic">
          <img src={lady} alt="lady-picture" />
        </div>

        <div className="__userData">
          <div>
            <h5>Kenny</h5>

            <p>Kenny has been checked out</p>
          </div>

          <p>5 mins ago</p>


        </div>
      </div>
      <div className="__users">
        <div className="__firstUserPic">
          <img src={blacky} alt="lady-picture" />
        </div>

        <div className="__userData">
          <div>
            <h5>Bode</h5>

            <p>Bode has been checked out</p>
          </div>

          <p>5 mins ago</p>


        </div>
      </div>
      <div className="__users">
        <div className="__firstUserPic">
          <img src={bash} alt="lady-picture" />
        </div>

        <div className="__userData">
          <div>
            <h5>Hayzed</h5>

            <p>Hayzed has been checked out</p>
          </div>

          <p>5 mins ago</p>


        </div>
      </div>
      <div className="__users">
        <div className="__firstUserPic">
          <img src={tallest} alt="lady-picture" />
        </div>

        <div className="__userData">
          <div>
            <h5>Tumise</h5>

            <p>Tumise has been checked out</p>
          </div>

          <p>5 mins ago</p>


        </div>
      </div>


      
     </div>
 </div>
  )
}

export default HomeDash
