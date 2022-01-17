import { useQuery, gql } from "@apollo/client";
import React  from "react";
import Card from "../design/Card";
import "../styles/index.css";

export const MYCARDS_QUERY = gql`
  query Query {
    myCards {
      id
      title
      text
      answer
    }
  }
`;

const MyCards: React.FC = () => {
  const { loading, error, data } = useQuery(MYCARDS_QUERY, { fetchPolicy: 'no-cache' });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="pink p-2">
    {data.myCards.map((card: any) => <Card key={card.id} id={card.id} title={card.title} text={card.text} answer={card.answer}/>)}
    </div>
  );
};

export default MyCards
