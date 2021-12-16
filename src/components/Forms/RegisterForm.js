import React, {useState, useEffect} from "react";
import Select from 'react-select'
import { Form, Button, Spinner, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert";
import { dialogActions } from "../../store/modal";
import "./RegisterForm.css";
import countyList from "../../utils/CitiesAndCountiesRo/countyList";
import countyCityList from "../../utils/CitiesAndCountiesRo/countyCityList";
import customStyles from "../../utils/ReactSelect/RSCustomStyle";
import { ReactComponent as LogoSvg } from '../../assets/Images/SportTogetherJustLogoSVG1.svg';

const RegisterForm = () => {  
  const [inputEmail, setInputEmail] = useState('')
  const [inputUsername, setInputUsername] = useState('')
  const [inputFirst, setInputFirst] = useState('')
  const [inputLast, setInputLast] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [inputConfirmPw, setInputConfirmPw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [buttonClass, setButtonClass] = useState()
  const [inputGender, setInputGender] = useState('')
  const [isError, setIsError] = useState()
  const [inputCounty, setInputCounty] = useState("Select County...")
  const [cityValidation, setCityValidation] = useState('')
  const [genderValidation, setGenderValidation] = useState('')
  const [inputCity, setInputCity] = useState("Select City...")
  const [listCounties, setListCounties] = useState([])
  const [listCities, setListCities] = useState([])

  const dispatch = useDispatch();
  useSelector((state) => state.authentication.isAuthenticated)
  useSelector((state) => state.authentication.token)
  useSelector((state) => state.authentication.tokenExpiration)
  useSelector((state) => state.dialog.modalToggle)

    useEffect(()=>{
      let lstCounties = []
      for (let i of countyList){
        lstCounties.push({value: i, label: i})
      }
      console.log(lstCounties)
      setListCounties(lstCounties)
    },[])

  const btnClass1 = () => {
    setInputGender('male');
    setButtonClass("btnActive1");
  };
  const btnClass2 = () => {
    setInputGender("female");
    setButtonClass("btnActive2");
  };

  const countyOptionChange = (obj) => {
    setInputCounty(obj.value)
    setInputCity("Select City...")
    console.log(obj.value)
    const countyNameList = countyCityList[obj.value]
    console.log('LIST OF CITIES IN ARRAY: >>', countyNameList )

    let lstCities = []
      for (let i of countyNameList){
        lstCities.push({value: i, label: i})
      }
    console.log(lstCities)
    setListCities(lstCities)
  }


  const cityOptionChange = (obj) => {
    setInputCity(obj.value)
  }
  

  const registerFormHandler = async (event) => {
    event.preventDefault();
    if (inputCity=== "Select City..." || inputCounty==="Select County...") {
      return setCityValidation("Please select County/City");
    }
    if (!inputGender) {
      return setGenderValidation("Please choose gender");
    }
  

    if(inputGender && inputCity && inputCounty){
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'email': inputEmail,
            'username': inputUsername,
            'firstName': inputFirst,
            'lastName': inputLast,
            'county' : inputCounty,
            'gender' : inputGender,
            'city' : inputCity,
            'password': inputPw,
            'confirmPw': inputConfirmPw,
          })
        })
        const responseData = await response.json()
        if(!response.ok){
          setIsError(responseData.error)
          setIsLoading(false)
          return new Error(responseData.message)
        }else{
          // 'primary','secondary','success','danger','warning','info','light','dark'
          console.log(responseData)
          dispatch(dialogActions.modalToggle())
          dispatch(alertActions.alertToggle())
          dispatch(alertActions.alertVariant('success'))
          dispatch(alertActions.alertTitle('You have successfully created an account'))        
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
 
  return (
    <div className="registerContainer">
      <div className="boxRegister">
        <div className="registerForm">
        <LogoSvg id="registerFormSvg"/>
        <h3>Register</h3>
        {isError && <p className="mb-5" id="noticeEvent"> {isError}</p>}
        <Form onSubmit={registerFormHandler}>
            <Form.Text className="text-muted">
              We'll never share your data with anyone else.
            </Form.Text>
            <br/>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={inputEmail} onInput={e => setInputEmail(e.target.value)} placeholder="Enter email" required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={inputUsername} onInput={e => setInputUsername(e.target.value)} placeholder="User name" required/>
          </Form.Group>
          <Row className='my-3'>
            <Col>
              <Form.Group  controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={inputFirst} onInput={e => setInputFirst(e.target.value)} placeholder="First name" required/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={inputLast} onInput={e => setInputLast(e.target.value)} placeholder="Last name" required/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <Form.Label className="center">Gender</Form.Label>
              <div className="choiceBtns1">
                <Form.Check type="radio" aria-label="option 1">
                  <button
                    type="button"
                    id={buttonClass === "btnActive1" ? "btnActive1" : "x"}
                    value={inputGender}
                    onClick={btnClass1}
                    style={{width:'150px', fontSize:'16px'}}
                  >
                    Male
                  </button>
                </Form.Check>
                <Form.Check type="radio" aria-label="option 2">
                  <button
                    type="button"
                    id={buttonClass === "btnActive2" ? "btnActive2" : "y"}
                    value={inputGender}
                    onClick={btnClass2}
                    style={{width:'150px', fontSize:'16px'}}
                  >
                    Female
                  </button>
                </Form.Check>
              </div>
              {!inputGender && <div className="text-warning center validationInput123">
                  {genderValidation}
              </div>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formCounty" style={{'color':'black'}}>
              <Form.Label>County</Form.Label>
                <Select 
                  options ={listCounties} 
                  styles= {customStyles}
                  value={inputCounty} 
                  placeholder={inputCounty} 
                  onChange={(option) => countyOptionChange(option)} 
                  autoComplete="off"
                />
                {inputCity === "Select County..." && <div className='center mt-2 text-warning'> {cityValidation} </div>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCity" style={{'color':'black'}}>
              <Form.Label>City</Form.Label>
                <Select 
                  options = {listCities} 
                  styles= {customStyles}
                  placeholder={inputCity} 
                  value={inputCity} 
                  onChange={(opt) => cityOptionChange(opt)} 
                  autoComplete="off"
                />
              </Form.Group>
              {inputCity === "Select City..." && <div className='center mt-2 text-warning'> {cityValidation} </div>}
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={inputPw} onInput={e => setInputPw(e.target.value)} placeholder="Password" required/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={inputConfirmPw} onInput={e => setInputConfirmPw(e.target.value)} placeholder="Confirm Password" required />
              </Form.Group>
            </Col>
          </Row>  

          {!isLoading && <Button variant="primary" type="submit">Register</Button>}
          {isLoading && <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>}
        </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
