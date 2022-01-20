import { Link } from "react-router-dom"

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-row m-20 rounded-xl bg-white shadow-2xl">
        <div className="flex-1">
          <h1 className="text-center text-9xl m-2 mt-40">
            Think but not for too long...
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/mathew-schwartz-8rj4sz9YLCI-unsplash.jpg')} alt="test" />
      </div>
      <div className="flex flex-row m-20 rounded-xl bg-white shadow-2xl">
        <div className="flex-1">
          <h1 className="text-center text-9xl m-2 mt-72">
            Answer a lot of questions!
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/jon-tyson-hhq1Lxtuwd8-unsplash.jpg')} alt="test" />
      </div>
      <div className="flex flex-row m-20 rounded-xl bg-white shadow-2xl">
        <div className="flex-1">
          <h1 className="text-center text-9xl m-2 mt-20">
            Win a lot of points and show your friends who is the boss!
          </h1>
        </div>
        <img className="flex-1 rounded-r-2xl" src={require('../styles/assets/bruce-mars-AndE50aaHn4-unsplash.jpg')} alt="test" />
      </div>
<Link to="/login" className="flex mb-20 w-1/2 self-center rounded-md p-2 bg-black text-white pinkHover hover:text-black">
  <h1 className="text-8xl m-auto">PLAY</h1>
</Link>
    </div>
  )
}

export default Landing
