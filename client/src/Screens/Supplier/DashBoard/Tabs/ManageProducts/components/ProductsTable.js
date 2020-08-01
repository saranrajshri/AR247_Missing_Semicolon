import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";
/**
 * Display products in table with edit and delete options.
 * @component
 * @param {Props} props
 */
const ProductsTable = (props) => {
  const { products, handleEdit, handleDelete } = props;
  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Barcode</Table.HeaderCell>
          <Table.HeaderCell>Product Name</Table.HeaderCell>
          <Table.HeaderCell>Price / [KG]</Table.HeaderCell>
          <Table.HeaderCell>Quantity [KG]</Table.HeaderCell>
          <Table.HeaderCell>Image URL</Table.HeaderCell>
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.barCode}>
            <Table.Cell>{product.barCode}</Table.Cell>
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell>
              {parseFloat(product.productPrice).toFixed(2)}
            </Table.Cell>
            <Table.Cell>{product.availableQuantity}</Table.Cell>
            <Table.Cell>
              <a href={product.imageURL} target="blank">
                {product.imageURL.substring(0, 20) + "..."}
              </a>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Button onClick={() => handleEdit(product)}>
                <Icon name="edit" fitted color="blue" />
              </Button>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Button onClick={() => handleDelete(product.barCode)}>
                <Icon name="delete" fitted color="red" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

ProductsTable.propTypes = {
  /**
   * Array of product objects
   */
  products: PropTypes.array.isRequired,
  /**
   * Function to handle edit button.
   */
  handleEdit: PropTypes.func.isRequired,
  /**
   * Function to handle delete button.
   */
  handleDelete: PropTypes.func.isRequired,
};

export default ProductsTable;
