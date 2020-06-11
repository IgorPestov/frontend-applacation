import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import SignIn from "./components/signIn";
import Profile from "./components/profile";
import SignUp from "./components/signUp";

class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route history={history} path="/signIn" component={SignIn} />
          <Route history={history} path="/signUp" component={SignUp} />
          <Route history={history} path="/profile" component={Profile} />
          <Redirect from="/" to="/signIn" />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withRouter(App);
