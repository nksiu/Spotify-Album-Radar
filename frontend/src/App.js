import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from 'js-cookie'

// Components
import NavBar from "./components/navbar/NavBar";
import Home from "./page/Home";
import About from "./page/About";
import UserManagement from "./page/user-management";


function App() {
  const token = Cookies.get('access_token')
  if (token) {
    window.localStorage.setItem('access_token', token)
  }

  return (
    <div className="App">
      <Router>
        <NavBar token={token} />
        <Switch>
          <Route exact path="/">
            <Home token={window.localStorage.getItem('access_token')} />
          </Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path='/profile'>
            <UserManagement token={token}></UserManagement>
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

export default App;
