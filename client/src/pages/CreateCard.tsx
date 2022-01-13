import React, { useRef } from "react";
import CardUI from "../design/CardUI";
import "../styles/index.css";
import { useNavigate } from "react-router";
import { useMutation } from "urql";

const CREATE_CARD = `
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
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  const [_, createCard] = useMutation(CREATE_CARD);

  return (
    <CardUI>
      <h1 className="text-4xl self-center m-2">Create your card</h1>
      <form
        className="flex flex-col justify-center m-2"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const variables = {
              title: titleRef.current?.value,
              text: textRef.current?.value,
              answer: answerRef.current?.value.toLocaleLowerCase() === "true",
              author: "paul",
            };
            createCard(variables);
            navigate("/");
          } catch (e) {
            return e;
          }
        }}
      >
        <label htmlFor="title" className="text-3xl m-1">
          title:
        </label>
        <input type="text" name="title" ref={titleRef} />

        <label htmlFor="text" className="text-3xl m-1">
          text:
        </label>
        <textarea name="text" rows={8} maxLength={500} ref={textRef} />

        <label htmlFor="answer" className="text-3xl m-1">
          answer:
        </label>
        <select name="answer" ref={answerRef}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button
          type="submit"
          className="w-1/2 border-black border-2 self-center mt-4 rounded-xl pink hover:bg-pink-300 hover:font-bold"
        >
          Create Card
        </button>
      </form>
    </CardUI>
  );
};

export default CreateCard;
