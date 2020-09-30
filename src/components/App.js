import React from "react";
import "../styles/App.css";

class App extends React.Component {
  state = {
    username: "brandononeal",
    userData: [],
    followerData: [],
  };

  componentDidMount() {
    this.fetchUser(this.state.username);
    this.fetchFollowers(this.state.username);
  }

  fetchUser = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userData: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchFollowers = (username) => {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          followerData: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>GitHub User Card</h1>
        <div className="user-container">
          <img
            src={this.state.userData.avatar_url}
            alt={this.state.userData.avatar_url}
          />
          <h2>{this.state.userData.name}</h2>
          <p>{this.state.userData.bio}</p>
          <p>{this.state.userData.location}</p>
          <a href={this.state.userData.html_url}>
            {this.state.userData.html_url}
          </a>
        </div>

        <h2>Followers</h2>
        {this.state.followerData.map((follower) => {
          return (
            <div key={follower.id} className="follower-container">
              <img src={follower.avatar_url} alt={follower.avatar_url} />
              <h3>{follower.login}</h3>
              <a href={follower.html_url}>{follower.html_url}</a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
