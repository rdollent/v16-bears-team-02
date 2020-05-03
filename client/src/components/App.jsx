import React from 'react';
import '../styles/styles.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Planner from './Planner';
import {connect} from 'react-redux';

const AppContainer = () => {
  return (
    <Router>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/planner' exact component={Planner}></Route>
          </Switch>   

    </Router>
  );
}

const App = connect()(AppContainer);

export default App;
