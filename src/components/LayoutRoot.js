import './LayoutRoot.css'
import React, { useEffect } from 'react';
// import buildStateFromTree

export const LayoutRoot = props => {
  // useEffect(() => {
  //   props.state ||
  // })
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
//   containers: {
//     row: []
//     column: []
//   },
//   stacks: []
// }




