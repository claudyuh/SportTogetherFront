import React from "react";
import './TestComponent.css'

const TestComponent = (props) => {

    return (
      <div className="bio-box">
        <div className="job__title">
          Dummy Founder and CEO at <strong>Dummy NewSpot</strong>
        </div>
        <p className="city__label" >
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <span className='p-2'>{props.county}</span>
        </p>
        <p>About</p>
        <div className="desc">
          (Dummy Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.Dummy Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.Dummy Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam.)DUMMY
        </div>
      </div>
    )
}

export default TestComponent