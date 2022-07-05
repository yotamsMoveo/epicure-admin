import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SingleDish } from "../../Assets/Interfaces/SingleDish";
import { useEffect } from "react";
import { useState } from "react";
import { updateDishData } from "../../services/api-services";
import toast, { Toaster } from "react-hot-toast";
import "./DeleteModal.scss";
import { useNavigate } from "react-router-dom";
const ariaLabel = { "aria-label": "description" };

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface ModalProps {
  dishToDelete: SingleDish;
}

const DeleteModal: React.FC<ModalProps> = ({ dishToDelete }) => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [submit, setSubmit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateDishData(dishToDelete._id, dishToDelete);
  }, [submit]);

  const sendDeleteReq = (command: boolean) => {
    if (command) {
      dishToDelete.active = false;
      setSubmit(command);
      setOpen(!command);
      toast.success("Deleted Successfully");
      setTimeout(() => navigate("/admin"), 1000);
    } else {
      setOpen(command);
    }
  };

  return (
    <div>
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="title">Delete This Dish?</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <div className="command-buttom">
            <Button onClick={() => sendDeleteReq(true)}>Yes</Button>
            <Button onClick={() => sendDeleteReq(false)}>No</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteModal;
