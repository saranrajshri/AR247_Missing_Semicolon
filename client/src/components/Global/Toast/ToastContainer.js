import React from "react";
import { createPortal } from "react-dom";
import "./Toast.css";
import Toast from "./Toast";
import PropTypes from "prop-types";
/**
 * Container for the toast elements.
 * @param {Array.<Object>} toasts Array of toast content.
 */
const ToastContainer = ({ toasts }) => {
  // Use portal so that the toast is directly at the begining of body.
  return createPortal(
    <div className="toast-container">
      {toasts.map((item, key) => {
        return <Toast key={key} id={item.id} content={item.content} />;
      })}
    </div>,
    document.body
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ToastContainer;
