import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';
import Startpage from './Startpage.js'
import DHOinterface from './DHOinterface.js'
import Doctorsinterface from './Doctorsinterface.js';
import Api from './api.js';






class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			officer: 100,
		}

		this.checkOfficer = this.checkOfficer.bind(this);
	};

componentDidMount(){
	this.checkOfficer();
}
checkOfficer(){
	Api.getMe().then(data => {
		this.setState({officer: data.teiSearchOrganisationUnits.length > 1});
	});
}

  render() {
  	if(this.state.officer === 100){
  		return (
  			<div></div>
  		);
  	}
  	if(this.state.officer){
  		return (
     		<SearchBar/>
    	);
  	}else{
  		return (
  			<Doctorsinterface />
  		);
  	}
    
  }
}

export default App;
