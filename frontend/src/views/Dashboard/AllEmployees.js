import React, { useEffect, useState } from "react";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import { server } from "../../Server";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

function AllEmployees(props) {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", "all");
    bodyFormData.append("name", "");
    bodyFormData.append("employee_id", "");
    axios({
      method: "post",
      url: `${server}/fetch/employees`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        const b =
          res.data.table &&
          res.data.table.map((v) => [
            v.EMPLOYEE_ID,
            v.NAME,
            moment(v.JOIN_DATE).format("DD/MMM/YYYY"),
            v.EMAIL,
            v.PHONE,
            v.DESIGNATION,
            v.ADDRESS,
            moment(v.DOB).format("DD/MMM/YYYY"),
          ]);
        setEmployees(b);
      })
      .catch((err) => {
        alert("Error: No reports exists!");
        console.log(err);
      });
  }, []);
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
      <CardBody
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          height: "80vh",
          overflowY: "scroll",
        }}
      >
        <Table
          tableHeaderColor="warning"
          tableHead={[
            "ID",
            "Name",
            "Join Date",
            "Email",
            "Phone",
            "Designation",
            "Address",
            "Date of Birth",
          ]}
          tableData={employees}
        />
      </CardBody>
    </div>
  );
}

export default withRouter(AllEmployees);
