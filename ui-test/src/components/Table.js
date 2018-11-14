import React, { Component } from 'react';
import ReactDOM from "react-dom";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const TestTable = props =>{
  const { classes } = props;
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  const wideboi = {
    width: '20%',
    overflowX: 'auto',
  };

  let id = 0;
  function createData(rNumber, date, status, comment) {
    id += 1;
    return { id, rNumber, date, status, comment};
  }
  /*props.rNumber, props.date, props.status, props.comment*/
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Submitted by</TableCell>
              <TableCell date>Report number</TableCell>
              <TableCell numeric>Date</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.reportList.map(row => {
              return (
                <TableRow key={row.id} style={wideboi}>
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
export default TestTable;
