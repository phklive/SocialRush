import CardUI from "./CardUI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faUserEdit, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

interface PopupProps {
  type: string
  quit: () => void
  exec: () => void
}

const Popup: React.FC<PopupProps> = ({ type, quit, exec }) => {
  return (
    <div className="modal">
      <CardUI>
        <h1 className="cardTitle">
          {type === "delete" && 'Are you sure you want to delete this card?'}
          {type === "modify" && 'Are you sure you want to modify this card?'}
          {type === "disconnect" && 'Are you sure you want to disconnect?'}
        </h1>
        <div className="flex flex-row gap-4">
          <button className="cardBtn flex-1 " onClick={quit}>
            Cancel
          </button>
          <button className="cardBtn flex-1" onClick={exec}>
            {type === "delete" && 'Delete '}
            {type === "delete" && <FontAwesomeIcon icon={faTrashAlt} />}
            {type === "modify" && 'Modify '}
            {type === "modify" && <FontAwesomeIcon icon={faUserEdit} />}
            {type === "disconnect" && 'Disconnect '}
            {type === "disconnect" && <FontAwesomeIcon icon={faDoorOpen} />}
          </button>
        </div>
      </CardUI>
    </div>
  )
}

export default Popup 
