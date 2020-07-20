import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import event from '../../Images/event.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
    display: "initial",
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  img: {
    maxHeight: "593px",
    width: "2000px",
  },
  Background: {
    // background: 'linear-gradient(to right, #ff0099, #493240)',
    backgroundImage: `url(${event})`,
    height: "92vh",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    color: "#111111",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  section: {
    margin: "auto",
    justifyContent: "center",
    padding: "20px",
    color: "white",
    fontWeight: "700",
  },
  rectangle: {
    content: "",
    width: "15px",
    height: "6px",
    background: "rgb(210, 23, 64)",
    display: "inline-block",
    verticalAlign: "middle",
    margin: "0px 27px",
  },
}));

export default function SimpleFade() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Fade in="false" timeout={3000}>
                    <div className={classes.Background}>
                        <Fade in="false" timeout={3000}>
                        <div style={{ paddingTop: '20vh' }}>
                                <Typography className={classes.section} 
                                style={{ fontSize: '50px' }}>Organisez votre événement</Typography>
                            <div className={classes.sectionDesktop} >
                                <Typography className={classes.section} style={{ fontSize: '16px' }}>
                                    LIEUX<div className={classes.rectangle} />
                                    MENUS<div className={classes.rectangle} />
                                    PRODUITS<div className={classes.rectangle} />
                                    PRESTATAIRES
                                </Typography>
                            </div>
                        </div>
                        </Fade>
                    </div>
                </Fade>
            </div>
        </div>
    );
}
