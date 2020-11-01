import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Excel from "./pages/Excel";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/app"></Redirect>
        <Route path="/app" exact component={Excel}></Route>
      </Switch>
    </BrowserRouter>
  );
}
