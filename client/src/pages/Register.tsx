import React from "react";
import CardUI from "../design/CardUI";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { newToast } from "../utils/toast";

const REGISTER_QUERY = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) 
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
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
      console.log(values)
      registrationHandler(values.name, values.email, values.password);
    },
  });

  return (
    <CardUI>
      <h1 className="cardTitle">Register</h1>
      <form className="flex flex-col m-2" onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="formLabel">
          Name:
        </label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="formInput"
        />
        {formik.errors.name && formik.touched.name ? (
          <p className="formError">{formik.errors.name}</p>
        ) : null}

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
          to="/login"
        >
          Already have an account?
        </Link>
        <button type="submit" className="cardBtn">
          Register
        </button>
      </form>
    </CardUI>
  );
};

export default Register;
