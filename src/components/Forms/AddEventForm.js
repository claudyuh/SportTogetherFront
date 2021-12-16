import "./AddEventForm.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import countyList from "../../utils/CitiesAndCountiesRo/countyList";
import countyCityList from "../../utils/CitiesAndCountiesRo/countyCityList";
import { Spinner } from "react-bootstrap";
import { Form, Col, Row, Button, FormControl } from "react-bootstrap";
import { ReactComponent as LogoSvg1 } from "../../assets/Images/SportTogetherJustLogoSVG1.svg";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert";
import { dialogActions } from "../../store/modal";
import customStyles from "../../utils/ReactSelect/RSCustomStyle";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;
today = yyyy + "-" + mm + "-" + dd;

const AddEventForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sportOptions, setSportOptions] = useState([]);
  const [inputSport, setInputSport] = useState("");
  const [inputNrPlayers, setInputNrPlayers] = useState("");
  const [inputLevel, setInputLevel] = useState("");
  const [inputCounty, setInputCounty] = useState("Select County...");
  const [inputCity, setInputCity] = useState("Select City...");
  const [inputPlace, setInputPlace] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [listCounties, setListCounties] = useState([]);
  const [listCities, setListCities] = useState([]);
  const [buttonClass, setButtonClass] = useState("");
  const [sportValidation, setSportValidation] = useState("");
  const [countyValidation, setCountyValidation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [levelValidation, setLevelValidation] = useState("");

  const token = useSelector((state) => state.authentication.token)
  const dispatch = useDispatch()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function reverseDate(string) {
    return (string = string.split("-").reverse().join("-"));
  }

  useEffect(() => {
    const fetchUserData = async() => {
      let response = await fetch('http://localhost:5000/myprofile/sports', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
      })
      const responseData = await response.json()
      console.log(responseData)
      const sportOptions = []
      responseData.map(i => sportOptions.push({value:i.split(" ")[0], label: i.split(" ")[0]}))
      console.log(sportOptions)
      setSportOptions(sportOptions)
    }
    fetchUserData()
  },[token])

  useEffect(() => {
    let lstCounties = [];
    for (let i of countyList) {
      lstCounties.push({ value: i, label: i });
    }
    setListCounties(lstCounties);
  }, []);

  const countyOptionChange = obj => {
    setInputCounty(obj.value);
    setInputCity("Select City...")
    const countyNameList = countyCityList[obj.value];
    let lstCities = [];
    for (let i of countyNameList) {
      lstCities.push({ value: i, label: i });
    }
    setListCities(lstCities);
  };

  const cityOptionChange = obj => {
    console.log(obj.value);
    setInputCity(obj.value);
  };

  const sportChoiceHandler = opt => {
    console.log(opt);
    setInputSport(opt.value);
  };

  const btnClass1 = () => {
    setInputLevel("true");
    console.log("CLICK BTN1");
    setButtonClass("btnActive1");
  };
  const btnClass2 = () => {
    setInputLevel("false");
    setButtonClass("btnActive2");
  };

  const currentLocationHandler = () => {
    const localStoreageLoc = JSON.parse(localStorage.getItem('userLoc'))
    setInputCounty(localStoreageLoc.county);
    setInputCity(localStoreageLoc.city);
  };

  // SUBMIT HANDLER !
  const handleSubmit = async event => {
    const form = event.currentTarget;
    // manual validation handlers -------------------------------
    if (inputSport === "") {
      setSportValidation("Please choose a sport");
    }
    if (inputCounty === "Select County...") {
      setCountyValidation("Please choose the County for your event");
    }
    if (inputCity === "Select City...") {
      setCityValidation("Please choose the City for your event");
    }
    if (inputLevel === "") {
      setLevelValidation("Please choose level requirement");
    }
    // manual validation handlers --------------------------------
    // FORM VALIDATION CHECKER
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      //ON SUBMIT Try ...
      setIsLoading(true);
      if (!inputSport || !inputLevel || inputCounty === "Select County..." || inputCity === "Select City...") {
        setIsLoading(false);
        console.log("Not good");
        new Error("Need validation");
        return event.preventDefault();
      } else {
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:5000/createEvent", {
            method: "POST",
            headers: new Headers({
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              Sport: inputSport,
              County: inputCounty,
              City: capitalizeFirstLetter(inputCity),
              NrPlayers: inputNrPlayers,
              LevelRequirement: inputLevel,
              Place: inputPlace,
              Date: reverseDate(inputDate),
              Time: inputTime,
              Description: inputDescription,
            }),
          });
          const responseData = await response.json();
          if (response.ok) {
            console.log("response.OK from /createEvent > responnseData :",responseData);
            dispatch(dialogActions.modalToggle())       
            dispatch(alertActions.alertToggle())
            dispatch(alertActions.alertVariant('success'))
            dispatch(alertActions.alertTitle('New event has been created')) 

          } else {
            setIsError(responseData.error);
            setIsLoading(false);
            dispatch(alertActions.alertToggle())
            dispatch(alertActions.alertVariant('danger'))
            dispatch(alertActions.alertTitle('Sorry, an error occured, please try again, if the problem persists, please contact customer support'))
            return new Error(responseData.message);
          }
        } catch (error) {
          setIsError(error);
          setIsLoading(false);
          console.log(error);
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="addEventFormClass">
      <p className="mb-5" id="noticeEvent">
        Keep in mind, once you create an event, you will not be able to
        edit/delete it if other users joined the event unless you make a request
        to all users and they agree with your request!
      </p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {isLoading && (
          <Row className="mb-3 justify-content-center">
            <Col md="2" className="d-flex justify-content-center">
              <Spinner animation="border" role="status" />
            </Col>
          </Row>
        )}
        {isError && (
          <p className="mb-5" id="noticeEvent">
            {isError}
          </p>
        )}
        <Row className="mb-3">
          <Col md="6">
            <Form.Label>Choose a sport*</Form.Label>
            <Select
              options={sportOptions}
              styles={customStyles}
              value={inputSport.value}
              onChange={option => sportChoiceHandler(option)}
            />
            {!inputSport && (
              <div className="text-danger validationInput123">
                {sportValidation}
              </div>
            )}
          </Col>
          <Col md="6">
            <Form.Label>Nr of players including you*</Form.Label>
            <Form.Control
              type="number"
              placeholder="ex: 4"
              min="2"
              max="20"
              value={inputNrPlayers}
              onInput={e => setInputNrPlayers(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide then number of players you wish to play(including
              you)*.
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="6" style={{ textAlign: "center" }}>
            <Form.Label>Level Requirement*</Form.Label>
            <div className="choiceBtns">
              <Form.Check type="radio" aria-label="option 1">
                <button
                  type="button"
                  id={buttonClass === "btnActive1" ? "btnActive1" : ""}
                  value={true}
                  onClick={btnClass1}
                >
                  Only my level{" "}
                </button>{" "}
              </Form.Check>
              <Form.Check type="radio" aria-label="option 2">
                {" "}
                <button
                  type="button"
                  id={buttonClass === "btnActive2" ? "btnActive2" : ""}
                  value={false}
                  onClick={btnClass2}
                >
                  {" "}
                  Open to everyone
                </button>{" "}
              </Form.Check>
            </div>
            {!inputLevel && (
              <div
                className="text-danger validationInput123"
                style={{ textAlign: "start" }}
              >
                {levelValidation}
              </div>
            )}
          </Col>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>County*</Form.Label>{" "}
            <button type="button" className="currentLocationBtn" onClick={currentLocationHandler}>
              <LogoSvg1 />
            </button>
            <Select
              options={listCounties}
              styles={customStyles}
              value={inputCounty}
              placeholder={inputCounty}
              onChange={option => countyOptionChange(option)}
            />
            {inputCounty === "Select County..." && (
              <div className="text-danger validationInput123">
                {countyValidation}
              </div>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>City*</Form.Label>
            <Select
              options={listCities}
              styles={customStyles}
              value={inputCity}
              placeholder={inputCity}
              onChange={opt => cityOptionChange(opt)}
            />
            {inputCity === "Select City..." && (
              <div className="text-danger validationInput123">
                {cityValidation}
              </div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>You can specify a place</Form.Label>
            <Form.Control
              type="text"
              value={inputPlace}
              onInput={e => setInputPlace(e.target.value)}
              autoComplete="off"
              placeholder="Place: ex: Sport club...(Optional)"
            />
          </Form.Group>
        </Row>
        <Row>
          <Col md="6">
            <Form.Label>Start date*</Form.Label>
            <FormControl
              type="date"
              min={today}
              value={inputDate}
              onInput={e => setInputDate(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide start date
            </Form.Control.Feedback>
          </Col>

          <Col md="6">
            <Form.Label>Start time*</Form.Label>
            <FormControl
              type="time"
              value={inputTime}
              onInput={e => setInputTime(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide start time
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md="12">
              <Form.Control
                as="textarea"
                value={inputDescription}
                placeholder="Write a description(optional)"
                onInput={e => setInputDescription(e.target.value)}
              />
          </Col>
        </Row>

        {!isLoading && (
          <Button type="submit" style={{ float: "right", marginTop: "15px" }}>
            Create event
          </Button>
        )}
        {isLoading && (
          <Button variant="primary" style={{ float: "right" }} disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default AddEventForm;
