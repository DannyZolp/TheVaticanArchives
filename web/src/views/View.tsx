import React, { Component } from 'react';
import firebase from '../helpers/firebase';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import 'bulma';

interface stateTypes {
  currentLoad: firebase.firestore.DocumentData[];
  loading: boolean;
  atEnd: boolean;
  lastDoc: firebase.firestore.QueryDocumentSnapshot | undefined;
}

class View extends Component {
  state: stateTypes = {
    currentLoad: [],
    loading: true,
    atEnd: false,
    lastDoc: undefined,
  };

  constructor(props: any) {
    super(props);
    this.handlePageForward = this.handlePageForward.bind(this);
  }

  async componentDidMount() {
    const data = await firebase
      .firestore()
      .collection('images')
      .orderBy('timestamp', 'desc')
      .limit(16)
      .get();
    let arr: firebase.firestore.DocumentData[] = [];

    await data.forEach(async (doc) => {
      arr.push(doc.data());
    });

    this.setState({
      currentLoad: arr,
      loading: false,
      lastDoc: data.docs[data.docs.length - 1],
    });
  }

  async handlePageForward() {
    const data = await firebase
      .firestore()
      .collection('images')
      .orderBy('timestamp', 'desc')
      .startAfter(this.state.lastDoc)
      .limit(16)
      .get();
    let arr: firebase.firestore.DocumentData[] = [];

    await data.forEach(async (doc) => {
      arr.push(doc.data());
    });

    if (arr.length === 0) {
      this.setState({
        atEnd: true,
      });
    } else {
      this.setState({
        currentLoad: this.state.currentLoad.concat(arr),
        lastDoc: data.docs[data.docs.length - 1],
      });
    }
  }

  render() {
    let work: any[] = [];
    let colmned = [];

    this.state.currentLoad.forEach((doc) => {
      work.push(
        <Card
          imageURL={doc.url}
          imageAlt={doc.description}
          displayName={doc.displayName}
          uid={doc.uploader}
          description={doc.description}
          time={new Date(doc.timestamp.seconds * 1000).toLocaleString()}
        />
      );
      if (work.length === 4) {
        colmned.push(
          <div className="columns">
            {work.map((card) => {
              return card;
            })}
          </div>
        );
        work = [];
      }
    });

    if (work.length !== 0) {
      colmned.push(
        <div className="columns">
          {work.map((card) => {
            return card;
          })}
        </div>
      );
      work = [];
    }

    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Navbar />
        <div className="container mt-6 has-text-centered">
          {colmned}
          {this.state.atEnd ? (
            <button
              className="button is-primary my-6"
              onClick={this.handlePageForward}
              disabled
            >
              Nothing More!
            </button>
          ) : (
            <button
              className="button is-primary my-6"
              onClick={this.handlePageForward}
            >
              Load More
            </button>
          )}
        </div>
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

export default View;
