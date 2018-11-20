import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import DoctorTable from './components/Table.js';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 'theme.spacing.unit * 3',
    overflowX: 'auto',
  },
  title: {
    marginLeft: '10%',
    marginRight: '7%',
  },
  buttons: {
    marginTop: '3%',
    margin: '1 auto',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  textinput: {
    marginTop:'2rem',
    marginTop:'2rem',
    margin:'0',
  },
  searchbar: {
    width: '15rem',
    border: '1rem',
    backgroundColor: '#E6E6FA',
    marginRight: '13%',
    'placeholder': {
      color: 'white',
    },
  },

});



class Previousreports extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    reportList:[]
  };

  render(){
    const { classes } = this.props;
    return(
      <div className="viewReportList" >
          <AppBar className={classes.root} position="static" color="primary">
            <Toolbar>
              <Button color="inherit">Back</Button>
              <Typography className={classes.title} id="headliner" variant="h6" color="inherit">
                Previous Reports
              </Typography>
              <TextField className={classes.searchbar} type="text" variant="outlined" placeholder="Search for report number..."/>
            </Toolbar>
          </AppBar>
          <div className="reportOverView">
            <DoctorTable reportList={this.state.reportList}/>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(Previousreports);
