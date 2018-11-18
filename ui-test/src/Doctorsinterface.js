import './interface.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';


class Doctorsinterface extends React.Component{
  render(){
    return(
      <div className="viewButtons" >
          <h2>Doctor's interface</h2>
          <Button className="todayButton" variant="contained" color="primary">
            Todays report
          </Button>
          <Button className="previousButton" variant="contained" color="secondary">
            Yesterdays report
          </Button>
      </div>
    );
  }
}

export default Doctorsinterface;
