import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from 'js-cookie'

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./page/Home";
import About from "./page/About";
import UserManagement from "./page/user-management";

// Actions
import { login } from './actions/userActions'


function App({ login }) {
  useEffect(() => {
    const token = Cookies.get('access_token')
    const session = window.localStorage.getItem('access_token')
    if (token) {
      window.localStorage.setItem('access_token', token)
      login(token)
    }
    if (session) {
      login(session)
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path='/profile'>
            <UserManagement></UserManagement>
          </Route>
          <Route exact path='/LogOut'>
          </Route>
          <Route path='*'>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default connect(null, {login})(App);
