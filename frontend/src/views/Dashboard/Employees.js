import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { server } from "../../Server";

const Employees = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("1-JAN-17");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [joinDate, setJoinDate] = useState("1-JAN-17");

  function createEmployee() {
    if (name && email && dob && phone && address && designation && joinDate) {
      var bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("dob", dob);
      bodyFormData.append("phone", phone);
      bodyFormData.append("address", address);
      bodyFormData.append("designation", designation);
      bodyFormData.append("join_date", joinDate);
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
          // onChange={(e) => setName(e.target.value)}
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
          value={joinDate}
          // onChange={(e) => (e.target.value)}
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

export default Employees;
