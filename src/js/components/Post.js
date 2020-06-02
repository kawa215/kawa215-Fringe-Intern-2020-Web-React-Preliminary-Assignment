import React from "react";
import PostMenu from "./Post/PostMenu";
import PostItem from "./Post/PostItem";

export default class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      currentName: "ito",
      isButtonOff: false,
      desc: "This is for a text area.",
      flag: false,
      flagPost: false,
      datalist: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.changePoint = this.changePoint.bind(this);
    this.handleGoodClick = this.handleGoodClick.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeUser(name) {
    this.setState({ currentName: name });
  }

  handleClick() {
    this.setState((state) => ({
      isButtonOn: !state.isToggleOn,
    }));
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //値が存在しなかったとき
  }

  handleGoodClick(i) {
    if (this.state.datalist == null) {
      var datalist = JSON.parse(localStorage.getItem("CommentList"));
      datalist[i].point++;

      var name = this.props.currentName;
      var userlist = JSON.parse(localStorage.getItem("datalist"));
      var ind = this.getIndex(name, userlist, "name");

      if (datalist[i].userinfo[ind] == 0) {
        datalist[i].userinfo[ind] = 1;
      } else {
        datalist[i].userinfo[ind]++;
      }

      this.setState({ datalist: datalist });
      localStorage.setItem("CommentList", JSON.stringify(datalist));
    } else {
      this.state.datalist[i].point++;

      var name = this.props.currentName;
      var userlist = JSON.parse(localStorage.getItem("datalist"));
      var ind = this.getIndex(name, userlist, "name");

      if (this.state.datalist[i].userinfo[ind] == 0) {
        this.state.datalist[i].userinfo[ind] = 1;
      } else {
        this.state.datalist[i].userinfo[ind]++;
      }

      this.setState({ datalist: this.state.datalist });
      localStorage.setItem("CommentList", JSON.stringify(this.state.datalist));
    }
  }

  changePoint() {
    this.props.changePoint();
  }

  onTextAreaChange(e) {
    this.setState({ desc: e.target.value, count: 0 });

    var length = e.target.value.replace(/\s+/g, "").length;
    if (length > 5) {
      this.setState({ isButtonOff: false });
    } else {
      this.setState({ isButtonOff: true });
    }
  }

  onSubmit(e) {
    this.props.changePostUser(this.state.currentName);
    this.setState({
      text: this.state.desc,
      flagPost: true,
    });

    var DD = new Date();
    var Year = DD.getFullYear();
    var Month = DD.getMonth() + 1;
    var Day = DD.getDate();
    var Hour = DD.getHours();
    var minutes = DD.getMinutes();
    var data = {
      name: this.props.currentName,
      opponent: this.state.currentName,
      comment: this.state.desc,
      point: 0,
      time: Year + "/" + Month + "/" + Day + "/" + Hour + ":" + minutes,
      userinfo: [0, 0, 0, 0],
      isButtonOff: [false, false, false, false],
    };

    var userlist = JSON.parse(localStorage.getItem("datalist"));
    var ind = this.getIndex(this.props.currentName, userlist, "name");
    var indopponent = this.getIndex(this.state.currentName, userlist, "name");
    data.isButtonOff[ind] = true;
    data.isButtonOff[indopponent] = true;

    var commentList = [];
    commentList = JSON.parse(localStorage.getItem("CommentList"));

    if (commentList != undefined) {
      commentList.unshift(data);

      localStorage.setItem("CommentList", JSON.stringify(commentList));
    } else {
      var postList = [];
      postList.unshift(data);
      localStorage.setItem("CommentList", JSON.stringify(postList));
    }

    var datalist = JSON.parse(localStorage.getItem("CommentList"));
    this.setState({ datalist: datalist });
    e.preventDefault();
  }

  changeFlagPost() {
    this.setState({
      flagPost: false,
    });
  }

  render() {
    var datalist = JSON.parse(localStorage.getItem("datalist"));
    var user = JSON.parse(localStorage.getItem("user"));
    datalist = datalist.filter(function (item) {
      return item.name !== user;
    });

    if (this.props.flag == true) {
      this.state.currentName = datalist[0]["name"];
      this.props.changeFlag();
    }

    return (
      <div>
        <div className="Post">
          <img src={"../../../image/" + this.state.currentName + ".png"} />

          <PostMenu
            datalist={datalist}
            currentName={this.props.currentName}
            changeName={this.changeUser.bind(this)}
          />
          <form onSubmit={this.onSubmit}>
            <textarea
              value={this.state.desc}
              onKeyUp={this.handleCountChange}
              onChange={this.onTextAreaChange}
            />
            <div>
              <button disabled={this.state.isButtonOff} type="submit">
                投稿
              </button>
            </div>
          </form>
        </div>
        <div>
          <PostItem
            datalist={this.state.datalist}
            handleGoodClick={this.handleGoodClick}
            changePoint={this.changePoint}
            currentName={this.props.currentName}
            currentPostName={this.state.currentName}
            getIndex={this.getIndex}
          />
        </div>
      </div>
    );
  }
}
