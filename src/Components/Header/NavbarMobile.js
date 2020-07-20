import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, IconButton, AppBar, Toolbar, Drawer, List,
ListItem, ListItemIcon, ListItemText, MenuItem, Menu, Tooltip, Divider } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LinearDeterminate } from '../LinearDeterminate';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AuthService from "../../Services/AuthService";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 260,
    },
    fullList: {
        width: 'auto',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    img: {
        width: "100px",
        height: "100px",
        margin: "auto",
        marginTop: "23px",
    },
    text: {
        textAlign: 'center',
    },
    padding: {
        paddingBottom: 20,
    }
}));

export default function NavbarMobile(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const history = useHistory();

    const [state, setState] = React.useState({
        left: false,
    });

    const Logout = () => {
        AuthService.logout();
        window.location.reload("/");
    }
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };
    const [prog, setProg] = React.useState(false);
    const progress = (link) => {
        setProg(true);
        setTimeout(() => {
            history.push(link);
        }, 4000);
    };
    const user = AuthService.getCurrentUser();
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <div className={classes.padding}>
            <Avatar alt="Hello World" src="https://kwsmdigital.com/wp-content/uploads/2012/08/Facebook-Blank-Photo.jpg" 
            className={classes.img} />
            <Typography variant="h6" className={classes.text}>{user.username}</Typography>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={() => progress('/')}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem button onClick={() => progress('/monprofil')}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Mon profil" />
                </ListItem>
                <ListItem button onClick={() => progress('/mes_evenements')}>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary="Mes événements" />
                </ListItem>
                <ListItem button onClick={() => progress('/mes_evenements')}>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary="Mes achats" />
                </ListItem>
                <ListItem button onClick={() => progress('/evenements/organisation')}>
                    <ListItemIcon><AddBoxIcon /></ListItemIcon>
                    <ListItemText primary="Organiser&nbsp;un&nbsp;évènement" />
                </ListItem>
                <ListItem button onClick={() => progress('/produits')}>
                    <ListItemIcon><ConfirmationNumberIcon /></ListItemIcon>
                    <ListItemText primary="Acheter des produits" />
                </ListItem>
            </List>
        </div>
    );
    return (
            <div>
            <AppBar style={{ background: '#d21740' }} variant="outlined">
                {/* <div style={{ position: 'absolute' }}>
                <AppBar style={{ background: 'transparent', boxShadow: 'none' }}> */}
                <LinearDeterminate bool={prog} />
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon onClick={toggleDrawer('left', true)} />
                                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                                    {sideList('left')}
                                </Drawer>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Clic'n Fest
                            </Typography>
                            <Tooltip title="deconnexion">
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    onClick={() => Logout()}
                                >
                                    <ExitToAppIcon />
                                </IconButton>
                             </Tooltip>
                        </Toolbar>
                        {/* <div style={{ height: '3px', background: 'white' }} /> */}
                    </AppBar>
                    <Toolbar id="back-to-top-anchor" />
                </div>
    );
}
