import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    skills: [],
    lifeAtCompany: [],
    similarJobs: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      console.log(data)
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails,
        similarJobs,
        skills,
        lifeAtCompany,

        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getJobItemDetails()
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderLifeAtCompany = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="lifeContainer">
        <h1 className="descriptionHead">Life at Company</h1>
        <div className="lifeImgContainer">
          <p className="descriptionPara">{description}</p>
          <img src={imageUrl} alt="life at company" className="lifeImg" />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <ul className="unList">
        {similarJobs.map(eachJob => (
          <li className="mainContainer1" key={eachJob.title}>
            <div className="first">
              <img
                src={eachJob.companyLogoUrl}
                alt="similar job company logo"
                className="companyLogo"
              />
              <div className="second">
                <h1 className="heading">{eachJob.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star" />

                  <p className="rating">{eachJob.rating}</p>
                </div>
              </div>
            </div>
            <div className="fifth">
              <h1 className="descriptionHead">Description</h1>
              <p className="similarPara">{eachJob.jobDescription}</p>
            </div>
            <div className="fourth">
              <div className="rating-container">
                <MdLocationOn className="location" />

                <p className="locationPara1">{eachJob.location}</p>
              </div>
              <div className="rating-container">
                <GiSuitcase className="suitcase" />

                <p className="locationPara1">{eachJob.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderSkills = () => {
    const {skills} = this.state

    return (
      <div className="skillContainer">
        <h1 className="descriptionHead">Skills</h1>
        <ul className="listcontainer">
          {skills.map(eachSkill => (
            <li className="list" key={eachSkill.name}>
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="img"
              />
              <p className="skillDescriptionPara">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <>
        <div className="mainContainer">
          <div className="first">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="companyLogo"
            />
            <div className="second">
              <h1 className="heading">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />

                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="fourth">
              <div className="rating-container">
                <MdLocationOn className="location" />

                <p className="locationPara">{location}</p>
              </div>
              <div className="rating-container">
                <MdLocationOn className="location" />

                <p className="locationPara">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="fifth">
            <div className="sixth">
              <h1 className="descriptionHead">Description</h1>
              <a href={companyWebsiteUrl} target="-blank" className="anchor">
                Visit
              </a>
            </div>
            <p className="descriptionPara">{jobDescription}</p>
          </div>
          {this.renderSkills()}
          {this.renderLifeAtCompany()}
        </div>
        <div className="similar">
          <h1 className="descriptionHead">Similar jobs</h1>
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }

  renderJobsFailureList = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="head">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderJobsFailureList()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <Header />
          {this.renderSwitch()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
