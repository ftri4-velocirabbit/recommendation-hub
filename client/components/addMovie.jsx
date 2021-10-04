import React, { Component } from 'react';
import  { Link, Redirect, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings'; //https://www.npmjs.com/package/react-star-ratings

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { //add username and pass this to the server as well
      movieTitle: '',
      genre: '',
      rating: 0,
      redirect: false
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating( newRating, name ) {
    // Changes our star rating each time the user clicks a star
    this.setState({
      rating: newRating
    });
  }

  handleOnSubmit = (event) => {
    const body = { event }
    //Modify in order to connect with backend
    fetch('/ratemovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(() => {
      // Ensures redirect occurs once a successful post request is made
      this.setState({ redirect: true });
    })
    .catch(err => console.log('Error in addMovie.jsx:handleOnSubmit; POST request to server failed'));
  }

    handleOnChange = (event) => {
      // Pass in the data we need to send to state
      //Name is the key in state that we need to change
      const name = event.target.name;
      // inputValue is the value we need to assign to the key above
      const inputValue = event.target.value;
      //Assigns proper key to proper value; Possible opporutnity to refactor.
      if (event.target.name === "movieTitle") {this.setState({movieTitle: inputValue });}
      if (event.target.name === "genre") {this.setState({genre: inputValue });}
      // Set the value to newRating to copy the rating from changeRating Function
      if (event.target.name === "rating") {this.setState({rating: newRating });}
    }

  render() {
    const location = useLocation()
    const { from } = location.state;
    console.log('Look at location: ', location)
    // Redirect is declared in state and will redirect once the POST request is successful.
  const { redirect } = this.state;
  {if (redirect) {
    return <Redirect to='/results'/>
  }}

    return (
      <div className="formContainer">
        <form id="addMovie_form" onSubmit={this.handleOnSubmit}>
          <label>Movie Title:</label><br></br>
          <input type="text"
                className="movieClass"
                placeholder="Ex: Iron Man"
                name="movieTitle"
                onChange={this.handleOnChange}></input><br></br>
          <label>Genre:</label><br></br>
          <input type="text"
                className="movieClass"
                placeholder="Ex: Action"
                name="genre"
                onChange={this.handleOnChange}></input><br></br>
                {/* Star Ratings Documentation: https://www.npmjs.com/package/react-star-ratings */}
          <StarRatings
            rating={this.state.rating}
            starHoverColor="dodgerblue"
            starRatedColor="dodgerblue"
            changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
            onChange={this.handleOnChange}
            />
            {/* Btn initiates call to handleOnSubmit */}
          <button type="submit" id="addMovieButton">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddMovie;