import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import DHOTable from './DHOTable.js';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 'theme.spacing.unit * 3',
    overflowX: 'auto',
  },
  buttonapprove: {
    margin: '1.25%' ,
    backgroundColor:'#50c878',
  },
  buttondecline: {
    margin: '1.25%' ,
  },
  buttonpending: {
    margin: '1.25%' ,
    backgroundColor:'#F9AA33',
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
  backbutton: {
    backgroundColor: '#E6E6FA',
  },
  title: {
    marginLeft: '10%',
    marginRight: '7%',
  },
  appbar: {

  },
});

class DHOinterface extends React.Component{
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
              <Button className={classes.backbutton}>Back</Button>
              <Typography className={classes.title} id="headliner" variant="h6" color="inherit">
                DHO Interface
              </Typography>
              <TextField type="text" className={classes.searchbar} variant="filled" margin="normal" placeholder="Search for report number..."/>
              <Button color="secondary" className={classes.buttonapprove} variant="contained">Approved</Button>
              <Button color="secondary" className={classes.buttondecline} variant="contained">Declined</Button>
              <Button color="secondary" className={classes.buttonpending} variant="contained">Pending</Button>
            </Toolbar>
          </AppBar>

          <div className="reportOverView">
            <DHOTable /*reportList={this.state.reportList}*//>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(DHOinterface);
