import React from 'react'
import { useSelector } from "react-redux";
import { Button, Typography } from '@material-ui/core';
import { useLocation } from 'react-router';


export const Somme = () => {
    const totalLieux = useSelector(state => state.lieux.total);
    const totalMenus = useSelector(state => state.menu.total);
    const totalProduits = useSelector(state => state.produit.total);
    const totalPrestataire = useSelector(state => state.prestataire.total);
    let location = useLocation();
    if (location.pathname == '/produits') {
        const total = totalProduits;
        return total;
    } else {
        const total = totalLieux + totalMenus + totalProduits + totalPrestataire;
        return total;
    }
};

export const Total = () => {
    const total = useSelector(state => state.total);
        return(
            <div>
                <Button variant="contained" color="primary" style={{ backgroundColor: '#4caf50' }} >
                    <Typography variant="h6">Total:&nbsp;<Somme />&nbsp;DT</Typography>
                </Button>
                <br></br><br></br>
            </div>
        )
    }

