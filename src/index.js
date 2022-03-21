import React from 'react';
import ReactDOM from 'react-dom';

import { StateWrapper } from './services/StateContext';
import { initialState, StateReducer } from './services/StateReducer';

import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <StateWrapper reducer={StateReducer} initialState={initialState}>
            <App />
        </StateWrapper>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
