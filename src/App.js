import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { useQuery } from "react-query";

export default function App() {
  return (
    <>
      <Exchange />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

const fetchExchange = async currency => {
  const response = await fetch(
    `https://api.ratesapi.io/api/latest?base=${currency}`
  );
  const data = await response.json();
  return data;
};

function Exchange() {
  const [currency, setCurrency] = useState("CAD");
  const { status, data } = useQuery([currency], fetchExchange, {
    refetchAllOnWindowFocus: false
  });

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>there was an error... sorry</div>;

  return (
    <div>
      <button onClick={() => setCurrency("CAD")}>CAD</button>
      <button onClick={() => setCurrency("USD")}>USD</button>
      <button onClick={() => setCurrency("EUR")}>EUR</button>

      <h1>Showing Currency {currency}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
