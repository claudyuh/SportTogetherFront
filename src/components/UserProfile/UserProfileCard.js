import "./UserProfileCard.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  AddEventForm  from '../Forms/AddEventForm'
import { faPlus, faCalendarCheck, faUserPlus, faCalendarPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Accordion,
  Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../../store/modal";
import { alertActions } from "../../store/alert";
import ModalReg from "../UI/ModalReg";

const UserProfileCard = props => {
  const [userCardDetails, setUserCardDetails] = useState(null)

  const dispatch = useDispatch();
  const token = useSelector(state =>  state.authentication.token)
  const handleAddEvent = () => {
    dispatch(dialogActions.modalToggle())
  }

  const handleJoinConfirmationRequest = async(e, eventId, reqUserId) => {
      e.preventDefault()
      try {
        let response = await fetch('http://localhost:5000/events/joinConfirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          body: JSON.stringify({
            'confirmation': e.target.value,
            'eventId':eventId, 
            'requesterUserId': reqUserId
          })
        })
        const responseData = await response.json()
        console.log(responseData)
        if(response.ok){
          window.location.reload(false);
          dispatch(alertActions.alertToggle())
          dispatch(alertActions.alertVariant('success'))
          dispatch(alertActions.alertTitle('The user has been added to the event'))
        }else{
          dispatch(alertActions.alertToggle())
          dispatch(alertActions.alertVariant('warning'))
          dispatch(alertActions.alertTitle('Something went wrong'))
        }
        
      } catch (error) {
        console.log(error)
      }   
  }

  
  useEffect(() => {
    const fetchData = async() => {
      try {
        let response = await fetch('http://localhost:5000/events/eventsdetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          }
        })
        const responseData = await response.json()
        setUserCardDetails(responseData)
      } catch (error) {
        console.log(error)
      }
    }   
    fetchData();
  }, [token])


  if (userCardDetails === null) {
    return null;
  }

  return (
    <React.Fragment>
      {console.log('Randari la greu')}
      <ModalReg title="Create new event" size="lg">
        <AddEventForm/>
      </ModalReg>

      <Col xl={3} className="mainColProfile">
        <Card className="cardProfile">
          <div id="imageSettings">
            <Card.Img
              variant="top"
              src={props.userDetails.profileImg}
              alt="profile"
            />
          </div>
          <Card.Body>
            <Card.Title className="text-center">
              {props.userDetails.username}
            </Card.Title>
          </Card.Body>
        </Card>

        <div className="profileCardList">
          <ListGroup defaultActiveKey="#link1">
            <Accordion>
              <Accordion.Item eventKey="0" >
                <Accordion.Header>
                  <div className="cardFont" >
                    <h6>
                      <FontAwesomeIcon icon={faUserPlus} size="lg" /> People requests <span className="littleCircle">{userCardDetails.objRequestFromUser ? userCardDetails.objRequestFromUser.length : 0}</span>
                    </h6>
                  </div>
                </Accordion.Header>
                {userCardDetails.objRequestFromUser.length === 0 ? 
                <Accordion.Body>
                  <ListGroup.Item action>
                    Empty
                  </ListGroup.Item>
                </Accordion.Body>
                :
                userCardDetails.objRequestFromUser.map((item, index) => 
                <Accordion.Body key={index}>
                  <div>
                    {console.log(item)}
                    <ListGroupItem>
                      <h6 className="center mb-3"> {item.sport + ' ' + item.level}  *Link WIP</h6>
                      <div id="listGroupItemLayout">
                        <img
                          src={item.profileImage}
                          alt="Profile Error"
                        />
                        <h6> {item.firstName + ' ' + item.lastName[0]} sent a request to join you! </h6>
                      </div>
                        <span> View Profile WIP </span>
                        <br/>
                        <div className="mt-3 d-flex justify-content-around">
                        <Button className="btn-sm" variant="dark" value='accept' onClick={(e) =>handleJoinConfirmationRequest(e, item.eventId, item.userId)}>Accept</Button>
                        <Button className="btn-sm" variant="dark" value='decline' onClick={(e) =>handleJoinConfirmationRequest(e, item.eventId, item.userId)}>Decline</Button>
                      </div>
                    </ListGroupItem>
                  </div>
                </Accordion.Body>
                )}
              </Accordion.Item>
            </Accordion>
            {/* Accordion for quick show events */}
            <Accordion>
              <Accordion.Item eventKey="1" >
                <Accordion.Header>
                  <div className="cardFont" >
                    <h6>
                      <FontAwesomeIcon icon={faCalendarCheck} size="lg" /> Joined events<span className="littleCircle">{userCardDetails.objJoinedEventsData ? userCardDetails.objJoinedEventsData.length : 0}</span>
                    </h6>
                  </div>
                </Accordion.Header>
                {userCardDetails.objJoinedEventsData.length === 0 ?
                <Accordion.Body>
                  <ListGroup.Item action>
                    No joined events
                  </ListGroup.Item>
                </Accordion.Body>
                :
                userCardDetails.objJoinedEventsData.map((elem, ind) => 
                <Accordion.Body key={ind}>
                  <div>
                    <ListGroupItem>
                      <div>
                        <h6> {elem.sportType + ' ' + elem.sportLevel} *Link WIP </h6>
                      </div>
                        <span>Author</span>
                          <img id='joinedAuthorProfile' key='author' src={elem.authorImg} alt="author profile"/>
                      <div id="btnAcceptRefuse">
                          
                        <br />
                        <span> Members </span>
                        {
                          elem.playerIdsAndImg.map((item, ind) =>
                          <img
                          key={ind}
                          src={item.profileImg}
                          alt="..."
                          />)
                        }
                      
                      </div>
                    </ListGroupItem>                    
                  </div>
                </Accordion.Body>)
                }
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="1" >
                <Accordion.Header>
                  <div className="cardFont" >
                    <h6>
                      <FontAwesomeIcon icon={faPaperPlane} size="lg" /> Pending sent requests<span className="littleCircle">{userCardDetails.objSentPendingRequests ? userCardDetails.objSentPendingRequests.length : 0}</span>
                    </h6>
                  </div>
                </Accordion.Header>
                {userCardDetails.objSentPendingRequests.length === 0  ?
                <Accordion.Body>
                  <ListGroup.Item action>
                    Looks like you didn't join any event
                  </ListGroup.Item>
                </Accordion.Body>
                :
                userCardDetails.objSentPendingRequests.map((item, index) => 
                <Accordion.Body key={index}>
                  <div>
                    <ListGroupItem>
                      <div>
                        Event owner: {item.authorFirstName}
                      </div>
                      <div className="my-3">
                        <h6> Event:{item.sportType + ' ' + item.sportLevel} </h6>
                      </div>
                      <Button className="btn-sm" variant="secondary">Event details</Button>
                    </ListGroupItem>                    
                  </div>
                </Accordion.Body>
                )}
              </Accordion.Item>
            </Accordion>
          </ListGroup>
          <ListGroup.Item action onClick={handleAddEvent}><FontAwesomeIcon icon={faPlus} size="lg" /> Create new event</ListGroup.Item>
          <Link to="events/myevents" style={{textDecoration:'none'}}>
            <ListGroup.Item action ><FontAwesomeIcon icon={faCalendarPlus} size="lg"/> Created events</ListGroup.Item>
          </Link>
        </div>


        {/* TO ADD AFTER ! */}
      </Col>
    </React.Fragment>

  );
};

export default UserProfileCard;
