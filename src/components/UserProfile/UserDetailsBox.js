import React from "react";
import "./UserDetailsBox.css";
import { Col, Row } from "react-bootstrap";
import UserDescription from "./UserDescription";
const UserDetailsBox = (props) => {
  return (
    <Col style={{border:'1px dashed white'}}  lg={7}>
      <div className="sectionUserDescription">
        <h4 className='name__'>{props.userDetails.firstName + " " + props.userDetails.lastName}</h4>
        <Row className="post-label">
          <Col>Animal Lover</Col>
          <Col>Sport</Col>
          <Col>Cooking</Col>
        </Row>

        <UserDescription county={props.userDetails.county}/>

        <div className="footer">
          <div className="footer-box">
            <i className="fa fa-facebook"></i>
          </div>
          <div className="footer-box">
            <i className="fa fa-twitter"></i>
          </div>
          <div className="footer-box">
            <i className="fa fa-linkedin"></i>
          </div>
          <div className="footer-box">
            <i className="fa fa-instagram"></i>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default UserDetailsBox;
