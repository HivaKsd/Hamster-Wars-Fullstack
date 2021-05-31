import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, NavLink } from 'react-router-dom'
import Start from './components/start/Start';
import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <nav>
            <Link to="/"> Start </Link>
            <NavLink to="/battle" activeClassName="active"> Battle </NavLink>
            <NavLink to="/gallery" activeClassName="active"> Gallery </NavLink>
        </nav>
      </header>
      <main>
      <Switch>
          <Route path="/battle"> <Battle /> </Route>
          <Route path="/gallery"> <Gallery /> </Route>
          <Route path="/"> <Start /> </Route>
      </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;
