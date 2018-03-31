import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
// import './App.css';
// import logo from './logo.svg';

const API_URL = 'http://api.openperpetuum.com';

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
            className={"input " + (warning ? "is-danger" : "")}
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

class TokenVerification extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      failure: false,
    };
  }

  handleVerification() {
    fetch(API_URL+'/onboarding/verify/' + this.props.token, {
      method: 'POST',
    })  
    .then(response => {
      if (response.status === 204) {
        this.setState({
          success: true,
        });
      }
      if (response.status === 404) {
        this.setState({
          failure: true,
        });
      }
    });
  }

  render() {
    if (this.state.success === false && this.state.failure === false) {
      this.handleVerification();
    }

    if (this.state.success === true) {
      return (
        <Redirect to="/verify/success" />
      )
    }

    if (this.state.success === false) {
      return (
        <Redirect to="/verify/failure" />
      )
    }

    return (
      <h1>Checking...</h1>
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
    <h1>You've been registered. We have sent you an email with a link to verify your email address.</h1>
  </div>
)

const Verify = ({match}) => (
  <TokenVerification token={match.params.token} />
)

const VerifySuccess = () => (
  <div>
    <h1>We've successfully verified your email address. Thanks!</h1>
  </div>
)

const VerifyFailure = () => (
  <div>
    <h1>We could not find this verification link. Maybe you have already verified your registration?</h1>
  </div>
)

const App = () => (
  <Router>
    <section className="section">
      <div className="container">  
        <Route exact path="/" component={Register} />
        <Route exact path="/register/success" component={RegisterSuccess} />
        <Switch>
          <Route exact path="/verify/success" component={VerifySuccess} />
          <Route exact path="/verify/failure" component={VerifyFailure} />
          <Route path="/verify/:token" component={Verify} />
        </Switch>
      </div>
    </section>
  </Router>
)

export default App;