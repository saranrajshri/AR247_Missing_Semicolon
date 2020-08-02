import React from "react";
import { Card, Image, GridColumn, GridRow } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import DetailsModal from "./TrackOrderModal"
const CurrentOrders = () => (
  <div>
    <GridColumn>
      <GridRow style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "90%", marginTop: "10%" }}>
          <Image
            src="https://5.imimg.com/data5/WC/QH/MY-45792250/jute-seeds-250x250.jpg"
            style={{
              width: "75%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
            wrapped
            ui={false}
          />
          <Card.Content>
            <h2>Test Product 1</h2>
            <span style={{ paddingLeft: "10px" }}>Test</span>
          </Card.Content>
          <Card.Content extra></Card.Content>
          <Card.Description
            style={{ marginBottom: "10px", marginLeft: "35px" }}
          >
            <span style={{ fontWeight: "bold" }}>
              Order Status :
              <span style={{ color: "green", paddingLeft: "15px" }}>
                Dispatched
              </span>
            </span>
          </Card.Description>
          <Card.Content extra>
            <DetailsModal/>
          </Card.Content>
        </Card>
      </GridRow>
    </GridColumn>
  </div>
);

export default CurrentOrders;
