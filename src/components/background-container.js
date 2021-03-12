import React from 'react';

export const BackgroundContainer = ({bgSrc, children, classExt}) => {
  console
  
  return <div style={
    { backgroundImage: `url(${bgSrc})` }
  } className={`bgc ${classExt || ''}`}>
    { children }
  </div>
}
