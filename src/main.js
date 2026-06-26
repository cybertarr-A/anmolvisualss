import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js?v=1.0.12';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
