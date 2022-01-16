import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const newToast = (value:string, message:string, time:number) => {
  if (value === "success") {
    toast.success(message, {
      className: "toast",
      position: "top-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (value === "error") {
    toast.error(message, {
      className: "toast",
      position: "top-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

