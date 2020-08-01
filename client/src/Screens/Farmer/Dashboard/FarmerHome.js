import React, { useContext, useState, useEffect } from "react";
import { ProductsView } from "./Tabs";
import Spinner from "../../../components/Global/Loader/Loader";
import FarmerHeader from "../../../components/Farmer/Header/FarmerHeader";
import { FarmerContext } from "../../../Context/FarmerContext";
import { getAllProducts, getSupplierMappings } from "../../../actions/actions";
import { Context } from "../../../Context/Context";
import isEmpty from "../../../Utils/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

/**
 * Farmer home screen wrapper.
 */
const FarmerHome = () => {
  const {
    isFullScreenLoaderVisible,
    products,
    setProducts,
    setCart,
    farmerData
  } = useContext(FarmerContext);
  const { setSupplierMappings } = useContext(Context);
  const [allProducts, setAllProducts] = useState(products);
  const [searchResults, setSearchResults] = useState(products);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const handleResultSelect = (e, { result }) =>
    setSearchValue(result.productName);
  const handleSearchChange = (e, { value }) => {
    setSearchValue(value);

    setTimeout(() => {
      if (value.length < 1) return setSearchResults(products);

      let results = searchResults.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    }, 300);
  };

  const searchProduct = () => {
    setAllProducts(searchResults);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchResults(products);
    setAllProducts(products);
  };

  useEffect(() => {
    const getProducts = () => {
      getAllProducts()
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getMappings = () => {
      getSupplierMappings()
        .then((res) => {
          setSupplierMappings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCart = () => {
      if (!isEmpty(farmerData)) {
        setCart(() => [...farmerData.cart]);
      }
    };
    getProducts();
    getMappings();
    getCart();
  }, []);

  useEffect(() => setAllProducts(products), [products]);

  return (
    <div>
      <FarmerHeader
        handleResultSelect={handleResultSelect}
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
        results={searchResults}
        searchProduct={searchProduct}
      />
      <div>
        {/* Component */}
        {allProducts.length !== products.length && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#ffffff",
              height: "30px"
            }}
          >
            <FontAwesomeIcon icon={faTimes} onClick={clearSearch} />
            <p style={{ paddingLeft: "20px" }}>
              {t("sresults")}: {searchValue}
            </p>
          </div>
        )}
        <ProductsView products={allProducts} />
      </div>
      {/* Loader */}
      {isFullScreenLoaderVisible ? <Spinner /> : null}
    </div>
  );
};

export default FarmerHome;
