import React, { Component } from "react";
import Button from "../UI/Button/Button";
import axios from "../../axios-backend";
import classes from "./GenerateDummyData.css";

class GenerateDummyData extends Component {
  state = {
    isConnected: false,
    addStatus: "",
    error: ""
  };

  onGenerateHandler = async event => {
    event.preventDefault();
    this.setState({ addStatus: "", error: "" });
    const newOrder = this.getDummydata();
    try {
      await axios
        .post("/add", newOrder)
        .then(res =>
          this.setState({ addStatus: `Added new order #${res.data.orderId}` })
        );
    } catch (err) {
      this.setState({
        error: "Something went wrong when trying to add to the database"
      });
    }
  };

  getDummydata = () => {
    const names = ["Connor", "Jack", "Mike", "Nick", "Tom"];

    return {
      orderId: Math.floor(Math.random() * 1000 + 1),
      customerName: names[Math.floor(Math.random() * 5 + 1)],
      total: Math.floor(Math.random() * 500 + 1)
    };
  };

  render() {
    return (
      <div className={classes.Dummy}>
        <Button btnType="Success" clicked={this.onGenerateHandler}>
          Generate Dummy Data
        </Button>
        {<p className={classes.Status}>{this.state.addStatus}</p>}
        {<p className={classes.Error}>{this.state.error}</p>}
      </div>
    );
  }
}

export default GenerateDummyData;
