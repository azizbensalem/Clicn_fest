import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ConfirmMenu from './ConfirmMenu';

const useStyles = makeStyles(theme => ({
    button: {
        paddingTop: '15px',
    },
}));

export const MenuItem = () => {
    const items = useSelector((state) => state.menu.addedItems);
    const lengthItems = items.length;
    return lengthItems;
}

export const CartMenu = ({ page }) => {
    const items = useSelector(state => state.menu.addedItems);
    const classes = useStyles();
        return (
            <div>
                {items.map(item => (
                        <div className={classes.button}>
                            <ConfirmMenu image={item.photo} titre={item.nom_menu} volume={item.volume}
                                type={item.type} prix={item.prix} quantity={item.quantity}
                                id={item.id} page={page}/>
                        </div>
                ))
                }         
            </div>   
        );
    };