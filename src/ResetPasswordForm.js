import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class ResetPasswordForm extends Component {
  render () {
    return (
      <Form action={"/onboarding/reset/" + this.props.token} actionLabel="Reset password" success="/reset-password/success">
        <Input type="password" name="password" label="New password" icon="key" validation />
        <Input type="password" name="password-repeat" label="Confirm password" icon="redo" validation />
      </Form>
    );
  }
}