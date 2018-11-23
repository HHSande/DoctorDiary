import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import './interface.css';

class Startpage extends React.Component{
  render(){
    return(
      <div className="viewButtons" >
          <h2>Doctor's interface</h2>
          <Button className="todayButton" variant="contained" color="primary">
            Today's report
          </Button>
          <Button className="previousButton" variant="contained" color="secondary">
            Previous reports
          </Button>
      </div>
    );
  }
}

export default Startpage;
