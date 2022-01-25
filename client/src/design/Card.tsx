import React, {useState} from "react";
import "../styles/index.css";
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEye} from '@fortawesome/free-solid-svg-icons'
import {gql, useMutation} from "@apollo/client";
import {newToast} from "../utils/toast";
import {MYCARDS_QUERY} from "../pages/MyCards";
import Modal from "./Modal";
import {USER_AND_CARDS_QUERY} from "../pages/ProfileInfo";

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
  T: number
  F: number
}


const Card: React.FC<CardProps> = ({id, title, text,  T, F}) => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [deleteCard] = useMutation(DELETE_CARD_MUTATION, {refetchQueries: [MYCARDS_QUERY, USER_AND_CARDS_QUERY]})

  const modalHandler = () => {
    setModal((oldstate) => !oldstate)
  }

  const deleteCardHandler = async () => {
    try {
      await deleteCard({variables: {id}})
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
        <div className="flex p-2 m-2 border-4 pinkBorder rounded-md">
          <h1 className="m-2 text-2xl basis-4/6">
            {title}
          </h1>
          <button className="mr-2 text-xl text-white bg-black basis-2/6 rounded-md pinkHover"
            onClick={() => {navigate('/viewcard', {state: {id, title, text, T, F}})}}>
            View <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
          </button>
          <button className="mr-2 text-xl text-white bg-black basis-2/6 rounded-md pinkHover"
            onClick={modalHandler}>
            Delete <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card
