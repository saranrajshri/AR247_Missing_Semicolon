import React, { useContext, useEffect, useState } from "react";
import "./ProductDescription.css";
import { useParams, useHistory } from "react-router-dom";
import { FarmerContext } from "../../../../../Context/FarmerContext";
import { Context } from "../../../../../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingCart,
  faRupeeSign
} from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "semantic-ui-react";
import isEmpty from "../../../../../Utils/isEmpty";
import { addItemToCart } from "../../../../../actions/actions";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../../../Context/ToastContext";
/**
 * Display product and its detials.
 */
const ProductDescription = () => {
  let { productId } = useParams();
  const {
    products,
    setSelectedProducts,
    cart,
    setCart,
    farmerData,
    setFarmerData
  } = useContext(FarmerContext);
  const { supplierMappings } = useContext(Context);
  const [product, setProduct] = useState({
    barCode: "",
    imageURL: "",
    productName: "",
    price: 0,
    supplierID: ""
  });
  const history = useHistory();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    if (isEmpty(farmerData)) {
      addToast({
        type: "error",
        message: t("loginToAdd")
      });
      return;
    }
    let currentCart = cart;
    let idx = currentCart.findIndex((p) => p._id === product.barCode);
    if (idx === -1) {
      addItemToCart(farmerData._id, { _id: product.barCode })
        .then((res) => {
          setCart(() => [...res.data.cart]);
          setFarmerData({ ...farmerData, cart: res.data.cart });
          addToast({
            type: "success",
            message: t("itemAdded")
          });
        })
        .catch((err) => {
          console.log("Adding item to cart: ", err);
          addToast({
            type: "error",
            message: t("cannotAdd")
          });
        });
    } else {
      addToast({
        type: "success",
        message: t("itemAlready")
      });
    }
  };

  const handleBuyNow = () => {
    setSelectedProducts([product]);
    history.push("/farmer/checkout");
  };

  const handleLogout = () => {
    localStorage.removeItem("CUSTOMER_AUTH_TOKEN");
    setFarmerData({});
    history.push("/farmer/home");
  };
  const { t } = useTranslation();

  const trigger = <div className="avatar">GP</div>;

  const options = [
    {
      key: "logout",
      text: <span onClick={handleLogout}>{t("logout")}</span>,
      disabled: false
    }
  ];
  // Find the product to render from products by id.
  useEffect(() => {
    let prod = products.find((prod) => {
      return prod.barCode === productId;
    });
    if (!isEmpty(prod)) {
      setProduct(prod);
    }
  }, [products, productId]);

  return (
    <div id="product-description">
      <div id="farmer-header">
        <div className="logo-bar">
          <div className="logo-name">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icon"
              onClick={() => history.goBack()}
            />
          </div>
          <div className="bar-actions">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="icon cart-icon"
              onClick={() => history.push("/farmer/cart")}
            />
            {isEmpty(farmerData) ? (
              <button
                className="ui basic button login-button"
                onClick={() => history.push("/farmer/login")}
              >
                {t("login")}
              </button>
            ) : (
              <Dropdown
                trigger={trigger}
                options={options}
                direction="left"
                icon={null}
              />
            )}
          </div>
        </div>
      </div>

      <div className="product-information">
        <div className="product-image">
          <img
            src={product.imageURL}
            height="400px"
            width="100%"
            alt={product.productName}
          />
        </div>
        <div className="product-details">
          <h1>{product.productName}</h1>
          <h2>{supplierMappings[product.supplierID]}</h2>
          <p>
            <FontAwesomeIcon icon={faRupeeSign} />
            <span>{parseFloat(product.productPrice).toFixed(2)}</span>
            <span className="product-kg">/ kg</span>
          </p>
          <p className="description-label">{t("description")}:</p>
          <p className="description">
            This is a new high quality jute seed. It is sold by agent{" "}
            {supplierMappings[product.supplierID]}.
          </p>
        </div>
      </div>
      <div className="fixed-button">
        <Button
          content={t("cart")}
          color="yellow"
          icon="shopping cart"
          className="add-to-cart"
          onClick={handleAddToCart}
        />
        <Button
          content={t("buy")}
          color="orange"
          icon="bolt"
          className="buy-now"
          onClick={handleBuyNow}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
