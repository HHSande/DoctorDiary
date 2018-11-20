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
      jsonObject: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);
  };

  
  componentDidMount() {

    console.log("Hva er report?", this.props.report);
    console.log("Skal ikke være undefined", this.props.data);
    this.setState({jsonObject: JSON.parse(this.props.report), data: this.props.data});
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
    //for(var i = 0; i < )
    /*
    var field = "";
    for(var i = 0; i < test.length; i++){
      console.log(test[i].dataElement);

      if(test[i].dataElement === "romAEndBlt4"){
        console.log("FANT romAEndBlt4");
        test[i].value = this.state.textField1;
        field = test[i].dataElement;
        break;
      }else if(test[i].dataElement === "EZstOIjb7wN"){
        console.log("FANT EZstOIjb7wN");
        test[i].value = this.state.textField2;
        field = test[i].dataElement;
        break;
      }else if(test[i].dataElement === "zrZADVnTtMa"){
        console.log("FANT zrZADVnTtMa");
        test[i].value = this.state.textField3;
        field = test[i].dataElement;
        break;
      }

    }
    */
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
    //console.log(temp.dataValues[0].dataElement);
    //console.log(this.state.textField1);
    //temp.dataValues[0].dataElement = this.state.textField1;
    /*
    

    

    const event = {
      dataValues: [this.state.textField1]
    }

    console.log("EVENT: ", event);
    */
    /*
    var baseUrl = Api.dhis2.baseUrl;
    var headers = Api.headers;
    fetch(`${baseUrl}events/${this.props.eventID}/${this.state.currentField}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers,
      body: JSON.stringify(temp),
    })
    .catch(error => error)
    .then(response => response.json());
    */
    /*
    fetch(`${baseUrl}events/${this.props.eventID}/romAEndBlt4`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers,
    })
    .catch(error => error)
    .then(response => response.json());
    */
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
      className={classes.textinput} onChange={(event) => this.handleInput(event, this.state.data[5])} rowsMax="7"/>
      </div>

      </form>
      <div>
      <Button className={classes.buttons} onClick={this.saveChanges} color="primary"> Change </Button>
      <Button className={classes.buttons} onClick={this.props.handler} color="primary"> Close </Button>
      </div>
      </Paper>
      </body>
      </div>
    );
  }
}

export default withStyles(styles)(Oldreport);
