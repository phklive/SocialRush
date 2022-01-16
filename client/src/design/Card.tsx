import React  from "react";
import "../styles/index.css";

interface CardProps {
  title: string
}


export const Card: React.FC<CardProps> = ({title}) => {

        return (
          <div className="border-2 border-black m-2 flex">
            <h1 className="m-2 text-2xl basis-5/6">
              {title}
            </h1>
            <button className="basis-1/6 bg-pink-300 text-xl hover:bg-pink-200" onClick={() => {}}>
              Modify card
            </button>
          </div>
        );
};

export default Card
