import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import GenerateDummyData from "./components/GenerateDummyData/GenerateDummyData";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            exact
            path="/generate-dummy-data"
            component={GenerateDummyData}
          />
          <Route
            path="/aggregation-type"
            render={() => <h1> Aggregation Type</h1>}
          />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.credentials.username === "haufe"
  };
};

export default withRouter(connect(mapStateToProps)(App));
