import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ConfirmLieux from './ConfirmLieux';

const useStyles = makeStyles(theme => ({
    button: {
        paddingTop: '15px',
    },
}));

export const LieuxItem = () => {
  const items = useSelector((state) => state.lieux.addedItems);
  const lengthItems = items.length;
  return lengthItems;
};

export const CartLieux = ({ page }) => {
    const items = useSelector(state => state.lieux.addedItems);
    const classes = useStyles();
        return (
            <div>
                {items.map(item => (
                        <div className={classes.button}>
                            <ConfirmLieux image={item.photo} titre={item.nom} volume={item.ville}
                                type={item.capacite} prix={item.prix} quantity={item.quantity}
                                id={item.id} page={page}/>
                        </div>
                ))
                }         
            </div>   
        );
    };