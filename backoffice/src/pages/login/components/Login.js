import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { AuthenticateUser } from '../../../graphql/mutations/index';
import { graphql } from 'react-apollo';
import { GC_AUTH_TOKEN } from '../../../constants/index';

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'toto@toto.fr',
      password: 'toto',
      error: '',
    };
  }

  render() {
    return (
      <div className="Login-container">
        <span className="Login-title"><FormattedMessage id="your_brand"/></span>
        <div className="Login-label-container">
          <label className="Login-label"><FormattedMessage id="email"/></label>
          <input
            className="Login-input"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
          />
        </div>
        <div className="Login-label-container">
          <label className="Login-label"><FormattedMessage id="password"/></label>
          <input
            className="Login-input"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
          />
        </div>
        <div
          className="Login-button pointer button"
          onClick={this.state.password && this.state.email && this._confirm}
        >
          <FormattedMessage id="login"/>
        </div>
        { this.state.error && (
          <strong className="Login-error">{this.state.error}</strong>
        ) }
      </div>
    );
  }

  _confirm = async () => {
    const { email, password } = this.state;
    const result = await this.props.authenticateUser({
      variables: {
        email,
        password,
      },
    });
    const token = result.data.login.token;
    const role = result.data.login.user.role;

    if (role !== 'ADMIN') {
      return this.setState({ error: 'Only admins can login here.' });
    }

    if (token) {
      this._saveUserData(token);
      this.props.onUserAuthenticated();
    }
  };

  _saveUserData = token => {
    localStorage.setItem(GC_AUTH_TOKEN, token);
  };
}

export default graphql(AuthenticateUser, { name: 'authenticateUser' })(Login);
