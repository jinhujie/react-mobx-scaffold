import React from "react";
import { observer, inject } from "mobx-react";
import { Modal } from "components";
import Images from "imageExporter/qq-race-match";

export class ModalSuccessed extends Modal {
  constructor() {
    super();
  }
  onSubmit = () => {
    const { uid } = this.props.store.signupInfo;
    const isLogined = uid > 0;
    if (__DEV) {
      return this.props.store.signup().then(() => {
        this.close();
        if (this.props.store.signupInfo.is_signup) {
          // this.open();
        }
      })

    }
    if (isLogined) {
      this.props.store.signup().then(() => {
        this.close();
        if (this.props.store.signupInfo.is_signup) {
          // this.open();
        }
      })
    } else {
      window.showLogin();
    }
  };
  render = () => {
    const { name, cid } = this.props.signupInfo;
    const { findListByCid } = this.props;
    const body = () => (
      <ul className="modal-signup-successed">
        <li>
          <label>平台昵称:</label>
          <span>{ name }</span>
        </li>
        <li>
          <label>所属厅:</label>
          <span>{ findListByCid(cid).title || null }</span>
        </li>
        <li className="last">比赛时间：3月19日-21日</li>
        <li className="submit">
          <img
            src={Images["signupSubmit.png"]}
            onClick={this.onSubmit.bind(this)}
          />
        </li>
        <li className="modal-signup-footer">一经确认不得修改报名信息</li>
      </ul>
    );
    const header = () => (
      <div className="modal-sigup-header">
        <img src={Images["modalTitle.png"]} />
      </div>
    );
    const { shownSignupedModal, closeSignupModal } = this.props;
    // if (shownSignupedModal) {
    //   closeSignupModal();
    //   this.setState({isShown: true})
    // }
    return this.renderModal({
      ModalHeader: header,
      ModalBody: body,
    });
  };
}
