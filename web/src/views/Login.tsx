import React, { Component } from 'react';
import firebase from '../helpers/firebase';
import 'bulma';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.ChangeEvent<EventTarget>) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
  }

  render() {
    return (
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container ml-6">
            <h1 className="title is-size-1">Login</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label has-text-white is-large">Email</label>
                <div className="control is-half">
                  <input
                    className="input is-large is-primary"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    placeholder="hello@world.com"
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white is-large">
                  Password
                </label>
                <div className="control is-half">
                  <input
                    className="input is-large is-primary"
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    placeholder="VeryS3curePassword"
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control buttons">
                  <button className="button is-primary is-inverted is-large">
                    Login
                  </button>
                  <Link to="/signup" className="button is-primary is-inverted is-large">Signup</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
