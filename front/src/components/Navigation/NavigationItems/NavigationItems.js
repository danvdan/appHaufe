import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    {props.isAuthenticated ? (
      <NavigationItem link="/generate-dummy-data">
        Generate Dummy Data
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/aggregation-type">Aggregation Type</NavigationItem>
    ) : null}
  </ul>
);

export default navigationItems;
