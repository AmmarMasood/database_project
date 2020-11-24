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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function createEmployee() {
    if (name && email && phone && address) {
      var bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("phone", phone);
      bodyFormData.append("address", address);
      axios({
        method: "post",
        url: `${server}/create/supplier`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          alert("Supplier Created");
        })
        .catch((err) => {
          alert("Can not create supplier");
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
      <h4>Create Supplier</h4>
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
      </div>
      <Button
        style={{ marginTop: "10px" }}
        onClick={createEmployee}
        variant="contained"
        color="primary"
      >
        Create Supplier
      </Button>
    </div>
  );
};

export default withRouter(Employees);
