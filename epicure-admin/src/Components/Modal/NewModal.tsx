import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { useState } from "react";
import { addDishData, getResturantsData } from "../../services/api-services";
import TextField from "@mui/material/TextField";
import { SingleRestaurant } from "../../Assets/Interfaces/SingleRestaurant";
import "../Modal/NewModal.scss";
import toast, { Toaster } from "react-hot-toast";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
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
  inputArrays: string[];
}

const NewModal: React.FC<ModalProps> = ({ inputArrays }) => {
  let navigate=useNavigate();
  const [open, setOpen] = React.useState(true);
  const [submit, setSubmit] = useState(false);
  const [price, setPrice] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const allRestauranrs: SingleRestaurant[] = [];
  const [restaurants, setRestaurants] = useState(allRestauranrs);
  interface input {
    value: any;
  }
  interface types {
    value: any;
  }
  const types: { [key: string]: types } = {};
  types["spicy"] = { value: "https://svgshare.com/i/i45.svg" };
  types["veg"] = { value: "https://svgshare.com/i/i4i.svg" };
  types["vej"] = { value: "" };
  let inputs: { [key: string]: input } = {};
  inputs["name"] = { value: "" };
  inputs["image"] = { value: "" };
  inputs["type"] = { value: "" };
  inputs["description"] = { value: "" };
  inputs["price"] = { value: 0 };
  inputs["restaurant"] = { value: "" };
  let inputs1: { [key: string]: input } = {};
  const [spicy, setSpicy] = React.useState(false);
  const [veg, setVeg] = React.useState(false);
  const [vej, setVej] = React.useState(false);
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
  let dishToadd: any = {
    image: "string",
    name: "string",
    description: "string",
    type: ["string"],
    price: "4",
    dish_time: "string",
    restaurant: rest,
  };
  const [dishToSend, setDishToSend] = useState(dishToadd);
  const [currency, setCurrency] = useState(rest);
  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.labels?.forEach((label) => {
      const data = label.attributes.getNamedItem("for")?.nodeValue;
      let test = "";
      if (data) {
        test = data;
      }
      inputs[test].value = event.target.value;
    });
    dishToadd.description = inputs["description"].value;
    dishToadd.name = inputs["name"].value;
    dishToadd.image = inputs["image"].value;
    dishToadd.type = inputs["type"].value;
    dishToadd.active = true;

    if (
      inputs["description"].value != "" &&
      inputs["name"].value != "" &&
      inputs["image"].value != "" &&
      inputs["type"].value != ""
    ) {
      setDishToSend(dishToadd);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    restaurants.forEach((restaurant) => {
      if (restaurant.name.localeCompare(event.target.value) == 0) {
        setCurrency(restaurant);
      }
    });
  };
  let status = "";
  const sendAddReq = () => {
    dishToSend.type.splice(0);
    if (spicy) {
      dishToSend.type.push(types["spicy"].value);
    }
    if (veg) {
      dishToSend.type.push(types["veg"].value);
    }
    if (vej) {
      dishToSend.type.push(types["vej"].value);
    }
    dishToSend.restaurant = currency;
    dishToSend.price = price;
    addDishData(dishToSend).then((res) => {
      if (res.status == "Success") {
        toast.success("Add Successfully");
      } else {
        toast.error("Check Your inputs");
      }
    });
    setTimeout(()=>navigate("/admin"),1000);
    handleClose();
    console.log(status);
  };

  const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = +event.target.value;
    setPrice(value);
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
          <h1>Adding new Dish</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            {restaurants.length &&
              inputArrays.map((input: string, index) => (
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
            <TextField
              id="outlined-select-currency-native"
              label="Price"
              value={price}
              onChange={changePrice}
            ></TextField>

            <FormGroup>
              <div className="types-array">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={spicy}
                      onChange={() => setSpicy((prevState) => !prevState)}
                    />
                  }
                  label="Spicy"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={veg}
                      onChange={() => setVeg((prevState) => !prevState)}
                    />
                  }
                  label="Vegan"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vej}
                      onChange={() => setVej((prevState) => !prevState)}
                    />
                  }
                  label="Vej"
                />
              </div>
            </FormGroup>
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
          <Button onClick={() => sendAddReq()}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default NewModal;
