import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// Components
import NewReleases from './page/new-releases'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <p>default route</p>
          </Route>
          <Route exact path='/songs'>
            <NewReleases />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
