import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { apiUrl } from './config';
require('formdata-polyfill'); // FormData.get() on iOS

export default class Form extends PureComponent {
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

    fetch(apiUrl + this.props.action, {
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
        <Redirect to={this.props.success} />
      )
    }
    const error = this.state.error;
    const loading = this.state.loading;
    const clonedChildren = React.Children.map(this.props.children, (child) => React.cloneElement(child, { validation: this.state.validation }));

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
          {clonedChildren}
          <div className="field is-grouped">
            <div className="control">
              <button className={"button is-link " + (loading ? "is-loading" : "")} disabled={loading}>{this.props.actionLabel}</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}