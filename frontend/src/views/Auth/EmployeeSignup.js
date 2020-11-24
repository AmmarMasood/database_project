import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { server } from "../../Server";
import { Link } from "react-router-dom";

function EmployeeSignup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  function onSignup() {
    if (username.length > 0 && password.length > 0 && employeeId.length > 0) {
      var bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);
      bodyFormData.append("employee_id", employeeId);
      axios({
        method: "post",
        url: `${server}/signup/employee`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Please enter correct username or employee id");
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
      <h1>Signup As A Employee</h1>
      <TextField
        required
        id="outlined-required"
        label="Employee Id"
        type="number"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
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
        Signup
      </Button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
      <p style={{ padding: "0", margin: "0" }}>
        Are you a manager? <Link to="/signup/manager">Signup as a manager</Link>
      </p>
    </div>
  );
}
export default EmployeeSignup;
