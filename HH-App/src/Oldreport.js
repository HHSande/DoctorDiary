import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
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

class Oldreport extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      date:'',
      timeFrom:'',
      timeTo:'',
      patientType:'',
      equipmentUsed:'',
      problems:'bare masse problemer her. bruker denne til å se hvordan multiline fungerer',
      status:'',
      data: [],
      currentField: "",
      clicked: false,
      jsonObject: null,
      noteValue: "",
      notes: [],
      reports: [],
      instance: "",
      enrollment: "",
      teiSearchOrganisationUnits: "",
      username: "",


    };

    this.handleInput = this.handleInput.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);
    this.printArray = this.printArray.bind(this);
    this.postNewReport = this.postNewReport.bind(this);
    this.setInstanceAndEnrollment = this.setInstanceAndEnrollment.bind(this);
    this.getEvent = this.getEvent.bind(this);
  };


  componentDidMount() {

    console.log("Hva er report?", this.props.report);
    console.log("Skal ikke være undefined", this.props.data);
    this.setState({jsonObject: JSON.parse(this.props.report), data: this.props.data, notes: JSON.parse(this.props.report).notes});
    /*var json = JSON.parse(this.props.report);
    var notes = json.notes;
    console.log("NOTES");

    for(var i = 0; i < notes.length; i++){
    console.log(notes[i]);
  }*/
  //console.log("dataValues: ", dataValues);
  //Mappe values
  //var dataValues = this.state.data;
  //for(var i = 0; i < this.state.length; i++){
  /*
  if(dataValues[i].dataElement === "zrZADVnTtMa"){
  console.log(dataValues[i].value);
  switch(parseInt(dataValues[i].value)){
  case 1:
  this.setValue("Approved", dataValues[i].dataElement);
  break;
  case 2:
  this.setValue("Rejected" , dataValues[i].dataElement);
  break;
  case 3:
  this.setValue("Pending", dataValues[i].dataElement);
  break;
  default:
  console.log("Skal ikke kommme hit");
  break;
}
}else if(dataValues[i].dataElement === "romAEndBlt4"){
switch (parseInt(dataValues[i].value)) {
case 1:
this.setValue("Equiment/Drug Issues", dataValues[i].dataElement);
break;
case 2:
this.setValue("User/Patient Issues", dataValues[i].dataElement);
break;
case 3:
this.setValue("Technical Issue", dataValues[i].dataElement);
break;
case 4:
this.setValue("Health worker issue", dataValues[i].dataElement);
break;
case 5:
this.setValue("None", dataValues[i].dataElement);
break;
default:
console.log("Skal ikke kommme hit");
break;
}
}else if(dataValues[i].dataElement === "EZstOIjb7wN"){
this.setValue("verdi1", dataValues[i].dataElement);

}else if(dataValues[i].dataElement === "p5D5Y9x7yMc"){
this.setValue("verdi2", dataValues[i].dataElement);
}
*/
//}
}

//Må endre arrayet
/*
handlePatient(event)  {
this.setState({ textField1: event.target.value });
}

handleEquipment(event) {
this.setState({ textField2 : event.target.value });
}

handleProblems(event) {
this.setState({ textField3: event.target.value});
}
*/
handleInput(event, id){
  console.log("Ble kalt fra ", id);
  var copy = this.state.data;
  copy[id] = event.target.value;


  this.setState({data: copy});
}

handleNoteInput(event){
  this.setState({noteValue: event.target.value});
}

printArray(array){
  if(array === undefined){
    return "";
  }
  var str = "";

  for(var i = 0; i < array.length; i++){
    var splitted = array[i].storedDate.split("T");
    str += splitted[0] + " " + array[i].storedBy + " " + array[i].value + "\n";
  }
  return str;
}
saveChanges(param, textfield) {

  // endrer objektet
  var baseUrl = Api.dhis2.baseUrl;
  var headers = Api.headers;
  //var fucker = [this.state.textField1, this.state.textField2, this.state.textField3];
  var temp = this.state.jsonObject;
  console.log("BODY: ", temp);
  //console.log("DET VI SKAL HA", temp.dataValues[0]);
  //console.log(temp.dataValues);

  if(param === 7){
    //console.log("JSON vi sjekker på", temp);
    var fucker = [{value: this.state.noteValue}];
    //console.log("Sjekker om undefined");
    if(temp.notes !== undefined){
      //console.log("Ikke undefined");
      var temp = temp.notes;
      var nyArray = new Array(temp.length);
      for(var i = 0; i < temp.length; i++){
        nyArray[i] = temp[i];
      }
      //console.log("Ute av loop");
      nyArray[temp.length] = fucker[0];
      //console.log(nyArray);
      fucker = nyArray;
    }
    //console.log("Var undefined");
    //temp.notes[0] = fucker;
    //console.log("temp.notes[0].value ", temp.notes[0].value);

    var jsonObject = {
      event: temp.event,
      notes: fucker,
      orgUnit: temp.orgUnit,
      program: temp.program,
      programStage: temp.program,
      trackedEntityInstance: temp.trackedEntityInstance
    }

    console.log("Poster");
    fetch(`${baseUrl}events/${this.props.eventID}/note`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers,
      body: JSON.stringify(jsonObject),
    })
    .catch(error => error)
    .then(response => response.json());
    return;

  }
  console.log(temp[0]);
  var test = temp.dataValues;
  console.log("Test", test);

  for(var i = 0; i < test.length; i++){
    if(test[i].dataElement === param){
      test[i].value = textfield;
    }
  }
  temp.dataValues = test;

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
  //console.log(temp.dataValues[0].dataElement);
  //console.log(this.state.textField1);
  //temp.dataValues[0].dataElement = this.state.textField1;
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

postNewReport() {

  Api.getMe().then(data => {
    this.setState({ teiSearchOrganisationUnits: data.teiSearchOrganisationUnits[0].id,
      username: data.userCredentials.username});
      Api.getInstanceAndEnrollment(this.state.teiSearchOrganisationUnits).then(data => {
        this.setInstanceAndEnrollment(data.events);
      });
    });
  }

  setInstanceAndEnrollment(reports) {

    // FUNGERER IKKE HVIS HAN IKKE HAR RAPPORT FRA FØR
    for (var i = 0; i < reports.length; i++){
      if (reports[i].storedBy === this.state.username){
        this.setState({ reports: reports, instance: reports[i].trackedEntityInstance,
          enrollment: reports[i].enrollment });
          break;
        }
      }


    //  console.log("Instance", this.state.instance, " // enrollment", this.state.enrollment);

      const event = {
        dataValues: [],
        enrollment: this.state.enrollment,
        notes: [],
        eventDate: "2018-11-22",
        notes: [{value: "FUNKA DET?"}],
        orgUnit: this.state.teiSearchOrganisationUnits,
        program: "r6qGL4AmFV4", // Hardkoda men det e gucci
        programStage: "ZJ9TrNgrtfb",  // Hardkoda men det e gucci
        status: "ACTIVE", // Hardkoda men det e gucci
        trackedEntityInstance: this.state.instance
      }

      console.log(event);

      Api.postEvent(event).then(response => {
        console.log("Driten e posta fam. Sjekk plass 0 i events som blir printa under");
        this.getEvent();
      });
    };


    getEvent = () => {
      Api.getEvent("program=r6qGL4AmFV4").then(data => {
        console.warn("Alle rapporter", data);
      });
    };


    render(){
      const { classes } = this.props;
      if(this.state.data.length < 1){
        return(
          <div>
          <p>Fitte</p>
          </div>);
        }
        return(
          <div className="tReport">
          <body>

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
          <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("zrZADVnTtMa", this.state.data[6])} value={this.state.data[6].value}  label="Approved/Rejcted Current Status:" className={classes.textinput} onChange={(event) => this.handleInput(event, 6)}/>
          </div>
          <div>
          <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("EZstOIjb7wN", this.state.data[2])} value={this.state.data[2].value} label="Anaesthesia provided to other cases:"className={classes.textinput} onChange={(event) => this.handleInput(event, 2)}/>
          </div>
          <div>
          <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("romAEndBlt4", this.state.data[5])} value={this.state.data[5].value} label="Challenges faced:"
          className={classes.textinput} onChange={(event) => this.handleInput(event, 5)} rowsMax="7"/>
          </div>
          <div>
          <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("CXL5mg5l0cv", this.state.data[1])} value={this.state.data[1].value} label="No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning):"className={classes.textinput} onChange={(event) => this.handleInput(event, 1)}/>
          </div>
          <div>
          <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("BIB2zYDYIJp", this.state.data[0])} value={this.state.data[0].value} label="No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM:"className={classes.textinput} onChange={(event) => this.handleInput(event, 0)}/>
          </div>
          <div>
          <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("LoY92GDoDC6", this.state.data[3])} value={this.state.data[3].value} label="Remarks/ Feedback/ Details of Challenges faced:"
          className={classes.textinput} onChange={(event) => this.handleInput(event, 3)} rowsMax="7"/>
          </div>
          <div>
          <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("p5D5Y9x7yMc", this.state.data[4])} value={this.state.data[4].value} label="Challanges faced other:"
          className={classes.textinput} onChange={(event) => this.handleInput(event, 4)} rowsMax="7"/>
          </div>
          <div>
          <TextField multiline={true} type="text"  value={this.printArray(this.state.notes)} label="Prev Notes"
          className={classes.textinput}/>
          </div>
          <div>
          <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut(7, null)} label="Notes:"
          className={classes.textinput} onChange={(event) => this.handleNoteInput(event, 7)} rowsMax="7"/>
          </div>
          </form>
          <div>
          <Button className={classes.buttons} onClick={this.saveChanges} color="primary"> Change </Button>
          <Button className={classes.buttons} onClick={this.props.handler} color="primary"> Close </Button>
          <Button className={classes.buttons} onClick={() => this.postNewReport()} color="primary"> Create new (TEST) </Button>
          </div>
          </Paper>
          </body>
          </div>
        );
      }
    }

    export default withStyles(styles)(Oldreport);
