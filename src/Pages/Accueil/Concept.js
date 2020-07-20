import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "rgb(210, 23, 64)",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: "10px",
  },
  paper: {
    padding: "20px",
    marginBottom: "20px",
  },
  padding: {
    padding: "40px",
  },
  grid: {
    position: "relative",
    minheight: "1px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "180px",
  },
  video: {
    width: "100%",
    marginTop: "-120px",
    marginBottom: "45px",
  },
}));

export const Concept = () => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.padding}>
        <Typography variant="h4" className={classes.title}>
          Le concept de Clic'n fest
        </Typography>
        <Grid container spacing={3} style={{ paddingTop: "40px" }}>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.grid}>
            <Paper className={classes.paper} style={{ marginTop: "98px" }}>
              {/* <iframe
                width="520"
                height="290"
                src="https://www.youtube.com/embed/kAzCrORGEQw"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={classes.video}
              ></iframe> */}
              <iframe width="520" 
              height="290" 
              src="https://www.youtube.com/embed/NKpS-bbx6Kc" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className={classes.video}
              ></iframe>
              <Typography>
                Clic'n Fest est une plateforme pour organiser des événements
                sans intermédiaires et en toute simplicité. Un seul support
                intégré pour gérer l'ensemble des composantes de votre événement
                : Gagnez du temps, négociez vos tarifs, comparez les prix en
                toute transparence et bénéficiez de notre séléction de qualité
                des meilleurs parteniares.
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.text}>
                PAIEMENTS SECURISES
              </Typography>
              <Typography>
                Réglez vos prestations de manière 100 % sécurisée.
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.text}>
                GAGNEZ DES PARTICIPANTS
              </Typography>
              <Typography>
                Utilisez les outils de communication à votre disposition pour
                optimiser le taux de remplissage de votre événement et dialoguez
                avec vos participants
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.text}>
                RECHERCHEZ VOS PRESTATAIRES
              </Typography>
              <Typography>
                Votre lieu de réception, votre menu traiteur, vos boissons, vos
                animations... Trouvez en un clic des partenaires qualifiés par
                nos soins à l'image de votre événement
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.text}>
                TRANSPARENCE DES PRIX
              </Typography>
              <Typography>
                Les tarifs des produuits sont indiqués directement en ligne.
                Bénéficiez des meilleurs prix !
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.text}>
                GAGNEZ DU TEMPS
              </Typography>
              <Typography>
                Organisez votre événement de A à Z en moins de 10 minutes
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
