import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import clicnfest from '../../Images/clicnfest.PNG';
import eventu from '../../Images/eventu.png';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthService from "../../Services/AuthService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({ 
  root: {
    borderRadius: '25px',
    textAlign: 'center',
    width: '300px',
    margin: 'auto',
  },
  rootForm: {
    '& > *': {
      margin: theme.spacing(1),
      maxWidth: 500,
      minWidth: 250,
  },
  },
  img: {
    width: '30%',
  },
  link: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: theme.spacing(1),
    color: '#3f51b5'
  },
  content: {
    margin: 'auto',
  },
  Background: {
    backgroundImage: `url(${eventu})`,
    minHeight: '100vh',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'grid',
  }
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const [prog, setProg] = React.useState(false);
    const [error, setError] = React.useState(false);
    return (
      <div>
      <div className={classes.Background}>
        <Grid className={classes.content}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src={clicnfest} className={classes.img} />
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Se connecter à Clic'n Fest
                </Typography>
                <br></br>
                <Formik
                  initialValues={{ username: "", password: "" }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      AuthService.login(values.username, values.password).then(
                        () => {
                          setProg(true);
                          setSubmitting(false);
                          setSuccess(true);
                          window.location.reload("/");
                        },
                        (error) => {
                          setError(true);
                          setOpen(true);
                        });
                    },10);
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required(
                      "Ce champ est obligatoire."
                    ),
                    password: Yup.string().required("Ce champ est obligatoire."),
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
                        onSubmit={handleSubmit}
                        className={classes.rootForm}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          error={errors.username && touched.username && error && true}
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
                          error={errors.password && touched.password && error && true}
                          name="password"
                          label="Mot de passe"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.password &&
                            touched.password && (
                              <FormHelperText error>
                                {errors.password}
                              </FormHelperText>
                            )
                          }
                        />
                        <div style={{ textAlign: "center" }}>
                          <Button
                            type="submit"
                            disabled={values.username == '' || values.password == '' ? true : false}
                            color="primary"
                            variant="contained"
                          >
                            Se connecter
                          </Button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
                <div className={classes.link}>
                  <Typography className={classes.link}>
                      <Link style={{ textDecoration: "none" }} onClick={() => history.push('/inscription')}>
                      Inscrivez-vous à un compte
                      </Link>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert severity="error">Le nom d'utilisateur ou le mot de passe entré ne correspond à aucun compte</Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
          <Alert severity="success">La connexion est effectuée avec succès</Alert>
        </Snackbar>
      </div>
    );
}




