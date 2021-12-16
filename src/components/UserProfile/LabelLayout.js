import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faTableTennis, faRunning, faDumbbell, faBowlingBall, faSkating, faVolleyballBall, faSkiing, faPen } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button } from "react-bootstrap";
import blaster from '../../assets/Images/blaster.png'
import './LabelLayout.css'
import SportLabel from "./SportLabel";
import { useDispatch } from "react-redux";
import { dialogActions } from "../../store/modal";
import ModalReg from "../UI/ModalAlert";
import BadgeEditForm from "../Forms/BadgeEditForm";

const LabelLayout = (props) => {
    const [sports, setSports] = useState([null])

    const dispatch = useDispatch()
    // LIST OF COLORS as a class
    // "badge yellow"
    // "badge orange"
    // "badge pink"
    // "badge red"
    // "badge purple"
    // "badge teal"
    // "badge blue"
    // "badge blue-dark"
    // "badge green"
    // "badge green-dark"
    // "badge dark-turquoise"
    // "badge gold"
    // "badge dark"
    // "badge red-dark
    // "badge purple-dark"
    // "badge pink-dark"

    useEffect(() => {
        setSports(props.sports)
            console.log('AAAAA',sports)
    }, [props.sports, sports])

    const handleBadge = () => {
        dispatch(dialogActions.modalAlertToggle())
        
    }

    return(
        
        <Container>
            <ModalReg title="Edit badge" backdrop="true" size="md"> <BadgeEditForm sportsList = {sports}/> </ModalReg>
            <div className="d-flex justify-content-center mb-5">
                <Button onClick={handleBadge}><FontAwesomeIcon icon={faPen}/> Edit badges</Button>
            </div>
            <Row id="label__row">
                <Col><SportLabel className= {sports.Football === 'N/A' ? "badge purple-dark disabled" : "badge purple-dark"} symbol={<FontAwesomeIcon icon={faFutbol} id="football"/>}  skillLevel={sports.Football}/></Col>
                <Col><SportLabel className= {sports.Tennis === 'N/A' ? "badge green disabled" : "badge green"} symbol={<img src="https://img.icons8.com/ios-filled/25/000000/tennis.png" id="tennis" alt="tennis"/>} skillLevel={sports.Tennis}/></Col>
                <Col><SportLabel className= {sports.Jogging === 'N/A' ? "badge green-dark disabled" : "badge green-dark"} symbol={<FontAwesomeIcon icon={faRunning} id="jogging"/>} skillLevel={sports.Jogging}/></Col>
                <Col><SportLabel className= {sports.Basketball === 'N/A' ? "badge teal disabled" : "badge teal"} symbol={<img src="https://img.icons8.com/glyph-neue/30/000000/basketball.png" id="basketball" alt="basketball"/>} skillLevel={sports.Basketball}/></Col>
            </Row>
            <Row id="label__row">
                <Col><SportLabel className= {sports.Workout === 'N/A' ? "badge red disabled" : "badge red"} symbol={<FontAwesomeIcon icon={faDumbbell} id="workout"/>} skillLevel={sports.Workout}/></Col>
                <Col><SportLabel className= {sports.Bowling === 'N/A' ? "badge dark disabled" : "badge dark"} symbol={<FontAwesomeIcon icon={faBowlingBall} id="bowling"/>} skillLevel={sports.Bowling}/></Col>
                <Col><SportLabel className= {sports.Paintball === 'N/A' ? "badge blue disabled" : "badge blue"} symbol={<img src="https://img.icons8.com/ios-filled/30/000000/paintball-gun.png" id="paintball" alt="paintball" />} skillLevel={sports.Paintball}/></Col>
                <Col><SportLabel className= {sports.AirSoft === 'N/A' ? "badge purple disabled" : "badge purple"} symbol={<img src="https://img.icons8.com/ios-filled/30/000000/sports-gun.png" id="airsoft" alt="airsoft"/>} skillLevel={sports.AirSoft}/></Col>
            </Row>
            <Row id="label__row">
                <Col><SportLabel className= {sports.LaserTag === 'N/A' ? "badge orange disabled" : "badge orange"} symbol={<img src={blaster} id="lasertag" alt="lasertag"/>} skillLevel={sports.LaserTag}/></Col>
                <Col><SportLabel className= {sports.IceSkating === 'N/A' ? "badge gold disabled" : "badge gold"} symbol={<FontAwesomeIcon icon={faSkating} id="iceskating"/>} skillLevel={sports.IceSkating}/></Col>
                <Col><SportLabel className= {sports.Skiing === 'N/A' ? "badge dark-turquoise disabled" : "badge dark-turquoise"} symbol={<FontAwesomeIcon icon={faSkiing} id="skiing"/>} skillLevel={sports.Skiing}/></Col>
                <Col><SportLabel className= {sports.TableTennis === 'N/A' ? "badge pink disabled" : "badge pink"} symbol={<FontAwesomeIcon icon={faTableTennis} id="tabletennis"/>} skillLevel={sports.TableTennis}/></Col>
            </Row>
            <Row id="label__row">
                <Col><SportLabel className= {sports.Cycling ==='N/A' ? "badge blue-dark disabled" : "badge blue-dark"} symbol={<img src="https://img.icons8.com/ios-filled/30/000000/cycling-road--v1.png" id="cycling" alt="cycling"/>} skillLevel={sports.Cycling}/></Col>    
                <Col><SportLabel className= {sports.Volleyball === 'N/A' ? 'badge red-dark disabled' : 'badge red-dark'} symbol={<FontAwesomeIcon icon={faVolleyballBall} id="volleyball"/>} skillLevel={sports.Volleyball}/></Col>
                <Col><SportLabel className= {sports.Badminton === 'N/A' ? 'badge yellow disabled' : 'badge yellow'} symbol={<img src="https://img.icons8.com/ios-filled/29/000000/badminton.png" id="badminton" alt="badminton"/>} skillLevel={sports.Badminton}/></Col>
            </Row>
        </Container>
    )
    
}

export default LabelLayout;