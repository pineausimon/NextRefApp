import { createContext, useContext, useState, type ReactNode } from "react";

type Notification = {
  type: "success" | "error" | "info" | "warning";
  message: string;
};

const alertClassMap = {
  success: "alert-success",
  error: "alert-error",
  info: "alert-info",
  warning: "alert-warning",
};

interface NotificationContextType {
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
  notification: Notification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Notification) => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 5000);
  };

  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification, notification }}>
      {children}
      {notification && (
        <div className={`alert ${alertClassMap[notification.type]} fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg w-full max-w-md z-50`}>
            <span>{notification.message}</span>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
