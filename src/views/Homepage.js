import React, { useEffect, useState } from "react";
import './Homepage.css'
import { Col, Row, Container } from "react-bootstrap";
import CarouselHomepage from "../components/Layout/CarouselHomepage";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from '../components/Forms/RegisterForm'
import tennisImg from "../assets/Images/tennis-front.jpg"
import ModalReg from "../components/UI/ModalReg";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [mounted, setMounted] = useState(false)
  const [rentState, setRentState] = useState('rent111')
  const [sellState, setSellState] = useState('sell111')
  const [exploreState, setExploreState] = useState('explore111')

  const auth = useSelector((state) => state.authentication.isAuthenticated)
  useEffect(() => {
    setMounted(true)
  }, [])
  // when dependency LOGGED in is changed this will run and will set state to 'unmounted'
  useEffect(() => {
    if(auth === true){
      setMounted(false)
    }
  }, [auth])

  // this will RUN on every rerender of this component cuz no dependencies [], but if STATE Unmounted it will not run thanks to me ^^
  useEffect(() => {
    const timeOuts = () => {
      setTimeout(() => {
        setRentState('rent112')
        setExploreState('explore111')
        setTimeout(() => {
          setRentState('rent111')
          setSellState('sell112')
          setTimeout(() => {
            setSellState('sell111')
            setExploreState('explore112')
          }, 1500);
        }, 1500);
      }, 1500);
    };
    if(mounted){
      timeOuts();
      setInterval(timeOuts, 4500);
    }
    // this returns nothing
    return () => {}
  },[mounted])
  

  
    return (
      <React.Fragment >
      <div id="welcomeBox">
      <Container >
      <Row>
        <Col>
          <div className="container123">
            <div id="box111">
              <div>
                <span className={rentState}>Connect.</span>
              </div>
              <div>
                <span className={sellState}>Play.</span>
              </div>
              <div>
                <span className={exploreState}>Engage.</span>
              </div>
            </div>
          </div>
        </Col>
        <Col>
            <div id="arrowUp"><FontAwesomeIcon icon={faLevelUpAlt} /> </div>
          <div className=" registerMessage">
            <div>Not registered yet?</div> 
            <div> Create an account, it only takes one minute!</div>
          </div>
          <LoginForm />
        </Col>
      </Row>
      </Container>
      </div>
      <div><img id='homepageImg' src={tennisImg} alt="..."/></div>
      <Container >
          <Row>
            <ModalReg /* OPTIONAL>  title="sometitle"  */size='lg' fullscreen="false"> <RegisterForm/> </ModalReg>
            <Col xl={{span:4, order:'first'}}><CarouselHomepage/></Col>
          </Row>
      </Container>  
    </React.Fragment>
  );
};

export default Homepage;
