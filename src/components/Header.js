// src/components/Header.js
import React from 'react';
import './Header.css';

class Header extends  React.Component {
  render(){
  return (
    <header className="header">
      <div className="headerContents">
        <div className="sitename">dokodoko</div>
        {/* <div className="mannga">マンガ</div> */}
        <button className="loginbutton">ログイン</button>
       </div>
    </header>
  );
  }
}


export default Header;
