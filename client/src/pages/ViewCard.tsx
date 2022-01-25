import React, { useState} from "react"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useLocation, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
)

interface ViewCardProps {}

const ViewCard: React.FC<ViewCardProps> = ({}) => {
  const navigate = useNavigate()
  const {state}: any = useLocation()
  const [showData, setShowData] = useState(false)

  const chartDataset = {
    labels: ['false', 'true'],
    datasets: [
      {
        label: 'tennis',
        data: [state.F, state.T],
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
      <FontAwesomeIcon icon={faArrowLeft} className="text-2xl mb-4 cursor-pointer backHover" onClick={() => {navigate('/profile')}}/>
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
      <FontAwesomeIcon icon={faArrowLeft} className="text-2xl mb-4 cursor-pointer backHover" onClick={() => {navigate('/profile')}}/>
      <div className="card">
        <h1 className="accountCardTitle">{state.title}</h1>
        <p className="my-16 text-3xl">{state.text}</p>
      </div>
      <div className="flex flex-row gap-10">
        <button onClick={showCardPageHandler} className={!showData ? "flex-1 pink text-black text-2xl rounded-md p-4 my-4" : "flex-1 text-white bg-black text-2xl rounded-md p-4 my-4"}>Show card info</button>
        <button onClick={showDataPageHandler} className="flex-1 p-4 my-4 text-2xl text-white bg-black rounded-md">Show card data</button>
      </div>
    </div>
  )
}

export default ViewCard
