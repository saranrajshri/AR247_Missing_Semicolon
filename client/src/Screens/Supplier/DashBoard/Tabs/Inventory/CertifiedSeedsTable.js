import React from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";
/**
 * Display certified seeds in table.
 * @component
 * @param {Props} props
 */
const CertifiedSeedsTable = (props) => {
  const { certifiedSeeds, handleDelete } = props;
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
        {certifiedSeeds.map((seeds) => (
          <Table.Row key={seeds.seedsID}>
            <Table.Cell>{seeds.seedsID}</Table.Cell>
            <Table.Cell>{seeds.producerName}</Table.Cell>
            <Table.Cell>{seeds.contact}</Table.Cell>
            <Table.Cell>{seeds.address}</Table.Cell>
            <Table.Cell>{seeds.quantity}</Table.Cell>
            <Table.Cell singleLine>{seeds.expiryDate}</Table.Cell>
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
  handleDelete: PropTypes.func.isRequired,
};

export default CertifiedSeedsTable;
