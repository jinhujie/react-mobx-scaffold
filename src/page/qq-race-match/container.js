import React from "react";

import { backgrounded } from "components";
import SignupInfo from "./sections/signup";

import "./container.less";
import Images from "imageExporter/qq-race-match";

const classNames = {
  displayHidden: "display-hidden",
};

class Root extends React.Component {
  render() {
    return backgrounded(
      Images["bg.jpg"],
      <div className="main-bg">
        <h1 className={classNames.displayHidden}>QQ飞车赛事</h1>
        <div className="main">
          <img
            src={Images["matchTimeline.png"]}
            className="timeline center-block"
          ></img>
          <SignupInfo />
          <img src={Images["matchRule.png"]} className="matchRuleExt" />
          <img src={Images["rewardFinal.png"]} className="matchRuleExt" />
          <img src={Images["rewardGroup.png"]} className="matchRuleExt" />
          <img src={Images["rewardChampion.png"]} className="extralSummary" />
          <img src={Images["extralTips.png"]} className="extralSummary" />
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
