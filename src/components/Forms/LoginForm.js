import React, {useState} from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth"; 
import { Form, Button, Spinner } from "react-bootstrap";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState()

  const dispatch = useDispatch();
  const history = useHistory();
  
  const formCheckboxHandler = () => {
    setRememberMe(true)
  }
   
  const handleRoute = () => {
    history.push("/events");
  }

  const loginFormHandler = async(e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': inputEmail,
          'password': inputPw,
          'rememberMe': rememberMe
        })
      })
      const responseData = await response.json()
      if(response.ok){
        console.log('response.OK login > responseData >',responseData)
  
        let tokenExp;
        if(responseData.rememberMe === true){
          tokenExp =  new Date().getTime() + (1000 * 60 * 60 * 24 * 7)
        }else{
          tokenExp = new Date().getTime() + (1000 * 60 * 60 * 3)
        }
        localStorage.setItem('userData', JSON.stringify({userId:responseData.userId, token:responseData.token, expiration: tokenExp})) /*tokenExp it was tokenExp.toISOString() and above dates not converted to strings */
        localStorage.setItem('userLoc', JSON.stringify({county:responseData.county, city:responseData.city}))
        dispatch(authActions.tokenExpiration(tokenExp))
        dispatch(authActions.isAuthenticated(true))
        dispatch(authActions.token(responseData.token)) 


      }else{
        setIsError(responseData.error)
        setInputPw('')
        setIsLoading(false)
        return new Error(responseData.message) 
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    } 
  }

  return (
    <div className="loginContainer">
      <div className="box">
        <div className="loginForm">
        <h3>Login</h3>
        {isError && <p className="mb-5" id="noticeEvent1"> {isError}</p>}
        <Form action="/login" onSubmit={loginFormHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  value={inputEmail} onInput={e => setInputEmail(e.target.value)} required/>
            <Form.Text className="text-muted">
              We'll never share your email or password with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={inputPw} onInput={e => setInputPw(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3"  style={{'float':'right'}} controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" onClick={formCheckboxHandler} />
          </Form.Group>
          {!isLoading && <Button className="login__button" onClick={handleRoute} type="submit">Login</Button>}
         {isLoading && <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
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

export default LoginForm;
