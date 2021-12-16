import React, { useEffect } from 'react';
import "./App.css";
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store/auth'; 
import { alertActions } from './store/alert';
import HeaderNav from './components/Layout/HeaderNav';
import MyEvents from './views/MyEvents'
import Events from "./views/Events";
import Homepage from "./views/Homepage";
import AlertDismissible from "./components/UI/Alert";
import MyProfile from './views/MyProfile';

// import MyEvents from './views/MyEvents';


function App() {
  const dispatch = useDispatch();
  const alertActive = useSelector(state => state.alert.alertToggle)
  const isAuth   = useSelector((state) => state.authentication.isAuthenticated)
  const token    = useSelector((state) => state.authentication.token)
  const tokenExp = useSelector((state) => state.authentication.tokenExpiration)
  
  // this is for expiry time for log out
  useEffect(() => {
    const logoutFunc = () => {
      dispatch(authActions.isAuthenticated(false))
      dispatch(authActions.token(null))
      dispatch(authActions.tokenExpiration(null))
      localStorage.removeItem('userData')
      localStorage.removeItem('userLoc')
    }
    let logoutTimer;
    if(token && tokenExp){
      const getRemainingTime = new Date(tokenExp).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logoutFunc, getRemainingTime);
    } else {
      clearTimeout(logoutTimer)
    }
  },[tokenExp, token, dispatch])



  // checking localStore if has the token and remaining time still left time, if all good, the token is refreshed and stay logged
  useEffect(() => {
    const localStoreageData = JSON.parse(localStorage.getItem('userData'))
    if(localStoreageData && localStoreageData.token && localStoreageData.expiration > new Date().getTime() / 1000){      
      dispatch(authActions.isAuthenticated(true));
      dispatch(authActions.token(localStoreageData.token));
      dispatch(authActions.tokenExpiration(localStoreageData.expiration))
    }
  }, [dispatch])

  

  let routes;
  if(isAuth && token){
    routes= (
      <Switch>
        <Route path="/events" exact><Events/></Route>
        <Route path="/events/myevents"><MyEvents/> </Route>
        <Route path="/myprofile" exact> <MyProfile/> </Route>
        {/* <Route path="/userprofile" > <UserProfile /> </Route> */}
        <Redirect to="/events"/>
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" > <Homepage/></Route>
        <Redirect to="/"/>
      </Switch>
    )
  }  
  

  return (
    <React.Fragment> 
      <HeaderNav/>
      {alertActive && <div className="alert-class" onClick={() => dispatch(alertActions.alertToggle())}>
        <AlertDismissible />
        </div>}
        {routes}
    </React.Fragment>
  );
}

export default App;
