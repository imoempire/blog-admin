import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const NotificationContext = createContext();
let timeoutId;
export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    type: "",
    value: "",
  });
  const [background, setBackground] = useState("bg-red-500");

  const notRef = useRef();
  const updateNotification = (type, value) => {
    if (!type || !value) return;
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setBackground("bg-red-500");
        break;
      case "warning":
        setBackground("bg-yellow-500");
        break;
      case "success":
        setBackground("bg-green-500");
        break;
      default:
        setBackground("bg-red-500");
    }
    setNotification({ type, value });
    timeoutId = setTimeout(() => {
      setNotification({ type: "", value: "" });
    }, 3000);
  };

  useEffect(() => {
    notRef.current?.classList.remove("mb-10", "opacity-0");
    notRef.current?.classList.add("mb-6", "opacity-1");
  }, [notification.value]);

  return (
    <>
      <NotificationContext.Provider value={{ updateNotification }}>
        {children}
      </NotificationContext.Provider>
      {notification.value ? (
        <div className="absolute bottom-0 left-0 px-10">
          <p
            ref={notRef}
            className={
              background +
              " rounded mb-5 p-2 text-white opacity-0 text-center transition-all duration-150 ease-linear"
            }
          >
            {notification.value}
          </p>
        </div>
      ) : null}
    </>
  );
}

export const useNotification = () => useContext(NotificationContext);
