import ReactDom from "react-dom";

interface ModalProps {
  title: string;
  text: string;
  btn: string;
  exec: () => void;
  close: () => void;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  text,
  btn,
  exec,
  close,
  open,
}) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className="modal z-10">
      <div className="z-10 centered bg-white w-10/12 md:w-1/2 text-center p-2 rounded-md border-8 shadow pinkBorder">
        <h1 className="accountCardTitle">{title}</h1>
        <h3 className="text-xl md:text-2xl m-2">{text}</h3>
        <div className="flex flex-row gap-4">
          <button
            className="accountBtn text-xl md:text-2xl flex-1"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="accountBtn text-xl md:text-2xl flex-1"
            onClick={exec}
          >
            {btn}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Modal;
