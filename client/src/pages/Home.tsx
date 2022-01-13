import { useQuery } from "urql";
import CardUI from "../design/CardUI";

const CARD_QUERY = `
   query Query {
    randCard {
      title
      text
      answer
      author
    }
  }
`;

/*
- responsive 
- pagination
- create my card section
- create account info section / profile
- create connection and account creation page forms
- add animation of success or failure on game answer
- finish success and failure logic 
- home card aesthetic and size 
- whole app design / Fiverr - css
- add score that updates on right and wrong answer
- add 3 lives and when they go to 0 game stops
- add score to database on end of game
- cookie login or logout ? account data gathering from database
- Account profile image upload and modification
- Account data modification 
- Account data verification
- Find a real good game idea
- Add visual hint on what page you are on the website
- Protect routes
- validate data everywhere
- host app
*/

const Home: React.FC = () => {
  const [result, fetch] = useQuery({ query: CARD_QUERY, pause: true });

  const { data, error } = result;

  if (error) return <p>Oh no...{error.message}</p>;

  const clickHandler = (e: boolean) => {
    if (e === data.randCard.answer) {
      success();
    } else {
      failure();
    }
  };

  const success = async () => {
    //access user.score and add 1 if true else add 0
    //show success message and visuals
    //mettre le score quand le jeu commence
    //mettre un timer
    fetch({ requestPolicy: "network-only" });
  };

  const failure = async () => {
    //Show failure message and visuals
    fetch({ requestPolicy: "network-only" });
  };

  if (!data) {
    return (
      <button
        className="center pink border-black border-2 rounded-xl h-1/2 w-1/2 ml-2 hover:bg-pink-300 hover:font-bold"
        onClick={() => fetch()}
      >
        <h1 className="text-3xl">PLAY</h1>
      </button>
    );
  }

  return (
    <CardUI>
      <h1 className="text-4xl mb-28 mt-2 self-center">{data.randCard.title}</h1>
      <p className="text-3xl self-center">{data.randCard.text}</p>
      <div className="flex mt-20 mb-2 gap-2 h-1/8">
        <button
          className="pink border-black border-2 rounded-xl w-9/12 ml-2 hover:bg-pink-300 hover:font-bold"
          onClick={() => clickHandler(true)}
        >
          <h1 className="text-2xl">True</h1>
        </button>
        <button
          className="pink border-black border-2 rounded-xl w-9/12 mr-2 hover:bg-pink-300 hover:font-bold"
          onClick={() => clickHandler(false)}
        >
          <h1 className="text-2xl">False</h1>
        </button>
      </div>
    </CardUI>
  );
};

export default Home;
