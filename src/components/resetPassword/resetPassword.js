import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import APIHelper from "../../APIHelper";
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  err: {
    color: "red",
  },
}));

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [done, setDone] = useState(null);
  const [errEmpty, seterrEmpty] = useState(null);;
  const handleSubmit = () => {
    if (!email.trim()) {
      return seterrEmpty("Empty fields");
    }
    seterrEmpty(null);
    setDone(null)
    setErr(null)
    resetPassword(email);
  };

  const resetPassword = async (email) => {
    try {
      const user = await APIHelper.resetPassword(email);
      setDone(user.message);
    } catch (err) {
      setErr(err.response.data.error);
    }
  };
  const Alerts = () => {
    if (done) {
      return   (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {done}
        </Alert>
      );
    }
    if (err) {
      return   (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {err} — <strong>try again!</strong>
        </Alert>
      );
    }
    
    return null;
  };
  
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      {errEmpty && <span className={classes.err}>{errEmpty}</span>}
        <form className={classes.form} noValidate>
          <Alerts />
          <TextField
            error={!!errEmpty}
            onChange={({ target }) => setEmail(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Send mail
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default ResetPassword;
