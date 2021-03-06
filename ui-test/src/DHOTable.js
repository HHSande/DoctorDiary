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
  createData('Alex', 1, 14.11, 'Pending'),
  createData('Even', 2, 14.11, 'Accepted'),
  createData('Sarah', 3, 14.11, 'Declined'),
  createData('Kim ', 4, 14.11, 'Accepted'),
  createData('Hans', 5, 14.11, 'Accepted'),
];


let id = 0;
function createData(submitted, rNumber, date, status) {
  id += 1;
  return { id, submitted, rNumber, date, status};
}


function DHOTable(props){
  const { classes } = props;

  console.log(styles);

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
            {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.submitted}
                  </TableCell>
                  <TableCell className={classes.tablealign} numeric>{row.rNumber}</TableCell>
                  <TableCell numeric>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
}

DHOTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DHOTable);
