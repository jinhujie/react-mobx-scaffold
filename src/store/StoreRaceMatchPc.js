import { options } from "less";
import { observable, action, computed, toJS } from "mobx";
// import { toJS } from "node_modules/mobx/lib/mobx";
import * as fetches from "./fetch";

class StoreQrmPc {
  @observable signupInfo = {
    //平台昵称
    uid: 0,
    name: "",
    game_name: "",
    //厅
    list: [],
    //type: number
    qq: undefined,
    //type: number
    mobile: undefined,
    //type: number
    //默认厅id
    default_cid: undefined,
    //厅id
    cid: undefined,
    requiredListTitle: "QQ全服",
    isSignuped: undefined,
    is_signup: 0,
    //the way that user from: number(sourceId)
    source: undefined,
    source_list: {},
  };
  @observable stageInfo = {
    //赛事阶段
    stage: 0,
    stage_info: [],
  };

  @action fetchStageInfo = () => {
    return fetches.fetchStageInfo().then((res) => {
      if (__DEV) {
        res.data.data.stage = 4;
      }
      this.stageInfo = res.data.data;
    });
  };

  @action signup = () => {
    const { game_name, mobile, qq, cid, source } = this.signupInfo;
    const data = {
      nickname: game_name,
      mobile,
      qq,
      cid,
      source,
    };
    return fetches.signup(data).then((res) => {
      if (__DEV) {
        res.data.error = 0;
      }
      const { error, error_msg } = res.data;
      if (error) {
        window.showTips(error_msg);
      } else {
        this.signupInfo.is_signup = 1;
      }
    });
  };
  @action setSignupInfo = (fieldName, fieldValue) => {
    if (this.signupInfo[fieldName] !== fieldValue) {
      this.signupInfo[fieldName] = fieldValue;
    }
  };
  @action fetchSignupInfo = () => {
    return fetches.fetchSignupInfo().then((res) => {
      if (res.status === 200) {
        if (__DEV) {
          res.data.data.is_signup = 0;
          res.data.data.uid = 1;
        }
        const userInfo = res.data.data;
        const { is_signup, default_cid } = userInfo;
        this.signupInfo.isSignuped = is_signup;
        Object.keys(userInfo).forEach((propName) => {
          this.signupInfo[propName] = userInfo[propName];
        });
        if (!is_signup) {
          this.signupInfo.cid = default_cid;
        }
      }
    });
  };
  @action setDefaultCid = () => {
    const default_cid = this.signupInfo.default_cid;
    if (default_cid && typeof cid === "undefined") {
      this.signupInfo.cid = default_cid;
    }
  };
  @action findListByCid = (cid) => {
    const list = toJS(this.signupInfo.list);
    return list[cid] || {};
  };

  @observable signupedUser = [];
  @action fetchSignupedUser = () => {
    return fetches.fetchSignedUsers().then((res) => {
      this.signupedUser = res.data.data;
    });
  };

  @observable matchAmbient = {
    group_team: [],
  };
  @action fetchMatchAmbientStatus = () => {
    return fetches.fetchMatchAmbientStatus().then((res) => {
      this.matchAmbient = res.data.data;
    });
  };
}

const storeQrmPc = new StoreQrmPc();

export default storeQrmPc;
