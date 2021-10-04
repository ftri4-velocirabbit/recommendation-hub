import React, { Component, useMemo } from 'react';
import ReactDOM, { Link } from 'react-router-dom';
import Button from '@mui/material/Button';



class Results extends React.Component {

  render() {
    return (
      <div className="addInfo_div">
        <div>
          <Link to={'/addmovie'}>
            <button type="button" id="addInfo_button">Add Group</button>
          </Link>
          <div class="divider"/>
          <Link to={'/addgroup'}>
            <button type="button" id="addInfo_button">Add Movie</button>
          </Link>
        </div>
        <div className="results_container">

        </div>
      </div>

    );
  }
}





export default Results;