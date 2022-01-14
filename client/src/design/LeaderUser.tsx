import React from "react";

interface LeaderUserProps {
  name: string;
  score: number;
  rank: number;
  //country: String
}

const LeaderUser: React.FC<LeaderUserProps> = ({ name, score, rank }) => {
  return (
    <div className="border-black border-4 rounded-xl m-2 p-2 flex flex-end">
      <h1 className="flex-1 text-3xl text-black">{`#${rank + 1}`}</h1>
      <h1 className="flex-1 text-3xl text-black">Profile pic</h1>
      <h1 className="flex-1 text-3xl text-black">{name}</h1>
      <h1 className="flex-1 text-3xl text-black">{score}</h1>
      <img src={`https://flagcdn.com/56x42/za.png`} alt="flag" className="" />
    </div>
  );
};

export default LeaderUser;
