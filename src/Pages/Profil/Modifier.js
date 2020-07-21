import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '../../Components/Header/Navbar';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import AuthService from '../../Services/AuthService';
import cover from "../../Images/event.jpg";
import authHeader from '../../Services/AuthHeader';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
    },
    content: {
        textAlign: "center",
        paddingTop: "40px",
    },
    img: {
        width: "150px",
        borderRadius: "360px",
        height: "150px"
    },
    image: {
        textAlign: "center",
        paddingTop: "40px",
        paddingBottom: "20px",
    },
    card: {
        maxWidth: '600px',
        margin: 'auto',
        marginBottom: '40px',
    },
    cover: {
        height: '50vh',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    title: {
        paddingTop: '19vh',
        fontWeight: 'bold',
        color: 'white',
    },
}));
export const Modifier = () => {
    const classes = useStyles();
    const [initialValues, setInitialValues] = React.useState({});
    React.useEffect(() => {
      AuthService.getCurrentUser().then((result) => setInitialValues(result));
    }, [initialValues]);
    return (
      <div>
        <AppBar />
        <div className={classes.cover}>
          <Typography variant="h3" className={classes.title}>
            MON PROFIL
          </Typography>
        </div>
        <div style={{ display: "flow-root" }}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                axios.put(`http://localhost:56407/api/Users/`+initialValues.userId, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    userName: values.userName,
                    email: values.email,
                    password: values.password,
                  }, { headers: authHeader() }
                  ).then(
                    (response) => {
                      console.log(response);
                      window.location.replace("clicnfest#/monprofil");
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                setSubmitting(false);
              }, 10);
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("Ce champ est obligatoire."),
              lastName: Yup.string().required("Ce champ est obligatoire."),
              email: Yup.string()
                .required("Ce champ est obligatoire.")
                .email("Email"),
              password: Yup.string().required("Ce champ est obligatoire."),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className={classes.image}>
                    <img
                      className={classes.img}
                      src="https://kwsmdigital.com/wp-content/uploads/2012/08/Facebook-Blank-Photo.jpg"
                    />
                    {/* {values.img == null ? (
                      <img
                        className={classes.img}
                        src="https://kwsmdigital.com/wp-content/uploads/2012/08/Facebook-Blank-Photo.jpg"
                      />
                    ) : (
                      <img className={classes.img} src={values.img} />
                    )} */}
                    <Typography variant="h5">{values.userName}</Typography>
                  </div>
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <div className={classes.content}>
                        <TextField
                          InputLabelProps={{ shrink: true }} 
                          error={errors.firstName && touched.firstName && true}
                          name="firstName"
                          label="Nom"
                          type="text"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.firstName &&
                            touched.firstName && (
                              <FormHelperText error>
                                {errors.firstName}
                              </FormHelperText>
                            )
                          }
                        />
                        <TextField
                        InputLabelProps={{ shrink: true }} 
                          error={errors.lastName && touched.lastName && true}
                          name="lastName"
                          label="Prénom"
                          type="text"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.lastName &&
                            touched.lastName && (
                              <FormHelperText error>
                                {errors.lastName}
                              </FormHelperText>
                            )
                          }
                        />
                        <br></br>
                        <TextField
                        InputLabelProps={{ shrink: true }} 
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
                        {/* <TextField
                        InputLabelProps={{ shrink: true }} 
                          error={errors.tel && touched.tel && true}
                          name="tel"
                          label="Téléphone"
                          type="text"
                          value={values.tel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.tel &&
                            touched.tel && (
                              <FormHelperText error>
                                {errors.tel}
                              </FormHelperText>
                            )
                          }
                        /> */}
                        <br></br>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          error={errors.userName && touched.userName && true}
                          name="userName"
                          label="Nom d'utilisateur"
                          type="text"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          helperText={
                            errors.userName &&
                            touched.userName && (
                              <FormHelperText error>
                                {errors.userName}
                              </FormHelperText>
                            )
                          }
                        />
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          error={errors.password && touched.password && true}
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
                      </div>
                    </CardContent>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                          margin: "5px",
                        }}
                        variant="contained"
                      >
                        Confirmer
                      </Button>
                    </div>
                  </Card>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
}

