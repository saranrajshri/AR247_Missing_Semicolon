import React, { useState, useEffect, useContext } from "react";
import "./ProductsView.css";
import { useHistory } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { Context } from "../../../../../Context/Context";
/**
 * Display the available products as a grid.
 */
const ProductsView = (props) => {
  const [products, setProducts] = useState(props.products);
  const { supplierMappings } = useContext(Context);
  const history = useHistory();

  const handleSelect = (product) => {
    history.push(`/farmer/product/${product.barCode}`);
  };

  useEffect(() => {
    const setProductsToState = () => {
      setProducts(props.products);
    };
    setProductsToState();
  }, [props.products]);

  return (
    <div className="body-wrapper">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.barCode}
            product={product}
            supplier={supplierMappings[product.supplierID]}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

ProductsView.defaultProps = {
  products: [],
};

export default ProductsView;
