import React, { useState, useContext, useCallback, createContext } from "react";
import ToastContainer from "../components/Global/Toast/ToastContainer";

const ToastContext = createContext(null);
// ID of first toast.
let id = 1;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  // Add a toast content to toasts array and increment ID.
  const addToast = useCallback(
    (content) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content
        }
      ]);
    },
    [setToasts]
  );
  // Remove the toast by ID.
  const removeToast = useCallback(
    (id) => {
      // Filter and set all the toast except the toast with given ID.
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};
// Create a hook to access toast provider functions.
const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
