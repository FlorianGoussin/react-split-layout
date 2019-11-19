import './LayoutContainer.css'
import React, { useRef, useEffect, useState } from 'react';

// const Resizer = (props) => {
//   return <div className={`resizer ${props.direction}`}></div>
// }

const getId = () => (Date.now() * Math.random()).toString(36).replace('.', '')

export const LayoutItem = (props) => {
  return (
    <div className="item">{props.children}</div>
  )
}

const RESIZER_VALUE = 4 // pixels

export const LayoutContainer = (props) => {
  const ref = useRef(null)
  const isRow = props.direction === 'row'
  const propName = isRow ? 'width' : 'height'
  const [sizes, setSizes] = useState([])
  let containerSize = 0

  // remove respectively the resizers with or height from the layout container width or height
  const getResizersSize = () => (props.children.length - 1) * RESIZER_VALUE
  const getSize = () => ref.current ? ref.current.offsetWidth - getResizersSize() : 0

  const setItemSize = (size) => {}


  useEffect(() => {
    containerSize = getSize()
    const sizesInPx = props.children
      .map(layoutItem => layoutItem.props[propName])
      .map(userSize => (userSize || 0) * containerSize / 100)
    setSizes(sizesInPx)
  }, []);

  // TODO: move all of these to Resizer component
  const onMouseDownOnResizer = () => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
    containerSize = getSize()
  }

  const onMousemove = () => {

  }

  const onMouseup = () => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  const getResizer = () => {
    return (
      <div className={`resizer ${props.direction}`}
           onMouseDown={onMouseDownOnResizer}
           key={getId()}
      ></div>
    )
  }

  const getItems = () => {
    const layoutItemProps = {
      sendSizeToParent: setItemSize
    }
    const layoutItems = props.children.map((layoutItem, idx) => {
      layoutItemProps.key = getId()
      return React.cloneElement(layoutItem, layoutItemProps)
    })
    return layoutItems.slice(1).reduce((arr, child) =>
      [...arr, getResizer(), child], [layoutItems[0]]
    ) || []
  }

  return (
    <div ref={ref} className={`container ${props.direction}`}>
      { getItems() }
    </div>
  )
}
