import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { Link } from 'react-router-dom';
import logo from '../image/WEBOARD.jpg';


export default class LoginForm extends Component {
  constructor(){
    super();

    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();

    this.props.userLogin({ username, password });
  }


  render() {
    return (
      <div className="chatapp__form--container">
               <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
      `}</style>
        <div className="chatapp__form--modal">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} name="username" type="text" label="Username" placeholder="&#xf2c0; 아이디"/>
              <input onChange={this.handleChange} name="password" type="password" label="Password" placeholder="&#xf13e;  비밀번호"/>
              {
                (this.props.loginError.length)
                  ? <Alert
                      header="오류가 발생했습니다."
                      content="적절한 아이디와 비밀 번호를 입력해주세요."
                    />
                  : null
              }
              <button color='green' fluid size='large'>로그인</button>
            </form>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
}
