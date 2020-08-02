import React, { useState, useContext } from "react";
import { Context } from "../../../../../Context/Context";
import { Message } from "semantic-ui-react";

// doubt regarding how to use states here
// State = { visible: true };
// const handleDismiss = () => {
//   this.setState({ visible: false });
// };
const Notifications = () => {
  const { notifications } = useContext(Context);
  const messages = notifications.map((message, index) => (
    <Message
      warning
      key={index}
      header={message.title}
      content={message.message}
    />
  ));
  return <div>{messages}</div>;
};
export default Notifications;
