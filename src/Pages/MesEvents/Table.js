import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
              <TableCell align="right">Theme d'événement</TableCell>
              <TableCell align="right">Type d'évènement</TableCell>
              <TableCell align="right">Date début</TableCell>
              <TableCell align="right">Date Fin</TableCell>
              <TableCell align="right">État</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((events) => (
              <TableRow key={events.id}>
                <TableCell align="right" scope="row">
                  {events.theme}
                </TableCell>
                <TableCell align="right">{events.type}</TableCell>
                <TableCell align="right">{events.startDate}</TableCell>
                <TableCell align="right">{events.endDate}</TableCell>
                <TableCell align="right">
                  {events.status === "Pending" ? (
                    <Chip
                      size="small"
                      label={events.status}
                      style={{ backgroundColor: "#ffc107", color: "black" }}
                    />
                  ) : (<Chip size="small" label={events.status} 
                  style={{ backgroundColor: "#4caf50", color: "white" }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  {/* <Tooltip title="Afficher" placement="top">
                    <IconButton>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip> */}
                   <Tooltip title="Payer" placement="top">
                    <IconButton href="#/payement">
                      <PaymentIcon style={{ color: '#4caf50' }} />
                    </IconButton>
                  </Tooltip>
                  {/*<Tooltip title="Supprimer" placement="top">
                    <IconButton>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Tooltip> */}
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
