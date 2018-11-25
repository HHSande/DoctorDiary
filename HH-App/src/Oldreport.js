import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography, MenuItem, Select, InputLabel} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Api from './api.js';


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
    this.setInstanceAndEnrollment = this.setInstanceAndEnrollment.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.checkConnectivity = this.checkConnectivity.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.interval = null;
  };


  componentDidMount() {

    this.checkConnectivity();
    this.interval = setInterval(this.checkConnectivity, 3000);
    this.setState({jsonObject: JSON.parse(this.props.report), data: this.props.data, notes: JSON.parse(this.props.report).notes});
  }


  checkConnectivity(){

    if(this.state.connectivity !== navigator.onLine){
      if(navigator.onLine){
        if(this.state.queue.length > 0){
          var copy = this.state.queue.length;
          for(var i = 0; i < copy; i++){
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

    var baseUrl = Api.dhis2.baseUrl;
    var headers = Api.headers;
    var temp = this.state.jsonObject;

    if(param === 7){

      var fucker = [{value: this.state.noteValue}];
      if(temp.notes !== undefined){
        var temp = temp.notes;
        var nyArray = new Array(temp.length);
        for(var i = 0; i < temp.length; i++){
          nyArray[i] = temp[i];
        }
        nyArray[temp.length] = fucker[0];
        fucker = nyArray;
      }

      var jsonObject = {
        event: temp.event,
        notes: fucker,
        orgUnit: temp.orgUnit,
        program: temp.program,
        programStage: temp.program,
        trackedEntityInstance: temp.trackedEntityInstance
      }


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

    var test = temp.dataValues;

    for(var i = 0; i < test.length; i++){

      if(test[i].dataElement === param){
        test[i].value = textfield;
      }
    }

    temp.dataValues = test;

    if(!this.state.connectivity){

      var q = this.state.queue;
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


    if (!this.props.role){
      fetch(`${baseUrl}events/${this.props.eventID}/${param}`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers,
        body: JSON.stringify(temp),
      })
      .catch(error => error)
      .then(response => response.json());

      this.setState({jsonObject: temp});
    }
  }


  focusIn(){
    this.setState({clicked: true});
  }


  focusOut(param, textfield){

    if(this.state.clicked){
      this.saveChanges(param, textfield);
    }
    this.setState({clicked: false});
  }


  generateButtons(){

    if(this.props.role){
      return <div><Button className={this.props.classes.buttonapprove} onClick={() => this.saveChanges("zrZADVnTtMa", 1)}>Accept</Button>
      <Button className={this.props.classes.buttondecline} onClick={() => this.saveChanges("zrZADVnTtMa", 2)}>Reject</Button></div>

    }else{
      return <div><Button className={this.props.classes.buttonpending} onClick={() => this.saveChanges("zrZADVnTtMa", 3)}>Save changes</Button></div>
    }
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
          orgUnit: this.state.teiSearchOrganisationUnits,
          program: "r6qGL4AmFV4",
          programStage: "ZJ9TrNgrtfb",
          status: "ACTIVE",
          trackedEntityInstance: this.state.instance
        }

        Api.postEvent(event).then(response => {
          this.getEvent();
        });
      };


      getEvent = () => {
        Api.getEvent("program=r6qGL4AmFV4").then(data => {
        });
      };


      handleChallengesChange = event => {
        var temp  = this.state.data;
        temp[5].value = event.target.value;
        this.setState({data: temp});
      }


      render(){

        const { classes } = this.props;

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
        } color="primary">Close window</Button>

        </div>
        </Paper>
        </div>
      );
    }
  }

  export default withStyles(styles)(Oldreport);
