import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Game from './components/game'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route path = "/" component = {Game} />
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
