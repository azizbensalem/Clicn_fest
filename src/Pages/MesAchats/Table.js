import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { IconButton, Typography, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Event = ({ data }) => {
  const classes = useStyles(); 
  return (
    <TableContainer component={Paper} variant="outlined">
      {data.length > 0 ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Nom de commande</TableCell>
              <TableCell align="right">Date de commande</TableCell>
              <TableCell align="right">Confirmation</TableCell>
              <TableCell align="right">État</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((events) => (
              <TableRow key={events.id}>
                <TableCell align="right" scope="row">
                  {events.name}
                </TableCell>
                <TableCell align="right">{events.creationDate}</TableCell>
                <TableCell align="right">{events.confirmation}</TableCell>
                <TableCell align="right">
                  {events.isPaid === 1 ? (
                    <Chip
                      size="small"
                      label="Payée"
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                    />
                  ) : (<Chip size="small" label="En attente" 
                  style={{ backgroundColor: "#ffc107", color: "black" }} />
                  )}
                </TableCell>
                <TableCell align="right">
                   <Tooltip title="Payer" placement="top">
                    <IconButton href="#/payement" onClick={() => localStorage.setItem('id_com', events.id)}>
                      <PaymentIcon style={{ color: '#4caf50' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Aucun résultat trouvé
        </Typography>
      )}
    </TableContainer>
  );
}
