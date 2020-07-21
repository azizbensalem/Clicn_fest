import React, { useEffect } from 'react';
import AppBar from '../../Components/Header/Navbar';
import { Event as Table } from './Table';
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, Typography, TextField, Container,
Paper } from "@material-ui/core";
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

export default function MesAchats() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [event, setEvent] = useState([])
    useEffect(() => {
      UserService.getCommande().then(function(response)
        { setEvent(response.data) });
      const results = event.filter(item =>
        item.name.toString().toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }, [searchTerm , event]);
    const handleChange = event => {
    setSearchTerm(event.target.value);
    };
    const [pages, setPages] = React.useState(1);
    const change = (event, value) => {
      setPages(value);
    }
    return (
      <div>
        <AppBar />
        <div className={classes.image}>
              <Typography variant="h3" className={classes.title}>MES ACHATS</Typography>
        </div>
        <Container className={classes.padding}>
          <form noValidate autoComplete="off" className={classes.padding}>
              <Paper className={classes.paper} variant="outlined">
                          <Typography variant="h6">Recherche</Typography><br></br>
                          <FormControl variant="outlined" style={{ width: '100%' }}>
                            <TextField
                              id="outlined-basic"
                              label="Nom d'évènement"
                              variant="outlined"
                              className={classes.formControl}
                              value={searchTerm}
                              onChange={handleChange}
                            />
                          </FormControl>
                </Paper>
          </form>
          <Table data={searchResults} /><br></br>
        </Container>
      </div>
    );
}