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
      textField1: "",
      textField2: "",
      textField3: "",
      textField4: "",
    };

    this.handlePatient = this.handlePatient.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  };

  setValue(text, id){

    if (id == "zrZADVnTtMa"){
      this.setState({ textField1: text });
    } else if (id == "romAEndBlt4"){
      this.setState({ textField2 : text});
    } else if (id == "EZstOIjb7wN"){
      this.setState({ textField3 : text});
    } else if (id == "p5D5Y9x7yMc"){
      this.setState({ textField4 : text});
    }
  }





  componentDidMount() {

    var dataValues = this.props.data;

    console.log("dataValues: ", dataValues);

    for(var i = 0; i < dataValues.length; i++){
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
    }
  }


  handlePatient(event)  {
    this.setState({ textField1: event.target.value });
  }

  saveChanges() {

    // endrer objektet

    var temp = JSON.parse(this.props.report);
    console.log("BODY: ", temp);

    console.log("DET VI SKAL HA", temp.dataValues[0]);

    temp.dataValues[0].value = this.state.textField;

    const event = {
      dataValues: [this.state.textField1]
    }

    console.log("EVENT: ", event);

    var baseUrl = Api.dhis2.baseUrl;
    var headers = Api.headers;

    fetch(`${baseUrl}events/${this.props.eventID}/romAEndBlt4`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers,
      body: JSON.stringify(temp),
    })
    .catch(error => error)
    .then(response => response.json());


    fetch(`${baseUrl}events/${this.props.eventID}/romAEndBlt4`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers,
    })
    .catch(error => error)
    .then(response => response.json());
  }



  render(){
    const { classes } = this.props;
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
      <TextField type="text" ref="romAEndBlt4" value={this.state.textField1}  label="Types of patients:" className={classes.textinput} onChange={this.handlePatient}/>
      </div>
      <div>
      <TextField type="text" ref="EZstOIjb7wN" value={this.state.textField2} label="Equipment used:"className={classes.textinput} onChange={this.handleEquipment}/>
      </div>
      <div>
      <TextField multiline={true} type="text" ref="EZstOIjb7wN" value={this.state.textField3} label="Challenges related to equipment or infrastructure:"
      className={classes.textinput} onChange={this.handleProblems} rowsMax="7"/>
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
