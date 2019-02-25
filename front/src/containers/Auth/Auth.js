import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import axios from "../../axios-backend";
import { withRouter } from "react-router";
import * as actionTypes from "../../store/actions";

class Auth extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    error: "",
    isExistingConnection: false
  };

  checkValidaty(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidaty(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      controls: updatedControls,
      formIsValid: formIsValid,
      error: ""
    });
  };

  onSubmitHandler = async event => {
    event.preventDefault();
    const credentials = {
      username: this.state.controls.username.value,
      password: this.state.controls.password.value
    };
    try {
      await axios.get("/connected").then(res => {
        if (res.status === 200 && res.data === true) {
          this.setState({ isExistingConnection: true });
        }
      });
    } catch (err) {
      this.setState({ error: "Was unable to reach the server" });

      return;
    }

    if (!this.state.isExistingConnection) {
      this.setState({
        error: "Database connection is down, cannot authenticate"
      });

      return;
    }

    if (
      credentials.username === "haufe" &&
      credentials.password === "lexware"
    ) {
      this.props.onCredentialsSubmitted(credentials);
      this.props.history.push({
        pathname: "/generate-dummy-data"
      });
    } else {
      this.setState({ error: "Incorrect username or password" });
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            value={formElement.config.value}
            touched={formElement.config.touched}
            changed={e => this.inputChangedHandler(e, formElement.id)}
          />
        ))}
      </form>
    );

    return (
      <div className={classes.Auth}>
        {form}
        <Button
          disabled={!this.state.formIsValid}
          clicked={this.onSubmitHandler}
          btnType="Success"
        >
          Log In
        </Button>
        {<p className={classes.Error}>{this.state.error}</p>}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.credentials.username,
    password: state.credentials.password,
    isAuthenticated: state.credentials.username === "haufe"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCredentialsSubmitted: credentials =>
      dispatch({ type: actionTypes.SET_CREDENTIALS, credentials })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
