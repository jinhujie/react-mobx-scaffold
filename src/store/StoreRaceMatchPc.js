import { options } from 'less';
import { observable, action, computed } from 'mobx';
import * as fetches from './fetch';

class StoreQrmPc{
  @observable signupInfo = {
    //平台昵称
    uid: 0,
    name: "",
    game_name: "",
    //所属厅
    list: [],
    //type: number
    qq: undefined,
    //type: number
    mobile: undefined,
    //type: number
    cid: undefined,
    requiredListTitle: 'QQ全服',
  }

  @action signup = () => {
    const { game_name, mobile, qq, cid } = this.signupInfo;
    const data = {
      nickName: game_name,
      mobile,
      qq,
      cid,
    }
    fetches.signup(data);
  }
  @action setSignupInfo = (fieldName, fieldValue) => {
    if (this.signupInfo[fieldName] !== fieldValue) {
      this.signupInfo[fieldName] = fieldValue;
    }
  }
  @action fetchSignupInfo = () => {
    return fetches.fetchSignupInfo().then(
      (res) => {
        if (res.status === 200) {
          this.signupInfo = res.data.data;
        }
      }
    )
  }
  @action findListByCid = (cid) => {
    this.signupInfo.list.find(option => options.cid === cid);
  }
}
  
  const storeQrmPc = new StoreQrmPc();
  
  export default storeQrmPc;