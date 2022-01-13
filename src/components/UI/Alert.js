import React from "react";
import './Alert.css'
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AlertDismissible = (props) => {
  const alertVariant = useSelector((state) => state.alert.alertVariant)
  const alertTitle = useSelector((state) => state.alert.alertTitle)


  return (
    <Alert variant={alertVariant}>
      <FontAwesomeIcon style={{float:'right'}} icon={faTimes} size="2x"/>
    <Alert.Heading style={{fontSize:'16px', paddingTop:'6px'}} className="center">{alertTitle}</Alert.Heading>
    </Alert>
  );
}
  
  

  export default AlertDismissible