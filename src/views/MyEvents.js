import React, { useState, useEffect } from "react";
import './MyEvents.css';
import UserProfileCard from '../components/UserProfile/UserProfileCard';
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import EventList from "../components/Events/EventList";


const MyEvents = () => {
  const [eventsList, setEventsList] = useState('')
  const [userDetails, setUserDetails] = useState('')
  
  const token = useSelector((state) => state.authentication.token)

  
  useEffect(() => {
    try {
      const fetchMyEvents = async() => {
        let response = await fetch('http://localhost:5000/events/myevents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          }
        })
        const responseData = await response.json()
        console.log('responseData: ',responseData)
        if(responseData && responseData.length){
          setEventsList(responseData)
        }else{
          setEventsList({'message':'No events to show'})
        }
        const userObj = {
          authorId: responseData[0].id,
          username: responseData[0].authorUsername,
          profileImg: responseData[0].author.profileImg,
        }
        setUserDetails(userObj)
      }   
      fetchMyEvents()
    } catch (error) {
      
    }
    
  }, [token])


    
    return(
        <div className="body mt-5">
            <Container className="justify-content-center">
              <Row>
                <Col sm={3}>
                  <UserProfileCard userData = {userDetails}/>
                </Col>
                <Col md={6} className="mt-3">
                  {eventsList && <EventList  eventsList = {eventsList}/>}
                </Col>  
              </Row>
            </Container>
        </div>
    )
}

export default MyEvents;