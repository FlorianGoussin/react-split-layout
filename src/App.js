import React from 'react';
import './App.css'
import { LayoutContainer, LayoutItem } from './LayoutContainer';

const App = () => {
  return (
    <LayoutContainer root={true} direction={'row'}>
      <LayoutItem>c1</LayoutItem>
      <LayoutItem width="70">
        <LayoutContainer root={true} direction={'column'}>
          <LayoutItem>c2 r1</LayoutItem>
          <LayoutItem height="60">
            <LayoutContainer root={true} direction={'row'}>
              <LayoutItem>c2 r1 c1</LayoutItem>
              <LayoutItem>c2 r1 c2</LayoutItem>
              <LayoutItem>c2 r1 c3</LayoutItem>
            </LayoutContainer>
          </LayoutItem>
          <LayoutItem>c2 r3</LayoutItem>
        </LayoutContainer>
      </LayoutItem>
      <LayoutItem>c3</LayoutItem>
    </LayoutContainer>
  )
}

export default App