import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { newToast } from "../utils/toast";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "./AuhthContext";

const USER_QUERY = gql`
  query GetUser {
    getUser {
      id
      highScore
    }
  }
`;

const CARD_QUERY = gql`
  query Query {
    getRandomCard {
      id
      title
      text
      author
      true
      false
    }
  }
`;

const REPORT_MUTATION = gql`
  mutation Mutation($id: ID!) {
    addCardReport(id: $id) {
      id
    }
  }
`;

const ADD_CARD_ANSWER_MUTATION = gql`
  mutation Mutation($id: ID!, $bool: Boolean!) {
    addCardAnswer(id: $id, bool: $bool) {
      id
    }
  }
`;

const GAME_FINISHED_MUTATION = gql`
  mutation Mutation($score: Int!, $wolf: Int!, $sheep: Int!) {
    gameFinished(score: $score, wolf: $wolf, sheep: $sheep) {
      id
      name
      email
      password
      highScore
      wolf
      sheep
    }
  }
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const Play: React.FC = () => {
  const { session } = useContext(AuthContext);

  const navigate = useNavigate();

  const [report, { error: reportError, loading: reportLoading }] =
    useMutation(REPORT_MUTATION);
  const [
    addCardAnswer,
    { error: cardAnswerError, loading: cardAnswerLoading },
  ] = useMutation(ADD_CARD_ANSWER_MUTATION);
  const [
    gameFinished,
    { error: gameFinishedError, loading: gameFinishedLoading },
  ] = useMutation(GAME_FINISHED_MUTATION);
  const [getCard, { data: cardData, error: cardError, loading: cardLoading }] =
    useLazyQuery(CARD_QUERY, { fetchPolicy: "no-cache" });

  // get user highScore
  const [getUser, { data: userData, error: userError, loading: userLoading }] =
    useLazyQuery(USER_QUERY);

  // UI state
  const [showPlayCard, setShowPlayCard] = useState(true);
  const [showFirstCard, setShowFirstCard] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Game state
  const [firstCardAnswer, setFirstCardAnswer] = useState(false);
  const [secondCardAnswer, setSecondCardAnswer] = useState(false);
  const [game, setGame] = useState(false);
  const [lives, setLives] = useState(3);
  const [wolf, setWolf] = useState(0);
  const [sheep, setSheep] = useState(0);
  const [score, setScore] = useState(0);

  const chartDataset = {
    labels: ["false", "true"],
    datasets: [
      {
        label: "tennis",
        data: [cardData?.getRandomCard.false, cardData?.getRandomCard.true],
        backgroundColor: ["rgba(255, 99, 132, 0.9)", "rgba(75, 192, 192, 0.9)"],
        borderColor: ["rgba(255, 99, 132, 0.9)", "rgba(75, 192, 192, 0.9)"],
        borderWidth: 1,
      },
    ],
  };

  const reportCardHandler = async () => {
    await report({ variables: { id: cardData.getRandomCard.id } });
    newToast("success", "Card reported", 2000);
    await getCard();
  };

  const playHandler = async () => {
    try {
      if (!session) throw new Error("You must be logged in to play.");
      await getUser();
      await getCard();
      setShowPlayCard(false);
      setGame(true);
      setShowFirstCard(true);
    } catch (e: any) {
      newToast("error", e.message, 2000);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const firstCardHandler = async (answer: boolean) => {
    // Player answered true
    if (answer === true) {
      await addCardAnswer({
        variables: { id: cardData.getRandomCard.id, bool: true },
      });
      setFirstCardAnswer(true);
      setShowFirstCard(false);
      setShowSecondCard(true);
    }

    // Player answered false
    if (answer === false) {
      await addCardAnswer({
        variables: { id: cardData.getRandomCard.id, bool: false },
      });
      setFirstCardAnswer(false);
      setShowFirstCard(false);
      setShowSecondCard(true);
    }
  };

  const secondCardHandler = async (answer: boolean) => {
    setSecondCardAnswer(answer);
    // Player answered true
    if (answer === true) {
      if (cardData.getRandomCard.true > cardData.getRandomCard.false) {
        setAnsweredCorrectly(true);
        setScore((oldScore) => oldScore + 1);
        setShowSecondCard(false);
        setShowResultCard(true);
        if (firstCardAnswer === true) setSheep((oldSheep) => oldSheep + 1);
        if (firstCardAnswer === false) setWolf((oldWolf) => oldWolf + 1);
      }

      if (cardData.getRandomCard.true < cardData.getRandomCard.false) {
        setAnsweredCorrectly(false);
        setLives((oldLives) => oldLives - 1);
        setShowSecondCard(false);
        setShowResultCard(true);
        if (firstCardAnswer === true) setWolf((oldWolf) => oldWolf + 1);
        if (firstCardAnswer === false) setSheep((oldSheep) => oldSheep + 1);
      }

      if (cardData.getRandomCard.true === cardData.getRandomCard.false) {
        setAnsweredCorrectly(true);
        setScore((oldScore) => oldScore + 1);
        setShowSecondCard(false);
        setShowResultCard(true);
      }
    }

    // Player answered false
    if (answer === false) {
      if (cardData.getRandomCard.false > cardData.getRandomCard.true) {
        setAnsweredCorrectly(true);
        setScore((oldScore) => oldScore + 1);
        setShowSecondCard(false);
        setShowResultCard(true);
        if (firstCardAnswer === false) setSheep((oldSheep) => oldSheep + 1);
        if (firstCardAnswer === true) setWolf((oldWolf) => oldWolf + 1);
      }

      if (cardData.getRandomCard.false < cardData.getRandomCard.true) {
        setAnsweredCorrectly(false);
        setLives((oldLives) => oldLives - 1);
        setShowSecondCard(false);
        setShowResultCard(true);
        if (firstCardAnswer === false) setWolf((oldWolf) => oldWolf + 1);
        if (firstCardAnswer === true) setSheep((oldSheep) => oldSheep + 1);
      }

      if (cardData.getRandomCard.false === cardData.getRandomCard.true) {
        setAnsweredCorrectly(true);
        setScore((oldScore) => oldScore + 1);
        setShowSecondCard(false);
        setShowResultCard(true);
      }
    }
  };

  const nextCardHandler = async () => {
    if (lives !== 0) {
      setShowFirstCard(true);
      setShowSecondCard(false);
      setShowResultCard(false);
      setAnsweredCorrectly(false);
      setFirstCardAnswer(false);
      await getCard();
    } else {
      setShowResultCard(false);
      setGame(false);
      await gameFinished({ variables: { score, wolf, sheep } });
    }
  };

  const gameFinishedHandler = async () => {
    setSheep(0);
    setWolf(0);
    setScore(0);
    setLives(3);
    setShowFirstCard(false);
    setShowSecondCard(false);
    setFirstCardAnswer(false);
    setAnsweredCorrectly(false);
    setShowPlayCard(true);
  };

  const playAgainHandler = async () => {
    setSheep(0);
    setWolf(0);
    setScore(0);
    setLives(3);
    setShowSecondCard(false);
    setFirstCardAnswer(false);
    setAnsweredCorrectly(false);
    setShowPlayCard(false);
    setGame(true);
    setShowFirstCard(true);
  };

  if (reportLoading) return null;
  if (reportError) return <p>{reportError.message}</p>;

  if (gameFinishedLoading) return null;
  if (gameFinishedError) return <p>{gameFinishedError.message}</p>;

  if (cardLoading) return null;
  if (cardError) return <p>{cardError.message}</p>;

  if (userLoading) return null;
  if (userError) return <p>{userError.message}</p>;

  if (cardAnswerLoading) return null;
  if (cardAnswerError) return <p>{cardAnswerError.message}</p>;

  if (showPlayCard) {
    return (
      <div className="flex">
        <ToastContainer
          style={{ width: "450px" }}
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
          className=" shadow-2xl m-auto mt-40 w-11/12 h-96 pink rounded-xl hover:bg-pink-300 hover:font-bold"
          onClick={() => {
            playHandler();
          }}
        >
          <h1 className="text-4xl md:text-7xl">PLAY</h1>
        </button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
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
      <div className="playCard w-11/12">
        {!game && (
          <>
            <div>
              <h1 className="text-3xl md:text-4xl text-center text-black">
                YOU LOST
              </h1>
              <h1 className="text-xl text-center mb-2">Summary:</h1>
              <div className="card">
                <div className="whitespace-nowrap md:m-2 flex flex-col">
                  {score > userData.getUser.highScore && (
                    <h1 className="text-2xl text-center">NEW HIGH SCORE!</h1>
                  )}
                  <h1 className="text-xl text-center">Game score:</h1>
                  <h1 className="text-center text-2xl">{score}</h1>
                  <div className="flex flex-row self-center">
                    <div className="flex flex-col">
                      <img
                        src={require("../styles/assets/sheep.png")}
                        alt="sheep"
                        className="inline mx-4 h-12 md:h-20 lg:h-24"
                      />
                      <h1 className="text-center">{sheep}</h1>
                    </div>

                    <div className="flex flex-col">
                      <img
                        src={require("../styles/assets/wolf.png")}
                        alt="wolf"
                        className="inline mx-4 h-12 md:h-20 lg:h-24"
                      />
                      <h1 className="text-center">{wolf}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                onClick={gameFinishedHandler}
                className="accountBtn text-xl md:text-3xl mt-2 flex-1"
              >
                End
              </button>
              <button
                onClick={playAgainHandler}
                className="accountBtn text-xl md:text-3xl mt-2 flex-1"
              >
                Play again
              </button>
            </div>
          </>
        )}
        {showFirstCard && (
          <>
            <h1 className="text-2xl md:text-5xl text-center">
              In your opinion?
            </h1>
            <div className="card my-4 flex flex-col">
              <button
                className="self-center p-1 md:p-2 m-2 text-sm md:m-0 md:text-xl border-2 border-black rounded-lg hover:bg-pink-300"
                onClick={reportCardHandler}
              >
                Report
              </button>
              <p className="text-xl md:text-4xl text-center">
                {cardData.getRandomCard.title}
              </p>
              <p className="text-l md:text-2xl my-5">
                {cardData.getRandomCard.text}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="accountBtn text-xl md:text-3xl flex-1"
                onClick={() => {
                  firstCardHandler(true);
                }}
              >
                True
              </button>
              <button
                className="accountBtn text-xl md:text-3xl flex-1"
                onClick={() => {
                  firstCardHandler(false);
                }}
              >
                False
              </button>
            </div>
          </>
        )}
        {showSecondCard && (
          <>
            <h1 className="text-2xl md:text-5xl text-center">
              What do other people think?
            </h1>
            <div className="flex flex-col md:flex-row  items-center p-2 text-2xl md:text-4xl rounded-md">
              <div className="whitespace-nowrap inline-block md:m-2 basis-1/3">
                <h1 className="inline">{sheep}</h1>
                <img
                  src={require("../styles/assets/sheep.png")}
                  alt="sheep"
                  className="inline mx-4 h-12 md:h-20 lg:h-24"
                />
                <img
                  src={require("../styles/assets/wolf.png")}
                  alt="wolf"
                  className="inline mx-4 h-12 md:h-20 lg:h-24"
                />
                <h1 className="inline">{wolf}</h1>
              </div>

              <div className="text-center md:m-8 md:basis-1/3">
                <h1 className="my-2">SCORE</h1>
                <h1>{score}</h1>
              </div>

              <div className="whitespace-nowrap md:m-2 basis-1/3 flex flex-row-reverse">
                {[...Array(lives)].map((_, i: number) => (
                  <img
                    src={require("../styles/assets/heart.png")}
                    key={i}
                    alt="lives"
                    className="inline h-12 m-2 md:h-20 lg:h-24 "
                  />
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex flex-col">
                <h1 className="accountCardTitle basis-4/6 whitespace-nowrap inline md:block m-auto md:m-0">
                  {cardData.getRandomCard.title.charAt(0).toUpperCase() +
                    cardData.getRandomCard.title.slice(1)}
                </h1>
                <p className="self-center text-l md:text-2xl basis-1/6 whitespace-nowrap m-auto">
                  By {cardData.getRandomCard.author}
                </p>
              </div>
              <div className="self-center">
                <p className="mt-4 md:mt-8 lg:mt-16 md:text-3xl">
                  {cardData.getRandomCard.text.charAt(0).toUpperCase() +
                    cardData.getRandomCard.text.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex gap-2 h-1/8 mt-4">
              <button
                className="w-9/12 mr-2 accountBtn"
                onClick={() => secondCardHandler(true)}
              >
                <h1 className="text-xl md:text-3xl">True</h1>
              </button>
              <button
                className="w-9/12 accountBtn"
                onClick={() => secondCardHandler(false)}
              >
                <h1 className="text-xl md:text-3xl">False</h1>
              </button>
            </div>
          </>
        )}
        {showResultCard && (
          <>
            {answeredCorrectly && (
              <>
                <h1 className="text-center text-green-500 text-2xl md:text-3xl lg:text-5xl">
                  Correct!
                </h1>
                <h1 className="text-center text-xl md:text-2xl my-3">
                  Your answer: {secondCardAnswer.toString()}
                </h1>
              </>
            )}
            {!answeredCorrectly && (
              <>
                <h1 className="text-center text-red-500 text-3xl md:text-4xl lg:text-6xl">
                  Wrong!
                </h1>
                <h1 className="text-center text-xl md:text-2xl my-3">
                  Your answer: {secondCardAnswer.toString()}
                </h1>
              </>
            )}
            <div className="card">
              <div className="m-auto w-1/3 h-1/3">
                <Doughnut
                  data={chartDataset}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="flex flex-row text-center gap-2 mt-6">
                <h1 className="flex-1 text-xl md:text-3xl lg:text-5xl text-center text-black">
                  True answers:{" "}
                  {Math.round(
                    100 *
                      (cardData.getRandomCard.true /
                        (cardData.getRandomCard.true +
                          cardData.getRandomCard.false))
                  )}
                  %
                </h1>
                <h1 className="flex-1 text-xl md:text-3xl lg:text-5xl text-center text-black">
                  False answers:{" "}
                  {Math.round(
                    100 *
                      (cardData.getRandomCard.false /
                        (cardData.getRandomCard.true +
                          cardData.getRandomCard.false))
                  )}
                  %
                </h1>
              </div>
            </div>
            <button
              className="my-2 md:my-8 text-xl md:text-3xl accountBtn"
              onClick={nextCardHandler}
            >
              Next
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Play;
