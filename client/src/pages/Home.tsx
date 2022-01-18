import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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

const Home: React.FC = () => {
  const navigate = useNavigate()
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
    await fetch();
  };

  const failure = async () => {
    newToast("error", "Wrong!", 2000);
    await fetch();
  };

  const playHandler = async () => {
    try {
      if (!localStorage.hasOwnProperty('token')) throw new Error("You must be logged in to play.")
      await fetch()
    } catch (e: any) {
      newToast('error', e.message, 2000)
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
  }

  if (!data) {
    return (
      <>
        <ToastContainer
          style={{ width: "500px" }}
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
          onClick={() => { playHandler() }}
        >
          <h1 className="cardTitle">PLAY</h1>
        </button>
      </>
    );
  }

  return (
    <CardUI>
      <div className="flex flex-row text-center">
        <p className="text-xl self-center basis-1/6">Report card</p>
        <h1 className="cardTitle basis-4/6">{data.randCard.title.charAt(0).toUpperCase() + data.randCard.title.slice(1)}</h1>
        <p className="text-xl self-center basis-1/6">By {data.randCard.author}</p>
      </div>
      <p className="text-3xl self-center mt-16">{data.randCard.text.charAt(0).toUpperCase() + data.randCard.text.slice(1)}</p>
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
