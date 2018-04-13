import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiUrl } from './config';

export default class VerifyToken extends Component {
  state = {
    success: false,
    failure: false,
  };

  handleVerification() {
    fetch(apiUrl + '/onboarding/verify/' + this.props.token, {
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
        <Redirect to="/verify/success" />
      )
    }

    if (this.state.failure === true) {
      return (
        <Redirect to="/verify/failure" />
      )
    }

    return (
      <h2>Checking...</h2>
    );
  }
}