import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import moment from "moment";
import { server } from "../../Server";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";

const Products = (props) => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(
    moment(new Date()).format("DD-MMM-YYYY")
  );
  const [supplierId, setSupplierId] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", "all");
    bodyFormData.append("name", "");
    bodyFormData.append("supplier_id", "");
    axios({
      method: "post",
      url: `${server}/fetch/suppliers`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        setSuppliers(res.data.table);
      })
      .catch((err) => {
        alert("Error: No reports exists!");
        console.log(err);
      });
  }, []);
  function createProduct() {
    if (name && price && quantity && supplierId && cost) {
      var bodyFormData = new FormData();
      bodyFormData.append("product_name", name);
      bodyFormData.append("price", price);
      bodyFormData.append("quantity", quantity);
      bodyFormData.append("supplier_id", supplierId);
      bodyFormData.append("cost", cost);
      axios({
        method: "post",
        url: `${server}/create/product`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          alert("Product Created");
        })
        .catch((err) => {
          alert("Can not create product");
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
      <h4>Create Products</h4>
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
          label="Price"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Supplier
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={supplierId}
            onChange={(v) => setSupplierId(v.target.value)}
            label="Supplier"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {suppliers.length > 0 &&
              suppliers.map((val) => (
                <MenuItem value={val.SUPPLIER_ID}>{val.NAME}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-required"
          label="Quantity"
          value={quantity}
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-required"
          label="Cost"
          value={cost}
          type="number"
          onChange={(e) => setCost(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
      </div>
      <Button
        style={{ marginTop: "10px" }}
        onClick={createProduct}
        variant="contained"
        color="primary"
      >
        Create Product
      </Button>
    </div>
  );
};

export default withRouter(Products);
