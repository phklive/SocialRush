import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="accountCard">
      <h1 className="cardTitle">404 - Page not found...</h1>
      <button
        className="mt-9 text-3xl self-center hover:text-blue-800"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to home
      </button>
    </div>
  );
};

export default NotFound;
