import React, { Component, useMemo } from 'react';
import ReactDOM, { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// Table MUI stuff
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import CustomizedTables from './table.jsx';



class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroup: '',
      userName: ''
    }

  }







  render() {
    return (
      <div>
        <div className="addInfo_div">
          <Link to={'/addmovie'}>
            <button type="button" id="addInfo_button">Add Group</button>
          </Link>
          <div className="divider"/>
          <Link to={'/addgroup'}>
            <button type="button" id="addInfo_button">Add Movie</button>
          </Link>
        </div>
        <div className="biggerDivider"/>
        <div className="resultsTable_div">
          <CustomizedTables/>
        </div>
      </div>
    );
  }
}

export default Results;