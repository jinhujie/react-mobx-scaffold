import React from 'react';

export const BackgroundContainer = ({bgSrc, children}) => {
  return <span style={
    { backgroundImage: `url(${bgSrc})` }
  }>
    { children }
  </span>
}
