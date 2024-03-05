import React from "react";
import { Link } from 'react-router-dom';
import './LoginPage.css';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isSubmitted: false,
          hasEmailError: false,
          password:'',
          hasPasswordError:false,
          
        };
      }
    
      handleEmailChange(event) {
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
          email: inputValue,
          hasEmailError: isEmpty,
        });
      }
    
      handlePasswordChange(event){
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
          password:inputValue,
          hasPasswordError:isEmpty,
        })
      }
    
      handleSubmit() {
        // this.setState({isSubmitted: true});
        fetch('http://localhost:3001/create', {//リクエスト送信
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:this.state.email,
        pass:this.state.password
      })
    })
      .then(response => { 
        return response.json();
      }
        )
      .then(item => {
        if (Array.isArray(item)) {
          this.setState({isSubmitted: true}); 
        } else {
          console.log('failure');
        }
      })
      .catch(err => {
        console.log(err);
      });
      }

    render(){
        let emailErrorText;
    if (this.state.hasEmailError) {
      emailErrorText = (
        <p className='password-message-error'>
          この項目は必須です
        </p>
      )
    }
    let passwordErrorText;

    if(this.state.hasPasswordError){
      passwordErrorText =(
        <p className='password-message-error'>
          この項目は必須です
        </p>
        )
    }
    
    let passwordForm;
    if (this.state.isSubmitted) {
      passwordForm = (
        <div className='A'>
        <div className='password-submit-message'>
          アカウントが作成されました
        </div>
        <div className='Home'>
        <Link to="/login" className="HomeLink">ログインしてはじめる</Link>
        </div>
        </div>
      );
    } else {
      passwordForm = (
        <div className ='LoginPage'>
        <h3>新規会員登録</h3>
        <form onSubmit={() => {this.handleSubmit()}} >
            <p>ID</p>
          <input
            value={this.state.email}
            onChange={(event) => {this.handleEmailChange(event)}}
          />
          {emailErrorText}
          <p>パスワード</p>
          <input
            value = {this.state.password}
            onChange = {(event)=> {this.handlePasswordChange(event)}}     
          />
 
          {passwordErrorText}
          
          <input
            type='submit'
            value='アカウントを作成'
          />
        </form>
        </div>
      );
    }
        return(
       
            <div className='password-form'>
        {passwordForm}
             </div>
        );
    }
}

export default SignupPage;
