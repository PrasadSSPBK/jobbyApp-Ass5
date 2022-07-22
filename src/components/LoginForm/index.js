import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isFailure: false}

  onChangePassWord = event => {
    this.setState({password: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, isFailure: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUserNameContainer = () => {
    const {username} = this.state

    return (
      <div className="inputContainer">
        <label htmlFor="userName" className="label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          id="userName"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state

    return (
      <div className="inputContainer">
        <label htmlFor="pwd" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          id="pwd"
          className="input"
          placeholder="Password"
          onChange={this.onChangePassWord}
        />
      </div>
    )
  }

  render() {
    const {isFailure, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Header />
        <div className="loginFormContainer">
          <form className="formContainer" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteImg"
            />
            {this.renderUserNameContainer()}
            {this.renderPasswordContainer()}
            <button type="submit" className="button">
              Login
            </button>
            {isFailure && <p className="errorMsg">{errorMsg}</p>}
          </form>
        </div>
      </>
    )
  }
}
export default LoginForm
