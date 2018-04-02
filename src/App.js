import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import TokenVerify from './TokenVerify';
// import './App.css';
// import logo from './logo.svg';

const Register = () => (
  <div>
    <RegistrationHeroSection />
    <section className="section">
      <div className="container">
        {/* <div className="columns is-vcentered"> */}
          {/* <div className="column"> */}
            <RegistrationForm />
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  </div>
)

const RegisterSuccess = () => (
  <div>
    <RegistrationHeroSection />
    <section className="section">
      <div className="container">
        <h2>Thanks for registering! We have sent you an email with a link to verify your email address. Once your email address is verified, you can log into the server.</h2>
      </div>
    </section>
  </div>
)

class RegistrationHeroSection extends Component {
  render() {
    return (
      <section className="hero is-small is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Open Perpetuum
            </h1>
            <h2 className="subtitle">
              Create your server account now
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

const Verify = ({match}) => (
  <section className="section">
    <TokenVerify token={match.params.token} />
  </section>
)

const VerifySuccess = () => (
  <section className="section">
    <h2>We've successfully verified your email address. Thanks!</h2>
  </section>
)

const VerifyFailure = () => (
  <section className="section">
    <h2>We could not find this verification link. Maybe you have already verified your registration?</h2>
  </section>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Register} />
      <Route exact path="/register/success" component={RegisterSuccess} />
      <Switch>
        <Route exact path="/verify/success" component={VerifySuccess} />
        <Route exact path="/verify/failure" component={VerifyFailure} />
        <Route path="/verify/:token" component={Verify} />
      </Switch>
    </div>
  </Router>
)

export default App;