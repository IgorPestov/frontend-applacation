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

const CreateNewPassword = (props) => {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [errEmpty, seterrEmpty] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!passwordRepeat.trim() && !password.trim()) {
      return seterrEmpty("Empty fields");
    }
    if(passwordRepeat === password)
    seterrEmpty(null);
    signInUser(password);
  };

  const signInUser = async (email, password) => {
    props.history.push("/profile");
  };
  const showUserInfo = async (userId) => {
    const user = await APIHelper.showUserInfo(userId);
    dispatch(actions.userPost(user));
    
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {err && <span className={classes.err}>{err.data.message}</span>}
        {errEmpty && <span className={classes.err}>{errEmpty}</span>}
        <form className={classes.form} noValidate>
          <TextField
            error={!!err || !!errEmpty}
            onChange={({ target }) => setPassword(target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <TextField
            error={!!err || !!errEmpty}
            onChange={({ target }) => setPasswordRepeat(target.value)}
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

