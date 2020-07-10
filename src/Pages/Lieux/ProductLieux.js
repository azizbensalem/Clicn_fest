import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Detail } from '../../Components/Detail';
import { addLieux , removeLieux } from '../../Data/actions/lieuxActions';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Rate} from '../../Components/Rate';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton, Grow } from '@material-ui/core';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "auto",
        color: theme.palette.text.secondary
    },
    image: {
        width: 190,
        height: 190
    },
    imageMobile: {
        width: 190,
        height: 190,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}))

const ProductLieux = ({ id, image, titre, volume , type , prix , description , quantity , item}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const ajouter = (id) => {
        dispatch(addLieux(id));
    };
    const supprimer = (id) => {
        dispatch(removeLieux(id));
    }
    const items = useSelector(state => state.lieux.addedItems);
    const results = items.filter(item =>
        item.id.toString().toLowerCase().includes(id)
    );    
    let addedItems = results.length ? (
            <IconButton
            className={classes.spacing}
            type="button"
            variant="outlined"
            onClick={() => supprimer(id)}
            >
                <DeleteForeverIcon color="secondary" />
            </IconButton>   
    )
    : 
    null
    return (
            <div key={id}>
                <Grow in={true}>
                <Paper className={classes.paper} variant="outlined">
                        <Grid container spacing={2}>
                                <Grid item>
                                    <div>
                                        <div className={classes.sectionMobile}>
                                            <ButtonBase>
                                                <img
                                                    className={classes.img}
                                                    alt="complex"
                                                    src={image}
                                                />
                                            </ButtonBase></div>
                                        <div className={classes.sectionDesktop}>
                                            <ButtonBase className={classes.image}>
                                                <img
                                                    className={classes.img}
                                                    alt="complex"
                                                    src={image}
                                                />
                                            </ButtonBase>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={3}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="h6">
                                                    {titre}
                                                </Typography>
                                                <Rate Data={5} /><br></br>
                                                <div style={{ display: 'flex' }}>
                                                    <LocationCityIcon style={{ marginTop: '4px' }} />
                                                    <Typography gutterBottom variant="body1" style={{ padding: '6px' }}>
                                                        {volume}
                                                    </Typography>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <EventSeatIcon style={{ marginTop: '4px' }} />
                                                    <Typography gutterBottom variant="body1" style={{ padding: '6px' }}>
                                                        {type}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs>
                                                <IconButton
                                                    className={classes.spacing}
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={handleClickOpen}
                                                >
                                                    <VisibilityIcon color="primary" />
                                            </IconButton>
                                                <IconButton
                                                    className={classes.spacing}
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() => ajouter(id)}
                                                >
                                                    <AddCircleIcon style={{ color: '#4caf50'}} />
                                                </IconButton>
                                                {addedItems}
                                            </Grid>
                                        </Grid>
                                </Grid>
                                <Grid item>
                                        <Typography variant="h5" className={classes.price}>{quantity == null ? prix : prix * quantity}&nbsp;DT</Typography>
                                </Grid>
                        </Grid>
                    <Detail handleClose={handleClose} open={open} image={image} titre={titre}
                    volume={volume} type={type} prix={prix} description={description} />
                    </Paper>
                 </Grow><br></br>
                </div>
    )
}
export default ProductLieux;