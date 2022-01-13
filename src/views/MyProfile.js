import React, {useEffect, useState} from "react";
import "./MyProfile.css";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector } from 'react-redux'
import ProfileCard from "../components/UserProfile/ProfileCard";
import UserDetailsBox from "../components/UserProfile/UserDetailsBox";
import UserProfileRating from "../components/UserProfile/UserProfileRating";
import LabelLayout from "../components/UserProfile/LabelLayout";
const MyProfile = () => {
  const [userDetails, setUserDetails] = useState('')
  const [userSports, setUserSports] = useState('')

  const token = useSelector((state) => state.authentication.token)

  useEffect(() => {
    const fetchProfileData = async() => {
      let response = await fetch('http://localhost:5000/myprofile', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
      })
      const responseData = await response.json()
      console.log('responseData: ',responseData)
      setUserDetails(responseData)
      setUserSports(responseData.sportInterests)
      
    }
    fetchProfileData()
  }, [token])

  
  
  return (
    <Container>
      <Row className="justify-content-center">
        <ProfileCard userProfileImg={userDetails.profileImg} userCoverImg={userDetails.coverImg}/>
      </Row>
      <Row className="justify-content-center">
        <UserDetailsBox userDetails={userDetails}/>
        <UserProfileRating rating = {userDetails.reviewRating}/>
      </Row>
      <Row className="justify-content-center">
        <Col lg={3} style={{border:'1px dashed white'}}>
          SOMETHIN
        </Col>
        <Col style={{border:'1px dashed white', padding:'50px'}}  lg={7}>
          <LabelLayout sports = {userSports}/>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;