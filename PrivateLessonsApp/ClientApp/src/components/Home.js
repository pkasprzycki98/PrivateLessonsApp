import React, { Component } from 'react';
import LoginHooks from './User/LoginHooks';
export class Home extends Component {
  static displayName = Home.name;
  
  render () {
    return (
      <div>
        <LoginHooks></LoginHooks>
      </div>
    );
  }
}
