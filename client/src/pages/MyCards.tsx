import { useQuery } from "urql";
import React from "react";
import "../styles/index.css";

const TEST_QUERY = `
	query Query($author: String!) {
		myCards(author: $author) {
			title
		}
	}
`;

const MyCards: React.FC = () => {
  const [myCardsResult] = useQuery({
    query: TEST_QUERY,
    variables: { author: "paul" },
  });

  const { fetching, error, data } = myCardsResult;

  if (fetching) return <p>loading...</p>;
  if (error) return <p>`error...${error.message}`</p>;

  return (
    <div className="pink p-2">
      {data.myCards.map((card: any, i: number) => {
        return (
          <h1 key={i} className="border-2 border-black m-2">
            {card.title}
          </h1>
        );
      })}
    </div>
  );
};

export default MyCards;
