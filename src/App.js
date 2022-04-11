import logo from './logo.svg';
import './App.css';
import registerUser from "./services/user.service"
import {getAdminToken} from "./services/user.service";
function App() {

  //registerUser("test1","test1","test1","test1@test1.de","test1",)
  getAdminToken()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
