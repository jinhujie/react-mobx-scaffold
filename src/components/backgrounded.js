import React from "react";
import classnames from "classnames";

export function backgrounded(src, reactDetailedNode) {
  const props = reactDetailedNode.props;
  return React.cloneElement(reactDetailedNode, {
    className: classnames("backgrounded", props.className || ""),
    style: {
      backgroundImage: `url("${src}")`,
      ...(props.style || {}),
    },
  });
}
