import React from "react";
import CardUI from "../design/CardUI";
import LeaderUser from "../design/LeaderUser";
import { gql, useQuery } from "@apollo/client";
import "../styles/index.css";

const LEADER_QUERY = gql`
  query Query {
    leaderBoard {
      name
      score
    }
  }
`;

const LeaderBoard: React.FC = () => {
  const { loading, error, data } = useQuery(LEADER_QUERY, {fetchPolicy: 'no-cache'});

  return (
    <CardUI>
      {loading && <p>loading...</p>}
      {error && <p>error...</p>}
      {data && (
        <>
          <h1 className="cardTitle">Leaderboard</h1>
          <div>
            {data.leaderBoard.map((user: any, i: number) => {
              return (
                <LeaderUser
                  name={user.name}
                  score={user.score}
                  rank={i}
                  key={i}
                />
              );
            })}
          </div>
        </>
      )}
    </CardUI>
  );
};

export default LeaderBoard;
