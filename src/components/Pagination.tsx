import React from "react";
import { useState, useEffect } from "react";

interface props {
  data?: any;
}

function Pagination({ data }: props) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const result = data?.totalResults;
    if (result != undefined) {
      setLength(Math.ceil(result / 10));
    }
  }, [data]);

  const Result = () => {
    for (let i = 0; i < length; i++) {
      <button>{i}</button>;
    }
  };

  return <div></div>;
}

export default Pagination;
