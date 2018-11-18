import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '80%',
    margin:'0 auto',
    marginTop: '1%',
    overflowX: 'auto',
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
  }

});

class Todaysreport extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      date:'',
      timeFrom:'',
      timeTo:'',
      patientType:'',
      equipmentUsed:'',
      problems:''
    };

    this.handleDate = this.handleDate.bind(this);
    this.handleTimeFrom = this.handleTimeFrom.bind(this);
    this.handleTimeTo = this.handleTimeTo.bind(this);
    this.handlePatient = this.handlePatient.bind(this);
    this.handleEquipment = this.handleEquipment.bind(this);
    this.handleProblems = this.handleProblems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
  }
  handleDate(event){
    this.setState({date: event.target.value});
  }

  handleTimeFrom(event){
    this.setState({timeFrom: event.target.value});
  }
  handleTimeTo(event){
    this.setState({timeTo: event.target.value});
  }
  handlePatient(event){
    this.setState({patientType: event.target.value});
  }
  handleEquipment(event){
    this.setState({equipmentUsed: event.target.value});
  }
  handleProblems(event){
    this.setState({problems: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
    this.state = {
      date:'',
      timeFrom:'',
      timeTo:'',
      patientType:'',
      equipmentUsed:'',
      problems:''
    };
  }
  render(){
    const { classes } = this.props;
    return(
      <div className="tReport" >
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button color="inherit">Back</Button>
              <Typography id="headliner" variant="h6" color="inherit">
                Doctorsinterface
              </Typography>
            </Toolbar>
          </AppBar>
        <Paper className={classes.root}>
          <form onSubmit={this.handleSubmit}>
            <div>
                <TextField type="text" value={this.state.patientType}  label="Types of patients:" className={classes.textinput} onChange={this.handlePatient}/>
            </div>
            <div>
              <TextField type="text" value={this.state.equipmentUsed} label="Equipment used:"className={classes.textinput} onChange={this.handleEquipment}/>
            </div>
            <div>
              <TextField multiline={true} type="text" value={this.state.problems} label="Challenges related to equipment or infrastructure:"
             className={classes.textinput} rows={4} onChange={this.handleProblems}/>
            </div>

          </form>
          <div>
            <Button className={classes.buttons} color="primary" value="Submit"/>
            <Button className={classes.buttons} color="primary"> Save </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Todaysreport);
