import React, { Component } from 'react';
// import './App.css';
// import logo from './logo.svg';

const API_URL = 'http://api.openperpetuum.com';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(API_URL+'/onboarding/register', {
      method: 'POST',
      body: data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input type="text" name="email" label="Email" icon="envelope" />
        <Input type="password" name="password" label="Password" />
        <Input type="password" name="password-repeat" label="Confirm password" />
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
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            className="input" 
            name={this.props.name}
            type={this.props.type} 
            placeholder={this.props.placeholder}
          />
          {this.props.icon &&
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          }
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <RegistrationForm />
      </div>
    );
  }
}

export default App;