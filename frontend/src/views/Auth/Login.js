import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { server } from "../../Server";
import { Link } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function onSignup() {
    if (username.length > 0 && password.length > 0) {
      var bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      axios({
        method: "post",
        url: `${server}/login`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("ROLE", res.data.role);
          localStorage.setItem("ID", res.data.employee_id);
          props.history.push("/admin");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Please enter correct username or password");
        });
    } else {
      alert("Please fill the fields");
    }
  }
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        width: "40%",
      }}
    >
      <h1>Login</h1>
      <TextField
        required
        id="outlined-required"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
      <Button onClick={onSignup} variant="contained" color="primary">
        Login
      </Button>
      <p>
        Dont have an account?{" "}
        <Link to="/signup/manager"> Signup as a manager</Link> or{" "}
        <Link to="/signup/employee"> Signup as a employee</Link>
      </p>
    </div>
  );
}
export default Login;
