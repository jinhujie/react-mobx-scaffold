import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import { BackgroundContainer, backgrounded } from "components";

import Images from "imageExporter/qq-race-match";

@inject("store")
@observer
class SignupForm extends React.Component {
  constructor() {
    super();
  }
  onSubmit = () => {
    const { uid } = this.props.store.signupInfo;
    const isLogined = uid > 0;
    if (__DEV) {
      return this.props.store.signup().then(() => {
        if (this.props.store.signupInfo.is_signup) {
          this.props.open();
        }
      });
    }
    if (isLogined) {
      this.props.store.signup().then(() => {
        if (this.props.store.signupInfo.is_signup) {
          this.props.open();
        }
      });
    } else {
      window.showLogin();
    }
  };
  findTingUrl = () => {
    const { default_cid, cid } = this.props.store.signupInfo;
    return this.props.store.findListByCid(cid || default_cid);
  };
  render() {
    const { setSignupInfo, default_cid, cid, findListByCid } = this.props.store;
    const {
      game_name,
      requiredListTitle,
      qq,
      mobile,
    } = this.props.store.signupInfo;
    return backgrounded(
      Images["signupFormBg.png"],
      <div className="signup-form">
        <img src={Images["girl.png"]} className="girl" />
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
            <div className="diplay-hidden">{cid}</div>
            <a
              className="join-btn"
              href={this.findTingUrl().qq_group_url}
              target={"black"}
            >
              点击加入报名群
            </a>
          </BackgroundContainer>
          <span className="pushbefore">用于赛前通知</span>
          {/* <div className='join-qq-commonutiy'/> */}
        </div>

        {/* <div className="form-item">
          <label>要求区服</label>
          <BackgroundContainer bgSrc={Images["signupFormInput.png"]}>
            <input
              className="transpant-input"
              value={requiredListTitle}
              disabled
            />
          </BackgroundContainer>
        </div> */}

        <div className="form-item">
          <label>报名来源</label>
          <SignupInfoSource />
        </div>

        <div className="submit-container">
          <img
            onClick={this.props.open.bind(this)}
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
  // componentDidUpdate = () => {
  //   this.props.store.setDefaultCid();
  // }

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
        <div style={{ display: "none" }}>{cid}</div>
        <span onClick={this.onSelectClick}>
          <div
            style={{ backgroundImage: `url(${Images["select.png"]})` }}
            className="bgc"
          >
            <input
              className="transpant-input pointer"
              value={this.findListByCid(cid, listDropdownOptions).title}
              disabled
            ></input>
          </div>
        </span>
        <div className={`ting-options ${shown ? "" : "hide-option-border"}`}>
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

@inject("store")
@observer
class SignupInfoSource extends React.Component {
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
  onOptionClick = (e, id) => {
    e.stopPropagation();
    this.setState({ shown: false });
    this.props.store.setSignupInfo("source", id);
  };
  onSelectClick = (e) => {
    e.stopPropagation();
    this.setState({ shown: !this.state.shown });
  };
  findListByCid = (cid, options) => {
    return options.find((option) => option.id === cid) || {};
  };

  render() {
    const { source_list, source } = this.props.store.signupInfo;
    const { shown } = this.state;
    const listDropdownOptions = [];
    const list = toJS(source_list);

    return (
      <React.Fragment>
        <span onClick={this.onSelectClick}>
          <BackgroundContainer bgSrc={Images["select.png"]}>
            <input
              className="transpant-input pointer"
              placeholder="请选择"
              value={list[source]}
              disabled
            ></input>
          </BackgroundContainer>
        </span>
        <div className={`ting-options ${shown ? "" : "hide-option-border"}`}>
          {shown
            ? Object.keys(list).map((id) => {
                return (
                  <div
                    onClick={(e) => this.onOptionClick(e, id)}
                    className="option"
                    key={id}
                  >
                    {list[id]}
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
