import React from "react";
import CardUI from "../design/CardUI";
import LeaderUser from "../design/LeaderUser";
import { useQuery } from "urql";
import "../styles/index.css";

const LEADER_QUERY = `
	query Query {
		leaderBoard {
			name
			score
		}
	}
`;

const LeaderBoard: React.FC = () => {
  const [result, reexecuteQuery] = useQuery({ query: LEADER_QUERY });
  const { data, fetching, error } = result;

  return (
    <CardUI>
      {fetching && <p>loading...</p>}
      {error && <p>error...</p>}
      {data && (
        <>
          <h1 className="text-4xl m-2 self-center">Leaderboard</h1>
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
