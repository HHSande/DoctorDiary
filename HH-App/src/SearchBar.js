import React, { Component } from 'react';
import Test from './Test.js';
import Api from './api.js';
import NewWindow from 'react-new-window';
import Oldreport from './Oldreport.js'
/**
Lagre doktorene i objekter, hvor de har en array av sine reports?
Lage en objekt for reports, som har dato og content i seg?

Lage en funksjon som generere en tr for navn og en for dato,
disse skal kunne sorteres.
**/
class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {
			textValue: "",
			asc: false,
			dec: false,
			dummyData: [],
			openWindow: false,
			lestInn: false,
			curr: [],
			openReport: false,
			report: [],
			id: "",
			getObject: "",
			connectivity: navigator.onLine,
			funcArray: [],
			username: "",
			officer: false
		};

		this.onChange = this.onChange.bind(this);
		//this.setInputState = this.setInputState.bind(this);
		this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
		this.listItems = null;
		this.getEvent = this.getEvent.bind(this);
		//this.orderDataValues = this.orderDataValues.bind(this);
		this.lessThan7 = this.lessThan7.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.sortDataValues = this.sortDataValues.bind(this);
		this.checkConnectivity = this.checkConnectivity.bind(this);
		this.add1 = this.add1.bind(this);
	}

	createEntry(name, time){
		return {doctor_name: name, logged:time};
	}

	/*setInputState(input){
	var workAround = this.state.dummyData;
	workAround.push(input);
	this.setState({dummyData: workAround, curr: workAround});
	console.log("Tar lang tid");

}*/
componentDidMount(){

	Api.getMe().then(data => {
    this.setState({ username: data.userCredentials.username, officer: data.teiSearchOrganisationUnits.length > 1}, function(){
    	console.log("Me data", data);
    });
    });

	this.checkConnectivity();
	setInterval(this.checkConnectivity, 3000);
	console.log("Skjedde");
	Api.getReports().then(data => {
		console.log(data);
		console.warn('REPORTS', data.events);
		this.setState({dummyData : data.events, curr: data.events});
		console.log("RAPPORTER: ", this.state.dummyData);
	});
}

onChange(event){
	var sum = [];
	console.log("Hei");
	this.filter(event.target.value);

}

sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



filter(value){
	console.log("Blir kalt?");
	console.log(value);
	var sum = [];
	for(var i = 0; i < this.state.dummyData.length; i++){
		if(this.state.dummyData[i].storedBy.toLowerCase().startsWith(value)){
			//console.log(this.state.dummyData[i].doctor_name + " hadde " + value);
			console.log("Matched ", this.state.dummyData[i].storedBy.toLowerCase());
			sum.push(this.state.dummyData[i]);
		}
	}
	console.log(sum);
	this.setState({curr: sum});

}
sortByName(){
	var temp = this.state.curr;
	var ny = temp.sort(function(a, b){
		if (a.doctor_name < b.doctor_name){
			return -1;
		}
		if (a.doctor_name > b.doctor_name){
			return 1;
		}
		return 0;
	});

	if(!this.state.asc){
		this.setState({curr: ny, asc: true, dec:false});
	}else if(!this.state.dec){
		this.setState({curr: ny.reverse(), asc:false, dec:true});
	}
}

sortByDate(){
	var temp = this.state.curr;
	var ny = temp.sort(function(a, b){
		if (a.logged < b.logged){
			return -1;
		}
		if (a.logged > b.logged){
			return 1;
		}
		return 0;
	});

	if(!this.state.asc){
		this.setState({curr: ny, asc: true, dec:false});
	}else if(!this.state.dec){
		this.setState({curr: ny.reverse(), asc:false, dec:true});
	}
}

checkConnectivity(){
	if(!this.state.connectivity){
		console.log("Legger til i array grunnet ikke nett");
		var temp = this.state.funcArray;
		temp.push(this.add1);
		this.setState({funcArray: temp});
	}

	if(this.state.connectivity && this.state.funcArray.length > 0){
		var copy = this.state.funcArray.length;
		for(var i = 0; i < copy; i++){
			console.log("Printer");
			console.log(copy.length);
			console.log(this.state.funcArray.pop()(i));
		}
	}

	if(this.state.connectivity !== navigator.onLine){
		console.log("Endrer connectivity");
		this.setState({connectivity: navigator.onLine});
	}
	
}

add1(param){
	return param + 1;
}
filterName(name){
	//window.open("https://www.w3schools.com");
	console.log(name);
	document.getElementById("in").value = name;
	this.filter(name.toLowerCase());
	//this.toggleWindowPortal();
}

toggleWindowPortal() {
	/*console.log("Skal endre noe nå?");
	console.log(this.state.openWindow);
	console.log(this.state.done);
	*/
	//console.log("Åpner vindu");
	//console.log("Før " + this.state.openWindow);
	this.setState(state => ({
		...state,
		openWindow: true,
	}), function(){
		//console.log("Skal vel være true?: " + this.state.openWindow);
	});

	//console.log("Etter: " + this.state.openWindow);
}

getEvent(eventID){
	Api.getEntryFromDoctor(eventID).then(data => this.setState({ report : this.sortDataValues(data.dataValues), openReport: true, id : eventID,
	getObject : JSON.stringify(data) }, function(){
		//console.log("Hva skjer?");
		console.log("Henter entry from doctor");
		console.log(this.state.getObject);
	}));



}

sortDataValues(array){
	console.log(array);
	if(!array.length === 7){
		return array;
	}else{
		var ny = array.sort(function(a, b){
			if (a.dataElement < b.dataElement){
				return -1;
			}
			if (a.dataElement > b.dataElement){
				return 1;
			}
			return 0;
		});

		return ny;
	}	
}


lessThan7(data){
	if(this.state.officer){
		console.log("Logged in as officer");
		return data.dataValues.length === 7;
	}

	console.log("Logged in as doctor", data.storedBy);
	//if(data.storedBy === this.state.username){
		return data.storedBy === this.state.username && data.dataValues.length === 7;
	//}
	
}

closeWindow() {
	this.setState({openReport : false});

}


render(){

if(!this.state.connectivity){
	return(
		<div>
		<p> VI HAR IKKE NETT :OOO </p>
		</div>
	);
}
if (this.state.openReport){


	return (
		<NewWindow>
		<Oldreport data={ this.state.report } handler = { this.closeWindow } eventID = { this.state.id } report = { this.state.getObject }/>
		</NewWindow>

	)
}

	if(this.state.curr.length > 0 && this.state.getObject === ""){
		console.log("Hei")
		//console.log("Kjører");
		this.listItems = this.state.curr.filter(this.lessThan7).map((fucker) =>
		<li onClick={() =>
			this.getEvent(fucker.event)}>{fucker.storedBy + " " + fucker.dueDate /* + " " + this.orderDataValues(fucker.dataValues)*/ }</li>
		);

	}

	if(this.state.openWindow){
		console.log("Vindu oppe");
		return(
			<Test>
			<button onClick={() => this.setState({openWindow: false})}> Nytt vindu, hehe </button>
			</Test>
		);
	}


	//console.log("Her skal være false: " + this.state.openWindow);

	return(
		<div>
		<input id="in" type="text" onChange={this.onChange.bind(this)} />
		<button onClick={this.sortByName.bind(this)}>Sort by name</button>
		<button onClick={this.sortByDate.bind(this)}>Sort by date</button>
		<ul>{this.listItems}</ul>
		</div>
	);
}

}

export default SearchBar;
