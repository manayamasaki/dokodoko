/*
import React from "react";
import './Login.css';

class Login extends React.Component {
    render(){
        return(
        <div className ="loginbutton">
        <button>ログイン</button>  
        </div> 
       
        )
    }
}
export default Login;
*/
import React from "react";
import { Link } from 'react-router-dom'; // Linkをimportする
import './Login.css';

class Login extends React.Component {
    render(){
        return(
            <div className="loginbutton">
                <Link to="/login" className="loginLink">ログイン</Link> {/* ログインページへのリンク */}
            </div>
        )
    }
}

export default Login;
