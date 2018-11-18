import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
      };
    };

  componentDidMount() {
    console.log("oldreport: ", this.props.data);
  }

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
                <TextField type="text" value={this.props.data[0].created}  label="Types of patients:" className={classes.textinput} onChange={this.handlePatient}/>
              </div>
              <div>
                <TextField type="text" value={this.props.data[1].created} label="Equipment used:"className={classes.textinput} onChange={this.handleEquipment}/>
              </div>
              <div>
                <TextField multiline={true} type="text" value={this.state.problems} label="Challenges related to equipment or infrastructure:"
               className={classes.textinput} onChange={this.handleProblems} rowsMax="7"/>
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
