import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./AuhthContext";

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const loginHandler = async (email: string, password: string) => {
    try {
      await loginMutation({ variables: { email, password } });
      newToast("success", "Successfully logged in!", 2000);
      setTimeout(() => {
        setSession(true);
        navigate("/play");
      }, 2000);
    } catch (e: any) {
      newToast("error", "Credentials are incorrect...", 2000);
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
      <div className="playCard w-11/12 md:w-1/3 shadow p-2">
        <div className="innerAccountCard">
          <h1 className="accountCardTitle">Welcome back</h1>
          <p className="accountCardSubTitle">Please enter your details.</p>
          <form
            className="flex flex-col p-2 md:px-20 md:py-10"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="formInput"
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="formError">{formik.errors.email}</p>
            ) : null}
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className="formInput"
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="formError">{formik.errors.password}</p>
            ) : null}
            <div className="my-4">
              <span className="text-lg md:text-xl text-slate-400">
                Don't have an account?
              </span>
              <Link
                className="text-lg md:text-xl hover:text-blue-800"
                to="/register"
              >
                {" "}
                Sign up!
              </Link>
            </div>
            <button type="submit" className="accountBtn text-xl md:text-3xl">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
