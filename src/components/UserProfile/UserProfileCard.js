import "./UserProfileCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  AddEventForm  from '../Forms/AddEventForm'
import { faPlus, faCalendarCheck, faUserPlus, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Accordion,
  Col
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { dialogActions } from "../../store/modal";
import ModalReg from "../UI/ModalReg";

const UserProfileCard = props => {

  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch(dialogActions.modalToggle())
  }

  return (
    <React.Fragment>

      <ModalReg title="Create new event" size="lg">
        <AddEventForm/>
      </ModalReg>

      <Col xl={3} className="mainColProfile">
        <Card className="cardProfile">
          <div id="imageSettings">
            <Card.Img
              variant="top"
              src={props.userData.profileImg}
              alt="profile"
            />
          </div>
          <Card.Body>
            <Card.Title className="text-center">
              {props.userData.username}
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
                      <FontAwesomeIcon icon={faUserPlus} size="lg"/> Message requests!<span className="littleCircle">7</span>
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <ListGroupItem>
                      <img
                        src="https://res.cloudinary.com/dy216j0wr/image/upload/v1636833152/womanPlaceholder_iove4a.jpg"
                        alt="..."
                      />
                      <div>
                        <h6> "Username" Sent you a request to join you! </h6>
                      </div>
                      <div id="btnAcceptRefuse">
                        <span> Check profile </span>
                        <Button className="btn-sm"> Accept </Button>
                        <Button className="btn-sm"> Decline </Button>
                      </div>
                    </ListGroupItem>
                  </div>
                  <div>
                    <ListGroupItem>
                      <img
                        src="https://res.cloudinary.com/dy216j0wr/image/upload/v1636833152/womanPlaceholder_iove4a.jpg"
                        alt="..."
                      />
                      <div>
                        <h6> "Username" Sent you a request to join you! </h6>
                      </div>
                      <div id="btnAcceptRefuse">
                        <span> Check profile </span>
                        <Button className="btn-sm"> Accept </Button>
                        <Button className="btn-sm"> Decline </Button>
                      </div>
                    </ListGroupItem>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* Accordion for quick show events */}
            <Accordion>
              <Accordion.Item eventKey="1" >
                <Accordion.Header>
                  <div className="cardFont" >
                    <h6>
                      <FontAwesomeIcon icon={faCalendarCheck} size="lg"/> Joined events<span className="littleCircle">1</span>
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <ListGroupItem>
                      <div>
                        <h6> Jogging Recreational </h6>
                      </div>
                      <div id="btnAcceptRefuse">
                        <span> People </span>
                        <img
                        src="https://res.cloudinary.com/dy216j0wr/image/upload/v1636833152/womanPlaceholder_iove4a.jpg"
                        alt="..."
                        />
                        <img
                        src="https://res.cloudinary.com/dy216j0wr/image/upload/v1637080434/SportTogether/rguwcqk8xqrjp0ahvj1c.jpg"
                        alt="..."
                        />
                        <img
                        src="https://res.cloudinary.com/dy216j0wr/image/upload/v1636833152/womanPlaceholder_iove4a.jpg"
                        alt="..."
                        />
                      </div>
                    </ListGroupItem>
                    or
                    <ListGroup.Item action>
                      No joined events to show
                    </ListGroup.Item>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <ListGroup.Item action onClick={handleAddEvent}><FontAwesomeIcon icon={faPlus} size="lg" /> Create new event</ListGroup.Item>
            <Link to="events/myevents" style={{textDecoration:'none'}}>
            <ListGroup.Item action ><FontAwesomeIcon icon={faCalendarPlus} size="lg"/> Created events</ListGroup.Item>
            </Link>
            <ListGroup.Item action>WIP</ListGroup.Item>
            <ListGroup.Item action>WIP</ListGroup.Item>
            <ListGroup.Item action>WIP</ListGroup.Item>
            <ListGroup.Item action>WIP</ListGroup.Item>
          </ListGroup>
        </div>

        {/* TO ADD AFTER ! */}
      </Col>
    </React.Fragment>

  );
};

export default UserProfileCard;
