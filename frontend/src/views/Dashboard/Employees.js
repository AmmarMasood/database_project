import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import { server } from "../../Server";
import { withRouter } from "react-router-dom";
const Employees = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(moment(new Date()).format("DD-MMM-YYYY"));
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [joinDate, setJoinDate] = useState(
    moment(new Date()).format("DD-MMM-YYYY")
  );

  function createEmployee() {
    if (name && email && dob && phone && address && designation && joinDate) {
      var bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("dob", moment(dob).format("DD-MMM-YYYY"));
      bodyFormData.append("phone", phone);
      bodyFormData.append("address", address);
      bodyFormData.append("designation", designation);
      bodyFormData.append("join_date", moment(joinDate).format("DD-MMM-YYYY"));
      axios({
        method: "post",
        url: `${server}/create/employee`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          alert("Employee Created");
        })
        .catch((err) => {
          alert("Can not create employee");
          console.log(err);
        });
    } else {
      alert("Please enter all values.");
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          localStorage.removeItem("ROLE");
          props.history.push("/");
        }}
        style={{
          position: "absolute",
          top: "40px",
          right: "20px",
          zIndex: "3000",
        }}
      >
        Logout
      </Button>
      <h4>Create Employee</h4>
      <div
        style={{
          // border: "1px solid red",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridGap: "10px",
        }}
      >
        <TextField
          id="outlined-required"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Date of Birth"
          value={dob}
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDob(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Phone"
          value={phone}
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Join Date"
          type="date"
          value={joinDate}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setJoinDate(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
      </div>
      <Button
        style={{ marginTop: "10px" }}
        onClick={createEmployee}
        variant="contained"
        color="primary"
      >
        Create Employee
      </Button>
    </div>
  );
};

export default withRouter(Employees);
