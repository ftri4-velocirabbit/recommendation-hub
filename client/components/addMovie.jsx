import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings'; //https://www.npmjs.com/package/react-star-ratings

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    }
  }

  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  handleOnSubmit = event => {
    // hooked up to addMovie Button
    const body = { event } //Passing in the data we need to send
    //  Send to Server /POST
    // Once we send to the sever
    fetch('/BACKEND', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) //w/e our state is
    })
    .then(resp => resp.json())
    .then(() => {
      <Redirect to="/" />
    })
    .catch(err => console.log('Error in handleOnSubmit; grabing user Authentication from Database'));
  }

  //? for every input field there needs to be an onchange method
  //every input field will change the state.
  // when the submit button is clicked, then send the state data to SQL
    // Once that is done, then we reset state.



// need to create onchange for each input. ex: onChange={this.movieTitleOnChange}
  render() {
    return (
      <div className="loginContainer">
        <form id="addMovie_form" onsubmit={this.handleOnSubmit}>
          <label>Movie Title:</label><br></br>
          <input type="text" className="movieClass" placeholders="Ex: Pirates of the Carribean" name="movieTItle"></input><br></br>
          <label>Genre:</label><br></br>
          <input type="text" className="movieClass" placeholder="Ex: Action" name="genre"></input><br></br>
          <StarRatings
            rating={this.state.rating}
            starRatedColor="blue"
            changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
            />
          <input type="submit" id="addMovieButton" >Submit</input>
        </form>
      </div>
    )
  }
}

export default AddMovie;