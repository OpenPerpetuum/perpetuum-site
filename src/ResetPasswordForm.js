import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class ResetPasswordForm extends Component {
  render () {
    return (
      <Form action="/onboarding/reset" actionLabel="Send reset link" success="/reset-password/success">
        <Input type="text" name="email" label="Email" icon="envelope" validation />
      </Form>
    );
  }
}