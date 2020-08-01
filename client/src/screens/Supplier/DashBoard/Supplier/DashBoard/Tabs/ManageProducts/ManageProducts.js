import React, { useState, useContext } from "react";

import "./ManageProducts.css";

import { Search } from "semantic-ui-react";
import ProductsTable from "./components/ProductsTable";

import { Context } from "../../../../../Context/Context";
import { deleteProduct, updateProduct } from "../../../../../actions/actions";

const ManageProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(undefined);
  const { products, supplierData, setAlert, setFullScreenLoader } = useContext(
    Context
  );

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
      {/*TODO Search bar */}
      
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
