import React from "react";

import {
  FormCheck,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import "./FilterEvents.css";
const FilterEvents = () => {


  return (
    <div className="filterSportsRadio">
      <Button className="btn-sm mb-3"> Reset filters </Button>
      <div className="sportsContainer">
        <FormLabel>
          <h5>Sport:</h5>
        </FormLabel>
        <FormCheck type="radio" label="Tennis" value="Tennis" name="group1" />
        <FormCheck type="radio" label="Football" value="Football" name="group1" />
        <FormCheck type="radio" label="Jogging" value="Jogging" name="group1" />
      </div>
      <div className="sportsContainer">
        <FormLabel>
          <h5>Skill level:</h5>
        </FormLabel>
        <FormCheck type="radio" label="Beginner" value="Beginner" name="group2" />
        <FormCheck type="radio" label="Intermediate" value="Intermediate" name="group2" />
        <FormCheck type="radio" label="Advanced" value="Advanced" name="group2" />
      </div>
      <div className="sportsContainer">
        <FormLabel>
          <h5>Between:</h5>
        </FormLabel>
        <FormControl type="date" />
        <FormControl
          className="my-1"
          type="date"
          min={Date.now()}
          max="2022-02-01"
        />
        <Button className="btn-sm"> Submit</Button>
      </div>
    </div>
  );
};

export default FilterEvents;
