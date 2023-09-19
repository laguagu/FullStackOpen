import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../NotificationContext";

const Notification = () => {
  const { notification, dispatch } = useContext(NotificationContext);
  const [visibleNotification, setVisibleNotification] = useState(notification);

  useEffect(() => {
    if (notification) {
      setVisibleNotification(notification);
      const timer = setTimeout(() => {
        setVisibleNotification(null);
        dispatch({ type: 'CLEAR' });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (!visibleNotification) return null;

  return (
    <div style={style}>
      {visibleNotification}
    </div>
  );
};

export default Notification;