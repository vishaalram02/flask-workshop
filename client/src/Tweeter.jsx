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

  componentDidMount(){
    fetch('/api/messages').then(res => {
      return res.json();
    }).then(data => {
      var newTweets = [];

      for(var i=0;i<Object.keys(data).length;i++){
        newTweets.push(data[i]);
      }

      this.setState((prevState) => ({
        tweets: newTweets
      }))
    });
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  };

  handleTweetChange = (event) => {
    this.setState({ tweet: event.target.value });
  };

  handleSubmit = () => {
    fetch('/api/add', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({author: this.state.author, tweet: this.state.tweet})
    })

    this.setState((prevState) => ({
      tweets: [
        ...prevState.tweets,
        {
          author: prevState.author,
          tweet: prevState.tweet
        }
      ],
      tweet: ""
    }));
  };

  handleDelete = (idx) => {
    fetch('/api/delete/' + idx, {
      method: 'DELETE',
    })
    this.setState((prevState) => ({
      tweets: prevState.tweets.filter((twt, i) => i != idx)
    }));
  }

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
            ? tweets.map((tweet, idx) => (
                <div className="tweet" key={"tweet" + idx}>
                  <div className="tweet-top">
                    <h4>{tweet.author}</h4>
                    <button className="delete-button" key={"button" + idx} onClick = {() => this.handleDelete(idx)}>🗑️</button>
                  </div>
                  <p>{tweet.tweet}</p>
                </div>
              ))
            : "Be the first to tweet..."}
        </div>
      </div>
    );
  }
}
