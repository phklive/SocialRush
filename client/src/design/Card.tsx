import React, { useState } from "react";
import "../styles/index.css";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation } from "@apollo/client";
import { newToast } from "../utils/toast";
import { MYCARDS_QUERY } from "../pages/MyCards";
import Modal from "./Modal";

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
  const [modal,setModal] = useState(false)
  const [deleteCard] = useMutation(DELETE_CARD_MUTATION, { refetchQueries: [MYCARDS_QUERY] })

  const modalHandler = () => {
    setModal((oldstate) => !oldstate)
  }

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
      <Modal
        title="Delete card"
        text="Are you sure you want to delete this card?"
        btn="Delete"
        open={modal}
        close={modalHandler}
        exec={deleteCardHandler}
      />
      <div>
        <div className="border-4 border-black rounded-md m-2 p-2 flex">
          <h1 className="m-2 text-2xl basis-4/6">
            {title}
          </h1>
          <button className="basis-2/6 pink text-xl rounded-md border-black border hover:bg-pink-300"
            onClick={() => { navigate('/modifycard', { state: { id, title, text, answer } }) }}>
            Edit <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
          </button>
          <button className="basis-2/6 text-xl pink ml-2 rounded-md border-black border hover:bg-pink-300"
            onClick={modalHandler}>
            Delete <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card
