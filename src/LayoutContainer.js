import './LayoutContainer.css'
import React, { useRef, useEffect, useState } from 'react';

// const Resizer = (props) => {
//   return <div className={`resizer ${props.direction}`}></div>
// }

const getId = () => (Date.now() * Math.random()).toString(36).replace('.', '')

export const LayoutItem = (props) => {
  const ref = useRef(null)
  const getSize = () => ref.current ? ref.current.offsetWidth : 0
  const style = { [props.propName]: props.size }
  props.getLayoutItemSize(getSize)
  return (
    <div ref={ref} style={style} className="item">{props.children}</div>
  )
}

export const LayoutContainer = (props) => {
  const RESIZER_VALUE = 4 // pixels
  const ref = useRef(null)
  const isRow = props.direction === 'row'
  const propName = isRow ? 'width' : 'height'
  const queryLayoutItemSize = [] // contains all the getSize functions from child
  const [sizes, setSizes] = useState([])

  // remove respectively the resizers with or height from the layout container width or height
  const getResizersSize = layoutItems => (layoutItems.length - 1) * RESIZER_VALUE
  const getContainerSize = resiserSize => ref.current ? (ref.current.offsetWidth - resiserSize) : 0

  useEffect(() => {
    const containerSize = getContainerSize(getResizersSize(props.children))
    const sizesPercent =
      props.children.map(layoutItem => parseFloat(layoutItem.props[propName] || 0))

    const invalid = sizesPercent.some(size => size > (100 - sizesPercent.length)) ||
                    sizesPercent.reduce((a, b) => a + b) > 100
    if (invalid) throw new Error('LayoutItem size should be less than 100%')

    const itemInitialSizes = sizesPercent.map(userSize => userSize * containerSize / 100)
    setSizes(itemInitialSizes)

  }, [props.children, propName])

  // TODO: move all of these to Resizer component
  const onMouseDownOnResizer = () => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)

    const containerSize = getContainerSize(getResizersSize(props.children))
    const oldContainerSize = sizes.reduce((a, b) => a + b)
    setSizes(sizes.map(size => size * containerSize / oldContainerSize))
  }

  const onMousemove = () => {

  }

  const onMouseup = () => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  const getResizer = (itemIdx) => {
    return (
      <div className={`resizer ${props.direction}`}
           onMouseDown={onMouseDownOnResizer}
           key={getId()}
      ></div>
    )
  }

  const getItems = () => {
    const layoutItems = props.children.map((layoutItem, idx) => {
      console.log(sizes)
      return React.cloneElement(layoutItem, {
        key: getId(),
        size: sizes[idx],
        propName,
        getLayoutItemSize: getSize => { queryLayoutItemSize[idx] = getSize }
      })
    })
    return layoutItems.slice(1).reduce((arr, layoutItem, idx) =>
      [...arr, getResizer(idx + 1), layoutItem], [layoutItems[0]]
    ) || []
  }

  return (
    <div ref={ref} className={`container ${props.direction}`}>
      { getItems() }
    </div>
  )
}
