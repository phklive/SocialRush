import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="m-auto whitebg p-6 w-11/12 md:w-2/3 rounded-lg mt-20 text-white shadow">
        <h1 className="text-3xl md:text-5xl mb-4 text-center">Welcome,</h1>
        <h1 className="text-3xl md:text-5xl">
          haven't you always dreamt about being able to read into peoples minds?
        </h1>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Now it's possible!
        </h1>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Social Rush is the most fun, dramatic and simple game!
        </h1>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          It's all about guessing other peoples opinion about funny, political,
          creative, critical or weird questions:
        </h1>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          First, we ask for your opinion:
        </h1>
        <img
          alt="opinion"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/opinion.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Next, your turn to guess what people think
        </h1>
        <img
          alt="people"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/people.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Answer and see the results!
        </h1>
        <img
          alt="result"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/result.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Guess right and win a point
        </h1>
        <h1 className="text-3xl md:text-5xl text-center">
          Guess wrong and lose a life
        </h1>
        <div className="flex flex-row">
          <img
            alt="medal"
            className="rounded-lg my-4 flex-1 h-32 md:h-72 mr-4"
            src={require("../styles/assets/medal.png")}
          />
          <img
            alt="broken-heart"
            className="rounded-lg my-4 flex-1 h-32 md:h-72 mr-4"
            src={require("../styles/assets/broken-heart.png")}
          />
        </div>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Each time your opinion was the same as other peoples you gain a sheep,
          each time it was different you gain a wolf
        </h1>
        <div className="flex flex-row">
          <img
            alt="sheep"
            className="rounded-lg my-4 flex-1 h-32 md:h-72 mr-4"
            src={require("../styles/assets/sheep.png")}
          />
          <img
            alt="wolf"
            className="rounded-lg my-4 flex-1 h-32 md:h-72"
            src={require("../styles/assets/wolf.png")}
          />
        </div>
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          See if your more of a sheep in the pack
        </h1>
        <img
          alt="sheep-flock"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/sheep-pack-flock-animals-flock-of-sheep-cattle-pasture-rural-winter.jpeg")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Or a solitary wolf
        </h1>
        <img
          alt="solitary-wolf"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/takaya_1920.webp")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Thanks to the detailed profile page
        </h1>
        <img
          alt="profile"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/profile.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Create your very own cards and see what other people think
        </h1>
        <img
          alt="create"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/create.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Become the best player in the game and show everyone who is the social
          king!
        </h1>
        <img
          alt="leader"
          className="rounded-lg my-4 m-auto"
          src={require("../styles/assets/leader.png")}
        />
        <h1 className="text-3xl md:text-5xl mt-10 text-center">
          Invite your friends, share, have fun!
        </h1>
        <h1 className="text-3xl md:text-5xl mt-10 text-center mb-5">
          First player at 50 wins 10 euros!
        </h1>
        <iframe
          title="moneyyyyy"
          src="https://giphy.com/embed/3o6gDWzmAzrpi5DQU8"
          width="100%"
          height="480"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <h1 className="text-3xl md:text-5xl text-center mt-2">Good luck!</h1>
      </div>
      <div className="flex flex-row">
        <button
          className="accountBtn w-11/12 md:w-2/3 m-auto text-5xl mt-10"
          onClick={() => {
            navigate("/register");
          }}
        >
          <h1>PLAY</h1>
        </button>
      </div>
    </>
  );
};

export default Landing;
