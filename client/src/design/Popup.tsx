import CardUI from "./CardUI"

interface PopupProps {
  cardText: string
  btnText: string
}

const Popup: React.FC<PopupProps> = ({ cardText, btnText }) => {
  return (
    <CardUI style="">
      <h1 className="cardTitle">
        {cardText}
      </h1>
      <div className="flex flex-row gap-2">
        <button className="cardBtn flex-1">
          Cancel
        </button>
        <button className="cardBtn flex-1 ">
          {btnText}
        </button>
      </div>
    </CardUI>
  )
}

export default Popup 
