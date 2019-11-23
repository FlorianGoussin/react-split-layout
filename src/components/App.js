import React from 'react';
import './App.css'
import { LayoutRoot } from './LayoutRoot';
import { LayoutContainer } from './LayoutContainer';
import { LayoutItem } from './LayoutItem';

const App = () => {
  return (
    <LayoutRoot>
      <LayoutContainer direction={'row'} level={1}>
        <LayoutItem>c1</LayoutItem>
        <LayoutItem width="70">
          <LayoutContainer direction={'column'} level={2}>
            <LayoutItem>c2 r1</LayoutItem>
            <LayoutItem>c2 r3</LayoutItem>
          </LayoutContainer>
        </LayoutItem>
        <LayoutItem>c3</LayoutItem>
      </LayoutContainer>
    </LayoutRoot>
  )
}

export default App


            // <LayoutItem>
            //   <LayoutContainer root={true} direction={'row'}>
            //     <LayoutItem>c2 r1 c1</LayoutItem>
            //     <LayoutItem width="40">c2 r1 c2</LayoutItem>
            //     <LayoutItem>c2 r1 c3</LayoutItem>
            //   </LayoutContainer>
            // </LayoutItem>