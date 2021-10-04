import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class AddGroup extends React.Component {
  // Get State from Results page, also need to display groupName if user already has groupName
  constructor(props) {
    super(props);
    this.state = {
      inputGroup: '',
      createGroupSuccess: false,
      joinGroupSuccess: false
    }
      // Update state for each letter passed into the username and pw input boxes
  this.hanldeOnJoinGroup = this.handleOnJoinGroup.bind(this);
  this.handleOnChange = this.handleOnChange.bind(this);
  }


  // Fills the h1 tag
  // let displayGroup = "";
  // if (this.props.GroupName.length > 0) {
  //   displayGroup = document.getElementById("whatGroupYoureIn_id").innerHTML = `You're part of the ${this.props.GroupName} group.`;
  // } else {
  //   displayGroup = document.getElementById("whatGroupYoureIn_id").innerHTML = `You're not in a group, join one for movie recommendations! 🚀 🚀 `;
  // };

  // HandleOnJoinGroupSubmit; Can also cause users to leave their group if the join group field is blank
  //https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter
  //https://stackoverflow.com/questions/60349756/react-js-two-submit-buttons-in-one-form
  //https://stackoverflow.com/questions/14680016/multiple-submit-buttons-on-same-form-with-onsubmit-function
  handleOnJoinGroup = (event) => {
    const body = { event } // todo this is off

    fetch('/addgroup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(() => {
      this.setState({ joinGroupSuccess: true });
    })
    .catch(err => {
      return alert('Join Group was not succesful. Please try again. ')
    });
  };

  handleOnChange = (event) => {
    const name = event.target.name;
    const inputValue = event.target.value;

    if (event.target.name === "inputGroup") {this.setState({currentGroup: inputValue });}
    console.log(this.state)
  }



  render() {
    const { createGroupSuccess } = this.state;
      const { joinGroupSuccess } = this.state;
      {if (createGroupSuccess) {
        alert('Successfully created a group. You have automatically been placed in this group. Press "Ok" to return home');
        return <Redirect to='/results' />
      }}
      {if (joinGroupSuccess) {
        alert('Successfully joined a group. Press "Ok" to return home')
        return <Redirect to='/results' />
      }}
    return (



      <div className="addGroupContainer">
        <h3>Your Current Group:</h3>
        <form id="addGroup_form" onSubmit={this.hanldeOnJoinGroup}>
          <label>Create A Group:</label><br></br>
          <input type="text"
                className="addGroup_class"
                placeholder="Ex: TheZombieMovieGroup"
                name="inputGroup"
                onChange={this.handleOnChange}></input><br></br>
                <button type="submit" className="addGroup_button" id="addGroup_button">Submit</button><br></br>
        </form>
        <form id="joinGroup_form" onSubmit={this.hanldeOnJoinGroup}>
          <label>Join A Group:</label><br></br>
          <input type="text"
                className="joinGroup_class"
                placeholder="Ex: Codesmith"
                name="inputGroup"
                onChange={this.handleOnChange}></input><br></br>
                <button type="submit" className="joinGroup_button" id="joinGroup_button">Submit</button><br></br>
        </form>
        <Link to={'/results'}>
          <button type="button" id="addGrpBtn">Return Home</button>
        </Link>
      </div>
    )
  }
}

export default AddGroup;