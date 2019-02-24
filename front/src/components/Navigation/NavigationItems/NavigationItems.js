import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Generate More Data</NavigationItem>
    <NavigationItem link="/second">Aggregation Type</NavigationItem>
  </ul>
);

export default navigationItems;
