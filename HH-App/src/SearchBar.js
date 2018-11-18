import React, { Component } from 'react';
import Test from './Test.js';
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
			curr: []
		};

		this.onChange = this.onChange.bind(this);
		this.setInputState = this.setInputState.bind(this);
		this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
		this.listItems = null;
	}

	createEntry(name, time){
		return {doctor_name: name, logged:time};
	}

	setInputState(input){
		var workAround = this.state.dummyData;
		workAround.push(input);
		this.setState({dummyData: workAround, curr: workAround});
		console.log("Tar lang tid");
		
	}
	async componentDidMount(){
		for(var i = 0; i < 10; i++){
			await this.sleep(2000);
			var name = null;
			var time = null;
			var entry = null;
			fetch('https://randomuser.me/api/')
			.then(reply => reply.json())
			.then(result => {
				name = result.results[0].name.last;
				time = result.results[0].registered.date;
				entry = this.createEntry(name, time);
				this.setInputState(entry);
			});
		}
		console.log("Ferdig");
	}
	onChange(event){
		var sum = [];
		console.log("Hei");
		this.filter(event.target.value);
		
	}

	sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	callBack(){
		this.setState({lestInn: true}, function(){
			console.log("Ferdig å lese inn");
			console.log(this.state.dummyData);
		})
	}

	filter(value){
		var sum = [];
		for(var i = 0; i < this.state.dummyData.length; i++){
			if(this.state.dummyData[i].doctor_name.startsWith(value)){
				//console.log(this.state.dummyData[i].doctor_name + " hadde " + value);
				sum.push(this.state.dummyData[i]);
			}
		}
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

	filterName(name){
		//window.open("https://www.w3schools.com");
		console.log(name);
		document.getElementById("in").value = name;
		this.filter(name);
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



	render(){
			
			if(this.state.lestInn&& this.state.curr.length > 0){
				//console.log("Kjører");
				this.listItems = this.state.curr.map((fucker) => 
					<li onClick={
						//console.log("Trykket på liste elem " + this.state.openWindow);
						this.toggleWindowPortal}>{fucker.doctor_name + " " + fucker.logged}</li>

				);
				//console.log(this.listItems);g
			}


			if(this.state.openWindow){
				console.log("Vindu oppe");
				return(
					<Test>
					<button onClick={() => this.setState({openWindow: false})}> Nytt vindu, hehe </button>
					</Test>
				);
			}

		console.log("Ikke noe vindu");

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