import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton, Grid, Grow, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '../../Components/Header/Navbar';
import UserService from '../../Services/UserService';

const useStyles = makeStyles((theme) => ({
    text: {
        paddingTop: theme.spacing(2),
        paddingButtom: theme.spacing(2),
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingBottom: '20px',
    },
    paper: {
        paddingTop: theme.spacing(5),
        paddingButtom: theme.spacing(5),
    },
    padding: {
        padding: '40px',
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        margin: '20px',
        textAlignLast: 'center',
    },
}));

export const Events = ({ id, title, rate, description, img }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const [event, setEvent] = React.useState([])
    React.useEffect(() => {
        UserService.getEventPublic().then(function (response) { setEvent(response.data) });
        const results = event.filter(item =>
            item.description.toString().toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
        }, [searchTerm, event]);
   
    return (
        <div style={{ backgroundColor: 'white' }}>
            <AppBar />
            <Container className={classes.padding}>
                <Typography variant="h4" className={classes.title}>Événements populaires</Typography>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Recherche"
                        value={searchTerm}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Grid className={classes.paper} container spacing={3}>
                    {searchResults.map(com => (
                        <Grow in={true}>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Card key={com.id}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="https://www.eventwala.info/wp-content/uploads/2016/07/Events-1200x630.jpg"
                                        title="Réseaux sociaux"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {com.description}
                                        </Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
                                        <Typography className={classes.text} variant="body2" color="textSecondary" >
                                            {com.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton>
                                            <VisibilityIcon color="primary" />
                                        </IconButton>
                                        <IconButton>
                                            <AddCircleIcon style={{ color: '#4caf50' }} />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grow>))}
                </Grid>
            </Container>
        </div>

    );
}