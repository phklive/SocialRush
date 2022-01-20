import React from "react";
import LeaderUser from "../design/LeaderUser";
import { gql, useQuery } from "@apollo/client";
import "../styles/index.css";

const LEADER_QUERY = gql`
  query Query {
    leaderBoard {
      name
      score
    }
users {
    id
  }
  }
`;

const LeaderBoard: React.FC = () => {
  const { data } = useQuery(LEADER_QUERY, {fetchPolicy: 'no-cache'});
  return (
    <div>
      {data && (
        <div className="accountCard">
          <div className="innerAccountCard">
          <h1 className="accountCardTitle">Leaderboard</h1>
          <h1 className="text-center text-2xl mb-2">Total users: {data.users.length}</h1>
          <p className="accountCardSubTitle">Become the best player in the game!</p>
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
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
