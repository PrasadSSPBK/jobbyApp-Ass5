import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],

    employmentType: [],
    searchInput: '',
    salaryRange: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, employmentType, salaryRange} = this.state
    const requiredEmploymentType = employmentType.join(',')

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${requiredEmploymentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,

        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getJobs()
  }

  search = () => {
    this.getJobs()
    this.setState({searchInput: ''})
  }

  searchInputKey = event => {
    this.setState({searchInput: event.target.value})
  }

  keyDown = event => {
    if (event.key === 'Enter') {
      this.getJobs()
      this.setState({searchInput: ''})
    }
  }

  onChangeSalaryRange = (isChecked, salaryRangeId) => {
    if (isChecked) {
      this.setState({salaryRange: salaryRangeId}, this.getJobs)
    }
  }

  onChangeEmploymentType = (isChecked, employmentTypeId) => {
    const {employmentType} = this.state
    // console.log(employmentTypeId)
    if (isChecked) {
      this.setState(
        {
          employmentType: [...employmentType, employmentTypeId],
        },

        this.getJobs,
      )
    } else {
      const updatedEmploymentType = employmentType.filter(
        each => each !== employmentTypeId,
      )

      this.setState(
        {
          employmentType: [...updatedEmploymentType],
        },
        this.getJobs,
      )
    }
  }

  renderSideContainer = () => {
    const {searchInput} = this.state

    // console.log(employmentTypesList)
    // console.log(salaryRangesList)

    return (
      <div className="secondContainer">
        <div className="searchInputContainer1">
          <input
            type="search"
            value={searchInput}
            className="searchInput"
            placeholder="Search"
            onChange={this.searchInputKey}
            onKeyDown={this.keyDown}
          />
          <button
            type="button"
            testid="searchButton"
            className="searchButton"
            onClick={this.search}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <Profile />
        <hr className="line" />
        <div className="employmentContainer">
          <h1 className="employmentHead">Type of Employment</h1>
          <ul className="ul">
            {employmentTypesList.map(each => (
              <EmploymentType
                employmentTypesList={each}
                key={each.employmentTypeId}
                onChangeEmploymentType={this.onChangeEmploymentType}
              />
            ))}
          </ul>
        </div>
        <hr className="line" />
        <div className="employmentContainer">
          <h1 className="employmentHead">Salary range</h1>
          <ul className="ul">
            {salaryRangesList.map(each => (
              <SalaryRange
                salaryRangesList={each}
                key={each.salaryRangeId}
                onChangeSalaryRange={this.onChangeSalaryRange}
                onKeyDown={this.keyDown}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobslist = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="ul">
          {jobsList.map(eachJob => (
            <JobItem jobsList={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="failureContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failureImg"
        />
        <h1 className="head">No Jobs Found</h1>
        <p className="para">We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureList = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="head">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for.
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
        return this.renderJobslist()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderJobsFailureList()
      default:
        return null
    }
  }

  render() {
    const {searchInput, employmentType, salaryRange} = this.state
    console.log(searchInput, employmentType, salaryRange)

    // const {employmentTypesList, salaryRangesList} = this.props
    return (
      <>
        <Header />

        <div className="firstContainer">
          {this.renderSideContainer()}
          <div className="thirdContainer">
            <div className="searchInputContainer">
              <input
                type="search"
                value={searchInput}
                className="searchInput"
                placeholder="Search"
                onChange={this.searchInputKey}
                onKeyDown={this.keyDown}
              />
              <button
                type="button"
                testid="searchButton"
                className="searchButton"
                onClick={this.search}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
