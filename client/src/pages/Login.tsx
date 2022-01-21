import React from "react";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {newToast} from "../utils/toast";
import {useDispatch} from "react-redux";
import {login} from '../redux/authSlice'
import {ToastContainer} from "react-toastify";

const LOGIN_MUTATION = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const loginHandler = async (email: string, password: string) => {
    try {
      const res = await loginMutation({variables: {email, password}});
      newToast("success", "Successfully logged in!", 2000);
      localStorage.setItem("token", res.data.loginUser);
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
    <>
      <ToastContainer
        style={{width: "500px"}}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div className="accountCard">
        <div className="innerAccountCard">
          <h1 className="accountCardTitle">Welcome back</h1>
          <p className="accountCardSubTitle">Welcome back! Please enter your details.</p>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
              className="formInput" />
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
              className="formInput" />
            {formik.errors.password && formik.touched.password ? (
              <p className="formError">{formik.errors.password}</p>
            ) : null}
            <div className="my-4">
              <span className="text-xl text-slate-400">
                Don't have an account?
              </span>
              <Link className="text-xl hover:text-blue-800" to="/register"> Sign up!</Link>
            </div>
            <button type="submit" className="accountBtn">
              Sign in
            </button>
          </form>
        </div>
      </div></>
  );
};

export default Login;
