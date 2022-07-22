import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaRegEnvelope} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navHeader">
      <div className="navContainer">
        <div className="headerImg">
          <Link to="/" className="linkStyle">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteImg"
            />
          </Link>
        </div>
        <div className="iconsContainer">
          <Link to="/" className="linkStyle">
            <li className="list">
              <button type="button" className="iconButton">
                <AiFillHome className="icon" />
              </button>
            </li>
          </Link>

          <Link to="/jobs" className="linkStyle">
            <li className="list">
              <button type="button" className="iconButton">
                <FaRegEnvelope className="icon" />
              </button>
            </li>
          </Link>
          <li className="list">
            <button type="button" className="iconButton" onClick={logout}>
              <FiLogOut className="icon" />
            </button>
          </li>
        </div>
        <ul className="listContainer">
          <Link to="/" className="linkStyle">
            <li className="listItem">Home</li>
          </Link>
          <Link to="/jobs" className="linkStyle">
            <li className="listItem">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logoutBtn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
