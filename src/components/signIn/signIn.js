import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import APIHelper from "../../APIHelper";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import actions from "../../store/action/action";

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

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [errEmpty, seterrEmpty] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!email.trim() && !password.trim()) {
      return seterrEmpty("Empty fields");
    }
    seterrEmpty(null);
    signInUser(email, password);
  };

  const signInUser = async (email, password) => {
    try {
      const tokens = await APIHelper.signInUser(email, password);
      const userAccessToken = jwtDecode(tokens.accessToken);
      showUserInfo(userAccessToken.userId);
      if (tokens) {
        localStorage.setItem("logged", true);
        localStorage.setItem("tokenData", JSON.stringify(tokens));
      }
    } catch (err) {
      return setErr(err.response);
    }
  };
  const showUserInfo = async (userId) => {
    const user = await APIHelper.showUserInfo(userId);
    dispatch(actions.userPost(user));
    props.history.push("/profile");
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {err && <span className={classes.err}>{err.data.message}</span>}
        <form className={classes.form} noValidate>
          <TextField
            error={!!err || !!errEmpty}
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
          <TextField
            error={!!err || !!errEmpty}
            onChange={({ target }) => setPassword(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default SignIn;
