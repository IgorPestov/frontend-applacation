import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import APIHelper from "../../APIHelper";
import { Alert, AlertTitle } from "@material-ui/lab";

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

const CreateNewPassword = (props) => {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState(null);
  const [errToken, setErrToken] = useState(null);
  const [done, setDone] = useState(null);
  const regPassword = /^\S*$/;
  const [errPassword, setErrPassword] = useState(null);
  const checkPassword = passwordRepeat.trim() && newPassword.trim();
  const resetLink = window.location.href.slice(40);
  const changeNewPassword = (event) => {
    if (
      !regPassword.test(event.target.value) ||
      event.target.value.length < 8
    ) {
      return setErrPassword(
        'Password must be 8 characters long and must be have no spaces!"'
      );
    }
    setErrPassword(null);
    return setNewPassword(event.target.value);
  };
  const changeRepeatPassword = (event) => {
    if (
      !regPassword.test(event.target.value) ||
      event.target.value.length < 8
    ) {
      return setErrPassword(
        "Password must be 8 characters long and must be have no spaces!"
      );
    }
    setErrPassword(null);
    return setPasswordRepeat(event.target.value);
  };
  const handleSubmit = () => {
    if (newPassword === passwordRepeat || !checkPassword) {
      createNewPassword(resetLink, newPassword);
    } else {
      setErr("Passwords mismatch");
    }
    setErrToken(null);
  };

  const createNewPassword = async (resetLink, newPassword) => {
    try {
      const user = await APIHelper.createNewPassword(resetLink, newPassword);
      setDone(user.message);
      props.history.push("/signIn");
    } catch (err) {
      setErrToken(err.response.data.err);
    }
  };
  const Alerts = () => {
    if (done) {
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {done}
        </Alert>
      );
    }
    if (err || errPassword || errToken) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {err || errPassword || errToken}
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
        <form className={classes.form} noValidate>
          <Alerts />
          <TextField
            error={!!errPassword}
            onChange={changeNewPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            type="password"
            name="newPassword"
            autoComplete="newPassword"
            autoFocus
          />
          <TextField
            error={!!errPassword}
            onChange={changeRepeatPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save password
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default CreateNewPassword;
