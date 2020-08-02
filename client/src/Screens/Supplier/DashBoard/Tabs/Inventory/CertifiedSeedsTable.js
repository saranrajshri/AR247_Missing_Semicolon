import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";
/**
 * Display certified seeds in table.
 * @component
 * @param {Props} props
 */
const CertifiedSeedsTable = (props) => {
  const { certifiedSeeds, handleDelete } = props;
  const [inventory, setInventory] = useState(certifiedSeeds);

  useEffect(() => {
    const setData = () => {
      console.log("ss", certifiedSeeds);
      setInventory(certifiedSeeds);
    };
    setData();
  }, [certifiedSeeds]);
  return (
    <Table celled striped structured fixed>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell rowSpan="2">ID</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Producer Name</Table.HeaderCell>
          <Table.HeaderCell rowsSpan="2">Contact</Table.HeaderCell>
          <Table.HeaderCell rowsSpan="2">Address</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Quantity</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Expiry Date</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {inventory.map((seeds) => (
          <Table.Row key={seeds._id}>
            <Table.Cell>{seeds._id}</Table.Cell>
            <Table.Cell>{seeds.producerName}</Table.Cell>
            <Table.Cell>{seeds.producerContact}</Table.Cell>
            <Table.Cell>{seeds.producerAddress}</Table.Cell>
            <Table.Cell>{seeds.quantity}</Table.Cell>
            <Table.Cell singleLine>{seeds.expiresAt}</Table.Cell>
            <Table.Cell textAlign="center">
              <Button onClick={() => handleDelete(seeds._id)}>
                <Icon name="delete" fitted color="red" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

CertifiedSeedsTable.propTypes = {
  /**
   * Array of seeds objects
   */
  certifiedSeeds: PropTypes.array.isRequired,
  /**
   * Function to handle delete button.
   */
  handleDelete: PropTypes.func.isRequired
};

export default CertifiedSeedsTable;
