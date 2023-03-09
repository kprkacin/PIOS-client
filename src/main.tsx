import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import RouterLayout from './pages/layout/RouterLayout';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterLayout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
