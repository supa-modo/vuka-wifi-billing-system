import React from "react";
import { useNotification } from "../../hooks/useNotification.jsx";
import { Button } from "./Button";

const NotificationDemo = () => {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showDeleteConfirm,
  } = useNotification();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Notification System Demo
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          onClick={() =>
            showSuccess("Success!", "Operation completed successfully.")
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Success
        </Button>

        <Button
          onClick={() =>
            showError("Error!", "Something went wrong. Please try again.")
          }
          className="bg-red-600 hover:bg-red-700"
        >
          Error
        </Button>

        <Button
          onClick={() =>
            showWarning("Warning!", "This action may have consequences.")
          }
          className="bg-amber-600 hover:bg-amber-700"
        >
          Warning
        </Button>

        <Button
          onClick={() =>
            showInfo("Info", "Here's some useful information for you.")
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info
        </Button>

        <Button
          onClick={() =>
            showConfirm(
              "Confirm Action",
              "Are you sure you want to proceed?",
              () => showSuccess("Confirmed!", "Action completed successfully.")
            )
          }
          className="bg-purple-600 hover:bg-purple-700"
        >
          Confirm
        </Button>

        <Button
          onClick={() =>
            showDeleteConfirm(
              "Delete Item",
              "This action cannot be undone.",
              () =>
                showSuccess("Deleted!", "Item has been permanently deleted.")
            )
          }
          className="bg-red-800 hover:bg-red-900"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NotificationDemo;
