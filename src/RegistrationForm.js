import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from './Input';
import { apiUrl } from './config';
require('formdata-polyfill'); // FormData.get() on iOS

export default class RegistrationForm extends Component {
  state = {
    validation: [],
    success: false,
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    if (this.state.loading === true) {
      return;
    }

    const data = new FormData(event.target);
    if (data.get('password') !== data.get('password-repeat')) {
      this.setState({
        validation: {
          'password': {
            'noMatch': 'Passwords do not match',
          },
          'password-repeat': {
            'noMatch': 'Passwords do not match',
          },
        },
      });

      return;
    }

    this.setState({
      loading: true,
    });

    // const apiUrl = process.env.REACT_APP_API_URL;
    fetch(apiUrl + '/onboarding/register', {
      method: 'POST',
      body: data,
      headers: new Headers({
        "Accept": "application/*+json",
      }),
    })
    .then(response => {
      if (response.status === 201) {
        this.setState({
          success: true,
          loading: false,
        });

        return {};
      }

      return response.json();
    })
    .then(json => {
      if (json.hasOwnProperty('validation_messages')) {
        this.setState({
          validation: json.validation_messages,
          loading: false,
        });
        
        return;
      }
      if (json.hasOwnProperty('detail')) {
        this.setState({
          error: json.detail,
          loading: false,
        });
      }
    });
  };

  handleClick = (event) => {
    const name = event.target.name;
    if (this.state.validation.hasOwnProperty(name)) {
      delete this.state.validation[name];
    }
    this.setState(this.state);
  };
  
  render() {
    if (this.state.success === true) {
      return (
        <Redirect to="/register/success" />
      )
    }
    const error = this.state.error;
    const loading = this.state.loading;

    return (
      <div>
        {error &&
          <article className="message is-danger">
            <div className="message-body">
              {error}
            </div>
          </article>
        }
        <form onSubmit={this.handleSubmit} onClick={this.handleClick}>
          <Input type="text" name="email" label="Email" icon="envelope" validation={this.state.validation} help="This will also be your username. It will never be shown publicly." />
          <Input type="password" name="password" label="Password" icon="key" validation={this.state.validation} />
          <Input type="password" name="password-repeat" label="Confirm password" icon="redo" validation={this.state.validation} />
          <div className="field is-grouped">
            <div className="control">
              <button className={"button is-link " + (loading ? "is-loading" : "")} disabled={loading}>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}