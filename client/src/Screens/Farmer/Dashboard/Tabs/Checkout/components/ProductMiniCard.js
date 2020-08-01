import React from "react";
import PropTypes from "prop-types";
import { Icon, Button } from "semantic-ui-react";
/**
 * Mini card for product.
 * @param {Props} props
 */
const ProductMiniCard = (props) => {
  const { product, onSubtract, onAdd, supplier } = props;
  const { productName, productPrice, imageURL, quantity } = product;
  return (
    <div className="mini-card">
      <div className="mini-img">
        <img src={imageURL} alt="Product name" />
      </div>
      <div className="mini-info">
        <h2>{productName}</h2>
        <h3>{supplier}</h3>
        <p>
          <Icon name="rupee sign" />
          <span>{parseFloat(productPrice).toFixed(2)}</span>
        </p>
        <div className="quantity-button">
          <Button icon="minus" onClick={() => onSubtract(props.product)} />
          <span>{quantity}</span>
          <Button icon="plus" onClick={() => onAdd(props.product)} />
        </div>
      </div>
    </div>
  );
};

ProductMiniCard.propTypes = {
  /**
   * Product object with details.
   */
  product: PropTypes.object.isRequired,
  /**
   * Handle function to reduce quantity.
   */
  onSubtract: PropTypes.func.isRequired,
  /**
   * Handle function to increase quantity.
   */
  onAdd: PropTypes.func.isRequired,
  /**
   * Supplier agency name.
   */
  supplier: PropTypes.string.isRequired,
};

ProductMiniCard.defaultProps = {
  product: {
    productName: "Normal jute",
    productPrice: 30,
    imageURL: "http://bit.ly/2tMBBTd",
    quantity: 1,
  },
  supplier: "",
};

export default ProductMiniCard;
