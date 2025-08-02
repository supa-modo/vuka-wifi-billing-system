import React, { createContext, useContext, useState } from "react";
import NotificationModal from "../components/ui/NotificationModal";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: null,
    onCancel: null,
    showCancel: false,
    autoClose: false,
    autoCloseDelay: 3000,
    icon: null,
  });

  const showNotification = ({
    type = "info",
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    showCancel = false,
    autoClose = false,
    autoCloseDelay = 3000,
    icon,
  }) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      showCancel,
      autoClose,
      autoCloseDelay,
      icon,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  // Convenience methods
  const showSuccess = (title, message, options = {}) => {
    showNotification({
      type: "success",
      title,
      message,
      autoClose: true,
      autoCloseDelay: 3000,
      ...options,
    });
  };

  const showError = (title, message, options = {}) => {
    showNotification({
      type: "error",
      title,
      message,
      ...options,
    });
  };

  const showWarning = (title, message, options = {}) => {
    showNotification({
      type: "warning",
      title,
      message,
      ...options,
    });
  };

  const showInfo = (title, message, options = {}) => {
    showNotification({
      type: "info",
      title,
      message,
      autoClose: true,
      autoCloseDelay: 4000,
      ...options,
    });
  };

  const showConfirm = (title, message, onConfirm, options = {}) => {
    showNotification({
      type: "confirm",
      title,
      message,
      onConfirm,
      confirmText: "Confirm",
      cancelText: "Cancel",
      ...options,
    });
  };

  const showDeleteConfirm = (title, message, onConfirm, options = {}) => {
    showNotification({
      type: "delete",
      title,
      message,
      onConfirm,
      confirmText: "Delete",
      cancelText: "Cancel",
      ...options,
    });
  };

  const value = {
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showDeleteConfirm,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        confirmText={notification.confirmText}
        cancelText={notification.cancelText}
        onConfirm={notification.onConfirm}
        onCancel={notification.onCancel}
        showCancel={notification.showCancel}
        autoClose={notification.autoClose}
        autoCloseDelay={notification.autoCloseDelay}
        icon={notification.icon}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export default useNotification;
