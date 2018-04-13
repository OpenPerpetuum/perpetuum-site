import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class RequestResetPasswordForm extends Component {
  render () {
    return (
      <Form action="/onboarding/reset" actionLabel="Send reset link" success="/reset-password/sent">
        <Input type="text" name="email" label="Email" icon="envelope" validation />
      </Form>
    );
  }
}