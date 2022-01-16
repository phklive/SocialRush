import { gql, useLazyQuery } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import CardUI from "../design/CardUI";
import { newToast } from "../utils/toast";

const CARD_QUERY = gql`
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
- Make toast appear on navigated page
- Add authentication to the app
- create my card section
- create account info section / profile
- create connection and account creation page forms
- finish success and failure logic 
- home card aesthetic and size 
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
  const [fetch, { data }] = useLazyQuery(CARD_QUERY);

  const clickHandler = (e: boolean) => {
    if (e === data.randCard.answer) {
      success();
    } else {
      failure();
    }
  };

  const success = async () => {
    //access user.score and add 1 if true else add 0
    //mettre le score quand le jeu commence
    //mettre un timer
    newToast("success", "Correct!", 2000);
    fetch();
  };

  const failure = async () => {
    newToast("error", "Wrong!", 2000);
    fetch();
  };

  if (!data) {
    return (
      <>
        <ToastContainer
          style={{ width: "400px" }}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <button
          className="center pink border-black border-2 rounded-xl h-1/2 w-1/2 ml-2 hover:bg-pink-300 hover:font-bold"
          onClick={() => fetch()}
        >
          <h1 className="cardTitle">PLAY</h1>
        </button>
      </>
    );
  }

  return (
    <CardUI>
      <h1 className="cardTitle">{data.randCard.title}</h1>
      <p className="text-3xl self-center mt-16">{data.randCard.text}</p>
      <div className="flex mt-20 mb-2 gap-2 h-1/8">
        <button
          className="cardBtn  w-9/12 mr-2"
          onClick={() => clickHandler(true)}
        >
          <h1 className="text-2xl">True</h1>
        </button>
        <button
          className="cardBtn w-9/12 mr-2"
          onClick={() => clickHandler(false)}
        >
          <h1 className="text-2xl">False</h1>
        </button>
      </div>
    </CardUI>
  );
};

export default Home;
