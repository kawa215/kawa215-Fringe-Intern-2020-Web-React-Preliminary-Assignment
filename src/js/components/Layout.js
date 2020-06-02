import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Post from "./Post";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentName: "tanaka",
      currenPostName: "",
      nGood: [],
      flag: false,
      flagPoint: false
    };
  }
  changeUser(user) {
    this.setState({ currentName: user });
  }
  changePostUser(user) {
    this.setState({ currenPostName: user });
  }

  excludeFlagOn() {
    this.setState({ flag: true});
  }

  excludeFlagOff() {
    this.setState({ flag: false});
  }

  changePoint() {
   this.setState({ flagPoint: true});
  }
  render() {
    localStorage.setItem("user", JSON.stringify(this.state.currentName));

    return (
      <div>
        <Header
          className="Header"
          changeUser={this.changeUser.bind(this)}
          excludeFlag={this.excludeFlagOn.bind(this)}
          flagPoint={this.state.flagPoint}
        />
        <Post
          currentName={this.state.currentName}
          changePostUser={this.changePostUser.bind(this)}
          flag={this.state.flag}
          changeFlag={this.excludeFlagOff.bind(this)}
          changePoint={this.changePoint.bind(this)}
        />
        <br></br>
      </div>
    );
  }
}
