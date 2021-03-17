import React, { Component } from "react";
import { Avatar } from "components";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import classnames from "classnames";
import "./MatchAmbientStatus.less";
import Images from "imageExporter/qq-race-match";
import { prefix, indexToCn } from "util";

const _prefix = prefix.bind(null, "mas");

@inject("store")
@observer
class MatchAmbientStatus extends Component {
  componentDidMount() {
    this.props.store.fetchMatchAmbientStatus();
  }

  render() {
    let i = 0;
    while (i < 100) {
      console.log(indexToCn(i));
      i++;
    }
    const { group_team } = this.props.store.matchAmbient;
    const teams = toJS(group_team);
    return (
      <div>
        <img src={Images["matchAmbientRule.png"]} style={{ marginTop: 50 }} />
        <img
          src={Images["matchAmbientTitle.png"]}
          className={_prefix("title")}
        />
        <div className={_prefix("teams-con")}>
          {teams.map((teamInfo, i) => {
            const { up_user, list } = teamInfo;
            return (
              <TeamStatus
                key={i}
                index={++i}
                upperInfo={up_user}
                players={list}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MatchAmbientStatus;

function TeamStatus({ index, upperInfo, players }) {
  return (
    <div
      className={_prefix("team-con")}
      style={{ backgroundImage: `url("${Images["matchAmbientGroupBg.png"]}")` }}
    >
      <div className={_prefix("index")}>第{indexToCn(index)}组</div>
      <Card {...upperInfo} className="upper">
        <img src={Images["winnerIcon.png"]} className="upper-icon" />
      </Card>
      <img
        src={Images["matchAmbientCardLi.png"]}
        className={_prefix("win-uli")}
      />
      {players.map((player) => (
        <Card {...player} key={player.uid} />
      ))}
    </div>
  );
}
const Card = ({ name, game_name, score, avatar, className, children }) => {
  return (
    <div className={_prefix(classnames("player", className))}>
      <Avatar src={avatar} prefix="mas" />
      <div className={_prefix("psta")} title={name}>
        {name}
      </div>
      <img
        src={Images["matchAmbientCardBr.png"]}
        className={_prefix("cardbr")}
      />
      <div className={_prefix("psta")} title={game_name}>
        {game_name}
      </div>
      <div className={_prefix("psta score")}>
        总积分: <span className="score">{score}</span>分
      </div>
      {children}
    </div>
  );
};
