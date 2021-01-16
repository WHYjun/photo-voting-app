import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Cell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
`;

const Row = styled.tr`
  &:hover {
    background-color: #ddd;
  }
`;

const Table = styled.table`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  border: 3px solid #ddd;
`;

const Text = styled.text`
  font-size: 30px;
  text-align: center;
  margin: 20px auto;
  display: block;
`;

const UserName = styled.text`
  font-size: 20px;
  text-align: center;
  display: block;
`;

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(async () => {
    await axios
      .get("/history")
      .then((res) => {
        setHistory(res.data.history);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderHeader = () => {
    let headerElement = ["USERNAME", "WINNER"];

    return headerElement.map((key, index) => {
      return <Cell key={index}>{key}</Cell>;
    });
  };

  const renderBody = () => {
    let rowKey = 0;
    return (
      history &&
      history.map(({ username, winner }) => {
        rowKey++;
        return (
          <Row key={rowKey}>
            <Cell>
              <UserName>{username}</UserName>
            </Cell>
            <Cell>
              <img src={winner} />
            </Cell>
          </Row>
        );
      })
    );
  };

  return (
    <div>
      <Text>Tournament History</Text>
      <Table>
        <thead>{renderHeader()}</thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </div>
  );
};

export default History;
