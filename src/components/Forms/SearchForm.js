import React from "react";
import "./SearchForm.css";


const SearchForm = () => {
    const toggleHandler = (e) => {
        e.target.parentElement.parentElement.classList.toggle('open')
    };


  return (
    <form>
    <div className="search-icon" >
      <input className="search-icon__input" placeholder="search ..." />
      <div className="search-icon__wrapper" onClick={toggleHandler}>
        <div className="search-icon__glass" ></div>
        <div className="search-icon__handle"></div>
      </div>
    </div>
    </form>
  );
};

export default SearchForm;
// const searchIcon = document.querySelector(".search-icon__wrapper");
// searchIcon.addEventListener("click", e => searchIcon.parentElement.classList.toggle("open"))