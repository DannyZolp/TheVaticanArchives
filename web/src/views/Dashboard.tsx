import React, { Component } from 'react';
import 'bulma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import firebase from '../helpers/firebase';
import cryptoRandomString from 'crypto-random-string';
import mime from 'mime-types';

interface stateTypes {
  fileInput: React.RefObject<HTMLInputElement>;
  imageIsUploaded: boolean;
  url: string;
  progress: number;
  description: string;
  displayName: string;
}

class Dashboard extends Component {
  state: stateTypes = {
    fileInput: React.createRef(),
    imageIsUploaded: false,
    url: '',
    progress: 0,
    description: '',
    displayName: '',
  };

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      imageIsUploaded: true,
    });
  }

  async handleLogout() {
    await firebase.auth().signOut()
  }

  async handleDisplayNameChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await firebase.auth().currentUser?.updateProfile({
      displayName: this.state.displayName,
    });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.fileInput.current !== null) {
      if (this.state.fileInput.current.files !== null) {
        const image = this.state.fileInput.current.files[0];
        const fileName =
          `${cryptoRandomString({ length: 25 })}.` + mime.extension(image.type);
        const uploadTask = firebase.storage().ref(fileName).put(image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.setState({
              progress: Math.round(
                (100 * snapshot.bytesTransferred) / snapshot.totalBytes
              ),
            });
          },
          (error) => {
            console.error(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              firebase
                .firestore()
                .collection('images')
                .doc()
                .set({
                  url: downloadURL,
                  timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                  uploader: firebase.auth().currentUser?.uid,
                  displayName: firebase.auth().currentUser?.displayName,
                  description: this.state.description,
                })
                .then(() => {
                  window.location.reload(false);
                });
            });
          }
        );
      }
    }
  }

  render() {
    return (
      <>
        <section className="hero is-primary is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-1">Upload Files</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="field" hidden={this.state.imageIsUploaded}>
                  <div className="file is-large is-centered is-boxed">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*,video/*"
                        name="file"
                        ref={this.state.fileInput}
                        onChange={this.handleImageUpload}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <FontAwesomeIcon icon={faUpload} />
                        </span>
                        <span className="file-label">Click to Upload</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="field" hidden={!this.state.imageIsUploaded}>
                  <img
                    src={
                      this.state.imageIsUploaded &&
                      this.state.fileInput.current &&
                      this.state.fileInput.current.files
                        ? URL.createObjectURL(
                            this.state.fileInput.current.files[0]
                          )
                        : ''
                    }
                    alt="uploaded"
                  />
                </div>
                <div
                  className="field"
                  hidden={
                    this.state.progress === 0 || this.state.progress === 100
                  }
                >
                  <progress
                    className="progress is-success"
                    value={this.state.progress}
                    max={100}
                  >
                    {this.state.progress}%
                  </progress>
                </div>
                <div className="field" hidden={!this.state.imageIsUploaded}>
                  <label className="label has-text-white">Description</label>
                  <div className="control is-half">
                    <input
                      className="input is-primary"
                      type="input"
                      required
                      name="description"
                      placeholder="This person is a bit of a dumbass"
                      style={{ width: '75%' }}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div
                  className="field mt-5"
                  hidden={!this.state.imageIsUploaded}
                >
                  <div className="control">
                    <button className="button is-primary is-inverted is-large">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section className="container mt-6">
          <h1 className="title">User Options</h1>
          <div className="columns">
            <div className="column">
              <form onSubmit={this.handleDisplayNameChange}>
                <h3 className="subtitle">Change Display Name</h3>
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      name="displayName"
                      type="text"
                      placeholder="xX_EpicGamer_Xx"
                      onChange={this.handleChange}
                    />
                  </p>
                  <p className="control">
                    <button className="button is-primary">Change!</button>
                  </p>
                </div>
              </form>
            </div>
            <div className="column has-text-centered">
              <button className="button is-primary is-large" onClick={this.handleLogout}>Logout</button>
            </div>
          </div>
        </section>
        <footer className="footer mt-6">
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

export default Dashboard;
