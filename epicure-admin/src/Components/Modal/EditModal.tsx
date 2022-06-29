import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { SingleDish } from "../../Assets/Interfaces/SingleDish";

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
  inputArrays: string[];
  dish: SingleDish;
}

const EditModal: React.FC<ModalProps> = ({ inputArrays, dish }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {inputArrays.map((input: string, index) => (
              <Input key={index} defaultValue={dish.name} inputProps={ariaLabel} />
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default EditModal;
