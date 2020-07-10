import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText, Paper, Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%!important",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    paddingTop: "15px",
  },
  height: {
    minHeight: "100vh",
  },
  padding: {
    paddingTop: "10px",
    paddingBottom: "10px",
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
}));

export const CreerEvent = () => {
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    const history = useHistory();
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
    const name_event = localStorage.getItem("name_event") === null ? '' : 
    localStorage.getItem("name_event");
    const date_event = localStorage.getItem("date_event") === null ? '' : 
    localStorage.getItem("date_event");
    const event = JSON.parse(localStorage.getItem("Organisation"));
    return (
            <div className={classes.padding}>
              <Formik
              initialValues={{
                nom: name_event,
                theme: event === null ? '' : event.theme ,
                type: event === null ? '' : event.type,
                local: event === null ? '' : event.local,
                date: date_event,
                heure: event === null ? '' : event.heure,
                description: event === null ? '' : event.description,
                video: event === null ? '' : event.video,
                image: event === null ? '' : event.image,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  localStorage.setItem("Organisation", JSON.stringify(values));
                  history.push("/evenements/participants");
                  setSubmitting(false);
                }, 100);
              }}
              validationSchema={Yup.object().shape({
                theme: Yup.string().required("Ce champ est obligatoire."),
                type: Yup.string().required("Ce champ est obligatoire."),
                date: Yup.string().required("Ce champ est obligatoire."),
                heure: Yup.string().required("Ce champ est obligatoire."),
                nom: Yup.string().required("Ce champ est obligatoire."),
              })}
              >
              {props => {
                const {
                  values, touched, errors, isSubmitting, handleChange, handleBlur, 
                  handleSubmit, setFieldValue
                  } = props;
                return (
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Paper className={classes.paper} variant="outlined">
                      <Typography variant="h6">Information générale</Typography>
                      <br></br>
                      <Grid container spacing={3}>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <TextField
                              native
                              error={errors.nom && touched.nom && true}
                              name="nom"
                              type="text"
                              label="Nom de l'événement"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              value={values.nom}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                errors.nom &&
                                touched.nom && (
                                  <FormHelperText error>
                                    {errors.nom}
                                  </FormHelperText>
                                )
                              }
                            />
                          </FormControl>
                          </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              ref={inputLabel}
                              htmlFor="outlined-type-native-simple"
                            >
                              Type&nbsp;d'événement
                            </InputLabel>
                            <Select
                              native
                              error={errors.type && touched.type && true}
                              value={values.type}
                              name="type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              labelWidth={labelWidth}
                              variant="outlined"
                              helperText={
                                errors.type &&
                                touched.type && (
                                  <FormHelperText error>
                                    {errors.type}
                                  </FormHelperText>
                                )
                              }
                            >
                              <option value="Publique">Publique</option>
                              <option value="Privé">Privé</option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              ref={inputLabel}
                              htmlFor="outlined-type-native-simple"
                            >
                              Thème d'événement
                            </InputLabel>
                            <Select
                              native
                              error={errors.theme && touched.theme && true}
                              value={values.theme}
                              name="theme"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              labelWidth={labelWidth}
                              variant="outlined"
                              helperText={
                                errors.theme &&
                                touched.theme && (
                                  <FormHelperText error>
                                    {errors.theme}
                                  </FormHelperText>
                                )
                              }
                            >
                              <option value="After Work">After Work</option>
                              <option value="Conventum">Conventum</option>
                              <option value="Team building">
                                Team building
                              </option>
                              <option value="Pyjama">Pyjama</option>
                              <option value="Demande de mariage">
                                Demande de mariage
                              </option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <TextField
                              error={errors.date && touched.date && true}
                              name="date"
                              label="Date d'événement"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                errors.date &&
                                touched.date && (
                                  <FormHelperText error>
                                    {errors.date}
                                  </FormHelperText>
                                )
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <TextField
                              error={errors.heure && touched.heure && true}
                              name="heure"
                              id="outlined-number"
                              label="Heure d'événement"
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              value={values.heure}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                errors.heure &&
                                touched.heure && (
                                  <FormHelperText error>
                                    {errors.heure}
                                  </FormHelperText>
                                )
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Paper className={classes.paper} variant="outlined">
                      <Typography variant="h6">Description de l'événement</Typography>
                      <br></br>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <TextField
                          name="description"
                          multiline
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Paper>
                    </Grid>
                    <Grid item lg={6}  md={6} sm={12} xs={12}>
                    <Paper className={classes.paper} variant="outlined">
                      <Typography variant="h6">Vidéo promotionnelle de l'événement</Typography>
                      <br></br>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <TextField
                          name="video"
                          type="url"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          value={values.video}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </Paper>
                    </Grid>
                    </Grid>
                    <Paper className={classes.paper} variant="outlined">
                      <Typography variant="h6">Photo de l'événement</Typography>
                      <br></br>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="contained-button-file"
                          name="image"
                          setFieldValue={setFieldValue}
                          multiple
                          type="file"
                          value={values.image}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" color="primary" component="span" >
                            Upload
                          </Button>
                        </label>
                      </FormControl>
                    </Paper>
                    <div className={classes.button}>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                      >
                        Suivant
                      </Button>
                    </div>
                  </form>
                );
                    }}
                  </Formik>
            </div>
    );
}
