import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import SignIn from "./components/signIn";
import { Profile, UpdateUserInfo } from "./components/profile/index";
import SignUp from "./components/signUp";
import { Provider } from "react-redux";
import store from "./store/store";
import Files from "./components/files";
import CreateNewPassword from "./components/createNewPassword/index";
import ResetPassword from "./components/resetPassword/index";


class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <Provider store={store}>
          <Switch>
            <Route history={history} path="/signIn" component={SignIn} />
            <Route history={history} path="/signUp" component={SignUp} />
            <Route history={history} path="/profile" component={Profile} />
            <Route history={history} path="/uploadFile" component={Files} />
            <Route history={history} path="/createNewPassword" component={CreateNewPassword} />
            <Route history={history} path="/resetPassword" component={ResetPassword} />

            <Route
              history={history}
              path="/updateUserInfo"
              component={UpdateUserInfo}
            />
            <Redirect from="/" to="/signIn" />
          </Switch>
        </Provider>
      </React.Fragment>
    );
  }
}
export default withRouter(App);
