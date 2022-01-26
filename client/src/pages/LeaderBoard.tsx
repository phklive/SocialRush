import React, { useState } from "react";
import LeaderUser from "../design/LeaderUser";
import { gql, useQuery } from "@apollo/client";
import "../styles/index.css";

export const USERS_AND_LEADER_QUERY = gql`
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
`;

const LeaderBoard: React.FC = () => {
  const { loading, error, data } = useQuery(USERS_AND_LEADER_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const handlePrevious = () => {
    setStart((oldState) => oldState - 5);
    setEnd((oldState) => oldState - 5);
  };

  const handleNext = () => {
    setStart((oldState) => oldState + 5);
    setEnd((oldState) => oldState + 5);
  };

  if (loading) return null;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data && (
        <div className="playCard shadow w-11/12 md:w-1/3">
          <div>
            <h1 className="accountCardTitle">Leaderboard</h1>
            <h1 className="mb-2 text-xl md:text-2xl text-center">
              Total users: {data.getUsers.length}
            </h1>
            <p className="accountCardSubTitle">
              Become the best player in the game!
            </p>
            {data.getLeaderBoard.slice(start, end).map((user: any) => {
              return (
                <LeaderUser
                  name={user.name}
                  score={user.highScore}
                  wolf={user.wolf}
                  sheep={user.sheep}
                  key={user.id}
                />
              );
            })}
            <div className="flex flex-row mt-5 gap-4">
              <button
                disabled={start === 0}
                className="flex-1 m-2 accountBtn text-lg md:text-2xl"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                disabled={end >= data.getLeaderBoard.length}
                className="flex-1 m-2 text-lg md:text-2xl accountBtn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
