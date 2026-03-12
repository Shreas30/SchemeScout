import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Check if item exists AND is not the string "undefined"
      if (item && item !== "undefined") {
        return JSON.parse(item);
      }
      return initialValue;
    } catch (error) {
      console.error("LocalStorage Parse Error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage Save Error:", error);
    }
  }, [key, value]);

  return [value, setValue];
}