import React, { useState, useContext } from "react";


import { Search } from "semantic-ui-react";
import ProductsTable from "./components/ProductsTable";
import EditProductModal from "./components/EditProductModal";


import { Context } from "../../../../../Context/Context";
import { deleteProduct, updateProduct } from "../../../../../actions/actions";

const ManageProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(undefined);
  const { products, supplierData, setAlert, setFullScreenLoader } = useContext(
    Context
  );

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      filterProducts();
    } else {
      setFilteredProducts([]);
    }
  };
  // Filter products by product names
  const filterProducts = () => {
    let filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  // Set product to edit and open edit modal.
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModal(true);
  };

  const handleDelete = (productBarCode) => {
    deleteProduct(productBarCode, supplierData._id).then((res) => {
      if (res.status === 200) {
        setAlert({
          message: "Deleted Successfully",
          isOpen: true,
          alertType: "positive",
        });
      } else {
        setAlert({
          message: "Failed to delete",
          isOpen: false,
          alertType: "negative",
        });
      }
    });
  };



  return (
    <div className="p-5">
      <p className="title text-dark">Manage Products</p>
      {/* Search bar */}
      <div className="search-bar">
        <Search
          onSearchChange={handleSearchChange}
          open={false}
          placeholder="Search Here"
          value={searchValue}
          minCharacters="2"
        />
      </div>
      
      {/* Products table */}
      <div className="table-wrapper">
        {filteredProducts.length === 0 ? (
          <ProductsTable
            products={products}
            handleEdit={handleEdit}
            handleDelete={(productBarCode) => handleDelete(productBarCode)}
          />
        ) : (
          <ProductsTable
            products={filteredProducts}
            handleEdit={handleEdit}
            handleDelete={(productBarCode) => handleDelete(productBarCode)}
          />
        )}
      </div>
      {/*TODO Edit product modal */}
      
    </div>
  );
};
export default ManageProducts;
