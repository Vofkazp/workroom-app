import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";

type NotificationType = "success" | "warning" | "info";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  timeout: number;
  isDeleted: boolean;
}

interface NotificationsContext {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType, timeout?: number) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationsContext | null>(null);

export default function NotificationProvider({children}: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timers = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const addNotification = useCallback((message: string, type: NotificationType = "success", timeout: number = 3000) => {
    const id: number = Date.now();
    setNotifications(prev => [...prev, {id, message, type, timeout, isDeleted: false}]);
    if (timeout > 0) {
      const timer = setTimeout(() => removeNotification(id), timeout);
      timers.current.set(+id, timer);
    }
  }, [])

  const removeNotification = useCallback((id: number) => {
    const timer = timers.current.get(+id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setNotifications(prev => prev.map(item => item.id === id ? {...item, isDeleted: true} : item));
    setTimeout(() => {
      setNotifications(prev => prev.filter((item) => item.id !== id));
    }, 200);
  }, [])

  return (
      <NotificationContext.Provider value={{notifications, addNotification, removeNotification}}>
        {children}
      </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used inside NotificationProvider');
  }
  return ctx;
}