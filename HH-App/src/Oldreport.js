import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography, MenuItem, Select, InputLabel} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Api from './api.js';


/***********************************************************************
VIKTIG
[0] = No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM = BIB2zYDYIJp
[1] = No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning) = CXL5mg5l0cv
[2] = "Anaesthesia provided to other cases" = EZstOIjb7wN
[3] = Remarks/ Feedback/ Details of Challenges faced = LoY92GDoDC6
[4] = Challanges faced other = p5D5Y9x7yMc
[5] = "Challenges faced" = romAEndBlt4
[6] = Approved/Rejected Current Status = zrZADVnTtMa (Aksel har en annen kode)
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
    width: '60%',
    marginLeft: '20%',
  },
  buttonapprove: {
    margin: '1.25%' ,
    marginLeft: '20%',
    backgroundColor:'#00ff00',
  },
  buttondecline: {
    margin: '1.25%' ,
    backgroundColor: '#CD5C5C',
  },
  buttonpending: {
    margin: '1.25%' ,
    backgroundColor:'#f4cb42',
  },

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
      tester: '',
      queue: [],
      connectivity: navigator.onLine


    };

    this.handleInput = this.handleInput.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);
    this.printArray = this.printArray.bind(this);
    //this.postNewReport = this.postNewReport.bind(this);
    this.setInstanceAndEnrollment = this.setInstanceAndEnrollment.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.checkConnectivity = this.checkConnectivity.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.interval = null;
  };


  componentDidMount() {


    this.checkConnectivity();
    this.interval = setInterval(this.checkConnectivity, 3000);
    console.log("Dette får vi sendt med - OLDREPORT", this.props.report);
    console.log("Hva er report? - OLDREPORT", this.props.report);
    console.log("Skal ikke være undefined - OLDREPORT", this.props.data);
    this.setState({jsonObject: JSON.parse(this.props.report), data: this.props.data, notes: JSON.parse(this.props.report).notes});
    console.log("A");
}

checkConnectivity(){
  console.log("Sjekker nettet");
  if(this.state.connectivity !== navigator.onLine){
    console.log("Connection endret seg");
    if(navigator.onLine){
      if(this.state.queue.length > 0){
        var copy = this.state.queue.length;
        for(var i = 0; i < copy; i++){
          console.log("Kaller pop");
          //console.log(copy.length);
          console.log(this.state.queue.pop()());
        }

        this.setState({queue: [], connectivity: navigator.onLine});
      }
    }else{
      alert("You've lost connection to the internet. You can still make changes to the journal entry, and it will be sent to the server once you've regained your internet connection");
      this.setState({connectivity: navigator.onLine});
    }
  }
}


handleInput(event, id, numeric){
  //console.log("Kommer hit?");
  console.log("Ble kalt fra ", id);

  if (isNaN(event.target.value) && numeric){
    event.target.value = null;
    return;
  }

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
  console.log("Er jeg undefined?", temp);
  var test = temp.dataValues;
  console.log("Test", test);

  for(var i = 0; i < test.length; i++){
    if(test[i].dataElement === param){
      test[i].value = textfield;
    }
  }

  temp.dataValues = test;
  if(!this.state.connectivity){

    var q = this.state.queue;
    console.log("La til kall i queue");
    q.push(() => {fetch(`${baseUrl}events/${this.props.eventID}/${param}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers,
      body: JSON.stringify(temp),
    })
    .catch(error => error)
    .then(response => response.json())});
    this.setState({queue: q});
    return;
  }

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
  console.log("Focus out", textfield);

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


  generateButtons(){
    if(this.props.role){
      return <div><Button className={this.props.classes.buttonapprove} onClick={() => this.saveChanges("zrZADVnTtMa", 1)}>Accept</Button>
      <Button className={this.props.classes.buttondecline} onClick={() => this.saveChanges("zrZADVnTtMa", 2)}>Reject</Button></div>
    }else{
      return <div><Button className={this.props.classes.buttonpending} onClick={() => this.saveChanges("zrZADVnTtMa", 3)}>Done</Button></div>
    }
  }


  setInstanceAndEnrollment(reports) {
    console.log("piss");
    // FUNGERER IKKE HVIS HAN IKKE HAR RAPPORT FRA FØR
    for (var i = 0; i < reports.length; i++){
      if (reports[i].storedBy === this.state.username){
        this.setState({ reports: reports, instance: reports[i].trackedEntityInstance,
          enrollment: reports[i].enrollment });
          break;
        }
      }


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


    handleChallengesChange = event => {
      var temp  = this.state.data;
      temp[5].value = event.target.value;
      this.setState({data: temp});
    }


    render(){

      const { classes } = this.props;

      console.log("SE HER KIM", this.state.data);


      if (this.state.jsonObject === null) {
        return <div>Tom</div>;
      }


      return(
        <div className="tReport">
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
        <br /><InputLabel className={classes.textinput}>Approved/Rejected Current Status</InputLabel>
        <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("zrZADVnTtMa", this.state.data[6])} value={this.state.data[6].value} className={classes.textinput} onChange={(event) => this.handleInput(event, 6, true)}/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Anaesthesia provided to other cases</InputLabel>
        <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("EZstOIjb7wN", this.state.data[2])} value={this.state.data[2].value} className={classes.textinput} onChange={(event) => this.handleInput(event, 2, true)}/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Challenges faced</InputLabel>
        <Select
        value={this.state.data[5].value}
        onFocus={this.focusIn}
        onBlur={() => this.focusOut("romAEndBlt4", this.state.data[5])}
        onChange={this.handleChallengesChange}
        displayEmpty
        className={classes.textinput}
        >
        <MenuItem value={"1"}>Equipment / Drug issues</MenuItem><br />
        <MenuItem value={"2"}>User / Patient issues</MenuItem><br />
        <MenuItem value={"3"}>Technical Issue</MenuItem><br />
        <MenuItem value={"4"}>Health Worker issue</MenuItem><br />
        <MenuItem value={"5"}>None</MenuItem>
        </Select>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>No. of Emergency Cesearean Cases (night)</InputLabel>
        <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("CXL5mg5l0cv", this.state.data[1])} value={this.state.data[1].value} className={classes.textinput} onChange={(event) => this.handleInput(event, 1, true)}/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>No. of Emergency Cesearean Cases (day)</InputLabel>
        <TextField type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("BIB2zYDYIJp", this.state.data[0])} value={this.state.data[0].value} className={classes.textinput} onChange={(event) => this.handleInput(event, 0, true)}/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Remarks on challenges faced</InputLabel>
        <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("LoY92GDoDC6", this.state.data[3])} value={this.state.data[3].value}
        className={classes.textinput} onChange={(event) => this.handleInput(event, 3, false)} rowsMax="7"/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Other remarks</InputLabel>
        <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut("p5D5Y9x7yMc", this.state.data[4])} value={this.state.data[4].value}
        className={classes.textinput} onChange={(event) => this.handleInput(event, 4, false)} rowsMax="7"/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Previous comments</InputLabel>
        <TextField multiline={true} type="text"  value={this.printArray(this.state.notes)}
        className={classes.textinput}/>
        </div>
        <div>
        <br /><InputLabel className={classes.textinput}>Post a comment</InputLabel>
        <TextField multiline={true} type="text" onFocus={this.focusIn} onBlur={() => this.focusOut(7, null)}
        className={classes.textinput} onChange={(event) => this.handleNoteInput(event, 7)} rowsMax="7"/>
        </div>

        {this.generateButtons()}

        </form>
        <div>
        <Button className={classes.buttons} onClick={() => {
          clearInterval(this.interval);
          this.props.handler();
        }
      } color="primary"> Close </Button>

      </div>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Oldreport);
