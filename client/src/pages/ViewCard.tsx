import React, {FC, useState} from "react"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useLocation} from 'react-router-dom'


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
)

interface ViewCardProps {}

const ViewCard: FC<ViewCardProps> = ({}) => {
  const {state}: any = useLocation()
  const [showData, setShowData] = useState(false)

  const chartDataset = {
    labels: ['false', 'true'],
    datasets: [
      {
        label: 'tennis',
        data: [state.T, state.F],
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

  const showDataPageHandler = () => {
    setShowData(true)
  }


  const showCardPageHandler = () => {
    setShowData(false)
  }

  if (showData) {
    return (
      <div className="playCard">
        <h1 className="accountCardTitle">{state.title}</h1>
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
            True answers: {state.T}
          </h1>
          <h1 className="flex-1 text-5xl text-center text-black">
            False answers: {state.F}
          </h1>
        </div>
        <div className="flex flex-row gap-10">
          <button onClick={showCardPageHandler} className="flex-1 p-4 my-4 text-2xl text-white bg-black rounded-md">Show card info</button>
          <button onClick={showDataPageHandler} className={showData ? "flex-1 pink text-black text-2xl rounded-md p-4 my-4" : "flex-1 text-white bg-black text-2xl rounded-md p-4 my-4"}>Show card data</button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center playCard">
      <div className="card">
        <h1 className="accountCardTitle">{state.title}</h1>
        <p className="my-16 text-3xl">{state.text}</p>
        <p className="my-4 text-3xl ">Answer: {state.answer.toString()}</p>
      </div>
      <div className="flex flex-row gap-10">
        <button onClick={showCardPageHandler} className={!showData ? "flex-1 pink text-black text-2xl rounded-md p-4 my-4" : "flex-1 text-white bg-black text-2xl rounded-md p-4 my-4"}>Show card info</button>
        <button onClick={showDataPageHandler} className="flex-1 p-4 my-4 text-2xl text-white bg-black rounded-md">Show card data</button>
      </div>
    </div>
  )
}

export default ViewCard
