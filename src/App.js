import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'

import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/bad-path" component={NotFound} />
      <Redirect to="bad-path" />
    </Switch>
  </>
)

export default App
