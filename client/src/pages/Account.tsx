import React from "react";
import CardUI from "../design/CardUI";
import { useMutation } from "urql";
import { useNavigate } from "react-router";

const LOGIN_QUERY = `
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
`;

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [loginResult, login] = useMutation(LOGIN_QUERY);

  const connectionHandler = async () => {
    try {
      const variables = {
        email: "test@gmail.com",
        password: "test",
      };
      const res = await login(variables);
      console.log(res.data.login);
    } catch (e) {
      return e;
    }
    navigate("/");
  };

  return (
    <CardUI>
      <button onClick={() => connectionHandler()}>Connect</button>
    </CardUI>
  );
};

export default Account;
