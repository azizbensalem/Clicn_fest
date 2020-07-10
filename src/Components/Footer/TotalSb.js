import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Somme } from '../../Pages/Confirmation/Total';
import { Confirmation } from '../Confirmation';
import { Typography, SnackbarContent } from '@material-ui/core';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    snackbar: {
        zIndex: 'auto', 
    }
}));

export const TotalSb = ({ page }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const ProduitItems = useSelector(state => state.produit.addedItems).length;
    const MenuItems = useSelector(state => state.menu.addedItems).length;
    const LieuxItems = useSelector(state => state.lieux.addedItems).length;
    const PrestataireItems = useSelector(state => state.prestataire.addedItems).length;
    const items = ProduitItems + MenuItems + LieuxItems + PrestataireItems;
    return (
        <div className={classes.root}>
            <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={6000}
                className={classes.snackbar}
            >
                <SnackbarContent
                    style={{ backgroundColor: '#4caf50' }} 
                    message={<Typography variant="h6"><Somme />&nbsp;DT</Typography>}
                    action={<Button color="inherit" size="small" onClick={handleClickOpen}
                    disabled={location.pathname == '/produits' ? 
                                (ProduitItems == 0 ? true : false) :
                                (items == 0 ? true : false)}
                    >
                        Confirmer la commande
                     </Button>}
                />
            </Snackbar>
            {location.pathname == '/produits' ? 
                (ProduitItems > 0 ? 
                    (<Confirmation handleClose={handleClose} open={open} page={page} />) : null) :
                (items > 0 ?
                    (<Confirmation handleClose={handleClose} open={open} page={page} />) : null)
             }
        </div>
    );
}