import { useQuery, gql } from "@apollo/client";
import React from "react";
import Card from "../design/Card";
import "../styles/index.css";

export const MYCARDS_QUERY = gql`
query User($offset: Int!, $limit: Int!) {
  myCards(offset: $offset, limit: $limit) {
    id
    title
    text
    answer
    author
  }
}
`;

const MyCards: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery(MYCARDS_QUERY, {
    variables: {
      offset: 0,
      limit: 3
    },
    fetchPolicy: 'no-cache',
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="pink p-2">
        {data.myCards.map((card: any) => <Card key={card.id} id={card.id} title={card.title} text={card.text} answer={card.answer} />)}
      </div>
    <button className="cardBtn" onClick={() => {}}>Next Cards</button>
    </>
  );
};

export default MyCards
