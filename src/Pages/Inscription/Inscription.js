import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { isMobile, isMobileOnly } from "react-device-detect";
import clicnfest from '../../Images/clicnfest.PNG';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@material-ui/core";
import eventu from '../../Images/eventu.png';
import AuthService from "../../Services/AuthService";


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 250
    },
    borderRadius: "50px"
  },
  rootMobile: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 250,
      textAlign: "center"
    },
    borderRadius: "50px"
  },
  img: {
    width: "30%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: theme.spacing(1),
    color: "#3f51b5",
    textAlign: "center"
  },
  Background: {
    backgroundImage: `url(${eventu})`,
    minHeight: '100vh',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
  },
  link: {
    margin: theme.spacing(1),
  },
}));

export default function Inscription() {
    const classes = useStyles();
    const history = useHistory();
    const [prog, setProg] = React.useState(false);
    const progress = (link) => {
      setProg(true);
      setTimeout(() => {
        history.push(link);
      }, 4000);
    };
    return (
      <div className={classes.Background}>
        <Grid style={{ margin: "auto", padding: "10px" }}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src={clicnfest} className={classes.img} />
          </Grid>
          <Grid item xs={12}>
            <Card className={isMobileOnly ? classes.rootMobile : classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Inscrivez-vous à votre compte
                </Typography>
                <br></br>
                <Formik
                  initialValues={{
                    nom: "",
                    prenom: "",
                    username: "",
                    email: "",
                    tel: "",
                    pwd: "",
                    confirmpwd: ""
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      console.log("Logging in", values);
                      AuthService.register(values.prenom, values.nom, values.username, values.email,
                        values.pwd).then(
                        () => {
                          setSubmitting(false);
                          window.location.href = "/";
                        },
                        (error) => {
                          console.log(error);
                        });
                    }, 10);
                  }}
                  validationSchema={Yup.object().shape({
                    nom: Yup.string().required("Ce champ est obligatoire."),
                    prenom: Yup.string().required("Ce champ est obligatoire."),
                    username: Yup.string().required(
                      "Ce champ est obligatoire."
                    ),
                    email: Yup.string()
                      .required("Ce champ est obligatoire.")
                      .email("Email"),
                    pwd: Yup.string().required("Ce champ est obligatoire."),
                    confirmpwd: Yup.string()
                      .required("Ce champ est obligatoire.")
                      .oneOf([Yup.ref("pwd"), null],"Les 2 mots de passe sont différents")
                  })}
                >
                  {props => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    } = props;
                    return (
                      <form
                        className={isMobile ? classes.rootMobile : classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <TextField
                          error={errors.nom && touched.nom && true}
                          name="nom"
                          label="Nom"
                          type="text"
                          value={values.nom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.nom &&
                            touched.nom && (
                              <FormHelperText error>
                                {errors.nom}
                              </FormHelperText>
                            )
                          }
                        />
                        <TextField
                          error={errors.prenom && touched.prenom && true}
                          name="prenom"
                          label="Prénom"
                          type="text"
                          value={values.prenom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.prenom &&
                            touched.prenom && (
                              <FormHelperText error>
                                {errors.prenom}
                              </FormHelperText>
                            )
                          }
                        />
                        <br></br>
                        <TextField
                          error={errors.username && touched.username && true}
                          name="username"
                          label="Nom d'utilisateur"
                          type="text"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.username &&
                            touched.username && (
                              <FormHelperText error>
                                {errors.username}
                              </FormHelperText>
                            )
                          }
                        />
                        <TextField
                          error={errors.email && touched.email && true}
                          name="email"
                          label="Email"
                          type="text"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.email &&
                            touched.email && (
                              <FormHelperText error>
                                {errors.email}
                              </FormHelperText>
                            )
                          }
                        />
                        <br></br>
                        <TextField
                          error={errors.pwd && touched.pwd && true}
                          name="pwd"
                          label="Mot de passe"
                          type="password"
                          value={values.pwd}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.pwd &&
                            touched.pwd && (
                              <FormHelperText error>
                                {errors.pwd}
                              </FormHelperText>
                            )
                          }
                        />
                        <TextField
                          error={
                            errors.confirmpwd && touched.confirmpwd && true
                          }
                          name="confirmpwd"
                          label="Confirmer mot de passe"
                          type="password"
                          value={values.confirmpwd}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.confirmpwd &&
                            touched.confirmpwd && (
                              <FormHelperText error>
                                {errors.confirmpwd}
                              </FormHelperText>
                            )
                          }
                        />
                        <div style={{ textAlign: "center" }}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            color="primary"
                            variant="contained"
                          >
                            S'inscrire
                          </Button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>        
                <div className={classes.link}>
                  <Typography className={classes.link}>
                    <Link style={{ textDecoration: "none" }} onClick={() => history.push('/login')}>
                      Se connecter
                    </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
}