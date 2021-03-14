import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import { BackgroundContainer, backgrounded } from "components";

import Images from "imageExporter/qq-race-match";

@inject("store")
@observer
class SignupForm extends React.Component {
  componentDidMount() {
    this.props.store.fetchSignupInfo();
  }
  onSubmit = () => {
    const { uid } = this.props.store.signupInfo;
    const isLogined = uid > 0;
    if (isLogined) {
      this.props.store.signup();
      //TODO
      //open modal while signup successed
    } else {
      window.showLogin();
    }
  };
  render() {
    const { setSignupInfo } = this.props.store;
    const {
      game_name,
      requiredListTitle,
      qq,
      mobile,
    } = this.props.store.signupInfo;
    return backgrounded(
      Images["signupFormBg.png"],
      <div className="signup-form">
        <div className="form-item">
          <label>游戏昵称</label>
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              value={game_name}
              onChange={(e) => setSignupInfo("game_name", e.target.value)}
              className="transpant-input"
              placeholder="所指定区服游戏昵称"
            ></input>
          </BackgroundContainer>
        </div>

        <div className="form-item">
          <label>所属厅</label>
          <SignupInfoTing />
        </div>

        <div className="form-item">
          <label>QQ号</label>
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              value={qq}
              onChange={(e) => setSignupInfo("qq", e.target.value)}
              className="transpant-input"
            ></input>
          </BackgroundContainer>
        </div>

        <div className="form-item">
          <label>手机号</label>
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              value={mobile}
              onChange={(e) => setSignupInfo("mobile", e.target.value)}
              className="transpant-input"
            ></input>
          </BackgroundContainer>
        </div>

        <div className="form-item join-qq-commonutiy">
          <label>添加群聊</label>
          <BackgroundContainer
            bgSrc={Images["joinQqCommuBtn.png"]}
            classExt="join-qq-btncon"
          >
            <div className="join-btn">点击加入报名群</div>
          </BackgroundContainer>
          <span className="pushbefore">用于赛前通知</span>
          {/* <div className='join-qq-commonutiy'/> */}
        </div>

        <div className="form-item">
          <label>要求区服</label>
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              className="transpant-input"
              value={requiredListTitle}
              disabled
            />
          </BackgroundContainer>
        </div>

        <div className="submit-container">
          <img
            onClick={this.onSubmit}
            src={Images["signupSubmit.png"]}
            className="submit"
          />
        </div>
      </div>
    );
  }
}

@inject("store")
@observer
class SignupInfoTing extends React.Component {
  state = { shown: false };
  componentDidUpdate = () => {
    if (this.state.shown) {
      window.addEventListener("click", this.closeOptions.bind(this));
    } else {
      window.removeEventListener("click", this.closeOptions.bind(this));
    }
  };
  closeOptions() {
    this.setState({ shown: false });
  }
  onOptionClick = (e, option) => {
    e.stopPropagation();
    this.setState({ shown: false });
    this.props.store.setSignupInfo("cid", option.id);
  };
  onSelectClick = (e) => {
    e.stopPropagation();
    this.setState({ shown: !this.state.shown });
  };
  findListByCid = (cid, options) => {
    return options.find((option) => option.id === cid) || {};
  };

  render() {
    const { list, cid } = this.props.store.signupInfo;
    const { shown } = this.state;
    const listDropdownOptions = [];
    if (!Array.isArray(list)) {
      const toJS_list = toJS(list);
      Object.values(toJS_list).map((obj) => {
        listDropdownOptions.push(obj);
      });
    }

    return (
      <React.Fragment>
        <span onClick={this.onSelectClick} className="pointer">
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              className="transpant-input"
              value={this.findListByCid(cid, listDropdownOptions).title}
              disabled
            ></input>
          </BackgroundContainer>
        </span>
        <div className="ting-options">
          {shown
            ? listDropdownOptions.map((option) => {
                return (
                  <div
                    onClick={(e) => this.onOptionClick(e, option)}
                    className="option"
                    key={option.id}
                  >
                    {option.title}
                  </div>
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default SignupForm;
