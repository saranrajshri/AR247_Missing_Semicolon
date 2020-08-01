import React, { useContext } from "react";
import { Context } from "../../../../../Context/Context";

const Notifications = () => {
  const { notifications } = useContext(Context);
  return <p>hello</p>;
};
export default Notifications;
