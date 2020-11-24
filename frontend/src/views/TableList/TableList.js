import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { server } from "../../Server";
import { withRouter } from "react-router-dom";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";

function TableList(props) {
  const [type, setType] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  function setupTable(data) {
    if (data.length > 0) {
      setTableHead(Object.keys(data[0]));
      let d = data.map((da) => Object.values(da));
      setTableData(d);
    }
  }

  function getProductReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("product_name", name);
    bodyFormData.append("product_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/products`,
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

  function getEmployeeReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("name", name);
    bodyFormData.append("employee_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/employees`,
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

  function getCustomerReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("name", name);
    bodyFormData.append("customer_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/customers`,
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

  function getSupplierReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("name", name);
    bodyFormData.append("supplier_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/suppliers`,
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

  function getSalesReports() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("sale_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/sales`,
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

  function getOrdersReport() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("order_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/orders`,
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

  function getSaleItemReport() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("sale_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/sale-items`,
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

  function getOrderItemReport() {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", searchBy);
    bodyFormData.append("order_id", id);
    axios({
      method: "post",
      url: `${server}/fetch/order-items`,
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
      <div style={{ height: "50vh" }}>
        <FormControl style={{ width: "300px" }}>
          <InputLabel htmlFor="age-native-simple">Report Type</InputLabel>
          <Select native value={type} onChange={(e) => setType(e.target.value)}>
            <option aria-label="None" value="" />
            <option value="employees">Employees</option>
            <option value="products">Products</option>
            <option value="customers">Customers</option>
            <option value="suppliers">Suppliers</option>
            <option value="sales">Sales</option>
            <option value="sale-items">Sales Items</option>
            <option value="orders">Orders</option>
            <option value="order-items">Order Items</option>
          </Select>
        </FormControl>
        {type === "suppliers" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">
                Search Supplier
              </InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Suppliers</option>
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
              onClick={getSupplierReports}
              variant="contained"
              color="primary"
            >
              Get Supplier Reports
            </Button>
          </div>
        )}
        {type === "customers" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">
                Search Customer
              </InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Customers</option>
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
              onClick={getCustomerReports}
              variant="contained"
              color="primary"
            >
              Get Customer Reports
            </Button>
          </div>
        )}
        {type === "employees" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">
                Search Employee
              </InputLabel>
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
              <InputLabel htmlFor="age-native-simple">
                Search Products
              </InputLabel>
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
        {type === "sales" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">Search Sales</InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Sales</option>
                <option value="id">Search by ID</option>
              </Select>
            </FormControl>
            <div style={{ marginTop: "20px" }}>
              <TextField
                id="outlined-required"
                label="Search By Supplier ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                variant="outlined"
                style={{ marginBottom: "20px" }}
              />
            </div>
            <Button
              style={{ marginTop: "10px" }}
              onClick={getSalesReports}
              variant="contained"
              color="primary"
            >
              Get Sales Reports
            </Button>
          </div>
        )}
        {type === "orders" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">Search Orders</InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Orders</option>
                <option value="id">Search by ID</option>
              </Select>
            </FormControl>
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
              onClick={getOrdersReport}
              variant="contained"
              color="primary"
            >
              Get Orders Reports
            </Button>
          </div>
        )}
        {type === "sale-items" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">
                Search Sale Items
              </InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Items</option>
                <option value="id">Search by Sale ID</option>
              </Select>
            </FormControl>
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
              onClick={getSaleItemReport}
              variant="contained"
              color="primary"
            >
              Get Sale Items Report
            </Button>
          </div>
        )}
        {type === "order-items" && (
          <div>
            <FormControl style={{ width: "300px", marginTop: "20px" }}>
              <InputLabel htmlFor="age-native-simple">
                Search Order Items
              </InputLabel>
              <Select
                native
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option aria-label="None" value="" />
                <option value="all">Get All Items</option>
                <option value="id">Search by Order ID</option>
              </Select>
            </FormControl>
            <div style={{ marginTop: "20px" }}>
              <TextField
                id="outlined-required"
                label="Search By Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                variant="outlined"
                style={{ marginBottom: "20px" }}
              />
            </div>
            <Button
              style={{ marginTop: "10px" }}
              onClick={getOrderItemReport}
              variant="contained"
              color="primary"
            >
              Get Order Items Report
            </Button>
          </div>
        )}
      </div>
      <CardBody
        style={{
          marginTop: "10px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          height: "60vh",
          overflowY: "scroll",
        }}
      >
        <Table
          tableHeaderColor="warning"
          tableHead={tableHead}
          tableData={tableData}
        />
      </CardBody>
    </div>
  );
}
export default withRouter(TableList);
