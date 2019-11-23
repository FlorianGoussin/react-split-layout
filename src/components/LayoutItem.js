import './LayoutItem.css'
import React, { useRef, useEffect } from 'react';

export const LayoutItem = props => {
  const itemRef = useRef(null)
  const style = { [props.propName]: props.size }
  useEffect(() => {
    const size = itemRef.current ? itemRef.current.getBoundingClientRect()[props.axis] : 0
    props.addLayoutItemSize(size)
  })
  return (
    <div ref={itemRef} style={style} className="item">{props.children}</div>
  )
}