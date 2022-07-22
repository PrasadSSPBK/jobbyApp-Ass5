import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="notFoundContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notFound"
      />
      <h1 className="head">Page Not Found</h1>
      <p className="para">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
