import React from "react";
import CardUI from "../design/CardUI";
import "../styles/index.css";
import { useNavigate, useLocation } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newToast } from "../utils/toast";


const MODIFY_CARD_MUTATION = gql`
mutation Mutation($id: ID!, $title: String!, $text: String!, $answer: Boolean!) {
  modifyCard(id: $id, title: $title, text: $text, answer: $answer) {
    id
    title
    text
    answer
  }
}
`;

const ModifyCard: React.FC = () => {
  const { state }: any = useLocation()
  const answer = state.answer.toString()
  const navigate = useNavigate();
  const [modifyCard] = useMutation(MODIFY_CARD_MUTATION)

  const formik = useFormik({
    initialValues: {
      title: state.title,
      text: state.text,
      answer
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
    onSubmit: async (values) => {
      try {
        const variables = {
          id: state.id,
          title: values.title,
          text: values.text,
          answer: values.answer === 'true',
        };
        console.log(variables)
        const res = await modifyCard({ variables });
        console.log(res.data.modifyCard)
        newToast("success", "Success, card modified!", 2000);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (e: any) {
        newToast("error", e.message, 2000)
      }
    },
  });

  return (
    <CardUI>
      <h1 className="cardTitle">Modify your card</h1>
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
        <div className="flex flex-row gap-2">
        <button type="reset" className="cardBtn flex-1" onClick={() => {navigate('/profile')}}>
            Cancel
          </button>
          <button type="submit" className="cardBtn flex-1">
            Modify card
          </button>
        </div>
      </form>
    </CardUI>
  );
};

export default ModifyCard;
