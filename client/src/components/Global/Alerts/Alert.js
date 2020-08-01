import React, { useEffect } from "react";

// Semantic UI
import { Message } from "semantic-ui-react";

// Style
import "./Alert.css";

const Alert = ({ handleClose, alertType, message }) => {
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    sleep(2000).then(() => {
      handleClose();
    });
  }, []);
  if (alertType === "positive") {
    return (
      <Message positive className="message">
        <p>{message}</p>
      </Message>
    );
  } else {
    return (
      <Message negative className="message">
        <p>{message}</p>
      </Message>
    );
  }
};

export default Alert;
