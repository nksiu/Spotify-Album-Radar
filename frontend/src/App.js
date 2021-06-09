import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <p>default route</p>
          </Route>
          <Route exact path='/songs'>
            <p>your page/component here</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
