import React, { useState, useContext, useRef } from "react";

// Semantic UI
import { Form, Input, TextArea, Button, Divider } from "semantic-ui-react";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEraser } from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {


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

  

  return (
    <div className="p-5">
      <p className="title text-dark">Add a new product</p>
      {/* Row */}
      
    </div>
  );
};
export default AddProduct;
