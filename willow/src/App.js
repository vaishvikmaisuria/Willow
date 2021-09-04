import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SnackbarProvider } from "notistack";
import {
  Switch,
  Redirect,
  Route,
  withRouter,
  BrowserRouter as Router,
} from "react-router-dom";
import Homepage from "./pages/Home";
import InfoPage from "./pages/Information";
import Assistant from "./pages/Assistant";

import "react-dropzone-uploader/dist/styles.css";
import "./App.css";
import StockInfo from "./pages/StockInfo";

function UnconnectedApp() {
  return (
    <div className="App">
      <Switch>
        {/* Path to each page components */}
        <Route exact path="/" component={withRouter(Homepage)} />
        <Route exact path="/info" component={withRouter(InfoPage)} />
        <Route exact path="/assistant" component={withRouter(Assistant)} />
        <Route exact path="/stocks" component={withRouter(StockInfo)} />

        <Route
          exact
          path="/not-found"
          render={() => (
            <>
              <h1>Not Found</h1>
              <p>The requested page could not be found</p>
            </>
          )}
        />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

function ConnectedApp() {
  return (
    <ChakraProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <UnconnectedApp />
        </Router>
      </SnackbarProvider>
    </ChakraProvider>
  );
}

export default ConnectedApp;
