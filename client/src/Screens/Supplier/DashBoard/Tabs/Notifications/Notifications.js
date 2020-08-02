import React, { useState } from "react";
import { Context } from "../../../../../Context/Context";
import { Message } from "semantic-ui-react";

// doubt regarding how to use states here
// State = { visible: true };
// const handleDismiss = () => {
//   this.setState({ visible: false });
// };
const Notifications = () => {
  const notifications = [
    { header: "Hi guys", content: "This is an example for notification" },
    {
      header: "Hello guys",
      content: "This is an example for 2nd notification",
    },
    {
      header: "Vanakkam guys",
      content: "This is an example for 3rd notification",
    },
  ];
  const messages = notifications.map((d) => (
    <Message header={d.header} content={d.content} />
  ));
  return <div>{messages}</div>;
};
export default Notifications;
