import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from './SearchBar.js';
import Oldreport from './Oldreport.js'

const styles = theme => ({
  root: {
    width: '80%',
    margin:'0 auto',
    marginTop: '1%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tablecell: {
    fontSize: '40pt',
  },
  tablesubmit: {
    textAlign: '-webkit-auto',
  },
  tablealign: {
    textAlign: '-webkit-auto',
  },
});

const rows = [

];




class DHOTable extends Component{
  constructor(props){
    super(props)

    };
  render(){
  const { classes } = this.props;

  console.log(styles);
  console.log(this.props);
  /*props.rNumber, props.date, props.status, props.comment*/

    return (
      <Paper className={classes.root}>
        <Table className={classes.table }>
          <TableHead>
            <TableRow className={classes.tablecell}>
              <TableCell className={classes.tablesubmit} numeric > Submitted by</TableCell>
              <TableCell>Report number</TableCell>
              <TableCell numeric>Date</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.datavalues.map(row => {
              return (
                <TableRow onClick={() => this.props.onTableClick(row)} key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.orgUnit}
                  </TableCell>
                  <TableCell className={classes.tablealign} numeric>{row.storedBy}</TableCell>
                  <TableCell numeric>{row.dueDate}</TableCell>
                  <TableCell>{row.enrollment}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableCell numeric>Date</TableCell>
      </Paper>
    );
  }
}

DHOTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DHOTable);
