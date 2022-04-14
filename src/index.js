import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppContainer from './Components/hoc/AppContainer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import UserProvider from "./store/UserContext";


ReactDOM.render(
  <React.StrictMode>
      <UserProvider>
          <AppContainer>
              <App />
          </AppContainer>
      </UserProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
