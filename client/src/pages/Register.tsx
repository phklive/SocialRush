import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { ToastContainer } from "react-toastify";

const REGISTER_QUERY = gql`
mutation Mutation($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password)
}
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [register] = useMutation(REGISTER_QUERY);

  const registrationHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await register({ variables: { name, email, password } });
      newToast("success", "Account successfully created!", 2000);
      localStorage.setItem("token", res.data.register);
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name can't be too short.")
        .max(20, "Name can't be too long.")
        .required("Name is required."),
      email: Yup.string().required("Email is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: (values) => {
      registrationHandler(values.name, values.email, values.password);
    },
  });

  return (
    <>
      <ToastContainer
        style={{ width: "500px" }}
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
          <h1 className="accountCardTitle">Welcome player</h1>
          <p className="accountCardSubTitle">Welcome to True or False!</p>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label htmlFor="name" className="formLabel">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter your name"
              className="formInput"
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="formError">{formik.errors.name}</p>
            ) : null}

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
            <div
              className="my-4"
            >
              <span className="text-xl text-slate-400">
                Already have an account?
              </span>
              <Link to="/login" className="hover:text-blue-800 text-xl"> Sign in.</Link>
            </div>
            <button type="submit" className="accountBtn">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
