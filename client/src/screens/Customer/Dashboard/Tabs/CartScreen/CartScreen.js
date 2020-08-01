import React, { useContext, useEffect, useState } from "react";
import "./CartScreen.css";
import { useHistory } from "react-router-dom";
import { FarmerContext } from "../../../../../Context/FarmerContext";
import { Context } from "../../../../../Context/Context";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import {
  removeItemFromCart,
  getProductsInCart,
} from "../../../../../actions/actions";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../../../Context/ToastContext";

/**
 * Cart screen for customer.
 */

const CartScreen = () => {
  const {
    cart,
    setCart,
    setSelectedProducts,
    farmerData,
    setFarmerData,
  } = useContext(FarmerContext);
  const { supplierMappings } = useContext(Context);
  const [cartProducts, setCartProducts] = useState([]);
  const history = useHistory();
  const { t } = useTranslation();
  const { addToast } = useToast();

  const handleRemoveItem = (barCode) => {
    removeItemFromCart(farmerData._id, { _id: barCode })
      .then((res) => {
        setCart(() => [...res.data.cart]);
        setFarmerData({ ...farmerData, cart: res.data.cart });
        addToast({
          type: "success",
          message: t("itemRemoved"),
        });
      })
      .catch((err) => {
        console.log("Removing item from cart ", err);
        addToast({
          type: "error",
          message: t("cannotRemove"),
        });
      });
  };

  const handleCheckout = () => {
    setSelectedProducts(cartProducts);
    history.push("/farmer/checkout");
  };

  const handleLogout = () => {
    localStorage.removeItem("CUSTOMER_AUTH_TOKEN");
    setFarmerData({});
    history.push("/farmer/home");
  };

  const trigger = <div className="avatar">GP</div>;

  const options = [
    {
      key: "logout",
      text: <span onClick={handleLogout}>{t("logout")}</span>,
      disabled: false,
    },
  ];
  useEffect(() => {
    const loadCartProducts = () => {
      let products = [];
      for (let item of cart) {
        products.push(item._id);
      }
      getProductsInCart({ products: products })
        .then((res) => {
          console.log(res.data);
          setCartProducts(() => [...res.data]);
        })
        .catch((err) => {
          console.log("Loading cart", err);
          addToast({
            type: "error",
            message: t("cantLoad"),
          });
        });
    };
    loadCartProducts();
  }, [cart]);

  return (
    <div id="cart-area">
      <div className="header">
        <div className="back-icon" onClick={() => history.goBack()}>
          <Icon name="arrow left" size="large" />
        </div>
        <Dropdown
          trigger={trigger}
          options={options}
          direction="left"
          icon={null}
        />
      </div>
      <div className="cart-products">
        {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <p>{t("emptyCart")}</p>
            <Button
              content={t("goShop")}
              color="blue"
              size="large"
              onClick={() => history.push("/farmer/home")}
            />
          </div>
        ) : (
          cartProducts.map((product) => {
            return (
              <div className="card">
                <div className="card-content">
                  <div className="mini-card">
                    <div className="mini-img">
                      <img src={product.imageURL} alt="Product name" />
                    </div>
                    <div className="mini-info">
                      <h2>{product.productName}</h2>
                      <h3>{supplierMappings[product.supplierID]}</h3>
                      <p>
                        <Icon name="rupee sign" />
                        <span>
                          {parseFloat(product.productPrice).toFixed(2)}
                        </span>
                        <span className="product-kg">/ kg</span>
                      </p>
                      <Button
                        content={t("removeFromCart")}
                        color="red"
                        onClick={() => handleRemoveItem(product.barCode)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {cartProducts.length !== 0 && (
        <div className="button-fixed">
          <Button
            content={t("checkout")}
            fluid
            color="blue"
            size="huge"
            onClick={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};

export default CartScreen;
