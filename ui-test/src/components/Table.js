import React, { Component } from 'react';
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
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


let id = 0;
function createData(rNumber, date, status, comment) {
  id += 1;
  return { id, rNumber, date, status, comment};
}

const rows = [
  createData('Alex', 1, 14.11, 'Pending'),
  createData('Even', 2, 14.11, 'Accepted'),
  createData('Sarah', 3, 14.11, 'Declined'),
  createData('Kim ', 4, 14.11, 'Accepted'),
  createData('Hans', 5, 14.11, 'Accepted'),
];

function DoctorTable (props){

  const { classes } = props;


  /*props.rNumber, props.date, props.status, props.comment*/

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tablecell}>
              <TableCell numeric className={classes.tablesubmit}>Report number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell numeric>Status</TableCell>
              <TableCell numeric>Comment from health officer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.id} >
                  <TableCell component="th" scope="row">
                    {row.rNumber}
                  </TableCell>
                  <TableCell numeric>{row.date}</TableCell>
                  <TableCell numeric>{row.status}</TableCell>
                  <TableCell numeric>{row.comment}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
}
export default withStyles(styles)(DoctorTable);
