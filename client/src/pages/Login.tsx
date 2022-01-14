import React from "react";
import CardUI from "../design/CardUI";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const LOGIN_QUERY = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_QUERY);

  const loginHandler = async (email: string, password: string) => {
    try {
      const res = await login({ variables: { email, password } });
      console.log(res.data.login);
      navigate("/");
    } catch (e: any) {
      return e.message;
    }
  };

  return (
    <CardUI>
      <button onClick={() => loginHandler("test@gmail.com", "test")}>
        Connect
      </button>
    </CardUI>
  );
};

export default Login;
