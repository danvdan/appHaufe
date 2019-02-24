import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            {/* <Redirect exact from="/" to="/auth" /> */}
            <Route
              exact
              path="/"
              render={() => <h1> hello from the react side!</h1>}
            />
            {/* <Route path="/" component={} /> */}
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
