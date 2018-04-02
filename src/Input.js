import React, { Component } from 'react';

export default class Input extends Component {
  handleValidation = () => {
    const name = this.props.name;
    const validation = this.props.validation;
    
    if (validation.hasOwnProperty(name) === false) {
      return;
    }

    for (let prop in validation[name]) {
        return validation[name][prop];
    }
  };

  render() {
    const warning = this.handleValidation();

    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            className={"input " + (warning ? "is-danger" : "")}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
          />
          {this.props.icon &&
            <span className="icon is-small is-left">
              <i className={"fas fa-" + this.props.icon}></i>
            </span>
          }
          {warning &&
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          }
        </div>
        {warning &&
          <p className="help is-danger">{warning}</p>
        }
        {this.props.help && !warning &&
          <p className="help">{this.props.help}</p>
        }
      </div>
    );
  }
}