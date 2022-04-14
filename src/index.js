import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppContainer from './Components/hoc/AppContainer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';


ReactDOM.render(
    <React.StrictMode>
            <AppContainer>
                <App />
            </AppContainer>
    </React.StrictMode>,
  document.getElementById('root')
);
