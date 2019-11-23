import './LayoutRoot.css'
import React from 'react';

export const LayoutRoot = props => {
  return (
    <div className={`layout-root`}>
      {props.children}
    </div>
  )
}