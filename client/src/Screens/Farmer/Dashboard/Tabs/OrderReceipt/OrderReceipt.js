import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Button,
  Icon,
  Form,
  TextArea,
  Dropdown,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../../../Context/ToastContext";
const OrderReceipt = () => {
  const history = useHistory();
  const [feedback, setFeedback] = useState("");
  const { addToast } = useToast();

  const handleFeedback = (e, { value }) => {
    setFeedback(value);
  };
  const handleSubmit = () => {
    addToast({ type: "success", message: "Feedback submitted." });
  };
  const options = [
    { text: "Order not recieved" },
    { text: "Damaged order" },
    { text: "Wrong order" },
  ];
  return (
    <div>
      <div id="farmer-header">
        <div className="logo-bar">
          <div className="logo-name">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icon"
              onClick={() => history.goBack()}
            />
          </div>
        </div>
      </div>
      <div
        className="receipt"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Card style={{ width: "90%" }}>
          <Card.Content>
            <Card.Header
              style={{
                marginLeft: "0px",
                paddingTop: "4px",
                paddingBottom: "7px",
                height: "auto",
              }}
            >
              Test product
            </Card.Header>
            <Card.Meta style={{ fontSize: "16px", marginTop: "10px" }}>
              <Icon name="rupee sign" />
              120.00
            </Card.Meta>
            <Card.Description>
              Delivered at: <strong>11.00PM, 01-08-2020</strong> by{" "}
              <strong>Test Driver.</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                content="Receipt"
                icon="arrow alternate circle down"
              />
              <Button basic color="red">
                <Dropdown
                  options={options}
                  text="Problem?"
                  floating
                  labeled
                  error
                ></Dropdown>
              </Button>
            </div>
          </Card.Content>
        </Card>
        <div className="card" style={{ width: "95%" }}>
          <div className="card-header">Submit Feedback</div>
          <div className="card-content">
            <p>Help us by submittimg your feedback?</p>
            <Form>
              <Form.Field
                id="form-textarea-control-opinion"
                control={TextArea}
                placeholder="Feedback"
                name="feedback"
                value={feedback}
                onChange={handleFeedback}
              />
              <Form.Field
                id="form-button-control-public"
                control={Button}
                content="Send"
                onClick={handleSubmit}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
