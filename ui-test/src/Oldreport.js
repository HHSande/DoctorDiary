import React, { Component } from 'react';
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';

class Oldreport extends React.Component{
  constructor(props){
    super(props)

    };


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

        <input type="submit" value="Submit"/>
        <button className="saveButton"> Heh </button>
        </body>
      </div>
    );
  }
}

export default Oldreport;
