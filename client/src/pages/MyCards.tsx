import { useQuery, gql } from "@apollo/client";
import React  from "react";
import Card from "../design/Card";
import "../styles/index.css";

const MYCARDS_QUERY = gql`
  query Query {
    myCards {
      title
    }
  }
`;

export const MyCards: React.FC = () => {
  const { loading, error, data } = useQuery(MYCARDS_QUERY, { fetchPolicy: 'no-cache' });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="pink p-2">
    {data.myCards.map((card: any, i: number) => <Card key={i} title={card.title}/>)}
    </div>
  );
};

export default MyCards
