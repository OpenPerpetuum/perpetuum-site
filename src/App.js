import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import VerifyToken from './VerifyToken';
import ResendForm from './ResendForm';
import RequestResetPasswordForm from './RequestResetPasswordForm';
import ResetPasswordToken from './ResetPasswordToken';

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
                <Link to="/register" className="button is-small is-white">Register an account</Link>
                <Link to="/reset-password" className="button is-small is-white">Reset password</Link>
                <Link to="/resend" className="button is-small is-white">Resend activation email</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const Register = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Create your server account
        </h4>
        <RegistrationForm />
      </div>
    </section>
  </div>
)

const Resend = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Resend your verification mail
        </h4>
        <p style={{marginBottom: '1rem'}}>
          If you have previously registered with us, you will receive another mail with a verification link.
        </p>
        <ResendForm />
      </div>
    </section>
  </div>
)

const ResendSent = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Thanks
        </h4>
        <p>
          You will receive a new mail with a verification link soon.
        </p>
      </div>
    </section>
  </div>
)

const RequestResetPassword = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Reset your password
        </h4>
        <p style={{marginBottom: '1rem'}}>
          If you have previously registered with us, you will receive a mail with a link to reset your password.
        </p>
        <RequestResetPasswordForm />
      </div>
    </section>
  </div>
)

const RequestResetPasswordSent = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Thanks
        </h4>
        <p>
          You will receive a mail with a link to reset your password soon.
        </p>
      </div>
    </section>
  </div>
)

const RegisterSent = () => (
  <div>
    <section className="section">
      <div className="container">
        <h4 className="title is-4">
          Registration successful
        </h4>
        <p>
          Thanks for registering! We have sent you an email with a link to verify your email address. Once your email address is verified, you can log into the server.
        </p>
        <Link to="/" className="button is-link" style={{marginTop: '1em'}}>Create another account</Link>
      </div>
    </section>
  </div>
)

const Verify = ({match}) => (
  <section className="section">
    <VerifyToken token={match.params.token} />
  </section>
)

const VerifySuccess = () => (
  <section className="section">
    <div className="container">
      <h4 className="title is-4">
        Registration verification successful
      </h4>
      <p>We've successfully verified your email address. Thanks!</p>
    </div>
  </section>
)

const VerifyFailure = () => (
  <section className="section">
    <div className="container">
      <h4 className="title is-4">
        Registration verification failed
      </h4>
      <p>We could not find this verification link. Maybe you have already verified your registration?</p>
    </div>
  </section>
)

const ResetPasswordSuccess = () => (
  <section className="section">
    <div className="container">
      <h4 className="title is-4">
        Password reset successful
      </h4>
      <p>We've successfully reset your password.</p>
    </div>
  </section>
)

const ResetPasswordFailure = () => (
  <section className="section">
    <div className="container">
      <h4 className="title is-4">
        Password reset failed
      </h4>
      <p>We could not find this password reset link. You may have already reset your password, or it has expired.</p>
    </div>
  </section>
)

const ResetPassword = ({match}) => (
  <section className="section">
    <ResetPasswordToken token={match.params.token} />
  </section>
)

const App = () => (
  <Router>
    <div>
      <HeroSection />
      <Route exact path="/" component={Register} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/sent" component={RegisterSent} />
      <Route exact path="/resend" component={Resend} />
      <Route exact path="/resend/sent" component={ResendSent} />
      <Switch>
        <Route exact path="/reset-password" component={RequestResetPassword} />
        <Route exact path="/reset-password/sent" component={RequestResetPasswordSent} />
        <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
        <Route exact path="/reset-password/failure" component={ResetPasswordFailure} />
        <Route path="/reset-password/:token" component={ResetPassword} />
      </Switch>
      <Switch>
        <Route exact path="/verify/success" component={VerifySuccess} />
        <Route exact path="/verify/failure" component={VerifyFailure} />
        <Route path="/verify/:token" component={Verify} />
      </Switch>
      <FooterSection />
    </div>
  </Router>
)

export default App;