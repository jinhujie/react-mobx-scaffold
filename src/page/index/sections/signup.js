import React from "react";
import { observer, inject } from "mobx-react";
import { ModalSuccessed } from "./signupModal";

import SignupForm from "./signupForm";
import SignupedList from "./signupedList";
import Images from "imageExporter/qq-race-match";
import "./signup.less";

const classNames = {
  displayHidden: "display-hidden",
};

@inject("store")
@observer
class SignupInfo extends React.Component {
  switchContent(isSignuped) {
    const content = {
      yes: <SignupedList />,
      no: <SignupForm />,
      unknow: null,
    };
    if (isSignuped === undefined) {
      return content["unknow"];
    }
    return isSignuped ? content["yes"] : content["no"];
  }
  render() {
    const { isSignuped, name } = this.props.store.signupInfo;

    return (
      <section>
        <h1 className={classNames.displayHidden}>比赛报名</h1>
        <ModalSuccessed />

        <img
          src={Images["sectionSignup.png"]}
          style={{ marginTop: 42 }}
          className="center-block"
        ></img>
        <section className="login">
          {name ? (
            <React.Fragment>
              <span className="platformNameLabel">平台昵称:</span>
              <span className="platformNameValue">{name}</span>
            </React.Fragment>
          ) : null}
        </section>
        {this.switchContent(isSignuped)}
      </section>
    );
  }
}

export default SignupInfo;
