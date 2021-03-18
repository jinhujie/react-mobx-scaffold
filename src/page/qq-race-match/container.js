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
  switchContentByStage = (stage) => {
    const rewardGroup = (
      <img src={Images["rewardGroup.png"]} className="matchRuleExt" />
    );
    const rewardFinal = (
      <img src={Images["rewardFinal.png"]} className="matchRuleExt" />
    );
    const rewardChampion = (
      <img src={Images["rewardChampion.png"]} className="extralSummary" />
    );

    const matchRule = (
      <img src={Images["matchRule.png"]} className="matchRuleExt" />
    );
    const extralTips = (
      <img src={Images["extralTips.png"]} className="extralSummary" />
    );

    switch (stage) {
      case 0:
        return null;
      case 1:
      case 2:
        return [
          <SignupInfo />,
          matchRule,
          rewardFinal,
          rewardGroup,
          rewardChampion,
          extralTips,
        ];
      case 3:
        return [
          <MatchAmbientStatus />,
          rewardGroup,
          rewardFinal,
          rewardChampion,
        ];
      case 4:
        return [rewardFinal, rewardChampion];
    }
  };
  render() {
    const { stage } = this.props.store.stageInfo;
    return backgrounded(
      Images["bg1.jpg"],
      <div className="main-bg">
        <h1 className={classNames.displayHidden}>QQ飞车赛事</h1>
        <div className="main">
          <MatchTimeLine />
          {this.switchContentByStage(stage)}
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
