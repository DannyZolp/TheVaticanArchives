import React, { Component } from 'react';
import 'bulma';
import { Link } from 'react-router-dom';
import vaticanArchives from '../static/Spiral_Vatican_Museum.jpg';

class Home extends Component {
  render() {
    return (
      <>
        <header className="hero is-primary is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-size-1">The Vatican Archives</h1>
              <h3 className="subtitle">
                Documenting your life one file at a time
              </h3>
              <div className="buttons">
                <Link
                  to="/view"
                  className="button is-primary is-inverted is-outlined is-medium"
                >
                  View
                </Link>
                <Link
                  to="/login"
                  className="button is-primary is-inverted is-outlined is-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>
        <hr className="m-6" />
        <section className="container mt-6 mb-6" id="about">
          <div className="columns">
            <div className="column">
              <img src={vaticanArchives} alt="vatican archives" />
              <a href="https://commons.wikimedia.org/wiki/File:Spiral_Vatican_Museum.jpg">
                Dennis Mojado
              </a>
              ,{' '}
              <a href="https://creativecommons.org/licenses/by/2.0">
                CC BY 2.0
              </a>
              , via Wikimedia Commons
            </div>
            <div className="column">
              <h1 className="title">About Us</h1>
              <h3 className="subtitle">
                Who we are at the Vatican Archives
              </h3>
              <p className="mt-6">
								<strong>Note: we are in no way associated with the Vatican.</strong> Here at the Vatican Archives we take note of everything
								that you dumb people put on to our discord or send to us, so that we can make a better world that has less shit. Why is the
								world shit? Because you guys think that you are incredibly funny when a few years or maybe months down the line you will regret
								your decision. Our purpose is to make you think before being a dumbass and sending us things that aren't funny. You might think
								this is blackmail, and I'd like to say that I have a very good lawyer.
							</p>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              Made by <a href="https://dannyzolp.com/">Danny Zolp</a> with 💕,
              Copyright 2020
            </p>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;
