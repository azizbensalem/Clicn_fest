import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useLocation } from 'react-router-dom';
import { CartProduit } from '../Pages/Produits/CartProduit';
import { CartLieux } from '../Pages/Lieux/CartLieux';
import { CartMenu } from '../Pages/Menus/CartMenu';
import { CartPrestataire } from '../Pages/Prestataire/CartPrestataire';
import { Total } from '../Pages/Confirmation/Total';
import axios from "axios";
import { useSelector } from 'react-redux';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

export const Confirmation = ({ handleClose , open , page}) => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();
    const pages = () => {
       if (location.pathname == '/produits') {
           return 'mes_achats';
       } else {
           return '/evenements/organisation';
       }
    }
    const produits = useSelector(state => state.produit.addedItems);
    const [produit, setProduit] = React.useState([]);
    React.useEffect(() => {
        produits != null ? produits.map(item =>
            setProduit(prevState => [...prevState, { quantite: item.quantity, produitId: item.id }])
        ) : setProduit(null);
    }, [])
    const commander = () => {
        axios.post("http://localhost:56407/api/Commandes", {
            itemProducts: produit  
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        history.push('/mes_achats');
    }
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });
    return (
        <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Mon panier
                </DialogTitle>                
                <DialogContent style= {{ paddingBottom: '70px'}}>
                    {location.pathname == '/produits' ? (
                        <>
                            <CartProduit page={page} />
                        </>
                    ) : (
                        <>
                            <CartLieux page={page} />
                            <CartMenu page={page} />
                            <CartProduit page={page} />
                            <CartPrestataire page={page} />
                        </>
                    )}
                    <Total />

                        {location.pathname == '/produits' ? (
                            <div>
                            <Button variant="contained"
                                color="primary"
                                onClick={() => commander()}
                            >
                                  Confirmer la commande
                            </Button>
                            </div>
                        ) : (
                            <div>
                                <Button variant="contained"
                                    color="primary"
                                    onClick={() => history.push(pages())}
                                >
                                  Créer un événement
                                </Button>
                            </div>
                        ) }
                </DialogContent>
            </Dialog>
        </div>
    );
}
