import { gql, useQuery } from "@apollo/client";
import React from "react";

const USER_QUERY = gql`
query User {
  user {
    name
  }

}
`

interface LeaderUserProps {
  name: string;
  score: number;
  rank: number;
}

const LeaderUser: React.FC<LeaderUserProps> = ({ name, score, rank }) => {
  const { data } = useQuery(USER_QUERY, { fetchPolicy: 'no-cache' })
  const username = data?.user.name

  return (
    <div className={username === name ? "border-black border-4 pink rounded-xl m-2 p-2 flex flex-end" : "border-black border-4 rounded-xl m-2 p-2 flex flex-end"}>
      <h1 className="flex-1 text-2xl text-black">{`#${rank + 1}`}</h1>
      <h1 className="flex-1 text-2xl text-black">{name}</h1>
      <h1 className="flex-1 text-2xl text-black">{score}pts</h1>
    </div>
  );
};

export default LeaderUser;
