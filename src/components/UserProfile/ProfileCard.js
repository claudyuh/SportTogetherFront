import React, {useState} from "react";
import './ProfileCard.css'
import { Col, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ModalReg from "../UI/ModalReg";
import UploadIcon from "../Forms/UploadIcon";
import { dialogActions } from "../../store/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle, faPen} from "@fortawesome/free-solid-svg-icons";


const ProfileCard = (props) => {
    const [showModalType, setShowModalType] = useState(0)
    const [coverModal, setCoverModal] = useState(false)  
  
    const dispatch = useDispatch();  
  
    const handleViewProfile = () => {
      setShowModalType(1)
      dispatch(dialogActions.modalToggle())
    }
  
    const handleChangeProfile = () => {
      setShowModalType(2)
      dispatch(dialogActions.modalTitle('Change profile picture'))
      dispatch(dialogActions.modalToggle())
    };
  
    const handleChangeCover = () => {
        // ATTENTION HERE MODAL REGISTER FROM HOMEPAGE OPENS ON BUTTON CLICK
      setCoverModal(true)
      dispatch(dialogActions.modalTitle('Change cover picture'))
      dispatch(dialogActions.modalToggle())
    }
  
  
    return(   
        <Col lg={10}>

          {showModalType === 1 && <ModalReg size="lg" fullscreen="false">
            <img src={props.userProfileImg} alt="profile pic" 
              style={{width: "300px",
              objectFit: 'cover',
              marginLeft: '35px',
              marginTop:'50px'
            }}/> 
          </ModalReg>}

          {showModalType === 2 && < UploadIcon/>}
          {coverModal && < UploadIcon/>}


            <div className="coverImg123">
              <img  src={props.userCoverImg} alt="cover" />
              <button onClick={handleChangeCover} className="btn btn-dark editCoverBtn"> 
                  <FontAwesomeIcon icon={faPen}/> Edit cover photo 
              </button>
              <div className="user-image123">
                    <img className="profileImg123" src={props.userProfileImg} alt="profile" />
                    <div className="after123"><FontAwesomeIcon icon={faEdit}/></div>
                <Dropdown>
                  <Dropdown.Toggle id="dropdownBtn">
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className='listDropdown' onClick={handleViewProfile}><FontAwesomeIcon icon={faUserCircle} style={{'float':'left', 'fontSize':'22px'}}/><span>View profile picture</span></Dropdown.Item>
                    <Dropdown.Item className='listDropdown' onClick={handleChangeProfile}><FontAwesomeIcon icon={faEdit} style={{'float':'left', 'fontSize':'22px'}}/><span>Change profile picture</span></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
        </Col>

    )
}

export default ProfileCard 