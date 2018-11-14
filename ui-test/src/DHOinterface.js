import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import DHOTable from './DHOTable.js';


class DHOinterface extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    reportList:[]
  };

  render(){
    return(
      <div className="viewReportList" >
        <body>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button color="inherit">Back</Button>
              <Typography id="headliner" variant="h6" color="inherit">
                DHO Interface
              </Typography>
              <Button color="secondary" className="muibutton" variant="contained">Approved</Button>
              <Button color="secondary" className="muibutton" variant="contained">Declined</Button>
              <Button color="secondary" className="muibutton" variant="contained">Pending</Button>
              <div className="searchReports">
                  <TextField type="text" variant="filled" margin="normal" placeholder="Search for report number..."/>
              </div>
            </Toolbar>
          </AppBar>

          <div className="reportOverView">
            <DHOTable /*reportList={this.state.reportList}*//>
          </div>
        </body>
      </div>
    );
  }
}

export default DHOinterface;
