import { useDispatch } from "react-redux";
import { setNotification, clearNotification } from "../reducers/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (message, duration = 5000) => {
    dispatch(setNotification(message));
    console.log("Showing notification:", message); 
    // Poista notifikaatio määritellyn ajan kuluttua
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };

  return { showNotification };
};

export default useNotification;
