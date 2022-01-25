import React from "react";
import LeaderUser from "../design/LeaderUser";
import {gql, useQuery} from "@apollo/client";
import "../styles/index.css";

const USERS_AND_LEADER_QUERY = gql`
query Query {
  getUsers {
    id
  }
  getLeaderBoard {
    id
    name
    highScore
    wolf
    sheep
  }
}
`

const LeaderBoard: React.FC = () => {
  const {loading, error, data} = useQuery(USERS_AND_LEADER_QUERY, {fetchPolicy: 'no-cache'})

  if (loading) <p>loading...</p>
  if (error) <p>{error.message}</p>

  return (
    <div>
      {data && (
        <div className="accountCard">
          <div className="innerAccountCard">
            <h1 className="accountCardTitle">Leaderboard</h1>
            <h1 className="mb-2 text-2xl text-center">Total users: {data.getUsers.length}</h1>
            <p className="accountCardSubTitle">Become the best player in the game!</p>
            {data.getLeaderBoard.map((user: any, i: number) => {
              return (
                <LeaderUser
                  name={user.name}
                  score={user.highScore}
                  rank={i}
                  wolf={user.wolf}
                  sheep={user.sheep}
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
