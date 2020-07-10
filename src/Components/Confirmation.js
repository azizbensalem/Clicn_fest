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
           console.log('mes_achats');
           return 'mes_achats';
       } else {
           console.log('evenements/organisation');
           return '/evenements/organisation';
       }
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
                    <Button variant="contained" 
                            color="primary" 
                            onClick={() => history.push(pages())}
                    >
                        {location.pathname == '/produits' ? 'Confirmer la commande' : 'Créer un événement'}
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
