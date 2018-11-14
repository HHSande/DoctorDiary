import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';




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
    return(
      <div className="tReport" >
        <body>

          <AppBar position="static" color="primary">
            <Toolbar>
              <Button color="inherit">Back</Button>
              <Typography id="headliner" variant="h6" color="inherit">
                Doctorsinterface
              </Typography>
            </Toolbar>
          </AppBar>

        <form onSubmit={this.handleSubmit}>
          <div className="dateInput">
            <label>
              Date:
              <TextField type="date" variant="outlined" value={this.state.date} onChange={this.handleDate} placeholder="Today's date..."/>
            </label>
          </div>
          <div className="timeInput">
            <label>
              Time:
              <input type="time" value={this.state.timeFrom} onChange={this.handleTimeFrom} placeholder="From.."/>
              -
              <input type="time" value={this.state.timeTo} onChange={this.handleTimeTo} placeholder="To.." />
            </label>
          </div>
          <div className="typeInput">
            <label>
              Types of patients:
              <input type="text" value={this.state.patientType} onChange={this.handlePatient}/>
            </label>
          </div>
          <div className="equipmentInput">
          <label>
            Equipment used:
            <input type="text" value={this.state.equipmentUsed} onChange={this.handleEquipment}/>
          </label>
          </div>
          <div className="equipmentInput">
          <label>
            Challenges related to
            <br></br>
            equipment or infrastructure:
            <input type="text" value={this.state.problems} onChange={this.handleProblems}/>
          </label>
          </div>
        </form>
        <input type="submit" value="Submit"/>
        <button className="saveButton"> Heh </button>
        </body>
      </div>
    );
  }
}

export default Todaysreport;
