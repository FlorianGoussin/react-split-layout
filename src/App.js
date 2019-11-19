import React from 'react';
import './App.css'
import { LayoutContainer, LayoutItem } from './LayoutContainer';

const App = () => {
  return (
    <LayoutContainer root={true} direction={'row'}>
      <LayoutItem>c1</LayoutItem>
      <LayoutItem width="50">c2</LayoutItem>
      <LayoutItem>c3</LayoutItem>
    </LayoutContainer>
  )
}

export default App