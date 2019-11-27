import './LayoutRoot.css'
import React, { useEffect } from 'react';

const getConfig = (type, children, direction) => {
  return {
    type,
    children,
    direction
  }
}


/**
 * Get the redux state from initial configuration
 * which is the root component with its slot that contains children components
 * @param  {object} initialConfig the initial configuration or props
 * @return {object}               the state
 */
const getStateFromConfig = initialConfig => {
  const wrapInArray = items => Array.isArray(items) ? items : [items]
  const getItemsFromConfig = props => {
    const items = wrapInArray(props.children)
    return items.filter(item => item.props).flatMap(item => {
      const config = {
        type: item.type && item.type.name,
        children: item.props.children,
        direction: item.props.direction || null
      }
      return [...getItemsFromConfig(item.props), config]
    })
  }
  const itemsFromConfig = getItemsFromConfig(initialConfig)
  const byType = type => item => item.type === type
  return {
    constainers: itemsFromConfig.filter(byType('LayoutContainer')),
    stacks: itemsFromConfig.filter(byType('LayoutStack')),
    items: itemsFromConfig.filter(byType('LayoutItem'))
  }
}

export const LayoutRoot = props => {
  useEffect(() => {
    const state = getStateFromConfig(props)
    console.log(state)
  })
  return (
    <div className={`layout-root`}>
      {props.children}
    </div>
  )
}

// Reuse of Golden Layout State architechture using Redux
// https://golden-layout.com/
// Object to be serialized:
// state = {
//   "content": [
//     "type": "row",
//     "content": [
//       {
//         "type": "component"
//       },
//       {
//         "type": "column",
//         "width": 70,
//         "content": [
//           {
//             "type": "component"
//           },
//           {
//             "type": "component"
//           },
//         ]
//       },
//       {
//         "type": "component"
//       }
//     ],
//   ],
// }
//
// Redux state:
// state = {
//   items: [{
//     parent: parentId
//     children: [childrenIds]
//   }],
//   containers: [],
//   stacks: []
// }




