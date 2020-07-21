import React from 'react';
import ProductProduit from './ProductProduit';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ConfirmProduit from './ConfirmProduit';

const useStyles = makeStyles(theme => ({
    button: {
        paddingTop: '15px',
    },
}));


export const ProduitItem = () => {
  const items = useSelector((state) => state.produit.addedItems);
  const lengthItems = items.length;
  return lengthItems;
};


export const CartProduit = ({ page }) => {
    const items = useSelector(state => state.produit.addedItems);
    const classes = useStyles();
        return (
            <div>
                {items.map(item => (
                        <div className={classes.button}>
                            <ConfirmProduit image={item.photo} titre={item.name} volume={item.volume}
                                type={item.type_produit} prix={item.prix} quantity={item.quantity}
                                id={item.id} page={page}/>
                        </div>
                ))
                }         
            </div>   
        );
    };