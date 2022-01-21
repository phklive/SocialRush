import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { newToast } from "../utils/toast";

const CARD_QUERY = gql`
  query Query {
    randCard {
      title
      id
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
  addReport(id: $id) {
    title
    report
  }
}
`

const TRUE_ANSWER_MUTATION = gql`
mutation AddTrueAnswer($id: ID!) {
  addTrueAnswer(id: $id) {
    id
    true 
    false
  }
}
`

const FALSE_ANSWER_MUTATION = gql`
mutation AddFalseAnswer($id: ID!) {
  addFalseAnswer(id: $id) {
    id
    true
    false
  }
}
`

const Home: React.FC = () => {
  const navigate = useNavigate()
  const isAuth = useSelector((state: any) => state.auth.isAuth)
  const [report] = useMutation(REPORT_MUTATION)
  const [addTrueAnswer, { data: trueData }] = useMutation(TRUE_ANSWER_MUTATION)
  const [addFalseAnswer, { data: falseData }] = useMutation(FALSE_ANSWER_MUTATION)
  const [answer, setAnswer] = useState(false)
  const [answeredCorrect, setAnsweredCorrect] = useState(false)
  const [answeredWrong, setAnsweredWrong] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [fetch, { data }] = useLazyQuery(CARD_QUERY);

  const reportCardHandler = async () => {
    setAnswered(false)
    setAnsweredCorrect(false)
    setAnsweredWrong(false)
    await report({ variables: { id: data.randCard.id } })
    newToast("success", 'Card reported', 2000)
    await fetch()
  }

  const answerHandler = async (answer: boolean) => {
    setAnswer(answer)
    setAnswered(true)
    if (answer === true) await addTrueAnswer({ variables: { id: data.randCard.id } })
    if (answer === false) await addFalseAnswer({ variables: { id: data.randCard.id } })
    if (answer === data.randCard.answer) {
      setAnsweredCorrect(true)
    } else {
      setAnsweredWrong(true)
    }
  };

  const nextCardHandler = async () => {
    setAnswered(false)
    setAnsweredCorrect(false)
    setAnsweredWrong(false)
    await fetch()
  }

  const playHandler = async () => {
    try {
      if (!isAuth) throw new Error("You must be logged in to play.")
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
      <button
        className="centered pink rounded-xl shadow-2xl h-1/2 w-1/2 ml-2 hover:bg-pink-300 hover:font-bold"
        onClick={() => { playHandler() }}
      >
        <h1 className="text-8xl">PLAY</h1>
      </button>
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
        {!answered &&
          <>
            <div className="flex flex-row text-center">
              <button className="text-xl self-center basis-1/6 border-2 p-2 border-black rounded-lg hover:bg-pink-300" onClick={reportCardHandler}>Report card</button>
              <h1 className="accountCardTitle basis-4/6">{data.randCard.title.charAt(0).toUpperCase() + data.randCard.title.slice(1)}</h1>
              <p className="text-xl self-center basis-1/6">By {data.randCard.author}</p>
            </div>
            <p className="text-3xl self-center mt-16">{data.randCard.text.charAt(0).toUpperCase() + data.randCard.text.slice(1)}</p>
            <div className="flex mt-20 mb-2 gap-2 h-1/8">
              <button
                className="accountBtn  w-9/12 mr-2"
                onClick={() => answerHandler(true)}
              >
                <h1 className="text-2xl">True</h1>
              </button>
              <button
                className="accountBtn w-9/12 mr-2"
                onClick={() => answerHandler(false)}
              >
                <h1 className="text-2xl">False</h1>
              </button>
            </div>
          </>
        }
        {answered &&
          <>
            {answeredCorrect && <h1 className="text-green-500 text-5xl text-center my-5">Correct!</h1>}
            {answeredWrong && <h1 className="text-red-500 text-5xl text-center my-5">Wrong!</h1>}
            {answer === true &&
                <div className="flex flex-row gap-4 text-center">
                  <h1 className="text-black text-5xl text-center flex-1">True answers:{trueData?.addTrueAnswer.true}</h1>
                  <h1 className="text-black text-5xl text-center flex-1">False answers:{trueData?.addTrueAnswer.false}</h1>
                </div>
            }
            {answer === false &&
                <div className="flex flex-row gap-4 text-center">
                  <h1 className="text-black text-5xl text-center flex-1">True answers:{falseData?.addFalseAnswer.true}</h1>
                  <h1 className="text-black text-5xl text-center flex-1">False answers:{falseData?.addFalseAnswer.false}</h1>
                </div>
            }
            <button className="accountBtn my-10" onClick={nextCardHandler}>Next</button>
          </>
        }
      </div>
    </>
  );
};

export default Home;
