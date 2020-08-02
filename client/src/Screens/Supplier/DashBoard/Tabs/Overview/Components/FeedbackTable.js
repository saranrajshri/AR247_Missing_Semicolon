import React from "react";
import { Table } from "semantic-ui-react";
const FeedbackTable = (props) => {
  const orders = [
    {
      orderID: "221",
      feedback: "The seed is amazingly good.I got better yield.",
      sentiment: "positive",
    },
    {
      orderID: "222",
      feedback: "The seed is very worst quality.I got worst yield.",
      sentiment: "negative",
    },
    {
      orderID: "223",
      feedback: "The seed is good.I got better yield.",
      sentiment: "positive",
    },
    {
      orderID: "224",
      feedback:
        "Ithellam oru seed nu vikka vanthutan.kaila maatna setha da mavane.meet you at consumer court",
      sentiment: "negative",
    },
  ];
  return (
    <Table celled striped structured fixed>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell rowSpan="2">Order ID</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Customer feedback</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Sentiment</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order) => (
          <Table.Row key={order.orderID}>
            <Table.Cell>{order.orderID}</Table.Cell>
            <Table.Cell>{order.feedback}</Table.Cell>
            <Table.Cell>{order.sentiment}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default FeedbackTable;
