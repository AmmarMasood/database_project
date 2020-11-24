import React, { useState, useEffect } from "react";
import { server } from "../../Server";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Table from "components/Table/Table.js";
import { withRouter } from "react-router-dom";

function Remove(props) {
  const [id, setId] = useState("");
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  function setupTable(data) {
    if (data.length > 0) {
      setTableHead(Object.keys(data[0]));
      let d = data.map((da) => Object.values(da));
      setTableData(d);
    }
  }
  function getData() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", "all");
    bodyFormData.append("product_name", "");
    bodyFormData.append("product_id", "");
    axios({
      method: "post",
      url: `${server}/fetch/users`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setupTable(res.data.table);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error: No reports exists!");
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function deleteUser() {
    if (id.length > 0) {
      var bodyFormData = new FormData();
      bodyFormData.append("delete_entity", "user");
      bodyFormData.append("id", parseInt(id));
      axios
        .post(`${server}/delete`, bodyFormData)
        .then((res) => {
          alert("User Deleted");
          getData();
        })
        .catch((err) => {
          console.log(err);
          alert("Error while deleting user");
        });
    } else {
      alert("Please enter id");
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
      <h4>Delete a User</h4>
      <TextField
        id="outlined-required"
        label="Enter User Id"
        value={id}
        type="number"
        onChange={(e) => setId(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={deleteUser}
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        Delete User
      </Button>
      <div
        style={{
          marginTop: "10px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          height: "60vh",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        <Table
          tableHeaderColor="primary"
          tableHead={tableHead}
          tableData={tableData}
        />
      </div>
    </div>
  );
}

export default withRouter(Remove);
