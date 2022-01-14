import React from "react";
import CardUI from "../design/CardUI";
import { ToastContainer } from "react-toastify";
import "../styles/index.css";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newToast } from "../utils/toast";

const CREATE_CARD = gql`
  mutation Mutation(
    $title: String!
    $text: String!
    $answer: Boolean!
    $author: String!
  ) {
    newCard(title: $title, text: $text, answer: $answer, author: $author) {
      title
      text
      answer
      author
    }
  }
`;

const CreateCard: React.FC = () => {
  const navigate = useNavigate();

  const [createCard] = useMutation(CREATE_CARD);

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
        author: "paul",
      };
      createCard({ variables });
      newToast("success", "Success, new card created!", 2000);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  return (
    <>
      <ToastContainer
        style={{ width: "400px" }}
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

      <CardUI>
        <h1 className="cardTitle">Create your card</h1>
        <form
          className="flex flex-col justify-center m-2"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="title" className="formLabel">
            Title:
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
            Text:
          </label>
          <textarea
            name="text"
            rows={8}
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
            Answer:
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
          <button type="submit" className="cardBtn">
            Create card
          </button>
        </form>
      </CardUI>
    </>
  );
};

export default CreateCard;
