import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Input, TextArea } from "semantic-ui-react";
/**
 * Display edit product modal.
 * @component
 * @param {Props} props
 */
const EditProductModal = (props) => {
  const { visible, handleClose, handleDone } = props;
  const [product, setProduct] = useState(props.product);
  const [error] = useState(null);

  // Set data to state
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  // update checkbox data to state
  const handleCheckBox = (value) => {
    setProduct({ ...product, isHidden: value });
  };

  useEffect(() => {
    let product = props.product;
    setProduct(product);
  }, [props.product]);

  const handleSubmit = () => {
    // trigger the function in the props
    handleDone(props.product.barCode, product);
  };
  return (
    <Modal dimmer="blurring" open={visible} onClose={handleClose}>
      <Modal.Header>Edit product details</Modal.Header>
      <Modal.Content>
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
              type="number"
              step={0.1}
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
              step={0.1}
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
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" onClick={handleClose} />
        <Button positive content="Done" onClick={handleSubmit} />
      </Modal.Actions>
    </Modal>
  );
};

EditProductModal.propTypes = {
  /**
   * Set's the visibility of modal.
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Function to close the modal.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Function to handle done action.
   */
  handleDone: PropTypes.func.isRequired,
  /**
   * Product object with product details
   */
  product: PropTypes.object.isRequired,
};

EditProductModal.defaultProps = {
  product: {
    barCode: "12345",
    productName: "Default",
    productPrice: 1,
    availableQuantity: 1,
    productDescription: "Default",
    isHidden: false,
  },
};

export default EditProductModal;
