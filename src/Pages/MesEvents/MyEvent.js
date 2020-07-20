import React, { useEffect } from 'react';
import AppBar from '../../Components/Header/Navbar';
import { Event as Table } from './Table';
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, Typography, TextField, Container, Paper } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import cover from "../../Images/event.jpg";
import UserService from '../../Services/UserService';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: "25px",
    paddingBottom: "25px",
  },
  image: {
    height: "50vh",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${cover})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  title: {
    paddingTop: "19vh",
    fontWeight: "bold",
    color: "white",
  },
  color: {
    paddingBottom: "19vh",
    height: "50vh",
    background: "black",
    opacity: 0.5,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "auto",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

export default function MyEvent() {
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [etat, setEtat] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [event, setEvent] = useState([])
    useEffect(() => {
      UserService.getEvent().then(function(response)
        { setEvent(response.data) });
      const results = event.filter(item =>
        item.type.toString().toLowerCase().includes(searchTerm)
      );
      const result = results.filter(item =>
        item.etat.toString().includes(etat)
      );
      setSearchResults(results);
    }, [searchTerm , etat]);
    console.log(searchResults);
    const etatChange = event => {
      event.target.value == 'Tous' ?
        setEtat('') : setEtat(event.target.value)
    };
    const handleChange = event => {
    setSearchTerm(event.target.value);
    };
    const [pages, setPages] = React.useState(1);

    const change = (event, value) => {
      setPages(value);
    }
    console.log(event);
    return (
      <div>
        <AppBar />
        <div className={classes.image}>
              <Typography variant="h3" className={classes.title}>MES ÉVÉNEMENTS</Typography>
        </div>
        <Container className={classes.padding}>
          <form noValidate autoComplete="off" className={classes.padding}>
              <Paper className={classes.paper} variant="outlined">
                          <Typography variant="h6">Recherche</Typography><br></br>
                          <FormControl variant="outlined">
                            <TextField
                              id="outlined-basic"
                              label="Nom d'évènement"
                              variant="outlined"
                              className={classes.formControl}
                              value={searchTerm}
                              onChange={handleChange}
                            />
                          </FormControl>
                          <FormControl variant="outlined" className={classes.formControl}>
                                  <InputLabel ref={inputLabel} >
                                    État
                                  </InputLabel>
                                  <Select
                                    native
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    labelWidth={labelWidth}
                                    onChange={etatChange}
                                    name="etat"
                                  >
                                      <option name="etat" value="Tous">Tous</option>
                                      <option name="etat" value="Pas encore commencé">Pas encore commencé</option>
                                      <option name="etat" value="Terminé">Terminé</option>
                                  </Select>
                          </FormControl>
                </Paper>
          </form>
          <Table data={event} /><br></br>
        </Container>
      </div>
    );
}