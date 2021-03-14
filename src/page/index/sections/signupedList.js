import React from "react";
import { backgrounded } from "components";
import Images from "imageExporter/qq-race-match";

class SignupedList extends React.Component {
  render() {
    const signedList = new Array(20).fill({
      name: "564突然反对",
      ting: "QQ飞车一厅",
    });
    return backgrounded(
      Images["signupFormBg.png"],
      <div className="signed-list">
        {signedList.map((userInfo) => UserInfo(userInfo))}
      </div>
    );
  }
}
const UserInfo = ({ name, ting }) => (
  <section className="user-info">
    <div className="avatar">
      <img src={Images["matchInfo.png"]} />
    </div>
    <h1>{name}</h1>
    <h2>{ting}</h2>
  </section>
);

export default SignupedList;
