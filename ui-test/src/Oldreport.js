import './report.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Select, MenuItem, Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
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
    overflow: 'auto',
  },
  dropdown: {
    width: '20%',
    marginTop: '10%',
  },
  input: {
    fontSize: '10',
  }

});

class Oldreport extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      date:'',
      timeFrom:'',
      timeTo:'',
      patientType:'lalalal',
      equipmentUsed:'lalalala',
      problems:[],
      status:''
      };

      this.handleEquipment = this.handleEquipment.bind(this);
      this.handlePatient = this.handlePatient.bind(this);
    };


    handlePatient(event){
      this.setState({patientType: event.target.value});
    }
    handleEquipment(event){
      this.setState({equipmentUsed: event.target.value});
    }

    handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    };

  render(){
    const { classes } = this.props;
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
          <Paper className={classes.root}>
            <form onSubmit={this.handleSubmit}>
              <div>
                <TextField type="text" value={this.state.patientType}  label="Types of patients:" className={classes.textinput} onChange={this.handlePatient}/>
              </div>
              <div>
                <TextField type="text" value={this.state.equipmentUsed} label="Equipment used:"className={classes.textinput} onChange={this.handleEquipment}/>
              </div>
              <div>
                <TextField select={true} type="text" value={this.state.problems} label="Challenges related to equipment or infrastructure:"
               className={classes.dropdown} InputProps={{ classes: {input: classes.input } }}

               onChange={this.handleProblems} rowsMax="7"/>
              </div>
              <div>
                <Select value={0}  onChange={this.handleChange}  className={classes.dropdown} InputProps={{ classes: {input: classes.input } }} input={<Input name="age" id="age-helper" />} >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value={'User issue'}>User issue</MenuItem>
                  <MenuItem value={'Technical issue'}>Technical issue</MenuItem>
                  <MenuItem value={'Equipment issue'}>Equipment issue</MenuItem>
                  <MenuItem value={'Health worker issue'}>Health worker issue</MenuItem>
                </Select>
              </div>

            </form>
            <div>
              <Button className={classes.buttons} color="primary"> Change </Button>
            </div>
          </Paper>
        </body>
      </div>
    );
  }
}

export default withStyles(styles)(Oldreport);
