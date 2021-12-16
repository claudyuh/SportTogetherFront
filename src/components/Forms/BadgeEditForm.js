import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../../store/modal";
import './BadgeEditForm.css'

const BadgeEditForm = (props) => {
    const [selectedSport, setSelectedSport] = useState()
    const [selectedSkill, setSelectedSkill] = useState()
    
    const token = useSelector((state) => state.authentication.token)
    const dispatch = useDispatch()

    const handleSportSelection = (e) => {
        setSelectedSport(e.target.getAttribute('value'))
    }

    const handleSkillSelection = (e) => {
        setSelectedSkill(e.target.getAttribute('value'))
    }
    

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:5000/myprofile/editbadge", {
                method: "POST",
                headers: new Headers({
                  Authorization: "Bearer " + token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    sport: selectedSport,
                    skill: selectedSkill,
                }),
            })
            const responseData = await response.json();
            if(response.ok){
                console.log('responseData badge>', responseData)
                window.location.reload(false);
                dispatch(dialogActions.modalToggle())
            }else{
                console.log('responseData', responseData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>

            <Row className="selectionStyle">
                {!selectedSport && 
                    <>
                        <div id="selectedSport123"> Choose the sport badge you want to edit </div>
                        <Col>
                            <div value="Tennis" onClick={handleSportSelection}>Tennis</div>
                            <div value="Football" onClick={handleSportSelection}>Football</div>
                            <div value="TableTennis" onClick={handleSportSelection}>Table Tennis</div> 
                            <div value="Jogging" onClick={handleSportSelection}>Jogging</div>
                            <div value="Cycling" onClick={handleSportSelection}>Cycling</div>
                            <div value="Paintball" onClick={handleSportSelection}>Paintball</div>
                            <div value="AirSoft" onClick={handleSportSelection}>Air-Soft</div>
                            <div value="Skiing" onClick={handleSportSelection}>Skiing</div>
                        </Col>
                        <Col>
                            <div value="Basketball" onClick={handleSportSelection}>Basketball</div>
                            <div value="Workout" onClick={handleSportSelection}>Workout</div>
                            <div value="Volleyball" onClick={handleSportSelection}>Volleyball</div>
                            <div value="Badminton" onClick={handleSportSelection}>Badminton</div>
                            <div value="IceSkating" onClick={handleSportSelection}>Ice Skating</div>
                            <div value="Bowling" onClick={handleSportSelection}>Bowling</div>
                            <div value="LaserTag" onClick={handleSportSelection}>Laser Tag</div>
                        </Col>
                    </>
                }
            </Row>
          
            <div className="selectionStyle">
            {
                selectedSport && 
                <>
                    <div id="selectedSport123">Selected sport: <span className="someSpanStyles">{selectedSport}</span></div>
                    {!selectedSkill &&
                    <>
                    {console.log(props.sportsList.selectedSport)}
                    <div> Choose your skill level:</div>
                    <div onClick={handleSkillSelection}>
                        {props.sportsList.selectedSport !== 'N/A' && <div className='my-3' value="N/A">Disable Badge</div>}
                        <div value="Recreational">Recreational</div>
                        <div value="Beginner">Beginner</div>
                        <div value="Intermediate">Intermediate</div>
                        <div value="Advanced">Advanced</div>
                    </div>
                    </>
                    }
                    {selectedSkill && 
                    <form action="/myprofile/editbadge" onSubmit={submitHandler}>
                        <div id="selectedSport123"> Skill level: <span className="someSpanStyles"> {selectedSkill} </span> </div>
                        <Button variant="dark" type="submit">Submit changes</Button>
                    </form>
                    }
                </>
            }
            </div>
        </React.Fragment>
    )
}

export default BadgeEditForm;