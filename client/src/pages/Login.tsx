import React from "react";
import CardUI from "../design/CardUI";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import {login} from '../redux/authSlice'

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const loginHandler = async (email: string, password: string) => {
    try {
      const res = await loginMutation({ variables: { email, password } });
      newToast("success", "Successfully logged in!", 2000);
      localStorage.setItem("token", res.data.login);
      setTimeout(() => {
      dispatch(login())
        navigate("/profile");
      }, 2000);
    } catch (e: any) {
      newToast("error", e.message, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: (values) => {
      loginHandler(values.email, values.password);
    },
  });

  return (
    <CardUI>
      <h1 className="cardTitle">Login</h1>
      <form className="flex flex-col m-2" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="formLabel">
          Email:
        </label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="formInput"
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="formError">{formik.errors.email}</p>
        ) : null}
        <label htmlFor="password" className="formLabel">
          Password:
        </label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="formInput"
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="formError">{formik.errors.password}</p>
        ) : null}
        <Link
          className="mt-2 self-center hover:text-blue-800 text-2xl"
          to="/register"
        >
          Need to create an account?
        </Link>
        <button type="submit" className="cardBtn">
          Login
        </button>
      </form>
    </CardUI>
  );
};

export default Login;
