import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Song from './components/song'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <p>default route</p>
          </Route>
          <Route exact path='/songs'>
            <Song />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
