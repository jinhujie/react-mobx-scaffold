import React from "react";
import { observer, inject } from "mobx-react";

import { backgrounded } from "components";
import SignupInfo from "./sections/signup";
import MatchAmbientStatus from "./sections/MatchAmbientStatus";
import MatchTimeLine from "./sections/matchTimeLine";

import "./container.less";
import Images from "imageExporter/qq-race-match";

const classNames = {
  displayHidden: "display-hidden",
};

@inject("store")
@observer
class Root extends React.Component {
  filterByStage = (stage, reactDetailNode) => {
    if (!stage) return null;
  };
  render() {
    const { stage } = this.props.store.stageInfo;
    const isStage1 = stage && stage === 1;
    return backgrounded(
      Images["bg1.jpg"],
      <div className="main-bg">
        <h1 className={classNames.displayHidden}>QQ飞车赛事</h1>
        <div className="main">
          <MatchTimeLine />
          {/* <img
            src={Images["matchTimeline.png"]}
            className="timeline center-block"
          ></img> */}
          {isStage1 && <SignupInfo />}
          <MatchAmbientStatus />
          {isStage1 && (
            <img src={Images["matchRule.png"]} className="matchRuleExt" />
          )}
          {stage && stage === 2 && (
            <img src={Images["rewardGroup.png"]} className="matchRuleExt" />
          )}
          <img src={Images["rewardFinal.png"]} className="matchRuleExt" />
          {isStage1 && (
            <img src={Images["rewardGroup.png"]} className="matchRuleExt" />
          )}
          <img src={Images["rewardChampion.png"]} className="extralSummary" />
          {isStage1 && (
            <img src={Images["extralTips.png"]} className="extralSummary" />
          )}
          <div className="raw">
            <span>
              在法律许可范围内，公司有随时调整活动的权利并享有活动的最终解释权，请详细了解规则后再参与
            </span>
            <div className="split" />
            <span>如有疑问请联系在线客服或客服QQ：800184580进行咨询。</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Root;
