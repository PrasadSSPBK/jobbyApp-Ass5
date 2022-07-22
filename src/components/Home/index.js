import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  // const findJob = () => {
  //   const {history} = props
  //   history.push('/jobs')
  // }

  <>
    <Header />
    <div className="homeContainer">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs,salary information,company
        reviews.Find the job thats fits your abilities & potential
      </p>
      <Link to="/jobs">
        <button type="button" className="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
