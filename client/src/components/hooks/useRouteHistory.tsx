import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteHistory = () => {
  const location = useLocation();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  return history;
};

export default useRouteHistory;
