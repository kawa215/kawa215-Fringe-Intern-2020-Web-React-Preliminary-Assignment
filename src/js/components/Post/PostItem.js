import React from "react";

class HoverPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var name = this.props.getList("datalist");
    var users = this.props.commentlist.userinfo.map((user, i) => {
      return (
        <div key={i}>
          {name[i].name}: {user}
        </div>
      );
    });
    return <div className="hover">{users}</div>;
  }
}

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonOff: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getList = this.getList.bind(this);
    this.saveList = this.saveList.bind(this);
  }

  returnDis() {
    return true;
  }

  handleClick(i) {
    // 回数 + 1
    this.props.handleGoodClick(i);

    var comments = JSON.parse(localStorage.getItem("CommentList"));

    //現在のユーザーで15以上は無効化
    var userlist = JSON.parse(localStorage.getItem("datalist"));
    var ind = this.props.getIndex(this.props.currentName, userlist, "name");
    var opponentInd = this.props.getIndex(
      this.props.currentPostName,
      userlist,
      "name"
    );

    //拍手のポイント計算
    //0 になったら0のままもうクリックできない
    if (userlist[ind].givepoint == 2) {
      userlist[ind].givepoint = 0;
      for (var r = 0; r < comments.length; r++) {
        comments[r].isButtonOff[ind] = true;
        localStorage.setItem("CommentList", JSON.stringify(comments));
      }
    } else {
      userlist[ind].givepoint = userlist[ind].givepoint - 2;
    }

    var givePerson = this.props.getIndex(
      comments[i].opponent,
      userlist,
      "name"
    );
    var didPerson = this.props.getIndex(comments[i].name, userlist, "name");
    userlist[didPerson].receivepoint = userlist[didPerson].receivepoint + 1;
    userlist[givePerson].receivepoint = userlist[givePerson].receivepoint + 1;

    localStorage.setItem("datalist", JSON.stringify(userlist));
    this.props.changePoint();

    for (var i = 0; i < comments.length; i++) {
      for (var j = 0; j < comments[i].userinfo.length; j++) {
        if (comments[i].userinfo[j] > 14 && ind == j) {
          comments[i].isButtonOff[ind] = true;
          localStorage.setItem("CommentList", JSON.stringify(comments));
        }
      }
    }
  }

  // カーソルが乗った時に状態を変更するイベントハンドラ
  onMouseEnter(i) {
    var comments = this.getList("CommentList");
    comments[i].isButtonHover = true;
    this.saveList("CommentList", comments);
    this.forceUpdate();
  }

  // カーソルが外れた時に状態を変更するイベントハンドラ
  onMouseLeave(i) {
    var comments = this.getList("CommentList");
    comments[i].isButtonHover = false;
    this.saveList("CommentList", comments);
    this.forceUpdate();
  }

  getList(listName) {
    var lists = JSON.parse(localStorage.getItem(listName));
    return lists;
  }

  saveList(listName, data) {
    localStorage.setItem(listName, JSON.stringify(data));
  }

  render() {
    var datalist = JSON.parse(localStorage.getItem("CommentList"));
    var userlist = JSON.parse(localStorage.getItem("datalist"));
    var ind = this.props.getIndex(this.props.currentName, userlist, "name");

    if (datalist !== null) {
      var recipes = datalist.map((recipe, i) => {
        return (
          <div key={i}>
            <div className="item">
              <img src={"../../../image/" + recipe.name + ".png"} />
              <img src={"../../../image/arrow.png"} />
              <img src={"../../../image/" + recipe.opponent + ".png"} />
              <br />
              {datalist[i].comment}
              <div>{datalist[i].time}</div>
              <button
                className="goodbutton"
                onClick={this.handleClick.bind(this, i)}
                disabled={datalist[i].isButtonOff[ind]}
              >
                拍手をする
              </button>
              <a
                onMouseEnter={this.onMouseEnter.bind(this, i, datalist)}
                onMouseLeave={this.onMouseLeave.bind(this, i, datalist)}
                className="goodnum"
              >
                拍手数{datalist[i].point}
              </a>
              {datalist[i].isButtonHover && (
                <HoverPart
                  hover={datalist[i].isButtonHover}
                  getList={this.getList}
                  commentlist={datalist[i]}
                />
              )}
            </div>
          </div>
        );
      });
    }
    return <div className="comment">{recipes}</div>;
  }
}
