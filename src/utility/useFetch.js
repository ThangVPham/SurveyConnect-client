import { useState, useEffect } from "react";

function useFetch(url, token, ownerView) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState(false);
  const requestHeaders = token
    ? {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        ownerView: ownerView,
      }
    : {
        "Content-Type": "application/json",
      };
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        setErr(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
