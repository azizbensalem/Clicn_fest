import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, FormControl, TextField } from "@material-ui/core";
import AppBar from '../../Components/Header/Navbar';
import { Menu } from '../../Components/Tabs';
import ScrollTop from '../../Components/Footer/ScrollTop';
import { Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from "axios";
import { useSelector } from 'react-redux';
import DataEvent from '../../Data/DataEvent';
import authHeader from "../../Services/AuthHeader";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        marginTop: "12px",
        textAlign: "auto",
        color: theme.palette.text.secondary,
    },
    padding: {
        justifyContent: 'center',
        padding: '20px',
    },
    image: {
        height: '50vh',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url("https://assets.entrepreneur.com/content/3x2/2000/20191112054904-FotoJet32.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    title: {
        paddingTop: '21vh',
        fontWeight: 'bold',
    },
    formControl: {
        width: "100%!important",
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

export const Billetterie = () => {
    const classes = useStyles();
    const history = useHistory();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    const events = JSON.parse(localStorage.getItem("Organisation"));
    const menus = useSelector((state) => state.menu.addedItems.id);
    const prestataires = useSelector((state) => state.prestataire.addedItems);
    const lieux = useSelector((state) => state.lieux.addedItems);
    const produits = useSelector((state) => state.produit.addedItems);
    const participants = JSON.parse(localStorage.getItem("participants"));
    const [produit, setProduit] = React.useState([]);
    const [lieu, setLieu] = React.useState([]);
    const [menu, setMenu] = React.useState([]);
    React.useEffect(() => {
        produits != null ? produits.map(item => 
            setProduit(prevState => [...prevState, { quantite: item.id, produitId: item.id }])
        ) : setProduit(null);
        menus != null ? menus.map(item =>
            setMenu(prevState => [...prevState, { quantite: item.id, menuId: item.id }])
        ) : setMenu(null);
        lieux != null ? lieux.map(item =>
            setLieu(prevState => [...prevState, { quantite: item.id, lieuxId: item.id }])
        ) : setLieu(null);
    }, [])
    return (
    <div>
    <AppBar />
    <div className={classes.image}>
        <Typography variant="h3" className={classes.title}>BILLETTERIE</Typography>
    </div>
    <div className={classes.padding}>
        <Paper className={classes.paper} variant="outlined">
                   
         <Typography variant="h6" style={{ paddingBottom: '20px' }}>Billetterie</Typography>
                <Formik
                    initialValues={{
                        type_ticket: 'E-ticket',
                        tarif_ticket: 'Payant',
                        prix_ticket: '',
                        date_debut: '',
                        date_fin: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            localStorage.setItem('billetterie',JSON.stringify(values));
                            axios.post("http://localhost:56407/api/Evenements", {
                                name: events.nom,
                                description: events.description,
                                theme: events.theme,
                                type: events.type,
                                startDate: values.date_debut,
                                endDate: values.date_fin,
                                commandeItems: produit,
                                createParticipants: participants,
                                createTickets: [
                                    {
                                        nomParticipant: participants.nomParticipant,
                                        prenomParticipant: participants.prenomParticipant,
                                        typeTicket: values.type_ticket,
                                        prixTicket: values.prix_ticket,
                                        tarifTicket: values.tarif_ticket,
                                    }
                                ]
                            }, { headers: authHeader() }
                            ).then((response) => {
                                    console.log(response);
                                }, (error) => {
                                    console.log(error);
                                });
                            history.push('/mes_evenements');
                            setSubmitting(false);
                        }, 500);
                    }}
                    validationSchema={Yup.object().shape({
                        date_debut: Yup.string().required("Ce champ est obligatoire."),
                        date_fin: Yup.string().required("Ce champ est obligatoire."),
                        type_ticket: Yup.string().required("Ce champ est obligatoire."),
                        tarif_ticket: Yup.string().required("Ce champ est obligatoire."), 
                        // prix_ticket: Yup.string().required("Ce champ est obligatoire."),
                    })}
                >
                    {props => {
                        const {
                            values, touched, errors, isSubmitting, handleChange, handleBlur,
                            handleSubmit } = props;
                        return (
                            <form onSubmit={handleSubmit} noValidate autoComplete="off"
                            style={{ paddingBottom: '20px' }}>
                                    <Grid container spacing={3}>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.formControl}
                                        >
                                            <InputLabel
                                                ref={inputLabel}
                                                htmlFor="outlined-type-native-simple"
                                            >
                                                Type&nbsp;du&nbsp;ticket
                                        </InputLabel>
                                            <Select
                                                native
                                                error={errors.type_ticket && touched.type_ticket && true}
                                                value={values.type_ticket}
                                                name="type_ticket"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                labelWidth={labelWidth}
                                                variant="outlined"
                                                helperText={
                                                    errors.type_ticket &&
                                                    touched.type_ticket && (
                                                        <FormHelperText error>
                                                            {errors.type_ticket}
                                                        </FormHelperText>
                                                    )
                                                }
                                            >
                                                <option value="E-ticket">E-ticket</option>
                                                <option value="Imprimé">Imprimable</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.formControl}
                                        >
                                            <InputLabel
                                                ref={inputLabel}
                                                htmlFor="outlined-type-native-simple"
                                            >
                                                Tarif&nbsp;du&nbsp;ticket
                                        </InputLabel>
                                            <Select
                                                native
                                                error={errors.tarif_ticket && touched.tarif_ticket && true}
                                                value={values.tarif_ticket}
                                                name="tarif_ticket"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                labelWidth={labelWidth}
                                                variant="outlined"
                                                helperText={
                                                    errors.tarif_ticket &&
                                                    touched.tarif_ticket && (
                                                        <FormHelperText error>
                                                            {errors.tarif_ticket}
                                                        </FormHelperText>
                                                    )
                                                }
                                            >
                                                <option value="Payant">Payant</option>
                                                <option value="Gratuit">Gratuit</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.formControl}
                                        >
                                            <TextField
                                                error={errors.date_debut && touched.date_debut && true}
                                                name="date_debut"
                                                label="Date d'ouverture des inscriptions"
                                                type="datetime-local"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                value={values.date_debut}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    errors.date_debut &&
                                                    touched.date_debut && (
                                                        <FormHelperText error>
                                                            {errors.date_debut}
                                                        </FormHelperText>
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.formControl}
                                        >
                                            <TextField
                                                error={errors.date_fin && touched.date_fin && true}
                                                name="date_fin"
                                                id="outlined-number"
                                                label="Date de fermeture des inscriptions"
                                                type="datetime-local"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                value={values.date_fin}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    errors.date_fin &&
                                                    touched.date_fin && (
                                                        <FormHelperText error>
                                                            {errors.date_fin}
                                                        </FormHelperText>
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.formControl}
                                        >
                                            <TextField
                                                error={errors.prix_ticket && touched.prix_ticket && true}
                                                name="prix_ticket"
                                                id="outlined-number"
                                                label="Prix du ticket"
                                                placeholder="DT"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                value={values.prix_ticket}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                InputProps={{
                                                    readOnly: values.tarif_ticket == 'Gratuit' ? true : false,
                                                }}
                                                helperText={
                                                    errors.prix_ticket &&
                                                    touched.prix_ticket && (
                                                        <FormHelperText error>
                                                            {errors.prix_ticket}
                                                        </FormHelperText>
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div className={classes.button}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}
                                        color="primary"
                                    >
                                        Passer au payement
                                    </Button>
                                </div>
                                    </form>
                                );
                            }}
                        </Formik>
                </Paper>
            </div>
            <ScrollTop />
        </div>
    );
}