import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class RegistrationForm extends Component {
  render () {
    return (
      <Form action="/onboarding/register" actionLabel="Register" success="/register/sent">
        <Input type="text" name="email" label="Email" icon="envelope" validation help="This will also be your username. It will never be shown publicly." />
        <Input type="password" name="password" label="Password" icon="key" validation />
        <Input type="password" name="password-repeat" label="Confirm password" icon="redo" validation />
      </Form>
    );
  }
}