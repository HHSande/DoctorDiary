import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Doctorsinterface from './Doctorsinterface.js';
import Todaysreport from './TodaysReport.js';
import Previousreports from './Previousreport.js'
import Oldreport from './Oldreport.js'
import DHOinterface from './DHOinterface.js'
import DHOReportview from './DHOReportview.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="interfaceButtons">
          <DHOReportview/>

        </div>
      </div>
    );
  }
}
/*
  Bare aa velge en av hovedsidene til aa see forskjellige landingssider.
  DHOinterface
  DHOReportview
  Doctorsinterface
  Oldreport
  TodaysReport
  Previousreport

*/
export default App;
