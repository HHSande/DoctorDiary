
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Select, MenuItem, Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Api from './api.js';



const styles = theme => ({
  root: {
    width: '80%',
    margin:'0 auto',
    marginTop: '1%',
    overflowX: 'auto',
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
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
  dropdown: {
    width:'100%',
    marginTop:'3%',
  },

});

class Todaysreport extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      date:'',
      challenges:'',
      remarks:'',
      patientType:'',
      equipmentUsed:'',
      problems:'',
      instance: "",
      enrollment: "",
      reports: [],
    };

    this.setInstanceAndEnrollment = this.setInstanceAndEnrollment.bind(this);
    this.handleRemarks = this.handleRemarks.bind(this);
    this.handleOtherCases = this.handleOtherCases.bind(this);
    this.handlePatient = this.handlePatient.bind(this);
    this.handleEquipment = this.handleEquipment.bind(this);
    this.handleProblems = this.handleProblems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postNewReport = this.postNewReport.bind(this);
    this.getEvent = this.getEvent.bind(this);
  }
  handleChange(event){
  }
  handleOtherCases(event){
    this.setState({date: event.target.value});
  }

  handleRemarks(event){
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
      emergencies:'',
      otherCases:'',
      timeTo:'',
      patientType:'',
      equipmentUsed:'',
      status:'',
      problems:'',

    };
  }

  postNewReport = () => {

    Api.getInstanceAndEnrollment().then(data => {
      console.log(data.events);
      this.setInstanceAndEnrollment(data.events);
    });
  }

  setInstanceAndEnrollment = reports => {
    this.setState({ reports: reports, instance: reports[0].trackedEntityInstance,
      enrollment: reports[0].enrollment });
      console.log("Instance", this.state.instance, " // enrollment", this.state.enrollment);

      const event = {
        dataValues: [],
        enrollment: this.state.enrollment,
        eventDate: "2018-11-21",
        notes: [],
        orgUnit: "DUDHgE5DECu",
        program: "r6qGL4AmFV4",
        programStage: "ZJ9TrNgrtfb",
        status: "ACTIVE",
        trackedEntityInstance: this.state.instance
      };

      console.log(event);

      Api.postEvent(event).then(response => {
        this.getEvent();
      });
    };


    getEvent = () => {
      Api.getEvent().then(data => {
        console.warn("EVENT", data);
      });
    };


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
          <TextField type="numeric" value={this.state.emergencies}  label="No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning)" className={classes.textinput} onChange={this.handleEmergencies}/>
          </div>
          <div>
          <TextField type="text" value={this.state.otherCases}  label="Anaesthesia provided to other cases" className={classes.textinput} onChange={this.handleOtherCases}/>
          </div>
          <div>
          <Select value={this.state.problems}  onChange={this.handleProblems}  className={classes.dropdown} InputProps={{ classes: {input: classes.input } }} input={<Input name="problems" id="problem-helper" />} >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={'User issue'}>User issue</MenuItem>
            <MenuItem value={'Technical issue'}>Technical issue</MenuItem>
            <MenuItem value={'Equipment issue'}>Equipment issue</MenuItem>
            <MenuItem value={'Health worker issue'}>Health worker issue</MenuItem>
          </Select>
          </div>
          <div>
          <TextField type="text" value={this.state.challenges}  label="Other challenges faced:" className={classes.textinput} onChange={this.handleChallenges} multiline='true' rowsMax='4'/>
          </div>
          <div>
          <TextField type="text" value={this.state.remarks} label="Equipment used:"className={classes.textinput} onChange={this.handleRemarks} multiline='true' rowsMax='4' />
          </div>
          <div>
          <Select value={this.state.status}  onChange={this.handleStatus}  className={classes.dropdown} InputProps={{ classes: {input: classes.input } }} input={<Input name="status" id="status-helper" />} >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={'Accepted'}>Accepted</MenuItem>
            <MenuItem value={'Declined'}>Declined</MenuItem>
            <MenuItem value={'Pending'}>Completed Pending</MenuItem>
          </Select>
          </div>

        </form>
          <div>
            <Button className={classes.buttons}  color="primary" value="Submit"/>
            <Button className={classes.buttons} onClick={() => this.postNewReport()} color="primary"> Save </Button>
          </div>
        </Paper>
        </div>
      );
    }
  }

  export default withStyles(styles)(Todaysreport);
