import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {profileList: {}, isSuccess: false}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // const {profileList, isSuccess} = this.state
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileList: updatedData, isSuccess: true})
    } else {
      this.setState({isSuccess: false})
    }
  }

  retry = () => {
    this.getProfile()
  }

  renderSuccessView = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="head">{name}</h1>
        <p className="para">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="buttonContainer">
      <button type="button" className="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {isSuccess} = this.state
    return (
      <div>
        {isSuccess ? this.renderSuccessView() : this.renderFailureView()}
      </div>
    )
  }
}
export default Profile
