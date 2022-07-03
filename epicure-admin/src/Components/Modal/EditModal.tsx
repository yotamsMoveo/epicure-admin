import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { SingleDish } from "../../Assets/Interfaces/SingleDish";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { getResturantsData, updateDishData } from "../../services/api-services";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";
import { SingleRestaurant } from "../../Assets/Interfaces/SingleRestaurant";
import { Label } from "@mui/icons-material";
import { ChangeEventHandler } from "react";

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
  dishToUpdate: SingleDish;
}

const EditModal: React.FC<ModalProps> = ({ inputArrays, dishToUpdate }) => {
  interface input {
    value: any;
  }
  const inputs: { [key: string]: input } = {};
  inputs["name"] = { value: dishToUpdate.name };
  inputs["image"] = { value: dishToUpdate.image };
  inputs["type"] = { value: dishToUpdate.type };
  inputs["description"] = { value: dishToUpdate.description };
  inputs["price"] = { value: dishToUpdate.price };
  inputs["restaurant"] = { value: dishToUpdate.restaurant.name };

  const [open, setOpen] = React.useState(true);
  const [submit, setSubmit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const allRestauranrs: SingleRestaurant[] = [];
  const [restaurants, setRestaurants] = useState(allRestauranrs);
  useEffect(() => {
    updateDishData(dishToUpdate._id, dishToUpdate);
  }, [submit]);
  useEffect(() => {
    getResturantsData().then((res) => {
      setRestaurants(res.data);
    });
  }, []);
  const [currency, setCurrency] = useState(dishToUpdate.restaurant);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    restaurants.forEach((restaurant) => {
      if (restaurant.name.localeCompare(event.target.value) == 0) {
        setCurrency(restaurant);
      }
    });
  };
  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   event.target.labels?.forEach(label => {
     const data=label.attributes.getNamedItem('for')?.nodeValue;
     let test="";
     if(data){
       test=data;
     }
     inputs[test].value=event.target.value;
   });
    
  };

  const sendUpdateReq = (inputs: any) => {
    dishToUpdate.description=inputs["description"].value;
    dishToUpdate.name=inputs["name"].value;
    dishToUpdate.image=inputs["image"].value;
    dishToUpdate.type=inputs["type"].value;
    dishToUpdate.price=inputs["price"].value;
    updateDishData(dishToUpdate._id,dishToUpdate).then((res) => {
      console.log(res.data);
    });
  };
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Edit Dish</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {inputArrays.map((input: string, index) => (
              <TextField
                key={index}
                onChange={handleInputsChange}
                id={input}
                className={input}
                label={input}
                variant="outlined"
                defaultValue={inputs[input].value}
                autoComplete="true"
                title={input}
              />
            ))}
            {restaurants.length && (
              <TextField
                id="outlined-select-currency-native"
                select
                label="Restaurnt"
                value={currency.name}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
              </TextField>
            )}
          </Box>
          <Button onClick={() => sendUpdateReq(inputs)}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default EditModal;
