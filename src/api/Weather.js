import React, {} from "react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Weather.css";

const Weather = () => {

    
  return (
    <div className="containerWeather">
        <div>
            <div className="row cardWeather">
                <div className="col-12 left">
                    <div className="row top">
                        <div className="col cityWeather"><FontAwesomeIcon icon={faMapMarkerAlt}/> Moscow</div>
                    </div>
                    <div className="row">
                        <div className="col-6 temp">-4&deg;</div>
                        <div className="col-6 time">
                            <p>Today</p>
                            <h2><b>Saturday</b></h2>
                            <p className="paragraph1">Cloudy</p>
                        </div>
                    </div>
                    <div className="row bottom">
                        <div className="col">
                            <hr/>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col border123">
                                <div className="row">Sat</div>
                                <div className="row"><b>-4&deg;</b></div>
                            </div>
                            <div className="col">
                                <div className="row">Sun</div>
                                <div className="row"><b>-4&deg;</b></div>
                            </div>
                            <div className="col">
                                <div className="row">Mon</div>
                                <div className="row"><b>-5&deg;</b></div>
                            </div>
                            <div className="col">
                                <div className="row">Tue</div>
                                <div className="row"><b>-10&deg;</b></div>
                            </div>
                            <div className="col">
                                <div className="row">Wed</div>
                                <div className="row"><b>-4&deg;</b></div>
                            </div>
                            <div className="col">
                                <div className="row">Thu</div>
                                <div className="row"><b>-2&deg;</b></div>
                            </div>
                        </div>
                        <p className="center mt-3" style={{fontSize:'12px'}}>Automatically updated every 4h</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Weather;
