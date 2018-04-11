import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class RegistrationForm extends Form {
  render () {
    return (
      <Form action="/onboarding/register" actionLabel="Register" success="/register/success">
        <Input type="text" name="email" label="Email" icon="envelope" validation={this.state.validation} help="This will also be your username. It will never be shown publicly." />
        <Input type="password" name="password" label="Password" icon="key" validation={this.state.validation} />
        <Input type="password" name="password-repeat" label="Confirm password" icon="redo" validation={this.state.validation} />
      </Form>
    );
  }
}