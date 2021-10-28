import React, { Component } from "react";
// import Layout from "./Layout/Layout";

import Login from "./ Components/Login";

import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Main from "../src/layout/MainLayout";
import LoginLayout from "../src/layout/LoginLayout";
import PresentationLayout from "../src/layout/PresentationLayout"
import NotFound from "../src/layout/NotFound";
import UserRequests from "./screens/user/index"
import ViewUserRequests from "./screens/admin/index"

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  // async componentDidMount() {
  // 	const token = localStorage.getItem('token');
  // 	if (token !== null) {
  // 		store.dispatch(authenticate());
  // 	} else {
  // 		store.dispatch(unauthenticate());
  // 	}
  // }

  render() {
    return (
      <div>	<BrowserRouter>
        <Switch>
          <LoginLayout
            exact
            path="/"
            layout={LoginLayout}
            component={Login}>
          </LoginLayout>
          <LoginLayout
            exact
            path="/notFound"
            layout={LoginLayout}
            component={NotFound}>
          </LoginLayout>
          <PresentationLayout
            exact
            path="/user/user-request"
            layout={Main}
            component={UserRequests}>
          </PresentationLayout>
          <PresentationLayout
            exact
            path="/admin/user-request"
            layout={Main}
            component={ViewUserRequests}>
          </PresentationLayout>
         
          <Redirect to="/notFound" />
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}
export default App;