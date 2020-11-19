import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { server } from "../../Server";

function TableList() {
  const [type, setType] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  function getProductReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("name", name);
    bodyFormData.append("id", id);
    axios({
      method: "post",
      url: `${server}/fetch/products`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error: No reports exists!");
        console.log(err);
      });
  }

  function getEmployeeReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("name", name);
    bodyFormData.append("id", id);
    axios({
      method: "post",
      url: `${server}/fetch/employees`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error: No reports exists!");
        console.log(err);
      });
  }
  return (
    <div>
      <FormControl style={{ width: "300px" }}>
        <InputLabel htmlFor="age-native-simple">Report Type</InputLabel>
        <Select native value={type} onChange={(e) => setType(e.target.value)}>
          <option aria-label="None" value="" />
          <option value="employees">Employees</option>
          <option value="products">Products</option>
        </Select>
      </FormControl>
      {type === "employees" && (
        <div>
          <FormControl style={{ width: "300px", marginTop: "20px" }}>
            <InputLabel htmlFor="age-native-simple">Search Employee</InputLabel>
            <Select
              native
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value="all">Get All Employees</option>
              <option value="id">Search by ID</option>
              <option value="name">Search by Name</option>
            </Select>
          </FormControl>
          <div style={{ marginTop: "20px" }}>
            <TextField
              id="outlined-required"
              label="Search By Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <TextField
              id="outlined-required"
              label="Search By ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              variant="outlined"
              style={{ marginBottom: "20px" }}
            />
          </div>
          <Button
            style={{ marginTop: "10px" }}
            onClick={getEmployeeReports}
            variant="contained"
            color="primary"
          >
            Get Employee Reports
          </Button>
        </div>
      )}
      {type === "products" && (
        <div>
          <FormControl style={{ width: "300px", marginTop: "20px" }}>
            <InputLabel htmlFor="age-native-simple">Search Products</InputLabel>
            <Select
              native
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value="all">Get All Products</option>
              <option value="id">Search by ID</option>
              <option value="name">Search by Name</option>
            </Select>
          </FormControl>
          <div style={{ marginTop: "20px" }}>
            <TextField
              id="outlined-required"
              label="Search By Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <TextField
              id="outlined-required"
              label="Search By ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              variant="outlined"
              style={{ marginBottom: "20px" }}
            />
          </div>
          <Button
            style={{ marginTop: "10px" }}
            onClick={getProductReports}
            variant="contained"
            color="primary"
          >
            Get Product Reports
          </Button>
        </div>
      )}
    </div>
  );
}
export default TableList;
