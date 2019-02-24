import React, { Component } from "react";
import Button from "../UI/Button/Button";
import axios from "../../axios-backend";
import classes from "./GenerateDummyData.css";

class GenerateDummyData extends Component {
  onGenerateHandler = async event => {
    event.preventDefault();
    await axios.get("/all").then(res => console.log("result>>>", res));
  };

  render() {
    return (
      <div className={classes.Dummy}>
        <Button btnType="Success" clicked={this.onGenerateHandler}>
          Generate Dummy Data
        </Button>
      </div>
    );
  }
}

export default GenerateDummyData;
