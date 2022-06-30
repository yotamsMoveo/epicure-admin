import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { SingleDish } from "../../Assets/Interfaces/SingleDish";
import { useEffect } from "react";
import { useState } from "react";
import { addDishData, getResturantsData, updateDishData } from "../../services/api-services";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";
import { SingleRestaurant } from "../../Assets/Interfaces/SingleRestaurant";
import "../Modal/NewModal.scss";

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
}

const NewModal: React.FC<ModalProps> = ({ inputArrays }) => {
  const [open, setOpen] = React.useState(true);
  const [submit, setSubmit] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const allRestauranrs: SingleRestaurant[] = [];
  const [restaurants, setRestaurants] = useState(allRestauranrs);
  interface input {
    value: any;
  }
  const inputs: { [key: string]: input } = {};
  inputs["name"] = { value: "" };
  inputs["image"] = { value: "" };
  inputs["type"] = { value: "" };
  inputs["description"] = { value: "" };
  inputs["price"] = { value: 0 };
  inputs["restaurant"] = { value: ""};

  useEffect(() => {
    getResturantsData().then((res) => {
      setRestaurants(res.data);
    });
  }, []);
  let rest: SingleRestaurant = {
    image: "string",
    name: "string",
    chef_name: "string",
    chef: "string",
    open_date: "string",
    rating: 9,
    open_hour: 9,
    _id: "string",
    active: true,
  };
  let dishToadd:any={
    image: "string" ,
    name: "string" ,
    description: "string" ,
    type: "string" ,
    price: "4",
    dish_time:"string"
  }
  const [currency, setCurrency] = useState(rest);
  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.labels?.forEach(label => {
      const data=label.attributes.getNamedItem('for')?.nodeValue;
      let test="";
      if(data){
        test=data;
      }
      inputs[test].value=event.target.value;
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    restaurants.forEach((restaurant) => {
      if (restaurant.name.localeCompare(event.target.value) == 0) {
        setCurrency(restaurant);
      }
    });
  };
  

  const sendAddReq = (inputs: any) => {
    dishToadd.description = inputs["description"].value;
    dishToadd.name = inputs["name"].value;
    dishToadd.image = inputs["image"].value;
    dishToadd.type = inputs["type"].value;
    dishToadd.price = inputs["price"].value;
    dishToadd.active=true;
    addDishData(dishToadd).then((res) => {
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
          <h1>Adding new Dish</h1>
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
                label="Restaurant"
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
          <Button onClick={()=>sendAddReq(inputs)}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default NewModal;
