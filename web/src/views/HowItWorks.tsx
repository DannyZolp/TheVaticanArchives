import React, { Component } from 'react';
import 'bulma';
import Navbar from '../components/Navbar';

class HowItWorks extends Component {
    render() {
        return (
            <>
            <Navbar />
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            How it works
                        </h1>
                        <h2 className="subtitle">
                            <strong>Very Carefully.</strong> Also with Google's Firebase Platform, using Firestore and Cloud Storage.
                        </h2>
                    </div>
                </div>
            </section>
            </>
        )
    }
}

export default HowItWorks;