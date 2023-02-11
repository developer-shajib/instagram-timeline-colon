import "./Modal.scss";
import { BiX } from "react-icons/bi";

const Modal = ({ children, hide, setImages }) => {
  const handleModalCloseBtn = (e) => {
    hide(false);
    setImages([]);
  };
  return (
    <>
      <div className="show-modal">
        <div className="modal-main-wrapper">
          <div className="modal-wrapper">{children}</div>
        </div>
        <button className="modal-cross" onClick={handleModalCloseBtn}>
          <BiX />
        </button>
      </div>
    </>
  );
};

export default Modal;
