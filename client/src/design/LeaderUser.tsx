import { gql, useQuery } from "@apollo/client";
import React from "react";

const USER_QUERY = gql`
  query Query {
    getUser {
      id
      name
      wolf
      sheep
    }
  }
`;

interface LeaderUserProps {
  name: string;
  score: number;
  rank: number;
  wolf: number;
  sheep: number;
}

const LeaderUser: React.FC<LeaderUserProps> = ({
  name,
  score,
  rank,
  wolf,
  sheep,
}) => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div
      className={
        data.getUser.name === name
          ? "border-black border-4 pink rounded-xl m-2 px-2 flex flex-row  items-center"
          : "border-black border-4 rounded-xl m-2 px-2 flex flex-row items-center"
      }
    >
      <h1 className="text-2xl text-black basis-1/5">{`#${rank + 1}`}</h1>
      <h1 className="text-2xl text-black basis-1/5 mr-4">{name}</h1>
      <h1 className="text-2xl text-black basis-2/5">{score}pts</h1>
      {wolf > sheep && (
        <img
          alt="wolf"
          src={require("../styles/assets/wolf.png")}
          className="h-16 md:h-20 basis-1/5"
        />
      )}
      {sheep > wolf && (
        <img
          alt="sheep"
          src={require("../styles/assets/sheep.png")}
          className="h-16 md:h-20 basis-1/5"
        />
      )}
    </div>
  );
};

export default LeaderUser;
