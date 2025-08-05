import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import {
  TbCheck,
  TbX,
  TbAlertTriangle,
  TbInfoCircle,
  TbTrash,
  TbExclamationMark,
} from "react-icons/tb";
import { Button } from "./Button";
import { FaExclamation } from "react-icons/fa";

const NotificationModal = ({
  isOpen,
  onClose,
  type = "info", // 'success', 'error', 'warning', 'info', 'confirm'
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = false,
  autoClose = false,
  autoCloseDelay = 3000,
  icon: CustomIcon,
}) => {
  // Auto close effect
  React.useEffect(() => {
    if (isOpen && autoClose && (type === "success" || type === "info")) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose, type]);

  const getConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CustomIcon || TbCheck,
          iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
          borderColor: "border-emerald-200",
          bgColor: "bg-emerald-50",
          titleColor: "text-emerald-900",
          messageColor: "text-emerald-700",
          primaryButton:
            "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800",
        };
      case "error":
        return {
          icon: CustomIcon || TbX,
          iconBg: "bg-gradient-to-br from-red-500 to-red-600",
          borderColor: "border-red-200",
          bgColor: "bg-red-50",
          titleColor: "text-red-900",
          messageColor: "text-red-700",
          primaryButton:
            "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
        };
      case "warning":
        return {
          icon: CustomIcon || TbAlertTriangle,
          iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
          borderColor: "border-amber-200",
          bgColor: "bg-amber-50",
          titleColor: "text-amber-900",
          messageColor: "text-amber-700",
          primaryButton:
            "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800",
        };
      case "confirm":
        return {
          icon: CustomIcon || FaExclamation,
          iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
          borderColor: "border-blue-300",
          bgColor: "bg-blue-50",
          titleColor: "text-blue-900",
          messageColor: "text-blue-700",
          primaryButton:
            "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
        };
      case "delete":
        return {
          icon: CustomIcon || TbTrash,
          iconBg: "bg-gradient-to-br from-red-500 to-red-600",
          borderColor: "border-red-200",
          bgColor: "bg-red-50",
          titleColor: "text-red-900",
          messageColor: "text-red-700",
          primaryButton:
            "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
        };
      default: // info
        return {
          icon: CustomIcon || TbInfoCircle,
          iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
          borderColor: "border-blue-200",
          bgColor: "bg-blue-50",
          titleColor: "text-blue-900",
          messageColor: "text-blue-700",
          primaryButton:
            "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] flex items-center justify-center z-[100] p-4 "
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 ${config.borderColor} overflow-hidden`}
          >
            {/* Header */}
            <div className={`${config.bgColor} px-4 pt-5 pb-3 }`}>
              <div className="flex items-start gap-4">
                <div className={`${config.iconBg} p-3 rounded-xl shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-bold ${config.titleColor} mb-1 font-lexend`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm ${config.messageColor} font-lexend leading-relaxed`}
                  >
                    {message}
                  </p>
                </div>

                {/* Close button (only for non-confirmation modals) */}
                {type !== "confirm" && type !== "delete" && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-white/50"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 justify-center">
                {/* Cancel/Secondary Button */}
                {(showCancel || type === "confirm" || type === "delete") && (
                  <button
                    onClick={handleCancel}
                    className="w-full px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    {cancelText}
                  </button>
                )}

                {/* Primary Button */}
                {type === "confirm" || type === "delete" || onConfirm ? (
                  <button
                    onClick={handleConfirm}
                    className={`w-full  px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 shadow-lg ${config.primaryButton}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {type === "delete" ? (
                        <TbTrash size={20} />
                      ) : (
                        <TbCheck size={20} />
                      )}
                      {confirmText}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className={`w-full px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-200 shadow-lg ${config.primaryButton}`}
                  >
                    {type === "error" ? "Try Again" : "OK"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
