import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Checkout.css";
import { Accordion, Icon, Button } from "semantic-ui-react";
import Spinner from "../../../../../components/Global/Loader/Loader";
import ProductMiniCard from "./components/ProductMiniCard";
import { FarmerContext } from "../../../../../Context/FarmerContext";
import { Context } from "../../../../../Context/Context";
import { placeOrder } from "../../../../../actions/actions";
import { useToast } from "../../../../../Context/ToastContext";
/**
 * Checkout screen.
 */
const Checkout = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedProducts, farmerData } = useContext(FarmerContext);
  const { isFullScreenLoaderVisible, setFullScreenLoader } = useContext(
    Context
  );
  const { supplierMappings } = useContext(Context);
  const [checkingProducts, setCheckingProducts] = useState([]);
  const history = useHistory();
  const { addToast } = useToast();

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  const handleSubtract = (product) => {
    let allProds = checkingProducts;
    let { quantity, totalPrice } = product;
    if (quantity !== 1) {
      quantity = quantity - 1;
    }
    totalPrice = quantity * product.productPrice;
    product.quantity = quantity;
    product.totalPrice = totalPrice;
    let idx = allProds.findIndex((p) => p.barCode === product.barCode);
    allProds.splice(idx, 1, product);
    setCheckingProducts(() => [...allProds]);
  };

  const handleAdd = (product) => {
    let allProds = checkingProducts;
    let { quantity, totalPrice } = product;
    quantity = quantity + 1;
    totalPrice = quantity * product.productPrice;
    product.quantity = quantity;
    product.totalPrice = totalPrice;
    let idx = allProds.findIndex((p) => p.barCode === product.barCode);
    allProds.splice(idx, 1, product);
    setCheckingProducts(() => [...allProds]);
  };

  const getFullTotal = () => {
    let total = 0;
    for (let p of checkingProducts) {
      total = total + p.totalPrice;
    }
    return total;
  };

  const handlePlaceOrder = () => {
    let order = {};
    let prods = [];
    try {
      for (let prod of checkingProducts) {
        let { productName, quantity, productPrice, supplierID } = prod;
        let filteredProductDetails = {
          productName,
          quantity,
          productPrice,
          supplierID,
        };
        prods.push(filteredProductDetails);
      }
      order.customerData = {
        customerName: farmerData.customerName,
        phoneNumber: farmerData.phoneNumber,
      };
      order.dropCoordinates = [13.0827, 80.2707];
      order.orderData = {
        orderPrice: getFullTotal(),
        products: prods,
      };
    } catch (error) {
      console.log(error);
      addToast({
        type: "error",
        message: "Can't place order at the moment",
      });
    }
    setFullScreenLoader(true);
    placeOrder(order)
      .then((res) => {
        setFullScreenLoader(false);
        console.log("Order placed response ", res.data);
        addToast({
          type: "success",
          message: "orderPlaced",
        });
        // farmer's homepage is yet to make
        // history.push("/farmer/home");
      })
      .catch((err) => {
        setFullScreenLoader(false);
        console.log("Place order ", err);
        addToast({
          type: "error",
          message: t("cannotOrder"),
        });
      });
  };

  useEffect(() => {
    const loadProductsToCheck = () => {
      let prods = selectedProducts;
      for (let prod of prods) {
        prod.quantity = 1;
        prod.totalPrice = prod.productPrice;
      }
      setCheckingProducts(prods);
    };
    loadProductsToCheck();
  }, [selectedProducts]);

  return (
    <div id="checkout">
      {isFullScreenLoaderVisible ? <Spinner /> : null}
      <div className="header">
        <div className="back-icon" onClick={() => history.goBack()}>
          <Icon name="arrow left" size="large" />
        </div>
        <p>checkout</p>
      </div>
      {/* Product summary */}
      <div className="product-summary">
        <div className="card">
          <div className="card-header">summary</div>
          <div className="card-content">
            <Accordion fluid styled>
              {checkingProducts.map((prod, i) => {
                return (
                  <>
                    <Accordion.Title
                      active={activeIndex === i}
                      index={i}
                      onClick={handleClick}
                    >
                      <div className="accord-title">
                        <div className="card-title">
                          <Icon name="dropdown" />
                          <p>{prod.productName}</p>
                        </div>
                        <div className="card-price">
                          <Icon name="rupee sign" />
                          <p>{parseFloat(prod.totalPrice).toFixed(2)}</p>
                        </div>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i}>
                      <ProductMiniCard
                        product={prod}
                        supplier={supplierMappings[prod.supplierID]}
                        onSubtract={handleSubtract}
                        onAdd={handleAdd}
                      />
                    </Accordion.Content>
                  </>
                );
              })}
            </Accordion>
          </div>
          <div className="card-footer">
            <div className="full-total">
              <div>gTotal:</div>
              <div className="card-price">
                <Icon name="rupee sign" />
                <p>{parseFloat(getFullTotal()).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Customer details */}
      <div className="customer-summary">
        <div className="card">
          <div className="card-header">customer</div>
          <div className="card-content">
            <p>
              contact:<span>9898989898</span>
            </p>
            <p>
              address:<span>123, ABC Street, XYZ City.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="button-fixed">
        <Button
          content="placeOrder"
          fluid
          color="blue"
          size="huge"
          onClick={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default Checkout;
