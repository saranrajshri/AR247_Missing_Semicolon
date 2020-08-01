import React, { useEffect } from "react";
import "./Toast.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../Context/ToastContext";

/**
 * Toast component to show toast.
 * @param {Object} content Type and message of toast
 * @param {Number} id Id of the toast
 */
const Toast = ({ content, id }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={`notification-container top-left visible`}>
      <div
        className={`notification toast top-left ${content.type.toLowerCase()}`}
      >
        <button onClick={() => removeToast(id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="notification-icon">
          {content.type.toLowerCase() === "success" ? (
            <FontAwesomeIcon icon={faCheckCircle} className="toast-icon" />
          ) : (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="toast-icon"
            />
          )}
        </div>
        <div>
          <p className="notification-title">{content.type}</p>
          <p className="notification-message">{content.message}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  /**
   * Type and message of the toast.
   */
  content: PropTypes.exact({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  /**
   * Id of toast
   */
  id: PropTypes.number.isRequired
};

export default Toast;
