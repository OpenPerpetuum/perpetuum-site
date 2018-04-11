import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import TokenVerify from './TokenVerify';

const Register = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Create your server account
        </h4>
        {/* <div className="columns is-vcentered"> */}
          {/* <div className="column"> */}
            <RegistrationForm />
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
    <FooterSection />
  </div>
  
)

const RegisterSuccess = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Registration successful
        </h4>
        <p>Thanks for registering! We have sent you an email with a link to verify your email address. Once your email address is verified, you can log into the server.</p>
        <br/>
        <Link to="/" className="button is-link">Create another account</Link>
      </div>
    </section>
  </div>
)

class HeroSection extends Component {
  render() {
    return (
      <section className="hero is-small is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Open Perpetuum Server
            </h1>
          </div>
        </div>
      </section>
    );
  }
}

class FooterSection extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              The <strong>Open Perpetuum Server</strong> is an open-source project. Support us on <a href="https://www.patreon.com/openperpetuum">Patreon</a>!
            </p>
            <div className="buttons is-centered">
                <Link to="/reset-password" className="button is-small is-white">Reset password</Link>
              
              
                <Link to="/resend" className="button is-small is-white">Resend activation email</Link>
              
            </div>
          </div>
        </div>
      </footer>
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
    <div className="container">
      <h4 className="title is-4">
        Registration successful
      </h4>
      <p>We've successfully verified your email address. Thanks!</p>
    </div>
  </section>
)

const VerifyFailure = () => (
  <section className="section">
    <div className="container">
      <h4 className="title is-4">
        Registration successful
      </h4>
      <p>We could not find this verification link. Maybe you have already verified your registration?</p>
    </div>
  </section>
)

const Resend = () => (
  <div></div>
)

const App = () => (
  <Router>
    <div>
      <HeroSection />
      <Route exact path="/" component={Register} />
      <Route exact path="/register/success" component={RegisterSuccess} />
      <Route exact path="/resend" component={Resend} />
      <Route exact path="/reset-password" component={Resend} />
      <Switch>
        <Route exact path="/verify/success" component={VerifySuccess} />
        <Route exact path="/verify/failure" component={VerifyFailure} />
        <Route path="/verify/:token" component={Verify} />
      </Switch>
    </div>
  </Router>
)

export default App;