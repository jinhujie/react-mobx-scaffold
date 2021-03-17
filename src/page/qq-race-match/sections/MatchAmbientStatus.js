import React, { Component } from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import classnames from "classnames";
import "./MatchAmbientStatus.less";
import Images from "imageExporter/qq-race-match";
import { prefix } from "util";

const _prefix = prefix.bind(null, "mas");

@inject("store")
@observer
class MatchAmbientStatus extends Component {
  componentDidMount() {
    this.props.store.fetchMatchAmbientStatus();
  }

  render() {
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
                index={i}
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
      <div className={_prefix("index")}>{index}</div>
      <Card {...upperInfo} className="upper" />
      {players.map((player) => (
        <Card {...player} key={player.uid} />
      ))}
    </div>
  );
}
const Card = ({ name, game_name, score, avatarUrl, className }) => {
  return (
    <div className={_prefix(classnames("player", className))}>
      {/* <Avatar /> */}
      <div className={_prefix("psta")} title={name}>
        {name}
      </div>
      <div className={_prefix("psta")} title={game_name}>
        {game_name}
      </div>
      <div className={_prefix("psta score")}>
        总积分: <span className="score">{score}</span>分
      </div>
    </div>
  );
};
