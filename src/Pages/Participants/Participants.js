import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik, Form, getIn, FieldArray } from "formik";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { Grid } from '@material-ui/core';


export const Invite = () => {
    const useStyles = makeStyles(theme => ({
      root: {
          '& > *': {
              margin: theme.spacing(1),
              width: '100%',
          },
      },
      height: {
        minHeight: '100vh',
      },
      padding: {
        paddingTop: '40px',
        paddingBottom: '40px',
      },
      field: {
        margin: theme.spacing(1),
        width: '100%',
      },
      button: {
        marginTop: theme.spacing(1),
      },
    }));
    const classes = useStyles();
    const history = useHistory();
    const validationSchema = Yup.object().shape({
      participant: Yup.array().of(
        Yup.object().shape({
          nom: Yup.string().required("Nom est obligatoire"),
          prenom: Yup.string().required("Prénom est obligatoire"),
          email: Yup.string().email("Email doit etre sous forme 'exemple@exemple.com'").required("Email est obligatoire"),
        })
      )
    });


    return (
        <div>
        <Typography variant="h6">Choisir les participants manuellement</Typography>
        <br></br>
            <Formik
              initialValues={{
                participant: [
                  {
                    id: Math.random(),
                    nom: "",
                    prenom: "",
                    email: ""
                  }
                ]
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                console.log("onSubmit", JSON.stringify(values, null, 2));
                localStorage.setItem("participants", JSON.stringify(values));
                history.push('/evenements/billetterie')
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
                <Form noValidate autoComplete="off">
                  <FieldArray name="participant">
                    {({ push, remove }) => (
                      <div>
                        {values.participant.length > 0 ?
                          values.participant.map((p, index) => {
                            const nom = `participant[${index}].nom`;
                            const touchedNom = getIn(touched, nom);
                            const errorNom = getIn(errors, nom);

                            const prenom = `participant[${index}].prenom`;
                            const touchedPrenom = getIn(touched, prenom);
                            const errorPrenom = getIn(errors, prenom);

                            const email = `participant[${index}].email`;
                            const touchedEmail = getIn(touched, email);
                            const errorEmail = getIn(errors, email);

                            return (
                              <Grid key={p.id} container spacing={1}>
                                <Grid item lg={3} md={6} sm={12} xs={12}>
                                  <TextField
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Nom"
                                    name={nom}
                                    value={p.nom}
                                    required
                                    helperText={
                                      touchedNom && errorNom
                                        ? errorNom
                                        : ""
                                    }
                                    error={Boolean(touchedNom && errorNom)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item lg={3} md={6} sm={12} xs={12}>
                                  <TextField
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Prénom"
                                    name={prenom}
                                    value={p.prenom}
                                    required
                                    helperText={
                                      touchedPrenom && errorPrenom
                                        ? errorPrenom
                                        : ""
                                    }
                                    error={Boolean(touchedPrenom && errorPrenom)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item lg={3} md={6} sm={12} xs={12}>
                                  <TextField
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Email"
                                    name={email}
                                    value={p.email}
                                    required
                                    helperText={
                                      touchedEmail && errorEmail
                                        ? errorEmail
                                        : ""
                                    }
                                    error={Boolean(touchedEmail && errorEmail)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item lg={3} md={6} sm={12} xs={12}>
                                  <IconButton
                                    className={classes.button}
                                    margin="normal"
                                    type="button"
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <IconButton
                                    className={classes.button}
                                    type="button"
                                    variant="outlined"
                                    onClick={() =>
                                      push({ id: Math.random(), nom: "", prenom: "", email: "" })
                                    }
                                  >
                                    <AddCircleIcon color="primary" />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            );
                          })
                          : <Button
                            className={classes.button}
                            type="button"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              push({ id: Math.random(), nom: "", prenom: "", email: "" })
                            }
                          >
                            Ajouter un participant
                          </Button>
                        }
                      </div>
                    )}
                  </FieldArray>
                  <div className={classes.button}>
                    <Button
                      className={classes.backButton}
                      onClick={() => history.push('/evenements/tickets')}
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      Suivant
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
    );
}
