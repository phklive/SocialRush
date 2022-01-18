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
    <div className={username === name ? "border-black border-4 bg-yellow-300 rounded-xl m-2 p-2 flex flex-end" : "border-black border-4 darkWhite rounded-xl m-2 p-2 flex flex-end"}>
      <h1 className="flex-1 text-3xl text-black">{`#${rank + 1}`}</h1>
      <h1 className="flex-1 text-3xl text-black">Profile pic</h1>
      <h1 className="flex-1 text-3xl text-black">{name}</h1>
      <h1 className="flex-1 text-3xl text-black">{score}</h1>
      <img src={`https://flagcdn.com/56x42/za.png`} alt="flag" className="" />
    </div>
  );
};

export default LeaderUser;
