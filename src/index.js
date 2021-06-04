import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// styles
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>, document.getElementById('root'));
reportWebVitals();
