import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiUrl } from './config';
import ResetPasswordForm  from './ResetPasswordForm';

export default class ResetPasswordToken extends Component {
  state = {
    success: false,
    failure: false,
  };

  handleVerification() {
    fetch(apiUrl + '/onboarding/reset/' + this.props.token, {
      method: 'POST',
      headers: new Headers({
        "Accept": "application/*+json",
      }),
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

  componentDidMount() {
    if (this.state.success === false && this.state.failure === false) {
      this.handleVerification();
    }
  }

  render() {
    if (this.state.success === true) {
      return (
        <ResetPasswordForm token={this.props.token} />
      )
    }

    if (this.state.failure === true) {
      return (
        <Redirect to="/reset-password/failure" />
      )
    }

    return (
      <h2>Checking...</h2>
    );
  }
}