import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
/**
 * Display product in a card with image.
 * @param {Props} props
 */
const ProductCard = (props) => {
  const { product, onSelect, supplier } = props;

  return (
    <div className="product-wrapper" onClick={() => onSelect(product)}>
      <div className="product-img">
        <img
          src={product.imageURL}
          height="180"
          width="100%"
          alt={`${product.productName}`}
        />
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>{product.productName}</h1>
          <h2>{supplier}</h2>
          <p>
            <FontAwesomeIcon icon={faRupeeSign} />
            <span>{parseFloat(product.productPrice).toFixed(2)}</span>
            <span className="product-kg">/kg</span>
          </p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  /**
   * Product object with product details.
   */
  product: PropTypes.object.isRequired,
  /**
   * Handle function for selecting a product.
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * Supplier's agency name.
   */
  supplier: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  product: {
    productName: "",
    productPrice: 0,
    imageURL: "",
  },
  supplier: "",
};

export default ProductCard;
