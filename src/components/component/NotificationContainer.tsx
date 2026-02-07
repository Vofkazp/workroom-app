import React, {CSSProperties} from "react";
import {useNotifications} from "../../services/NitificationProvider";
import Button from "./Button";


export default function NotificationContainer() {
  const {notifications, removeNotification} = useNotifications();

  return (
      <div className="notification-container">
        {notifications.map(item =>
            <div key={item.id} className={`notification-message ${item.type} ${item.isDeleted ? "delete" : ""}`}
                 style={{"--timer": `${item.timeout}ms`} as CSSProperties}>
              <Button click={() => removeNotification(item.id)} classList="btn only-icon" path="close"/>
              <p className="notification-message-text">{item.message}</p>
            </div>
        )}
      </div>
  );
}