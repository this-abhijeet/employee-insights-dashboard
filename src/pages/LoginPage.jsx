import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      // navigate("/list");
      navigate("/employees");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Employee Dashboard Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Login</button>

      </form>

    </div>
  );
  return(

    <div className="container">

    <div className="card">

    <h1>Employee Dashboard Login</h1>

    <input type="text" placeholder="Username"/>

    <br/>

    <input type="password" placeholder="Password"/>

    <br/>

    <button>Login</button>

    </div>

    </div>

  )
}

export default LoginPage;