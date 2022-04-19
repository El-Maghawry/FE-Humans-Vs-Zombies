import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select'

const RegisterView = () => {
  const router = useNavigate();

  const options = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Player', label: 'Player' }
  ]

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    // POST: /api/user
    router("/"); // some logic needs to happen here before user can go back to main screen
  };

  return (
    <div>
      <h2>RegisterView</h2>
      <form>

        <div className="form-grout mb-2">
          <label className="form-label">First Name</label>
          <input
            type="text"
            placeholder="E.g. John"
            name="username"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="form-label">Surname</label>
          <input
            type="text"
            placeholder="E.g. Doe"
            name="surname"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="form-label">E-mail</label>
          <input
            type="text"
            placeholder="john.doe@zombie-terminator.org"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="jzombie-killa"
            name="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="form-label">Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-grout mb-2">
          <label className="select">Role</label>
          <select>
            <option value="Player">Player</option>
            <option value="Administrator">Administrator</option>
          </select>
         
        </div>

        <button
          className="btn btn-success m-1"
          onClick={(e) => registerSubmit(e)}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterView