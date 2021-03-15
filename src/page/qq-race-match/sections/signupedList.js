import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import { backgrounded } from "components";
import Images from "imageExporter/qq-race-match";

@inject("store")
@observer
class SignupedList extends React.Component {
  componentDidMount = () => {
    this.props.store.fetchSignupedUser();
  }
  render() {
    // const signedList = new Array(20).fill({
    //   name: "564突然反对",
    //   ting: "QQ飞车一厅",
    // });
    const signedList = toJS(this.props.store.signupedUser || []);
    return backgrounded(
      Images["signupFormBg.png"],
      <div className="signed-list">
        {signedList.map((userInfo) => UserInfo(userInfo))}
      </div>
    );
  }
}
const UserInfo = ({ name, ting, avatar, uid, is_me }) => (
  <section className="user-info" key={uid}>
    { is_me ? <img src={Images["userSelf.png"]} className="self-icon"/> : null }
    <div className="avatar">
      <img src={avatar} />
    </div>
    <h1>{name}</h1>
    <h2>{ting}</h2>
  </section>
);

export default SignupedList;
