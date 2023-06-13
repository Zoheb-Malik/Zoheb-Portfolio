import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import './styles/stylesheet.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <Router hashType="slash">
        <App />
      </Router>
    </React.StrictMode>,
    rootElement
  );
}
