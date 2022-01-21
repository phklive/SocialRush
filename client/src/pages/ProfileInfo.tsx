import { gql, useQuery } from "@apollo/client";
import React from "react";

const USER_AND_CARDS_QUERY = gql`
query User {
  user {
    name
    email
    score
  }
  myCards {
      title
    }
  }
`

const Profile: React.FC = () => {
  const {loading, error, data} = useQuery(USER_AND_CARDS_QUERY)

  if (loading) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <p className="text-4xl text-center font-bold">{data.user.name}</p>
      <p className="text-3xl text-center mb-10">{data.user.email}</p>
      <div className="flex flex-row text-center">
        <p className="text-2xl flex-1 text-gray-500">Points</p>
        <p className="text-2xl flex-1 text-gray-500">Cards</p>
        <p className="text-2xl flex-1 text-gray-500">Ranking</p>
      </div>
      <div className="flex flex-row text-center">
        <p className="text-3xl flex-1">{data.user.score}pts</p>
        <p className="text-3xl flex-1">{data.myCards.length}</p>
        <p className="text-3xl flex-1">1st</p>
      </div>
    </div>
  );
};

export default Profile;
