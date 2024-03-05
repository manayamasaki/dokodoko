import React from "react";
import { Link } from 'react-router-dom'; // Linkをimportする
import './Login.css';

class Login extends React.Component {
    render(){
        return(
            //<button className="loginbutton">ログイン</button>
            <div className="loginbutton">
            <Link to="/login" className="loginLink">ログイン</Link> {/* ログインページへのリンク */}
            <Link to="/signup" className="loginLink">新規会員登録</Link> {/* ログインページへのリンク */}
        </div>
        )
    }
}

export default Login;
