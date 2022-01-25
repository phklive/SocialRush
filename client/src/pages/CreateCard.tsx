import React from "react";
import "../styles/index.css";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { USER_AND_CARDS_QUERY } from "./ProfileInfo";

const CREATE_CARD_MUTATION = gql`
  mutation Mutation($title: String!, $text: String!, $answer: Boolean!) {
    createCard(title: $title, text: $text, answer: $answer) {
      title
    }
  }
`;

const CreateCard: React.FC = () => {
  const navigate = useNavigate();

  const [createCard] = useMutation(CREATE_CARD_MUTATION, {
    refetchQueries: [USER_AND_CARDS_QUERY],
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      answer: "true",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Title can't be too long.")
        .required("Title is required."),
      text: Yup.string()
        .min(30, "Text can't be too short")
        .required("Text is required."),
      answer: Yup.boolean().required("Answer is required."),
    }),
    onSubmit: (values) => {
      const variables = {
        title: values.title,
        text: values.text,
        answer: values.answer === "true",
      };
      createCard({ variables });
      newToast("success", "Success, new card created!", 2000);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
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
        pauseOnHover
      />
      <div className="p-4 playCard w-11/12 md:w-1/2">
        <h1 className="accountCardTitle">Create your card</h1>
        <h1 className="accountCardSubTitle">
          Create your very own cards and see what other people think
        </h1>
        <form
          className="flex flex-col justify-center m-2"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="title" className="formLabel">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="formInput"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title ? (
            <p className="formError">{formik.errors.title}</p>
          ) : null}
          <label htmlFor="text" className="formLabel">
            Text
          </label>
          <textarea
            name="text"
            rows={6}
            maxLength={500}
            className="resize-none formInput"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
          />
          {formik.errors.text && formik.touched.text ? (
            <p className="formError">{formik.errors.text}</p>
          ) : null}
          <label htmlFor="answer" className="formLabel">
            Your answer
          </label>
          <select
            className="formInput"
            name="answer"
            onChange={formik.handleChange}
            value={formik.values.answer}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button type="submit" className="mt-5 accountBtn">
            Create card
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
