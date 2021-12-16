import React from "react";
import "./UserProfileRating.css";
import { Col } from "react-bootstrap";
const UserProfileRating = props => {
  return (
    <Col className="ratingBackground" style={{ border: '1px dashed white'}} lg={3}>
      <div className="rating-label123">
          Rating: {props.rating}
      </div>
      <div className="rating-label123">
            Request
      </div>
      <div className="rating-label123">
            Request
      </div>
    </Col>
  );
};

export default UserProfileRating;
