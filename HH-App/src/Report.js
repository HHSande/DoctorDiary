import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography, InputLabel, Select, MenuItem } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Api from './api.js';

/*
getEvent(eventID){
Api.getEntryFromDoctor(eventID).then(data => console.log(data));
}
*/

/***********************************************************************
                              VIKTIG
[0] = No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM = BIB2zYDYIJp
[1] = No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning) = CXL5mg5l0cv
[2] = "Anaesthesia provided to other cases" = EZstOIjb7wN
[3] = Remarks/ Feedback/ Details of Challenges faced = LoY92GDoDC6
[4] = Challanges faced other = p5D5Y9x7yMc
[5] = "Challenges faced" = romAEndBlt4
[6] = Approved/Rejected Current Status = zrZADVnTtMa
***********************************************************************/
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
    overflow: 'auto',
  }

});

class Report extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      otherChallenges:'',
      remarks:'',
      equipmentUsed:'',
      problems:'',
      tei: "",
      enrollment: "",
      reports: [],
      noTest: " ",
      date:'',
      timeFrom:'',
      timeTo:'',
      patientType:'',
      problems:'bare masse problemer her. bruker denne til å se hvordan multiline fungerer',
      status:'',
      data: [],
      currentField: "",
      clicked: false,
      jsonObject: null
    };

    this.postNewReport = this.postNewReport.bind(this);
    this.setInstanceAndEnrollment = this.setInstanceAndEnrollment.bind(this);
    this.handleRemarks = this.handleRemarks.bind(this);
    this.handleOtherChallenges = this.handleOtherChallenges.bind(this);
    this.handleEmergencies = this.handleEmergencies.bind(this);
    this.handleProblems = this.handleProblems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);

  }
  handleChange(event){

  }

  handleOtherChallenges(event){
    this.setState({otherChallenges: event.target.value});
  }

  handleRemarks(event){
    this.setState({remarks: event.target.value});
  }
  handleTimeTo(event){
    this.setState({timeTo: event.target.value});
  }

  handleEmergencies(event){
    this.setState({emergencies: event.target.value});
  }
  handleProblems(event){
    this.setState({problems: event.target.value});

  }
  handleTest(event){
    this.setState({noTest: event.target.value});
  }
  handleStatus(event){
    this.setState({status: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.state = {
      date:'',
      emergencies:'',
      otherChallenges:'',
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


  componentDidMount() {

    console.log("Hva er report?", this.props);
    console.log("Skal ikke være undefined", this.props.data);
    console.log("SE HER",this.props.report);
    this.setState({ jsonObject: JSON.parse(this.props.report), data: this.props.data });

  }


  handleInput(event, id){
    console.log("Ble kalt fra ", id);
    var copy = this.state.data;
    copy[id] = event.target.value;


    this.setState({data: copy});
  }

  saveChanges(param, textfield) {

    // endrer objektet

    //var fucker = [this.state.textField1, this.state.textField2, this.state.textField3];
    var temp = this.state.jsonObject;
    console.log("BODY: ", temp);
    //console.log("DET VI SKAL HA", temp.dataValues[0]);
    //console.log(temp.dataValues);
    console.log(temp[0]);
    var test = temp.dataValues;
    console.log("Test", test);

    for(var i = 0; i < test.length; i++){
      if(test[i].dataElement === param){
        test[i].value = textfield;
      }
    }

      temp.dataValues = test;

      var baseUrl = Api.dhis2.baseUrl;
      var headers = Api.headers;
      fetch(`${baseUrl}events/${this.props.eventID}/${param}`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers,
        body: JSON.stringify(temp),
      })
      .catch(error => error)
      .then(response => response.json());

    console.log("BODY etter: ", temp);
    this.setState({jsonObject: temp});
  }

  focusIn(){
    console.log("Focus in");
    this.setState({clicked: true});
  }

  focusOut(param, textfield){
    console.log("Focus out");
    if(this.state.clicked){
      this.saveChanges(param, textfield);
    }

    this.setState({clicked: false});
  }

  render(){
  console.log(this.state.emergencies);
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
        <InputLabel> No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning) </InputLabel>
        <TextField value={this.state.emergencies}  className={classes.textinput} onChange={this.handleEmergencies}/>
        </div>
        <div>
        <TextField type="text" value={this.state.otherChallenges}  label="Anaesthesia provided to other cases" className={classes.textinput} onChange={this.handleOtherChallenges}/>
        </div>
        <div>
            <InputLabel htmlFor="issues-helper">Issues</InputLabel>
            <Select value={this.state.problems}  onChange={this.handleProblems}  className={classes.dropdown} InputProps={{ classes: {input: classes.input } } } input={<Input name="age" id="issues-helper" />}>
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
        <TextField type="text" value={this.state.remarks} label="Remarks:"className={classes.textinput} onChange={this.handleRemarks} multiline='true' rowsMax='4' />
        </div>
        <div>
        <Select value={this.state.status}  onChange={this.handleStatus}  className={classes.dropdown} InputProps={{ classes: {input: classes.input } }}>
          <MenuItem value="">
          <em>None</em>
          </MenuItem>
          <MenuItem value={'Accepted'}>Accepted</MenuItem>
          <MenuItem value={'Declined'}>Declined</MenuItem>
          <MenuItem value={'Pending'}>Completed Pending</MenuItem>
        </Select>
        </div>
        <div>
        <InputLabel> No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM </InputLabel>
        <TextField value={this.state.noTest} onChange={this.handleTest} className={classes.textinput} rowsMax='4' />
        </div>
      </form>
        <div>
          <Button className={classes.buttons} onClick={this.handleChange} color="primary" value="Submit"/>
          <Button className={classes.buttons} onClick={() => this.setTEIandEnrollment(this.reports)} color="primary"> Save </Button>
        </div>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Report);
