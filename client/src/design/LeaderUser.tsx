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

export const RANKING_QUERY = gql`
  query Query($name: String!) {
    getUserRanking(name: $name)
  }
`;

interface LeaderUserProps {
  name: string;
  score: number;
  wolf: number;
  sheep: number;
}

const LeaderUser: React.FC<LeaderUserProps> = ({
  name,
  score,
  wolf,
  sheep,
}) => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    fetchPolicy: "no-cache",
  });

  const { loading: rankingLoading, data: rankingData } = useQuery(
    RANKING_QUERY,
    {
      variables: { name: `${name}` },
    }
  );

  if (loading) return null;
  if (error) return <p>{error.message}</p>;
  if (rankingLoading) return null;

  return (
    <div
      className={
        data.getUser.name === name
          ? "border-black border-4 pink rounded-xl m-2 px-2 flex flex-row  items-center"
          : "border-black border-4 rounded-xl m-2 px-2 flex flex-row items-center"
      }
    >
      <h1 className="text-lg md:text-2xl text-black basis-1/5">{`#${
        rankingData.getUserRanking + 1
      }`}</h1>
      <h1 className="text-lg md:text-2xl text-black basis-1/5 mr-4">{name}</h1>
      <h1 className="text-lg md:text-2xl text-black basis-2/5">{score}pts</h1>
      {wolf > sheep && (
        <img
          alt="wolf"
          src={require("../styles/assets/wolf.png")}
          className="h-16 md:h-24 basis-1/5"
        />
      )}

      {sheep > wolf && (
        <img
          alt="sheep"
          src={require("../styles/assets/sheep.png")}
          className="h-16 md:h-24 basis-1/5"
        />
      )}

      {sheep === 0 && wolf === 0 && (
        <img
          alt="question mark"
          src={require("../styles/assets/question.png")}
          className="h-16 md:h-24 basis-1/5"
        />
      )}
    </div>
  );
};

export default LeaderUser;
