import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
// import './App.css';
// import logo from './logo.svg';

// const API_URL = 'http://api.openperpetuum.com';
const API_URL = 'http://perpetuum-api.localhost';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      validation: [],
      success: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(API_URL+'/onboarding/register', {
      method: 'POST',
      body: data
    })
    .then(response => {
      if (response.status === 201) {
        this.setState({
          success: true,
        });

        return {};
      }

      return response.json();
    })
    .then(json => {
      if (json.hasOwnProperty('validation_messages')) {
        this.setState({
          validation: json.validation_messages
        });
      }
    });
  }
  
  render() {
    if (this.state.success === true) {
      return (
        <Redirect to="/register/success" />
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <Input type="text" name="email" label="Email" icon="envelope" validation={this.state.validation} />
        <Input type="password" name="password" label="Password" validation={this.state.validation} />
        <Input type="password" name="password-repeat" label="Confirm password" validation={this.state.validation} />
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

class Input extends Component {
  handleValidation() {
    const validation = this.props.validation;
    const name = this.props.name;
    console.log(validation);
    if (validation.hasOwnProperty(name) === false) {
      return;
    }

    for (let prop in validation[name]) {
      return validation[name][prop];
    }
  }

  render() {
    var warning = this.handleValidation();
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            className={"input " + (message ? "is-danger" : "")}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
          />
          {this.props.icon &&
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          }
          {warning &&
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          }
        </div>
        {warning &&
          <p className="help is-danger">{warning}</p>
        }
      </div>
    );
  }
}

const Register = () => (
  <div>
    <RegistrationForm />
  </div>
)

const RegisterSuccess = () => (
  <div>
    <h1>Success!</h1>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Register}/>
      <Route exact path="/register/success" component={RegisterSuccess}/>
    </div>
  </Router>
)

export default App;