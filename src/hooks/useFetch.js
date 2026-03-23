import { useState, useEffect } from "react";

const useFetch = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetch;