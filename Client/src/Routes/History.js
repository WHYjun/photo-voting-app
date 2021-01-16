import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(async () => {
    const result = await axios
      .get("/history")
      .then((res) => res.history)
      .catch((err) => console.log(err));
    setHistory(result);
  }, []);

  console.log(history);

  return (
    <>
      {history && history.length > 0 && (
        <ul>
          {history.map((h) => {
            <li>
              {h.username}:<img src={h.winner}></img>
            </li>;
          })}
        </ul>
      )}
    </>
  );
};

export default History;
