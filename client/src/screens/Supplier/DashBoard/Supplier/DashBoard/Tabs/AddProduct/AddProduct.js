import React, { useState, useContext, useRef } from "react";

// Semantic UI
import { Form, Input, TextArea, Button, Divider } from "semantic-ui-react";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEraser } from "@fortawesome/free-solid-svg-icons";

// Context
import { Context } from "../../../../../../../Context/Context";

// TODO refs


const AddProduct = () => {
  const { setFullScreenLoader, setAlert, supplierData } = useContext(Context);



  // Product state
  const [product, setProduct] = useState({
    barCode: "",
    productName: "",
    productPrice: 0,
    availableQuantity: 0,
    productDescription: "",
    isHidden: false,
  });
  const [error, setError] = useState(null);

  // Set data to state
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // update checkbox data to state
  const handleCheckBox = (value) => {
    setProduct({ ...product, isHidden: value });
  };

  // clear the state
  const clear = () => {
    setError(null);
    setProduct({
      barCode: "",
      productName: "",
      productPrice: 0,
      availableQuantity: 0,
      productDescription: "",
      isHidden: false,
    });
  };

  // TODO Image Upload

  

  return (
    <div className="p-5">
      <p className="title text-dark">Add a new product</p>
      {/* Row */}
      <div className="grid-container-2">
        <div className="grid-item">
          <div className="card">
            <div className="card-content" style={{ padding: 30 }}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Barcode"
                    required
                    name="barCode"
                    onChange={handleChange}
                    placeholder="Barcode"
                    value={product.barCode}
                    error={error}
                  />
                  <Form.Field
                    control={Input}
                    label="Product Name"
                    required
                    name="productName"
                    onChange={handleChange}
                    placeholder="Product name"
                    value={product.productName}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Product Price"
                    required
                    step={0.1}
                    type="number"
                    name="productPrice"
                    onChange={handleChange}
                    placeholder="Price"
                    value={product.productPrice}
                  />
                  <Form.Field
                    control={Input}
                    label="In Stock Quantity (kg)"
                    required
                    type="number"
                    name="availableQuantity"
                    onChange={handleChange}
                    placeholder="In Stock Quantity"
                    value={product.availableQuantity}
                  />
                </Form.Group>
                <Form.Field
                  id="form-textarea-control-opinion"
                  control={TextArea}
                  label="Product Description"
                  placeholder="Description"
                  onChange={handleChange}
                  name="productDescription"
                  value={product.productDescription}
                />
                <Form.Checkbox
                  checked={!product.isHidden}
                  name="isHidden"
                  onChange={(e) => {
                    handleCheckBox(!product.isHidden);
                  }}
                  label="Publish Now"
                />
              </Form>
              <Divider />
              <Button onClick={clear}>
                <FontAwesomeIcon icon={faEraser} className="icon" />
                Clear
              </Button>
              <Button primary >
                <FontAwesomeIcon icon={faPlusCircle} className="icon" />
                Add
              </Button>
            </div>
          </div>
        </div>
        </div>      
    </div>
  );
};
export default AddProduct;
