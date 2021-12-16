import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth"; 
import { dialogActions } from "../../store/modal";
import "./HeaderNav.css";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as LogoSvg } from '../../assets/Images/SportTogetherJustLogoSVG1.svg';

const HeaderNav = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated)
  useSelector((state) => state.authentication.token)
  useSelector((state) => state.authentication.tokenExpiration)
  useSelector((state) => state.dialog.modalToggle)

  const handleLogout = () => {
    dispatch(authActions.isAuthenticated(false))
    dispatch(authActions.token(null))
    dispatch(authActions.tokenExpiration(null))
    
    localStorage.removeItem('userData')
    localStorage.removeItem('userLoc')
  };

  const modalHandler = () => {
    dispatch(dialogActions.modalToggle())
  };


  // Nav link if logged in or not
  let paths;
  if(isAuthenticated === true){
    paths=(
      <NavDropdown id="basic-nav-dropdown"
        title={
          <div className="main-wrapper__profile">
            <div className="badge1 custom">
              <div className="circle"><FontAwesomeIcon icon={faUserCircle}/></div>
            </div>
          </div>
        }>
          <LinkContainer to="/myProfile" className="specialTreatmentLink">
           <Nav.Link>
             <FontAwesomeIcon icon={faUserCircle}  style={{'float':'left', 'fontSize':'22px'}}/> <span>Profile</span>
           </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/events/myevents" className="specialTreatmentLink">
           <Nav.Link> 
             <FontAwesomeIcon icon={faCalendarWeek}  style={{'float':'left', 'fontSize':'22px'}}/> <span> My Events</span>
            </Nav.Link>
          </LinkContainer>
          <NavDropdown.Item onClick={handleLogout} className="specialTreatmentLink"> 
            <FontAwesomeIcon icon={faSignOutAlt}  style={{'float':'left', 'fontSize':'22px'}}/> <span>Log out</span>
          </NavDropdown.Item>

      </NavDropdown>
    )
  }else{
    paths = (
    <Nav.Link variant="primary" onClick={modalHandler}>Register</Nav.Link>
    )
  }
  
  return (
    <Navbar expand="lg" sticky="top" id="navbar">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/events">
            <Navbar.Brand><LogoSvg /> Sport Together </Navbar.Brand>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/events">
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
          </Nav>
            {paths}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;

//Icon badge
