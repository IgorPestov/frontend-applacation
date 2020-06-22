import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import APIHelper from "../../APIHelper";
import { connect } from "react-redux";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  err: {
    color: "red",
  },
}));

const SignInSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(null);
  const [errEmpty, setErrEmrty] = useState(null);
  const [errEmail, setErrEmail] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errFirstName, setErrFirstName] = useState(null);
  const checkInputText = email.trim() && password.trim() && firstName.trim();
  const regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/;
  const regPassword = /^\S*$/;
  const regFirstName = /^\S*$/;
  const changePassword = (event) => {
    setErrEmrty(null);
    if (
      !regPassword.test(event.target.value) ||
      event.target.value.length < 8
    ) {
      return setErrPassword(
        'Password must be 8 characters long and must be have no spaces!"'
      );
    }
    setErrPassword(null);
    return setPassword(event.target.value);
  };
  const changeFirstName = (event) => {
    setErrEmrty(null);
    if (
      !regFirstName.test(event.target.value) ||
      event.target.value.length == 0
    ) {
      return setErrFirstName("First name must be have no spaces");
    }
    setErrFirstName(null);
    return setFirstName(event.target.value);
  };
  const changeEmail = (event) => {
    setErrEmrty(null);
    if (!regEmail.test(event.target.value)) {
      return setErrEmail("Invalid E-mail");
    }
    setErrEmail(null);
    return setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    if (!checkInputText) {
      return setErrEmrty("Empty fields");
    }
    setErrEmrty(null);
    signUpUser(email, password, firstName);
  };
  const signUpUser = async (email, password, firstName) => {
    try {
      const tokens = await APIHelper.signUpUser(email, password, firstName);
      if (tokens) {
        localStorage.setItem("logged", true);
        localStorage.setItem("tokenData", JSON.stringify(tokens));
        props.tokenAccess(tokens.accessToken);
        props.history.push("/profile");
      }
    } catch (err) {
      setErr(err.response);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {err && <span className={classes.err}>{err.data.message}</span>}
        {errEmpty && <span className={classes.err}>{errEmpty}</span>}
        <form action="/profile/" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!errFirstName || !!errEmpty}
                onChange={changeFirstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              {errFirstName && (
                <span className={classes.err}>{errFirstName}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!err || !!errEmail || !!errEmpty}
                onChange={changeEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {errEmail && <span className={classes.err}>{errEmail}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errPassword || !!errEmpty}
                onChange={changePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errPassword && (
                <span className={classes.err}>{errPassword}</span>
              )}
            </Grid>
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    tokenAccess: (newTokenAccess) => {
      dispatch({
        type: "ACCESS_TOKEN_POST",
        payload: newTokenAccess,
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(SignInSignUp);
