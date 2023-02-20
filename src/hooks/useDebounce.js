import {useEffect, useState} from "react";

export default function useDebounce(initialValue = "", delay = 1000) {
  const [deBounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);
  return deBounceValue;
}
