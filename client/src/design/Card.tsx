import React from "react";
import "../styles/index.css";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from "@apollo/client";
import { newToast } from "../utils/toast";
import { MYCARDS_QUERY } from "../pages/MyCards";

const DELETE_CARD_MUTATION = gql`
mutation Mutation($id: ID!) {
  deleteCard(id: $id) {
    id
  }
}`

interface CardProps {
  id: string
  title: string
  text: string
  answer: boolean
}


const Card: React.FC<CardProps> = ({ id, title, text, answer }) => {
  const navigate = useNavigate()
  const [deleteCard] = useMutation(DELETE_CARD_MUTATION, { refetchQueries: [MYCARDS_QUERY] })

  const deleteCardHandler = async () => {
    try {
      await deleteCard({ variables: { id } })
      newToast('success', 'Success, card deleted!', 2000)
    } catch (e: any) {
      newToast('error', e.message, 2000)
    }
  }

  return (
    <div>
      <div className="border-2 border-black m-2 p-2 flex">
        <h1 className="m-2 text-2xl basis-4/6">
          {title}
        </h1>
        <button className="basis-1/6 bg-pink-300 text-xl hover:bg-pink-200 rounded-lg border-black border"
          onClick={() => { navigate('/modifycard', { state: { id, title, text, answer } }) }}>
          Edit <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
        <button className="basis-1/6 bg-pink-300 text-xl hover:bg-pink-200 ml-2 rounded-lg border-black border"
          onClick={deleteCardHandler}>
          Delete <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default Card
