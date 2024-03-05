// src/components/Header.js
import React from 'react';
import Login from './Login'
import './Header.css';

class Header extends  React.Component {
  render(){
  return (
    <header className="header">
      <div className="headerContents">
        <div className="headerLeft">
          <div className="sitename">dokodoko</div>
          <div>マンガとアニメを管理するアプリ</div>
        </div>
        {/* <div className="mannga">マンガ</div> */}
         <div className="loginbutton"><Login /></div>
       </div>
    </header>
  );
  }
}


export default Header;
