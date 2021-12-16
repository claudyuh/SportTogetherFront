import React from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
    
    let arrayEvents = [...props.eventsList]

    return (
        
        <React.Fragment>
            {arrayEvents.map((item) => (
                <EventItem  
                    key = {item._id}
                    eventId = {item._id}
                    userId = {item.author._id}
                    profileImg = {item.author.profileImg}
                    authorUsername = {item.authorUsername}
                    authorFirstName = {item.authorFirstName}
                    sport = {item.sportType}
                    level = {item.sportLevel}
                    county = {item.county}
                    city = {item.city}
                    location = {item.place}
                    description = {item.description}
                    date = {item.startDate}
                    time = {item.startTime}
                    nrPlayers = {item.nrOfPlayers}
                    allowed = {item.levelRequirement}
                /> 
            ))}
        </React.Fragment>
    )
}

export default EventList;

// if(props.allFilters.sportFilters !== '' ){
//     console.log(props.allFilters.sportFilter)
// }
