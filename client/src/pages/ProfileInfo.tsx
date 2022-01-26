import { gql, useQuery } from "@apollo/client";
import React from "react";

export const USER_AND_CARDS_QUERY = gql`
  query User {
    getUser {
      id
      name
      email
      highScore
      wolf
      sheep
    }
    getUserCards {
      id
      title
    }
  }
`;

export const RANK_QUERY = gql`
  query Query($name: String!) {
    getUserRanking(name: $name)
  }
`;

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(USER_AND_CARDS_QUERY, {
    fetchPolicy: "no-cache",
  });

  const { loading: rankingLoading, data: rankingData } = useQuery(RANK_QUERY, {
    variables: { name: "none" },
  });

  if (loading) return null;
  if (error) return <p>{error.message}</p>;
  if (rankingLoading) return null;

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="text-center ml-4">
          <img
            src={require("../styles/assets/wolf.png")}
            className="h-14 md:h-20"
            alt="wolf"
          />
          <h1 className="text-lg md:text-xl">
            {Math.round(
              100 *
                (data.getUser.wolf / (data.getUser.wolf + data.getUser.sheep))
            ) || 0}
            %
          </h1>
        </div>
        <div>
          <p className="text-2xl md:text-4xl font-bold text-center">
            {data.getUser.name}
          </p>
          <p className="mb-10 text-lg md:text-2xl text-center">
            {data.getUser.email}
          </p>
        </div>
        <div className="text-center mr-4">
          <img
            src={require("../styles/assets/sheep.png")}
            className="h-14 md:h-20"
            alt="sheep"
          />
          <h1 className="text-lg md:text-xl">
            {Math.round(
              100 *
                (data.getUser.sheep / (data.getUser.wolf + data.getUser.sheep))
            ) || 0}
            %
          </h1>
        </div>
      </div>
      <div className="flex flex-row text-center">
        <p className="flex-1 text-lg md:text-2xl text-gray-500">Highscore</p>
        <p className="flex-1 text-lg md:text-2xl text-gray-500">Cards</p>
        <p className="flex-1 text-lg md:text-2xl text-gray-500">Ranking</p>
      </div>
      <div className="flex flex-row text-center">
        <p className="flex-1 text-xl md:text-2xl">{data.getUser.highScore}</p>
        <p className="flex-1 text-xl md:text-2xl">{data.getUserCards.length}</p>
        <p className="flex-1 text-xl md:text-2xl">
          #{rankingData.getUserRanking + 1}
        </p>
      </div>
    </div>
  );
};

export default Profile;
