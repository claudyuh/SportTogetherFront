import React, { useState, useEffect } from "react";
import SearchForm from "../components/Forms/SearchForm";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Events.css";
import UserProfileCard from "../components/UserProfile/UserProfileCard";
import FilterEvents from "../components/Events/FilterEvents";
import EventList from "../components/Events/EventList";
import SideComponentToggler from "../components/Layout/SideComponentToggler";
import AnimatedCloudySun from '../components/UI/AnimatedCloudySun'
import Weather from '../api/Weather'
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
      console.log('responseData Events: ',responseData)
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
      console.log('responseData profile details: ',responseData)
      setUserDetails(responseData)
    }
    fetchUserData()
  }, [token])

  return (
    <div className="body">     
            <SideComponentToggler togglerButton={<AnimatedCloudySun/>} sidebarBody={<Weather/>}> 
              <Weather/>
            </SideComponentToggler>
      <Container>
        <Row id="search" >
            <UserProfileCard eventsList = {allEvents} userDetails = {userDetails}/>
          <Col md={7}>
            <SearchForm />
            <EventList eventsList = {allEvents} userDetails = {userDetails}/>
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
