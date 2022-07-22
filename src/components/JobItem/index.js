import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsList

  return (
    <Link to={`/jobs/${id}`} className="link">
      <div className="mainContainer">
        <div className="first">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="descriptionHead">Description</h1>
          <p className="descriptionPara">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}
export default JobItem
