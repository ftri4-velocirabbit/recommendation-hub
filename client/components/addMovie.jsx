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
    fetch('/BACKEND', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(() => {
      <Redirect to="/" />
    })
    .catch(err => console.log('Error in handleOnClick; Sending Movie to Database'));
  }




  render() {
    return (
      <div className="loginContainer">
        <form id="addMovie_form" onsubmit={this.handleOnSubmit()}>
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