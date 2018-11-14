import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import { TextField, Input, MuiThemeProvider, AppBar, Toolbar, Typography } from '@material-ui/core/';
import './report.css';


class DHOReportview extends React.Component{
  constructor(props){
    super(props)
  };



  render(){
    return(
    <div className="report-view">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit">Back</Button>
          <Typography id="headliner" variant="h6" color="inherit">
            X's interface
          </Typography>
        </Toolbar>
      </AppBar>
      <textarea rows="4" cols="50">

      </textarea>
      <div className="button-bar">
        <Button color="secondary" className="muibutton" variant="contained">Approve</Button>
        <Button color="secondary" className="muibutton" variant="contained">Add comment</Button>
        <Button color="secondary" className="muibutton" variant="contained">Decline</Button>
      </div>
    </div>

  )};
}

export default DHOReportview;
