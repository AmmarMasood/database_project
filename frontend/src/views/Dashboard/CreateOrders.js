import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { server } from "../../Server";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function CreateOrders(props) {
  const [products, setProducts] = useState([]);
  const [finalTotal, setFinalTotal] = useState("");
  const [items, setItems] = useState([]);
  // products
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    let totalP = 0;
    items.map((i) => (totalP += i.total_item_price));
    setFinalTotal(totalP);
  }, [items]);

  useEffect(() => {
    // get all products
    var bodyFormData = new FormData();
    bodyFormData.append("fetch_type", "all");
    bodyFormData.append("product_name", "");
    bodyFormData.append("product_id", "");
    axios({
      method: "post",
      url: `${server}/fetch/products`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.table);
      })
      .catch((err) => {
        alert("Error: No products exists!");
        console.log(err);
      });
  }, []);

  function generateSale() {
    const body = {
      cost: finalTotal,
      order_items: items,
    };
    axios
      .post(`${server}/create/order`, body)
      .then((res) => alert("Order completed!"))
      .catch((err) => {
        alert("Error!");
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
      <h4>Create A New Order</h4>
      <TextField
        id="outlined-required"
        label="Final Total"
        value={finalTotal}
        variant="outlined"
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generateSale}
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        Create Order
      </Button>
      <div
        style={{
          border: "1px solid #fff",
          marginTop: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-around",
        }}
      >
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Product Id
          </InputLabel>
          <Select
            style={{ width: "250px" }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={productId}
            onChange={(v) => {
              setProductId(v.target.value);
            }}
            label="Supplier"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {products.length > 0 &&
              products.map((val) => (
                <MenuItem
                  onClick={() => setProductPrice(val.COST)}
                  value={val.PRODUCT_ID}
                >
                  {val.PRODUCT_NAME}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          required
          id="outlined-required"
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
        />
        <TextField
          required
          id="outlined-required"
          label="Item Price"
          value={productPrice * quantity}
          variant="outlined"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setItems([
              ...items,
              {
                quantity,
                product_id: productId,
                total_item_price: productPrice * quantity,
              },
            ])
          }
        >
          Add Product
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <>
          <div
            style={{
              backgroundColor: "#fff",
              fontSize: "0px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px",
              margin: "5px",
            }}
          >
            <label style={{ fontSize: "20px" }}>Product ID</label>
            <label style={{ fontSize: "20px" }}>Quantity</label>
            <label style={{ fontSize: "20px" }}>Total Item Price</label>
            <Button style={{ opacity: 0 }}></Button>
          </div>
          {items.map((item) => (
            <div
              style={{
                backgroundColor: "#fff",
                fontSize: "0px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-evenly",
                padding: "10px",
                margin: "5px",
              }}
            >
              <label style={{ fontSize: "20px" }}>{item.product_id}</label>
              <label style={{ fontSize: "20px" }}>{item.quantity}</label>
              <label style={{ fontSize: "20px" }}>
                {item.total_item_price}
              </label>
              <Button
                onClick={() => {
                  const i = items.filter(
                    (p) =>
                      p.product_id !== item.product_id ||
                      p.quantity !== item.quantity
                  );
                  setItems(i);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
export default withRouter(CreateOrders);
