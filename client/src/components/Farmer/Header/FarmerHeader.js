import React, { useContext, useState } from "react";
import "./FarmerHeader.css";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faFilter,
  faSeedling
} from "@fortawesome/free-solid-svg-icons";
import { Button, Search, Dropdown } from "semantic-ui-react";
import { FarmerContext } from "../../../Context/FarmerContext";
import isEmpty from "../../../Utils/isEmpty";
import { useTranslation } from "react-i18next";

/**
 * Render's the results of search.
 * @param {Object} product
 */
const resultRenderer = (product) => <p>{product.productName}</p>;

/**
 * Header bar for farmer portal.
 * @param {Props} props
 */
const FarmerHeader = (props) => {
  const {
    searchValue,
    results,
    handleResultSelect,
    handleSearchChange,
    searchProduct
  } = props;
  const { farmerData, setFarmerData } = useContext(FarmerContext);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("en");

  const handleLogout = () => {
    localStorage.removeItem("CUSTOMER_AUTH_TOKEN");
    setFarmerData({});
    history.push("/farmer/home");
  };

  const trigger = <div className="avatar">GP</div>;

  const options = [
    {
      key: "MyOrders",
      text: (
        <span onClick={() => history.push("/farmer/orders")}>
          {t("myOrders")}
        </span>
      ),
      disabled: false
    },
    {
      key: "logout",
      text: <span onClick={handleLogout}>{t("logout")}</span>,
      disabled: false
    }
  ];

  const handleLocaleChange = (e, { value }) => {
    setLocale(value);
    i18n.changeLanguage(value);
  };

  const langOptions = [
    {
      key: "en",
      text: "Eng",
      value: "en"
    },
    {
      key: "hin",
      text: "हिन्दी",
      value: "hin"
    },
    {
      key: "odia",
      text: "ଓଡିଆ",
      value: "odia"
    },
    {
      key: "gujarati",
      text: "ગુજરાતી",
      value: "gujarati"
    },
    {
      key: "kannada",
      text: "ಕನ್ನಡ",
      value: "kannada"
    },
    {
      key: "tamil",
      text: "தமிழ்",
      value: "tamil"
    },
    {
      key: "telugu",
      text: "తెలుగు",
      value: "telugu"
    },
    {
      key: "punjabi",
      text: "ਪੰਜਾਬੀ",
      value: "punjabi"
    },
    {
      key: "marathi",
      text: "मराठी",
      value: "marathi"
    },
    {
      key: "bengali",
      text: "বাংলা",
      value: "bengali"
    }
  ];

  return (
    <>
      <div id="farmer-header">
        <div className="logo-bar">
          <div className="logo-name">
            <FontAwesomeIcon icon={faSeedling} className="icon" />
            <span>mr. jute</span>
          </div>

          <div className="bar-actions">
            <Dropdown
              defaultValue={locale}
              compact
              selection
              options={langOptions}
              onChange={handleLocaleChange}
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                borderColor: "transparent"
              }}
            />
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
      <div id="search-bar-container">
        <Search
          fluid
          placeholder={t("searchPlace")}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={results}
          value={searchValue}
          icon={<Button icon="search" color="yellow" onClick={searchProduct} />}
          resultRenderer={resultRenderer}
        />
        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
      </div>
    </>
  );
};

FarmerHeader.propTypes = {
  /**
   * Value in search input.
   */
  searchValue: PropTypes.string.isRequired,
  /**
   * Results array of search.
   */
  results: PropTypes.array.isRequired,
  /**
   * Function to handle search value change.
   */
  handleSearchChange: PropTypes.func.isRequired,
  /**
   * Function for handle selection of value in result.
   */
  handleResultSelect: PropTypes.func.isRequired,
  /**
   * Search the product and set it..
   */
  searchProduct: PropTypes.func.isRequired
};

export default FarmerHeader;
