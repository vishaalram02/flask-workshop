import React from "react";

import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      author: "",
      tweet: ""
    };
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  };

  handleTweetChange = (event) => {
    this.setState({ tweet: event.target.value });
  };

  handleSubmit = () => {
    this.setState((prevState) => ({
      tweets: [
        ...prevState.tweets,
        {
          author: prevState.author,
          text: prevState.tweet
        }
      ],
      tweet: ""
    }));
  };

  render() {
    const author = this.state.author;
    const tweet = this.state.tweet;
    const tweets = this.state.tweets;

    const canSubmit =
      author.length > 0 && tweet.length > 0 && tweet.length <= 280;

    return (
      <div className="app">
        <div className="tweet-box">
          <input
            value={author}
            onChange={this.handleAuthorChange}
            className="tweet-box-author"
            placeholder="Author"
          />
          <textarea
            value={tweet}
            onChange={this.handleTweetChange}
            className="tweet-box-input"
            placeholder="Tweet 🐦"
          ></textarea>
          <div className="tweet-box-actions">
            <span className="tweet-box-length">{tweet.length} / 280</span>
            <button
              onClick={this.handleSubmit}
              disabled={!canSubmit}
              className="tweet-box-submit"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="tweets">
          {tweets.length > 0
            ? tweets.map((tweet) => (
                <div className="tweet">
                  <h4>{tweet.author}</h4>
                  <p>{tweet.text}</p>
                </div>
              ))
            : "Be the first to tweet..."}
        </div>
      </div>
    );
  }
}
