import React from "react";
import { Table } from "semantic-ui-react";

const DriversTable = () => {
  const driversInfo = [
    { driverName: "Test driver", ordersTaken: 13 },
    { driverName: "Test driver", ordersTaken: 8 },
    { driverName: "Test driver", ordersTaken: 7 }
  ];
  return (
    <div>
      <Table celled striped structured fixed>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell rowSpan="2">Driver</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Orders Taken</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {driversInfo.map((info) => (
            <Table.Row key={info.driverName}>
              <Table.Cell>{info.driverName}</Table.Cell>
              <Table.Cell>{info.ordersTaken}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DriversTable;
