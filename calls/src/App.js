import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api'

// TEST APP


/*
TODO:
- Separer leger fra DHOer i usersWithAccess
- Hent rapporter per lege
*/



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usersWithAccess: [],
      entities: [],
      reports: [],
      orgUnits: [],
      location: "",
      reportStatus: ""
    };
  }

  getDataFromDhis2 = () => {

    api.getMetaData().then(data => {
      console.warn('metadata', data);
      this.setUsersWithAccess(data.programs[0].userAccesses);
      this.setOrgUnits(data.programs[0].organisationUnits);
      this.getTrackedEntities();
    });

    api.getReports().then(data => {
      console.warn('REPORTS', data.events);
      this.setReports(data.events);
    });
  };

  getEvent = () => {
    api.getEvent().then(data => {
      console.warn("EVENT", data);
    });
  };

  getTrackedEntities = orgUnit => {

    api.getTrackedEntityInstances(this.state.orgUnits[4].id).then(data => {
      console.warn("TRACKED ENTITIES", data)
      this.setEntityInstances(data);
    });
  };


  separateDocsFromDHOs() {  // funksjon for å loope gjennom userAccesses og fordele de i docs og DHOs
    /*
    "id": "RYOicE8XVw9",
    "displayName": "DHO"

    "id": "kNIhGGdyWFp",
    "displayName": "Doctor"
    */
  }


  getReports(doctor) { // hent alle rapportene til en doktor

  }


  postDataToDhis2 = () => {
    const event = {
      dataValues: [],
      enrollment: "bSgf64mZdSn",
      eventDate: "1995-09-27",
      notes: [{value: "heia even"}],
      orgUnit: "DUDHgE5DECu",
      program: "r6qGL4AmFV4",
      programStage: "ZJ9TrNgrtfb",
      status: "ACTIVE",
      trackedEntityInstance: "i2LbbicX7x4"
    };

    api.postEvent(event).then(response => {
      console.warn("RESPONSE:", response.response.importSummaries[0].reference);
      this.getEvent();
    });
  }

  setEntityInstances = entities => {
    this.setState({
      entities,
    });
  };


  setUsersWithAccess = usersWithAccess => {
    this.setState({
      usersWithAccess,
    });
  };


  setReports = reports => {
    this.setState({
      reports,
    });
  };


  setOrgUnits = orgUnits => {
    this.setState({
      orgUnits,
    });
  };


  render() {
    return (
      <div className="App">
      <header className="App-header">
      <button onClick={ this.getDataFromDhis2 }>GET</button>
      <button onClick={ this.postDataToDhis2 }>POST</button>
      <p>
      Edit <code>src/App.js</code> and save to reload.
      </p>
      <ul>
      { this.state.orgUnits.map(orgUnit =>
        <p><li> { orgUnit.id } </li></p>
      )}
      </ul>
      <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
      >
      Learn React
      </a>
      </header>
      </div>
    );
  }
}

export default App;


// -K
