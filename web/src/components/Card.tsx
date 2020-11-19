import React, { Component } from 'react';

type Props = {
  imageURL: string;
  imageAlt: string;
  displayName: string;
  uid: string;
  description: string;
  time: string;
};

class Card extends Component<Props> {
  render() {
    return (
      <div className="card column is-one-quarter m-2">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={this.props.imageURL}
              alt={this.props.imageAlt}
              style={{ objectFit: 'cover' }}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">
                {this.props.displayName || '[Anonymous]'}
              </p>
              <p className="subtitle is-6">{this.props.uid}</p>
            </div>
          </div>

          <div className="content">
            {this.props.description}
            <br />
            <time>{this.props.time}</time>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
