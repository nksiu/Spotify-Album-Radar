import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import NewReleases from "./page/new-releases";
import NavBar from "./components/navbar/NavBar";
import Home from "./page/Home";
import About from "./page/About";
import UserManagement from "./page/user-management";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/songs">
            <NewReleases />
          </Route>
          <Route exact path='/profile'>
            <UserManagement />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
