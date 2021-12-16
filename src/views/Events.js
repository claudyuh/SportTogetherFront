import React, { useState, useEffect } from "react";
import SearchForm from "../components/Forms/SearchForm";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Events.css";
import UserProfileCard from "../components/UserProfile/UserProfileCard";
import FilterEvents from "../components/Events/FilterEvents";
import EventList from "../components/Events/EventList";

const Events = () => {
  const [allEvents, setAllEvents] = useState('')
  const [userDetails, setUserDetails] = useState('')
  const token = useSelector((state) => state.authentication.token)
  

  useEffect(() => {
    const fetchAllEvents = async() => {
      let response = await fetch('http://localhost:5000/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
      })
      const responseData = await response.json()
      console.log('responseData: ',responseData)
      setAllEvents(responseData)
    }   
    fetchAllEvents()
  }, [token])

  useEffect(() => {
    const fetchUserData = async() => {
      let response = await fetch('http://localhost:5000/myprofile', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
      })
      const responseData = await response.json()
      console.log('responseData: ',responseData)
      const userData = {profileImg: responseData.profileImg, username: responseData.username}
      setUserDetails(userData)
    }
    fetchUserData()
  }, [token])

  return (
    <div className="body">
      <Container className="justify-content-center">
        <Row id="search" >
            <UserProfileCard userData = {userDetails}/>
          <Col md={7}>
            <SearchForm />
            <EventList eventsList = {allEvents}/>
          </Col>
          <Col xl={2}>
            <FilterEvents/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Events;
