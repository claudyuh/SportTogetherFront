import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../../store/modal";

function ModalAlert(props) {    
  const dispatch = useDispatch();
  const modalAlertShow = useSelector(state => state.dialog.modalAlertToggle)
  const onHideFunction = () => {
    dispatch(dialogActions.modalAlertToggle())
  }
  
    return (
      <Modal 
        show={modalAlertShow} 
        onHide={onHideFunction} 
        size={props.size} 
        style={props.customStyle}
        backdrop={props.backdrop || 'static'}
        fullscreen={props.fullscreen}
        centered
        > 
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body> {props.children} </Modal.Body>      
    </Modal>
    );
  }


export default ModalAlert
  