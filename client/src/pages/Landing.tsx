import {Link} from "react-router-dom"

const Landing: React.FC = () => {

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-row m-20 bg-white shadow-2xl rounded-xl">
        <div className="flex-1">
          <h1 className="m-2 mt-40 text-center text-9xl">
            Think but not for too long...
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/mathew-schwartz-8rj4sz9YLCI-unsplash.jpg')} alt="test" />
      </div>
      <div className="flex flex-row m-20 bg-white shadow-2xl rounded-xl">
        <div className="flex-1">
          <h1 className="m-2 text-center text-9xl mt-72">
            Answer a lot of questions!
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/jon-tyson-hhq1Lxtuwd8-unsplash.jpg')} alt="test" />
      </div>
      <div className="flex flex-row m-20 bg-white shadow-2xl rounded-xl">
        <div className="flex-1">
          <h1 className="m-2 mt-20 text-center text-9xl">
            Win a lot of points and show your friends who is the boss!
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/bruce-mars-AndE50aaHn4-unsplash.jpg')} alt="test" />
      </div>
      <Link to="/play" className="flex self-center w-1/2 p-2 mb-20 text-white bg-black rounded-md pinkHover hover:text-black">
        <h1 className="m-auto text-8xl">PLAY</h1>
      </Link>
    </div>
  )
}

export default Landing
