import React, { Component } from 'react';
import Test from './Test.js';
import Api from './api.js';
import NewWindow from 'react-new-window';
import Oldreport from './Oldreport.js';
import { TableCell, Table, TableHead, TableBody, TableRow, Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DHOTable from './DHOTable.js'
/**
Lagre doktorene i objekter, hvor de har en array av sine reports?
Lage en objekt for reports, som har dato og content i seg?

Lage en funksjon som generere en tr for navn og en for dato,
disse skal kunne sorteres.
**/

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
	},
	textinput: {
		marginTop:'2rem',
		marginTop:'2rem',
		margin:'0',
		overflow: 'auto',
	},
	app: {
		padding: '0.35rem'
	},
	buttonappbar: {
		margin: '1.25%' ,
		backgroundColor:'#E6E6FA',
	},
	buttonapprove: {
		margin: '1.25%' ,
		backgroundColor:'#00ff00',
	},
	buttondecline: {
		margin: '1.25%' ,
		backgroundColor: '#CD5C5C',
	},
	buttonpending: {
		margin: '1.25%' ,
		backgroundColor:'#f4b042',
	},
	searchbar: {
		width: '60%',
		border: '1rem',
		backgroundColor: '#E6E6FA',
		marginRight: '13%',
		'placeholder': {
			color: 'white',
		},
	},
	tablealign: {
		textAlign: '-webkit-auto',

	},
	tablecell: {
		fontSize: '1rem',
		textAlign: '-webkit-auto',

	},

});

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
			officer: false,
			orgUnit: "",
			reports: [],
			instance: "",
			enrollment: "",
			dataValueIDs: ["BIB2zYDYIJp", "CXL5mg5l0cv", "EZstOIjb7wN", "LoY92GDoDC6", "p5D5Y9x7yMc", "romAEndBlt4", "zrZADVnTtMa"],
			loading: true,
		};

		this.onChange = this.onChange.bind(this);
		this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
		this.listItems = null;
		this.getEvent = this.getEvent.bind(this);
		this.lessThan7 = this.lessThan7.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.sortDataValues = this.sortDataValues.bind(this);
		this.checkConnectivity = this.checkConnectivity.bind(this);
		this.getStatus = this.getStatus.bind(this);
		this.checkStatus = this.checkStatus.bind(this);

	}

	createEntry(name, time){
		return {doctor_name: name, logged:time};
	}


	componentDidMount(){

		Api.getMe().then(data => {
			this.setState({ orgUnit: data.teiSearchOrganisationUnits[0].id, username: data.userCredentials.username, officer: data.teiSearchOrganisationUnits.length > 1}, function(){
				console.log("Me data", data);
			});
		});
		console.log("Skjedde");

		Api.getReports().then(data => {
			console.log("Dette er data", data);
			//var tempArray = [];
			for(var i = 0; i < data.events.length; i++){

				//tempArray.push(this.sortDataValues(data.events[i].dataValues));
				data.events[i].dataValues = this.sortDataValues(data.events[i].dataValues);
			}
			console.log(data);
			console.warn('REPORTS', data.events);
			this.setState({dummyData : data.events, curr: data.events, loading: false});
			console.log("RAPPORTER: ", this.state.dummyData);
		});
	}


	onChange(event){
		var sum = [];
		console.log("Hei sendt med", event.target.value);
		this.filter(event.target.value);

	}


	filter(value){
		console.log("Blir kalt?", value);
		//console.log(value);
		var sum = [];
		for(var i = 0; i < this.state.dummyData.length; i++){
			if(this.state.dummyData[i].storedBy.toLowerCase().startsWith(value)){
				//console.log(this.state.dummyData[i].doctor_name + " hadde " + value);
				console.log("Matched ", this.state.dummyData[i].storedBy.toLowerCase());
				sum.push(this.state.dummyData[i]);
			}
		}
		console.log("Array med navn som matchet", sum);
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

	filterName(name){
		//window.open("https://www.w3schools.com");
		console.log(name);
		document.getElementById("in").value = name;
		this.filter(name.toLowerCase());
		//this.toggleWindowPortal();
	}

	toggleWindowPortal() {

		this.setState(state => ({
			...state,
			openWindow: true,
		}), function(){
			//console.log("Skal vel være true?: " + this.state.openWindow);
		});
	}


	getEvent(eventID){
		Api.getEntryFromDoctor(eventID).then(data => this.setState({ report : this.sortDataValues(data.dataValues), openReport: true, id : eventID,
			getObject : JSON.stringify(data) }));
		}


	postNewReport(){
		Api.getTrackedEntityInstance(this.state.orgUnit, this.state.username)
		.then(data => {
			this.setState({enrollment: data.trackedEntityInstances[0].enrollments[0].enrollment,
				instance: data.trackedEntityInstances[0].trackedEntityInstance},
				() => {
					this.setInstanceAndEnrollment();
				});
			});
		}

	setInstanceAndEnrollment() {


		console.log("Instance", this.state.instance, " // enrollment", this.state.enrollment);
		var date = new Date();
		var day = date.getDay();
		var month = date.getMonth();
		var year = date.getYear();


		if(day<10) {
			day = '0'+day
		}

		if(month<10) {
			month = '0'+month
		}

		var date = year+"-"+month+"-"+day;

		const event = {
			dataValues: [],
			enrollment: this.state.enrollment,
			eventDate: "1995-09-27",
			notes: [{value: "HELT NY RAPPORT POST2"}],
			orgUnit: this.state.orgUnit,
			program: "r6qGL4AmFV4", // Hardkoda men det e gucci
			programStage: "ZJ9TrNgrtfb",  // Hardkoda men det e gucci
			status: "ACTIVE", // Hardkoda men det e gucci
			trackedEntityInstance: this.state.instance
		}


		var eventID = "";
		var baseUrl = Api.dhis2.baseUrl;
		var headers = Api.headers;


		Api.postEvent(event).then(res => {

			console.log("EVENTID:" , res);
			eventID = res.response.importSummaries[0].reference;

			var values = [7];
			for (var i = 0; i < 7; i++){
				values[i] = {
					"dataElement": this.state.dataValueIDs[i],
					"value": 0,
				}
			}

			const newValues = {
				dataValues: values,
				notes: [{value: "yung renzel"}]
			}

			fetch(`${baseUrl}events/${eventID}`, {
				method: 'PUT',
				credentials: 'include',
				mode: 'cors',
				headers,
				body: JSON.stringify(newValues),
			})
			.catch(error => error)
			.then(console.log("SE Her", this.getEvent(eventID)));
		});
	};


	sortDataValues(array){
		console.log("Dette får vi inn", array);
		if(array === undefined || !array.length === 7){
			return array;

		} else {
			var ny = array.sort(function(a, b){

				if (a.dataElement < b.dataElement){
					return -1;
				}

				if (a.dataElement > b.dataElement){
					return 1;
				}
				return 0;
			});

			console.log("Sorterte array", ny);
			return ny;
		}
	}

	checkStatus(input){
		console.log("Dette får vi fra approved section", input);
		if(input === "1"){		//Approved
			return this.props.classes.buttonapprove;

		}else if(input === "2"){	//Declined
			return this.props.classes.buttondecline;

		}else if(input === "3"){	//Pending
			return this.props.classes.buttonpending;

		}else{
			return this.props.classes.buttonpending;
		}
	}


	getStatus(input){

		if(input === "1"){		//Approved
			return "Approved";

		}else if(input === "2"){	//Declined
			return "Declined";

		}else if(input === "3"){	//Pending
			return "Pending";

		}else{
			return "Unfinished";
		}
	}


	lessThan7(data){
		if(this.state.officer){
			console.log("Logged in as officer");
			return data.dataValues.length >= 7;
		}

		return data.storedBy === this.state.username && data.dataValues.length === 7;
	}


	closeWindow() {
		this.setState({openReport : false});
	}


	render(){
		const { classes } = this.props;

		if (this.state.loading){
			return (<div><h1><font color="white">Loading...</font></h1></div>)
		}

		if (this.state.openReport){
			console.log("Åpnet vindu");
			console.log("REPORT:", this.state.report);
			return (

				<NewWindow>
				<Oldreport data={ this.state.report } handler = { this.closeWindow } eventID = { this.state.id } report = { this.state.getObject } role = {this.state.officer}/>
				</NewWindow>
			)
		}

		console.log(this.state.openReport);
		if(/*this.state.curr.length > 0 && */ this.state.getObject === ""){
			//console.log("Hei")
			//console.log("Kjører");


			this.listItems = this.state.curr.filter(this.lessThan7).map((fucker) =>
			<TableRow onClick={() =>
				this.getEvent(fucker.event)}>
				<TableCell className={classes.tablealign}>{fucker.storedBy}</TableCell>
				<TableCell numeric>{fucker.dueDate}</TableCell>
				<TableCell numeric><Button className={this.checkStatus(fucker.dataValues[6].value)}>{this.getStatus(fucker.dataValues[6].value)}</Button></TableCell>
				</TableRow>
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
			<Paper className={classes.root}>
			<AppBar className={classes.app} position="static" color="primary">
			<Toolbar>
			<Typography variant="h6" color="inherit">Logged in as: {this.state.username}</Typography>
			</Toolbar>
			<Toolbar>
			<TextField type="text" onChange={this.onChange.bind(this)} className={classes.searchbar} variant="filled" margin="normal" placeholder="Search by doctor"/>
			<Button className={classes.buttonappbar} onClick={this.sortByName.bind(this)}>Sort by name</Button>
			<Button className={classes.buttonappbar} onClick={this.sortByDate.bind(this)}>Sort by date</Button>
			<Button className={classes.buttonappbar} onClick={() => this.postNewReport()}> Create new report </Button>
			</Toolbar>
			</AppBar>
			<Table>
			<TableHead>
			<TableRow className={classes.tablecell}>
			<TableCell className={classes.tablecell} numeric>Submitted by</TableCell>
			<TableCell className={classes.tablecell} numeric>Date</TableCell>
			<TableCell className={classes.tablecell} numeric>Status</TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{this.listItems}
			</TableBody>
			</Table>
			</Paper>
			</div>
		);
	}

}

export default withStyles(styles)(SearchBar);
