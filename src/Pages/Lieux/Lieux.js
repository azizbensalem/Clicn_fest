import React, { useEffect } from "react";
import AppBar from '../../Components/Header/Navbar';
import ScrollTop from '../../Components/Footer/ScrollTop';
import LieuxImage from '../../Images/Lieux.png';
import ProductLieux from "./ProductLieux";
import { useSelector, useDispatch } from "react-redux";
import { TotalSb } from "../../Components/Footer/TotalSb";
import { Menu } from "../../Components/Tabs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl, Typography, Container, Paper, Grid, ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary, FormGroup,
} from "@material-ui/core";
import { fetchLieux } from "../../Data/actions/lieuxActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "99%",
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
  padding: {
    paddingTop: "40px",
    paddingBottom: "80px",
  },
  image: {
    height: "50vh",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  title: {
    paddingTop: "21vh",
    fontWeight: "bold",
    fontSize: "6vh",
    color: "white",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  map: {
    marginBottom: "30px",
    border: "solid 5px #fff",
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden",
  },
}));

export const Lieux = () => {
        const classes = useStyles();
        const data = useSelector((state) => state.lieux.items);
        const [searchTerm, setSearchTerm] = React.useState("");
        const [searchResults, setSearchResults] = React.useState([]);
        const dispatch = useDispatch();
        const handleChange = (event) => {
          setSearchTerm(event.target.value);
        };
        const [state, setState] = React.useState([]);
        const handleInputChange = (event) => {
          const target = event.target;
          var value = target.value;

          if (target.checked) {
            state.push(value);
            console.log(state.toString());
          } else {
            state.pop(value);
            console.log(state.toString());
          }
        }  
        useEffect(() => {
          dispatch(fetchLieux());
          const results = data.filter((item) =>
            item.name.toString().toLowerCase().includes(searchTerm)
          );
          const ville = results.filter((item) =>
            item.ville.includes(state.toString())
          );
          setSearchResults(ville);
        }, [data]);
        return (
        <div>
            <AppBar />
          <div>
          <Menu value={0} />
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(` + LieuxImage + `)`,
            }}
          >
            <Typography variant="h3" className={classes.title}>
              Lieux
            </Typography>
          </div>
          <Container className={classes.padding}>
            <form
              noValidate
              autoComplete="off"
              style={{ paddingBottom: "20px" }}
            >
              <Paper className={classes.root} variant="outlined">
                <InputBase
                  className={classes.input}
                  placeholder="Recherche"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <IconButton type="submit" className={classes.iconButton}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </form>
            <Grid container spacing={3}>
              <Grid item lg={4} style={{ width: "100%" }}>
                <ExpansionPanel variant="outlined">
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ce lieu est idéal pour :</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                            <label>
                              <input type="checkbox" value="Sousse" onChange={handleInputChange} />Sousse
                            </label>
                            <label>
                              <input type="checkbox" value="Carthage" onChange={handleInputChange} />Carthage
                            </label> 
                      </FormGroup>
                    </FormControl>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item lg={8} style={{ width: "100%" }}>
                {searchResults.length > 0 ? (
                  searchResults.map((data) => (
                    <div>
                      <ProductLieux
                        image={data.img}
                        titre={data.name}
                        volume={data.ville}
                        type={data.capacite}
                        prix={data.prix}
                        description={data.description}
                        id={data.id}
                      />
                    </div>
                  ))
                ) : (
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    Aucun résultat trouvé
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Container>
          <TotalSb page="menu" />
        </div>
        <ScrollTop />
    </div>
    );
};