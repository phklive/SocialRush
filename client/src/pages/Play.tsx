import {gql, useLazyQuery, useMutation} from "@apollo/client";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {newToast} from "../utils/toast";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

const USER_QUERY = gql`
query GetUser {
  getUser {
    id
    score
    name
  }
}
`

const CARD_QUERY = gql`
query Query {
  getRandomCard {
    id
    title
    text
    answer
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
    title
    report
  }
}
`;

const ADD_CARD_ANSWER_MUTATION = gql`
mutation Mutation($id: ID!, $bool: Boolean!) {
  addCardAnswer(id: $id, bool: $bool) {
    id
    true
    false
  }
}
`;


const ADD_USER_SCORE_MUTATION = gql`
mutation AddUserScore {
  addUserScore {
    id
    score
  }
}
`

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
)

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const [report, {error: reportError, loading: reportLoading}] = useMutation(REPORT_MUTATION);
  const [addCardAnswer, {data: cardAnswerData, error: cardAnswerError, loading: cardAnswerLoading}] = useMutation(ADD_CARD_ANSWER_MUTATION);
  const [addUserScore, {error: userScoreError, loading: userScoreLoading}] = useMutation(ADD_USER_SCORE_MUTATION)
  const [getCard, {data: cardData, error: cardError, loading: cardLoading}] = useLazyQuery(CARD_QUERY, {fetchPolicy: 'no-cache'});
  const [getUser, {data: userData, error: userError, loading: userLoading}] = useLazyQuery(USER_QUERY)

  const [answered, setAnswered] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)


  const reportCardHandler = async () => {
    setAnswered(false);
    await report({variables: {id: cardData.getRandomCard.id}});
    newToast("success", "Card reported", 2000);
    await getCard();
  };

  const answerHandler = async (answer: boolean) => {
    setAnswered(true);
    if (answer === true) {
      await addCardAnswer({variables: {id: cardData.getRandomCard.id, bool: true}});
    }
    if (answer === false) {
      await addCardAnswer({variables: {id: cardData.getRandomCard.id, bool: false}});
    }
    if (answer === cardData.getRandomCard.answer) {
      setAnsweredCorrectly(true)
      await addUserScore()
    } else {
      setAnsweredCorrectly(false)
    }
  };

  const nextCardHandler = async () => {
    setAnswered(false);
    setAnsweredCorrectly(false)
    await getCard();
  };

  const playHandler = async () => {
    try {
      if (!isAuth) throw new Error("You must be logged in to play.");
      await getUser()
      await getCard();
    } catch (e: any) {
      newToast("error", e.message, 2000);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };


  const chartDataset = {
    labels: ['false', 'true'],
    datasets: [
      {
        label: 'tennis',
        data: [cardAnswerData?.addCardAnswer.false, cardAnswerData?.addCardAnswer.true],
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(75, 192, 192, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(75, 192, 192, 0.9)',
        ],
        borderWidth: 1,
      }
    ]
  }

  if (reportLoading) return <p>loading...</p>
  if (reportError) return <p>{reportError.message}</p>

  if (userScoreLoading) return <p>loading...</p>
  if (userScoreError) return <p>{userScoreError.message}</p>

  if (cardLoading) return <p>loading...</p>
  if (cardError) return <p>{cardError.message}</p>

  if (userLoading) return <p>loading...</p>
  if (userError) return <p>{userError.message}</p>

  if (cardAnswerLoading) return <p>loading...</p>
  if (cardAnswerError) return <p>{cardAnswerError.message}</p>


  if (!cardData) {
    return (
      <>
        <ToastContainer
          style={{width: "450px"}}
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
          className="w-1/2 ml-2 shadow-2xl centered pink rounded-xl h-1/2 hover:bg-pink-300 hover:font-bold"
          onClick={() => {
            playHandler();
          }}
        >
          <h1 className="text-8xl">PLAY</h1>
        </button>
      </>
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
      <div className="playCard">
        <div className="p-4 mb-10 text-5xl text-center pink rounded-md">
          <h1>Your score: {userData.getUser.score}</h1>
        </div>
        {!answered && (
          <>
            <div className="flex flex-row text-center">
              <button
                className="self-center p-2 text-xl border-2 border-black rounded-lg basis-1/6 hover:bg-pink-300"
                onClick={reportCardHandler}
              >
                Report card
              </button>
              <h1 className="accountCardTitle basis-4/6">
                {cardData.getRandomCard.title.charAt(0).toUpperCase() +
                  cardData.getRandomCard.title.slice(1)}
              </h1>
              <p className="self-center text-xl basis-1/6">
                By {cardData.getRandomCard.author}
              </p>
            </div>
            <p className="self-center mt-16 text-3xl">
              {cardData.getRandomCard.text.charAt(0).toUpperCase() +
                cardData.getRandomCard.text.slice(1)}
            </p>
            <div className="flex mt-20 mb-2 gap-2 h-1/8">
              <button
                className="w-9/12 mr-2 accountBtn"
                onClick={() => answerHandler(true)}
              >
                <h1 className="text-2xl">True</h1>
              </button>
              <button
                className="w-9/12 mr-2 accountBtn"
                onClick={() => answerHandler(false)}
              >
                <h1 className="text-2xl">False</h1>
              </button>
            </div>
          </>
        )}
        {answered && (
          <>
            {answeredCorrectly && (
              <h1 className="text-center text-green-500 text-7xl ">
                Correct!
              </h1>
            )}
            {!answeredCorrectly && (
              <h1 className="text-center text-red-500 text-7xl ">Wrong!</h1>
            )}
            <div className="self-center w-1/3 m-5 h-1/3">

              <Doughnut
                data={chartDataset}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />

            </div>
            <div className="flex flex-row text-center gap-4">
              <h1 className="flex-1 text-5xl text-center text-black">
                True answers: {cardAnswerData.addCardAnswer.true}
              </h1>
              <h1 className="flex-1 text-5xl text-center text-black">
                False answers: {cardAnswerData.addCardAnswer.false}
              </h1>
            </div>
            <button className="my-10 accountBtn" onClick={nextCardHandler}>
              Next
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;


