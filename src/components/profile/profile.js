import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // margin: "auto",
    maxWidht: 500,
  },
  paper1: {
    padding: theme.spacing(2),
    height: 200,
    widht: 60,
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
      <Grid  container 
      spacing={3}
      style={{ background: "yellow" }} >
        <Grid container
        spacing={3}
         xs = {12}  >  
          <Grid xs={3}>
            <Paper className={classes.paper1}>Avatar</Paper>
          </Grid>
          <Grid xs={9} container style={{ background: "red" }}>
            <Grid xs={12}>
              <Paper className={classes.paper}>firstName</Paper>
            </Grid>
            <Grid xs={12}>
              <Paper className={classes.paper}>lastName</Paper>
            </Grid>
            <Grid xs={12}>
              <Paper className={classes.paper}>age</Paper>
            </Grid>
            <Grid xs={12}>
              <Paper className={classes.paper}>gender</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Paper className={classes.paper}>aboutYourself</Paper>
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
}
