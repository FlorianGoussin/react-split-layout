import './LayoutContainer.css'
import React, { useRef, useEffect, useState } from 'react';

// const Resizer = (props) => {
//   return <div className={`resizer ${props.direction}`}></div>
// }

const getId = () => (Date.now() * Math.random()).toString(36).replace('.', '')

export const LayoutContainer = props => {
  const RESIZER_VALUE = 4 // pixels
  const ref = useRef(null)
  const isRow = props.direction === 'row'
  const propName = isRow ? 'width' : 'height'
  const [sizes, setSizes] = useState([])

  // contains all the getSize functions from child
  // use getItemNewSize to call functions
  const recentLayoutItemSizes = []
  const getItemNewSize = index => recentLayoutItemSizes[index]

  // remove respectively the resizers with or height from the layout container width or height
  const getResizersSize = layoutItems => (layoutItems.length - 1) * RESIZER_VALUE
  const getContainerSize = resiserSize => ref.current ? (ref.current[isRow ? 'offsetWidth' : 'offsetHeight'] - resiserSize) : 0
  const getDefaultItemSize = (containerSize, sizesPercent) => {
    const userDefValCount = sizesPercent.filter(s => s).length // count what's not zero
    const userDefSizesTotal = sizesPercent.reduce((a, b) => a + b)
    return (containerSize - userDefSizesTotal) / (props.children.length - userDefValCount)
  }

  useEffect(() => {
    const containerSize = getContainerSize(getResizersSize(props.children))
    console.log('container:', props.direction, ', containerSize:', ref.current && ref.current.offsetWidth, ' level:', props.level)
    const sizesPercent =
      props.children.map(layoutItem => parseFloat(layoutItem.props[propName] || 0))

    const invalid = sizesPercent.some(size => size > (100 - sizesPercent.length)) ||
                    sizesPercent.reduce((a, b) => a + b) > 100
    if (invalid) throw new Error('LayoutItem size should be less than 100%')

    const userSizesPixel = sizesPercent.map(size => size * containerSize / 100)
    const sizesPixel = userSizesPixel.map((size) => size || getDefaultItemSize(containerSize, userSizesPixel))
    setSizes(sizesPixel)

  }, [props.children, propName])

  // TODO: move all of these to Resizer component
  const onMouseDownOnResizer = itemIdx => () => {
    const containerSize = getContainerSize(getResizersSize(props.children))
    const oldContainerSize = sizes.reduce((a, b) => a + b)
    setSizes(sizes.map(size => size * containerSize / oldContainerSize)) // will recreate the resizer

    // this will remain after the resizer is destroyed since it's created on the document
    // so onMousemove and onMouseup need to remain in LayoutContainer component
    const onMousemove = e => {
      const getPrevItemNewSize = (e, itemIdx) => e[isRow ? 'clientX' : 'clientY'] - getItemNewSize(itemIdx)
      const prevItemSize = sizes[itemIdx]
      const nextItemSize = sizes[itemIdx + 1]
      const maxSize = prevItemSize + nextItemSize
      const prevItemNewSize = getPrevItemNewSize(e, itemIdx)
      const diff = prevItemSize - prevItemNewSize
      if (prevItemNewSize > 0 && prevItemNewSize < maxSize) {
        const newSizes = sizes.slice()
        newSizes[itemIdx] = prevItemNewSize
        newSizes[itemIdx + 1] = newSizes[itemIdx + 1] + diff // set the next element width
        setSizes(newSizes)
      }
    }

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }


  const getResizer = (itemIdx) => {
    return (
      <div className={`resizer ${props.direction}`}
           onMouseDown={onMouseDownOnResizer(itemIdx)}
           key={getId()}
      ></div>
    )
  }

  const getItems = () => {
    const layoutItems = props.children.map((layoutItem, idx) => {
      return React.cloneElement(layoutItem, {
        key: getId(),
        size: sizes[idx],
        axis: isRow ? 'x' : 'y',
        propName,
        addLayoutItemSize: getSize => { recentLayoutItemSizes[idx] = getSize }
      })
    })
    return layoutItems.slice(1).reduce((arr, layoutItem, idx) =>
      [...arr, getResizer(idx), layoutItem], [layoutItems[0]]
    ) || []
  }

  return (
    <div ref={ref} className={`container ${props.direction}`}>
      { getItems() }
    </div>
  )
}
