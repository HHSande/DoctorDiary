import React, { Component } from 'react';
import Test from './Test.js';
import Api from './api.js';
import NewWindow from 'react-new-window';
import Oldreport from './Oldreport.js';
import { TableCell, Table, TableHead, TableBody, TableRow, Paper, TextField, Input, MuiThemeProvider, AppBar, Button, Toolbar, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DHOTable from './DHOTable.js'
import logo from './loading.gif';
/**
Lagre doktorene i objekter, hvor de har en array av sine reports?
Lage en objekt for reports, som har dato og content i seg?

Lage en funksjon som generere en tr for navn og en for dato,
disse skal kunne sorteres.
**/

/*
	TODO:
		CREATE NEW REPORT må ikke vises når du er DHO	DONE!!
		Datoformatet må endres i listeview 					DONE!!!!
		Datoformatet må fikses i POST NEW REPORT	DONE!!
		UNFINISHED kontra PENDING
		Trigge en rerender når vi lukker rapport 			DONE!!!!
		Fiks dropdown i rapport
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
		width: '100%',
		margin: '1.25%' ,
		backgroundColor:'#00ff00',
	},
	buttondecline: {
		width: '100%',
		margin: '1.25%' ,
		backgroundColor: '#CD5C5C',
	},
	buttonpending: {
		width: '100%',
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
			asc: false,
			dec: false,
			openWindow: false,
			curr: [],
			openReport: false,
			report: [],
			id: "",
			getObject: "",
			connectivity: navigator.onLine,
			username: "",
			officer: false,
			orgUnit: "",
			instance: "",
			enrollment: "",
			dataValueIDs: ["BIB2zYDYIJp", "CXL5mg5l0cv", "EZstOIjb7wN", "LoY92GDoDC6", "p5D5Y9x7yMc", "romAEndBlt4", "zrZADVnTtMa"],
			loading: true,
		};

		this.onChange = this.onChange.bind(this);
		this.listItems = null;
		this.getEvent = this.getEvent.bind(this);
		this.lessThan7 = this.lessThan7.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.sortDataValues = this.sortDataValues.bind(this);
		this.getStatus = this.getStatus.bind(this);
		this.checkStatus = this.checkStatus.bind(this);
		this.pullReports = this.pullReports.bind(this);
		this.getCreateReportButton = this.getCreateReportButton.bind(this);
		this.genericSort = this.genericSort.bind(this);
	}

	componentDidMount(){

		Api.getMe().then(data => {
			this.setState({ orgUnit: data.teiSearchOrganisationUnits[0].id, username: data.userCredentials.username, officer: data.teiSearchOrganisationUnits.length > 1})
		});

		this.pullReports();
	}


	pullReports(){
		Api.getReports().then(data => {

			for(var i = 0; i < data.events.length; i++){
				data.events[i].dataValues = this.sortDataValues(data.events[i].dataValues);
				var tempStorage = data.events[i].dueDate.split("T");
				var stykkOm = tempStorage[0].split("-");
				var nyTid = stykkOm[2] + "-" + stykkOm[1] + "-" + stykkOm[0];
				var rakker = tempStorage[1].split(".");
				data.events[i].dueDate = nyTid + " " + rakker[0];
			}
			this.setState({ curr: data.events, loading: false});
		});
	}


	onChange(event){
		this.filter(event.target.value);
	}


	filter(value){

		var sum = [];
		for(var i = 0; i < this.state.curr.length; i++){

			if(this.state.curr[i].storedBy.toLowerCase().startsWith(value)){
				sum.push(this.state.curr[i]);
			}
		}

		this.setState({curr: sum});
	}

	genericSort(objectValue){
		var temp = this.state.curr.filter(this.lessThan7);
		var ny = temp.sort(function(a,b){
			if(a[objectValue] === undefined || b[objectValue] === undefined){
				return 0;
			}
			if (a[objectValue].toString().toLowerCase() < b[objectValue].toString().toLowerCase()){
				return -1;
			}
			if (a[objectValue].toString().toLowerCase() > b[objectValue].toString().toLowerCase()){
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

	sortByStatus(){
		var temp = this.state.curr.filter(this.lessThan7);
		var ny = temp.sort(function(a,b){
			if(a.dataValues[6] === undefined || b.dataValues[6] === undefined){
				return 0;
			}

			if(parseInt(a.dataValues[6].value) < parseInt(b.dataValues[6].value)){
				return -1;
			}else if(parseInt(a.dataValues[6].value) > parseInt(b.dataValues[6].value)){
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

		const event = {
			dataValues: [],
			enrollment: this.state.enrollment,
			notes: [],
			orgUnit: this.state.orgUnit,
			program: "r6qGL4AmFV4",
			programStage: "ZJ9TrNgrtfb",
			status: "ACTIVE",
			trackedEntityInstance: this.state.instance
		}

		var eventID = "";
		var baseUrl = Api.dhis2.baseUrl;
		var headers = Api.headers;


		Api.postEvent(event).then(res => {

			eventID = res.response.importSummaries[0].reference;

			var values = [7];
			for (var i = 0; i < 7; i++){
				values[i] = {
					"dataElement": this.state.dataValueIDs[i],
					"value": "0",
				}
			}

			const newValues = {
				dataValues: values,
				notes: []
			}

			fetch(`${baseUrl}events/${eventID}`, {
				method: 'PUT',
				credentials: 'include',
				mode: 'cors',
				headers,
				body: JSON.stringify(newValues),
			})
			.catch(error => error);
		});
	};


	sortDataValues(array){
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

			return ny;
		}
	}


	checkStatus(input){
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
			return data.dataValues.length >= 7;
		}

		return data.storedBy === this.state.username && data.dataValues.length === 7;
	}


	closeWindow() {
		this.setState({openReport : false});
		this.pullReports();
	}


	getCreateReportButton() {
		if (!this.state.officer){
			return <div><Button className={this.props.classes.buttonappbar} onClick={() => this.postNewReport()}>Create new report</Button></div>
		}
	}


	render(){

		const { classes } = this.props;

		if (this.state.loading){
			return (<div><img src={logo} /></div>)
			return (<div><h1><font color="white">Loading...</font></h1></div>)
		}

		if (this.state.openReport){
			return (
				<NewWindow>
				<Oldreport data={ this.state.report } handler = { this.closeWindow } eventID = { this.state.id } report = { this.state.getObject } role = {this.state.officer}/>
				</NewWindow>
			)
		}

		if (this.state.getObject === ""){
			this.listItems = this.state.curr.filter(this.lessThan7).map((report) =>
			<TableRow onClick={() =>
				this.getEvent(report.event)}>
				<TableCell className={classes.tablealign}>{report.storedBy}</TableCell>
				<TableCell numeric>{report.dueDate}</TableCell>
				<TableCell numeric><Button className={this.checkStatus(report.dataValues[6].value)}>{this.getStatus(report.dataValues[6].value)}</Button></TableCell>
				</TableRow>
			);
		}

		return(
			<div>
			<Paper className={classes.root}>
			<AppBar className={classes.app} position="static" color="primary">
			<Toolbar>
			<Typography variant="h6" color="inherit">Logged in as: {this.state.username}</Typography>
			</Toolbar>
			<Toolbar>
			<TextField type="text" onChange={this.onChange.bind(this)} className={classes.searchbar} variant="filled" margin="normal" placeholder="Search by doctor"/>
			<Button className={classes.buttonappbar} onClick={() => this.genericSort("storedBy")}>Sort by name</Button>
			<Button className={classes.buttonappbar} onClick={() => this.genericSort("dueDate")}>Sort by date</Button>
			<Button className={classes.buttonappbar} onClick={this.sortByStatus.bind(this)}>Sort by status</Button>
			{this.getCreateReportButton()}
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
