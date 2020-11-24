import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import { server } from "../../Server";
import { withRouter } from "react-router-dom";

const Customers = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(moment(new Date()).format("DD-MMM-YYYY"));
  const [phone, setPhone] = useState("");
  const [points, setpoints] = useState(10);

  function createCustomers() {
    if (name && email && dob && phone && points) {
      var bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("dob", moment(dob).format("DD-MMM-YYYY"));
      bodyFormData.append("phone", phone);
      bodyFormData.append("points", points);
      axios({
        method: "post",
        url: `${server}/create/customer`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          alert("Customer Created");
        })
        .catch((err) => {
          alert("Can not create Customer");
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
      <h4>Create Customers</h4>
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
          InputLabelProps={{ shrink: true }}
          label="Date of Birth"
          type="date"
          value={dob}
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
          label="Points"
          type="number"
          value={points}
          onChange={(e) => setpoints(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px", display: "none" }}
        />
      </div>
      <Button
        style={{ marginTop: "10px" }}
        onClick={createCustomers}
        variant="contained"
        color="primary"
      >
        Create Customers
      </Button>
    </div>
  );
};

export default withRouter(Customers);
