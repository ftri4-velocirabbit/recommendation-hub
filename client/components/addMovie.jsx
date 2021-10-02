import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import StarRatings from './react-star-ratings'; //https://www.npmjs.com/package/react-star-ratings

class AddMovie extends React.Component {

  render() {
    return (
      <div className="loginContainer">
        <form id="addMovie_form">
          <label>Movie Title:</label><br></br>
          <input type="text" className="movieClass" placeholders="Ex: Pirates of the Carribean" value=""></input><br></br>
          <label>Genre:</label><br></br>
          <input type="text" className="movieClass" placeholder="Ex: Action" value=""></input><br></br>
          <StarRatings
            rating={this.state.rating}
            starRatedColor="blue"
            changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
            />
          <button id="addMovieButton">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddMovie;