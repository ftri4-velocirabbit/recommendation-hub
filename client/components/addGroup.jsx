import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AddGroup extends React.Component {
  // Get State from Results page, also need to display groupName if user already has groupName



  // Fills the h1 tag
  let displayGroup = "";
  if (this.props.GroupName.length > 0) {
    displayGroup = document.getElementById("whatGroupYoureIn_id").innerHTML = `You're part of the ${this.props.GroupName} group.`;
  } else {
    displayGroup = document.getElementById("whatGroupYoureIn_id").innerHTML = `You're not in a group, join one for movie recommendations! 🚀 🚀 `;
  };

  // HandleOnCreateGroupSubmit
    // Update the user associated group within the DB

  // HandleOnJoinGroupSubmit; Can also cause users to leave their group if the join group field is blank
  //https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter
  //https://stackoverflow.com/questions/60349756/react-js-two-submit-buttons-in-one-form
  //https://stackoverflow.com/questions/14680016/multiple-submit-buttons-on-same-form-with-onsubmit-function



  // HandleOnJoinGroupChange
    // Update the state with each letter entry into the input box
    //? Stretch goal: handle intelligent group name entry. Perhaps all group names would have to be saved in state for this. onsearch?

  // HandleLeaveGroup
    // Clear the join group field and then redirect to HandleOnJoinGroupSubmit


  render() {
    return (
      <div className="formContainer">
        <h1 id="whatGroupYoureIn_id" value={displayGroup}>
        <form id="addGroup_form" >
          <label>Create or join group:</label><br></br>
          <input type="text"
                className="addGroup_class"
                placeholder="Ex: TheZombieMovieGroup"
                name="groupName"
                onchange="handleOnChange"></input><br></br>
          <Link to={'/signup'}>
            <button type="submit"
                    id="group_button"
                    onsubmit="HandleOnCreateGroupSubmit">Submit create group</button>
          </Link>
          <label>Join Group:</label><br></br>
          <input type="password"
                className="passWord"
                placeholder="Ex: Ftri4>Ftri3"
                name="passwordLogin"></input><br></br>
          <button type="button" id="joinGroup_button" onclick>Submit join group</button>
        </form>
        <Link to={'/addGroup'}>
          <button type="button" id="leaveGroup_Button">Want to leave your group? Click here</button>
        </Link>
      </div>
    )
  }
}

export default AddGroup;