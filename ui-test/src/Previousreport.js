import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import TestTable from './components/Table.js';
class Previousreports extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    reportList:[]
  };

  render(){
    return(
      <div className="viewReportList" >
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button color="inherit">Back</Button>
              <Typography id="headliner" variant="h6" color="inherit">
                Previous Reports
              </Typography>
              <TextField type="text" variant="outlined" placeholder="Search for report number..."/>
            </Toolbar>
          </AppBar>
          <div className="reportOverView">
            <TestTable reportList={this.state.reportList}/>
          </div>
      </div>
    );
  }
}

export default Previousreports;
