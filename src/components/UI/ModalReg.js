import {Modal} from 'react-bootstrap';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { dialogActions } from '../../store/modal';
import './Modal.css'

function ModalReg(props) {

  const dispatch = useDispatch();
  const modalShow = useSelector((state) => state.dialog.modalToggle)
  
  const onHideFunction = () => {
    dispatch(dialogActions.modalToggle())
  }

  return (
    <Modal 
      show={modalShow} 
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
      <Modal.Footer> {props.footer} </Modal.Footer>      
    </Modal>
  );
}

export default ModalReg;