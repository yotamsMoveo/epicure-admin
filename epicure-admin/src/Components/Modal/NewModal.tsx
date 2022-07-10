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
}

const NewModal: React.FC<ModalProps> = ({ inputArrays }) => {
  let navigate = useNavigate();
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
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  inputs["name"] = { value: "" };
  inputs["image"] = { value: "" };
  inputs["description"] = { value: "" };
  let inputs1: { [key: string]: input } = {};
  const [spicy, setSpicy] = React.useState(false);
  const [veg, setVeg] = React.useState(false);
  const [vej, setVej] = React.useState(false);
  const [breakfast, setBreakfast] = React.useState(false);
  const [lanch, setLanch] = React.useState(false);
  const [dinner, setDinner] = React.useState(false);
 
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
    image: "",
    name: "",
    description: "",
    type: [""],
    price: 4,
    dish_time: [""],
    restaurant: rest,
    active: true,
  };
  const [dishToSend, setDishToSend] = useState(dishToadd);
  const [currency, setCurrency] = useState(rest);
  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.labels?.forEach((label) => {
      const data = label.attributes.getNamedItem("for")?.nodeValue;
      let test = "";

      if (data == "name") {
        setName(event.target.value);
      } else if (data == "image") {
        setImage(event.target.value);
      } else if (data == "description") {
        setDescription(event.target.value);
      }
    });
    dishToadd.active = true;
    if (
      dishToadd.description != "" &&
      dishToadd.name != "" &&
      dishToadd.image != ""
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

  const sendAddReq = () => {
   
    dishToSend.name=name;
    dishToSend.image=image;
    dishToSend.description=description;
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
    dishToSend.dish_time.splice(0);
    if (breakfast) {
      dishToSend.dish_time.push("b");
    }
    if (veg) {
      dishToSend.dish_time.push("l");
    }
    if (vej) {
      dishToSend.dish_time.push("d");
    }
    dishToSend.restaurant = currency;
    dishToSend.price = price;
    debugger;
    addDishData(dishToSend).then((res) => {
      if (res.status == "Success") {
        toast.success("Add Successfully");
      } else {
        toast.error("Check Your inputs");
      }
    });
    setTimeout(() => navigate("/admin"), 1000);
    handleClose();
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
            {restaurants.length ?
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
              )):<div></div>}
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
            <FormGroup >
              <div className="types-array">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={breakfast}
                      onChange={() => setBreakfast((prevState) => !prevState)}
                    />
                  }
                  label="Breakfast"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lanch}
                      onChange={() => setLanch((prevState) => !prevState)}
                    />
                  }
                  label="Lanch"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dinner}
                      onChange={() => setDinner((prevState) => !prevState)}
                    />
                  }
                  label="Dinner"
                />
              </div>
            </FormGroup>
           
            {restaurants.length ? (
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
            ):<div></div>}
          </Box>
          <Button onClick={() => sendAddReq()}>Add</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default NewModal;
