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
  componentDidMount() {
    this.props.store.fetchSignupInfo();
    this.child = React.createRef();
  }
  switchContent(isSignuped) {
    const { stage, cid } = this.props.store.stageInfo;
    const notSignupDuration = stage !== 1;
    const signupedListNotLoad = typeof isSignuped === 'undefined';
    const content = {
      yes: <SignupedList />,
      no: <SignupForm cid={cid} open = {this.open} />,
      unknow: null,
    };
    if (notSignupDuration) {
      return signupedListNotLoad ? content.unknow : content.yes;
    }

    if (signupedListNotLoad) {
      return content.unknow;
    }
    return isSignuped ? content.yes : content.no;
  }
  open = () => {
    this.child.current.open();
  }
  render() {
    const { is_signup, name } = this.props.store.signupInfo;
    const store = this.props.store;
    const { setSignupInfo, default_cid, cid, findListByCid } = this.props.store;

    return (
      <section>
        <h1 className={classNames.displayHidden}>比赛报名</h1>
        <ModalSuccessed ref={this.child} store={this.props.store} signupInfo={store.signupInfo} findListByCid={findListByCid} />

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
        {this.switchContent(is_signup)}
      </section>
    );
  }
}

export default SignupInfo;
