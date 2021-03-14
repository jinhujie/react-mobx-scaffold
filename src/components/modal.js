import React from "react";
import { backgrounded } from "./";
import Images from "imageExporter/qq-race-match";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      isShown: false,
    };
  }
  close() {
    this.setState({ isShown: false });
  }
  open() {
    this.setState({ isShown: true });
  }
  renderModal(props) {
    const { isShown } = this.state;
    const { ModalBody, ModalHeader } = props;
    if (!isShown) {
      return null;
    }
    return (
      <div className="tw-modal">
        {backgrounded(
          Images["modalBg.png"],
          <div className="tw-modal-content">
            <img
              onClick={this.close.bind(this)}
              src={Images["close.png"]}
              className="close"
            />
            <ModalHeader />
            <div className="tw-modal-body">
              <ModalBody />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export { Modal };
