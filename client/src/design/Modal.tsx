import ReactDom from 'react-dom'

interface ModalProps {
  title: string
  text: string
  btn: string
  exec: () => void
  close: () => void
  open: boolean
}

const Modal:React.FC<ModalProps> = ({title,text,btn,exec,close,open}) => {
  if (!open) return null

  return ReactDom.createPortal(
    <div className="modal z-10">
      <div className="z-10 centered bg-white h-1/6 w-1/2 text-center p-2 rounded-md border-8 pinkBorder">
        <h1 className="accountCardTitle">{title}</h1>
        <h3 className="cardText">{text}</h3>
        <div className="flex flex-row gap-4">
          <button className="accountBtn flex-1" onClick={close}>Cancel</button>
          <button className="accountBtn flex-1" onClick={exec}>{btn}</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

export default Modal
