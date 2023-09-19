/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return action.payload;
    case "VOTE":
      return action.payload;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};