import "./EventItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from '../../store/alert'
import { dialogActions } from "../../store/modal";
import ModalAlert from "../UI/ModalAlert";

const EventItem = (props) => {
  const [currentUserId, setCurrentUserId] = useState('')
  const dispatch = useDispatch();

  const token = useSelector(state => state.authentication.token)

  useEffect(() => {
    const localStoreageData = JSON.parse(localStorage.getItem('userData'))
    const currentUser = localStoreageData.userId
    setCurrentUserId(currentUser)
  }, [])
  const editHandler = () => {

  }

  const toggleModal = () => {
    dispatch(dialogActions.modalAlertToggle())
    dispatch(dialogActions.modalAlertTitle('Delete?'))
  }

  const confirmDeleteHandler = async () => {
    try {
      
      const response = await fetch('http://localhost:5000/events/myevents', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({'eventId':props.eventId})
      })
      const responseData = await response.json()
      if(response.ok){
        console.log('response.OK deleteEvent >>>',responseData)
        dispatch(alertActions.alertToggle())
        dispatch(alertActions.alertVariant('success'))
        dispatch(alertActions.alertTitle(responseData))
        window.location.reload(false);
        dispatch(dialogActions.modalAlertToggle())
      }else{
        dispatch(alertActions.alertToggle())
        dispatch(alertActions.alertVariant('warning'))
        dispatch(alertActions.alertTitle(responseData))
      }
    } catch (error) {
      console.error(error)
    } 
  }

  return (
    <React.Fragment>
    <ModalAlert size="xs" customStyle={{height:'220px', marginTop:'250px'}}> 
      <h5 className="center"> Are you sure you want to delete this item? </h5>
      <Button onClick={confirmDeleteHandler} className="mx-2 btn-danger">Delete</Button>
      <Button onClick={toggleModal}>Cancel</Button>
    </ModalAlert>

    <div className="cardEvent">
      <div className="profileImg">
        <img src={props.profileImg} alt="profile"/>
        <div className="userName">
          <h2>{props.authorFirstName}</h2>
          <h4>@{props.authorUsername}</h4>
        </div>
      </div>
      <div className="infos">
        <span className="userTextSport">{props.sport}</span><span id="tagLevel">#{props.level}</span>
        {/* HERE CHECKS TO SHOW DROPDOWN TO THE OWNER */}
        
        {props.userId === currentUserId && <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            <FontAwesomeIcon icon={faBars}/>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{textAlign:'center'}}>
            <Dropdown.Item onClick={editHandler}>Edit <FontAwesomeIcon icon={faPen} style={{float:'right'}}/></Dropdown.Item>
            <Dropdown.Item onClick={toggleModal}>Delete <FontAwesomeIcon icon={faTrash} style={{float:'right'}}/></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>}
        
        <div className="userTextCity">{props.county === props.city ? props.county : props.county + ', ' + props.city} </div>{props.location.length >= 2 ? <span> Place: {props.location}</span> : null}
        <div className="userTextDescription">{props.description}</div>
        <ul className="eventStats">
          <li>
            <h3>Date</h3>
            <h4>{props.date}</h4>
          </li>
          <li>
            <h3>Start:</h3>
            <h4>{props.time}</h4>
          </li>
          <li>
            <h3 >Joined</h3>
            <h4>1/{props.nrPlayers}</h4>
          </li>
          <li>
            <h3 style={{'width': '100px'}}>Who can join:</h3>
            <h4>{props.allowed === false ? 'Everyone' : `${props.level}`}</h4>
          </li>
        </ul>
      </div>
    </div>
    </React.Fragment>
  );
};

export default EventItem;
