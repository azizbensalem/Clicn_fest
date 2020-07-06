import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import boissons from "../../Images/Boissons.jpg";
import extra from "../../Images/Extras.png";
import lieu from "../../Images/Lieux.png";
import menu from "../../Images/Menus.png";
import communication from "../../Images/Communication.png";



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '50px',
        background: 'white',
    },
    image: {
        width: '100%',
        height: '245px',
        borderRadius: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '0px',
    },
    text: {
        textAlign: 'center',
        fontWeight: '900',
        position: 'absolute',
        color: 'white',
    },
}));
 
export default function ButtonBases() {
    const classes = useStyles();
    const history = useHistory();
    return (
      <div className={classes.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Button className={classes.image} href="#/evenements/lieux"
              style={{ backgroundImage: `url(${lieu})` }}>
              <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
              <Typography variant="h5" className={classes.text}>LIEUX</Typography>
              </Button>    
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Button className={classes.image} href="#/evenements/menus"
              style={{ backgroundImage: `url(${menu})` }}>
                <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
                <Typography variant="h5" className={classes.text}>MENUS</Typography>
              </Button>    
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Button className={classes.image} href="#/evenements/boissons"
              style={{ backgroundImage: `url(${boissons})` }}>
                <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
                <Typography variant="h5" className={classes.text}>BOISSONS</Typography>
              </Button>    
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Button className={classes.image} href="#/evenements/extras"
              style={{ backgroundImage: `url(${extra})` }}>
                <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
                <Typography variant="h5" className={classes.text}>EXTRAS</Typography>
              </Button>    
            </Grid>
            {/* <Grid item lg={6} md={6} sm={6} xs={12}>
              <Button className={classes.image} href="#/evenements/communication"
              style={{ backgroundImage: `url(${communication})` }}>
                <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
                <Typography variant="h5" className={classes.text}>COMMUNICATION</Typography>
              </Button>    
            </Grid> */}
            {/* <Grid item lg={4} md={4} sm={6} xs={12}>
              <Button className={classes.image} 
              style={{ backgroundImage: `url(${communication})` }}>
                <div className={classes.image} style={{ backgroundColor: '#111111', opacity: '0.5' }} />
                <Typography variant="h5" className={classes.text}></Typography>
              </Button>    
            </Grid> */}
          </Grid>
        </Container>
      </div>
    );
}
