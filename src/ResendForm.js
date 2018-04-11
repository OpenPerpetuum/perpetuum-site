import React, { Component } from 'react';
import Form from './Form';
import Input from './Input';

export default class ResendForm extends Component {
  render () {
    return (
      <Form action="/onboarding/resend" actionLabel="Resend verification link" success="/resend/success">
        <Input type="text" name="email" label="Email" icon="envelope" validation />
      </Form>
    );
  }
}