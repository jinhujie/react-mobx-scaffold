import React from "react";

export function Avatar({ src, prefix }) {
  return (
    <img
      src={src}
      className={`tw-avatar ${prefix ? prefix + "-avatar" : ""}`}
    />
  );
}
