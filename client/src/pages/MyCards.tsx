import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Card from "../design/Card";
import "../styles/index.css";

export const MYCARDS_QUERY = gql`
  query Query {
    getUserCards {
      id
      title
      text
      true
      false
    }
  }
`;

const MyCards: React.FC = () => {
  const { loading, error, data } = useQuery(MYCARDS_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const handlePrevious = () => {
    setStart((oldState) => oldState - 3);
    setEnd((oldState) => oldState - 3);
  };

  const handleNext = () => {
    setStart((oldState) => oldState + 3);
    setEnd((oldState) => oldState + 3);
  };

  if (loading) return null;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col mt-10">
      {data.getUserCards.slice(start, end).map((card: any) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          text={card.text}
          T={card.true}
          F={card.false}
        />
      ))}
      <div className="flex flex-row mt-5 gap-4">
        <button
          disabled={start === 0}
          className="flex-1 m-2 accountBtn text-lg md:text-2xl"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          disabled={end >= data.getUserCards.length}
          className="flex-1 m-2 text-lg md:text-2xl accountBtn"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyCards;
