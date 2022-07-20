// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App.js';

// ReactDOM.render(
//   <App />,
//   document.getElementById('app'),
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);