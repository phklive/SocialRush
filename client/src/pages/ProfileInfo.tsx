import {gql, useQuery} from "@apollo/client";
import React from "react";

export const USER_AND_CARDS_QUERY = gql`
query User {
  getUser {
    id
    name
    email
    score
  }
  getUserCards {
    id
    title
    }
  }
`

const Profile: React.FC = () => {
  const {loading, error, data} = useQuery(USER_AND_CARDS_QUERY, {fetchPolicy: 'no-cache'})

  console.log(data)

  if (loading) return null
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <p className="text-4xl font-bold text-center">{data.getUser.name}</p>
      <p className="mb-10 text-3xl text-center">{data.getUser.email}</p>
      <div className="flex flex-row text-center">
        <p className="flex-1 text-2xl text-gray-500">Points</p>
        <p className="flex-1 text-2xl text-gray-500">Cards</p>
        <p className="flex-1 text-2xl text-gray-500">Ranking</p>
      </div>
      <div className="flex flex-row text-center">
        <p className="flex-1 text-3xl">{data.getUser.score}pts</p>
        <p className="flex-1 text-3xl">{data.getUserCards.length}</p>
        <p className="flex-1 text-3xl">1st</p>
      </div>
    </div>
  );
};

export default Profile;
