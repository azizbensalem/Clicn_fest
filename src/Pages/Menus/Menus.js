import React, { useEffect } from "react";
import AppBar from '../../Components/Header/Navbar';
import ScrollTop from '../../Components/Footer/ScrollTop';
import MenuImage from '../../Images/Menus.png';
import Pagination from "@material-ui/lab/Pagination";
import ProductMenus from "./ProductMenus";
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
    ExpansionPanelSummary, FormGroup, FormControlLabel, Checkbox
} from "@material-ui/core";
import { fetchMenu } from "../../Data/actions/menuActions";

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

export const Menus = () => {
        const classes = useStyles();
        const [searchTerm, setSearchTerm] = React.useState("");
        const [searchResults, setSearchResults] = React.useState([]);
        const dispatch = useDispatch();
        const handleChange = (event) => {
          setSearchTerm(event.target.value);
        };
        const data = useSelector((state) => state.menu.items);
        useEffect(() => {
          const results = data.filter((item) =>
            item.name.toString().toLowerCase().includes(searchTerm)
          );
          setSearchResults(results);
        }, [searchTerm]);
        useEffect(() => {
          dispatch(fetchMenu());
        }, []); 
        const [pages, setPages] = React.useState(1);
        const currentPosts = searchResults.slice(pages * 5 - 5, pages * 5);
        const change = (event, value) => {
          setPages(value);
        };
    return (
      <div>
        <AppBar />
        <div>
          <Menu value={1} />
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(` + MenuImage + `)`,
            }}
          >
            <Typography variant="h3" className={classes.title}>
              Menus
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
                      {/* {lieu.map((item) => (
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox value={item.type} />}
                          name={item.type}
                          label={item.type}
                          onChange={console.log(item.type)}
                        />
                      </FormGroup>
                    ))} */}
                    </FormControl>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item lg={8} style={{ width: "100%" }}>
                {currentPosts.length > 0 ? (
                  currentPosts.map((data) => (
                    <div>
                      <ProductMenus
                        image={data.img}
                        titre={data.name}
                        volume=""
                        type={data.type}
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
                {searchResults.length > 5 ? (
                  <Pagination
                    count={Math.round(searchResults.length / 5)}
                    page={pages}
                    onChange={change}
                    color="primary"
                  />
                ) : null}
              </Grid>
            </Grid>
          </Container>
          <TotalSb page="menus" />
        </div>

        <ScrollTop />
      </div>
    );
};