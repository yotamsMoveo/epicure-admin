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
import { Checkbox, FormControlLabel, FormGroup, Select } from "@mui/material";
import { SingleRestaurant } from "../../Assets/Interfaces/SingleRestaurant";
import { Label } from "@mui/icons-material";
import { ChangeEventHandler } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  dishToUpdate: SingleDish;
}

const EditModal: React.FC<ModalProps> = ({ inputArrays, dishToUpdate }) => {
  let navigate=useNavigate();
  interface input {
    value: any;
  }
  interface types {
    value: any;
  }
  const inputs: { [key: string]: input } = {};
  const types: { [key: string]: types } = {};
  types["spicy"] = { value: "https://svgshare.com/i/i45.svg" };
  types["veg"] = { value: "https://svgshare.com/i/i4i.svg" };
  types["vej"] = { value: "" };
  let isSpicy = false;
  let isVeg = false;
  let isVej = false;
  dishToUpdate.type.forEach((type) => {
    if (types["spicy"].value == type) {
      isSpicy = true;
    }
    if (types["veg"].value == type) {
      isVeg = true;
    }
    if (types["vej"].value == type) {
      isVej = true;
    }
  });
  inputs["name"] = { value: dishToUpdate.name };
  inputs["image"] = { value: dishToUpdate.image };
  inputs["type"] = { value: dishToUpdate.type };
  inputs["description"] = { value: dishToUpdate.description };
  inputs["price"] = { value: dishToUpdate.price };
  inputs["restaurant"] = { value: dishToUpdate.restaurant.name };
  const [spicy, setSpicy] = React.useState(isSpicy);
  const [veg, setVeg] = React.useState(isVeg);
  const [vej, setVej] = React.useState(isVej);
  const [name, setName] = React.useState(dishToUpdate.name);
  const [image, setImage] = React.useState(dishToUpdate.image);
  const [description, setDescription] = React.useState(dishToUpdate.description);
  const [price, setPrice] = React.useState(dishToUpdate.price);
  const [open, setOpen] = React.useState(true);
  const [submit, setSubmit] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSubmit((prevState) => !prevState);
  };

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
    event.target.labels?.forEach((label) => {
      const data = label.attributes.getNamedItem("for")?.nodeValue;
      let test = "";
      if (data=="name") {
        setName(event.target.value);
      }
      else if (data=="image") {
        setImage(event.target.value);
      }
      if (data=="description") {
        setDescription(event.target.value);
      }
      if (data=="price") {
        let newPrice:number =+ (event.target.value);
        setPrice(newPrice);
      }
      //inputs[test].value = event.target.value;
    });
  };

  const sendUpdateReq = (inputs: any) => {
    dishToUpdate.type.splice(0);
    if (spicy) {
      dishToUpdate.type.push(types["spicy"].value);
    }
    if (veg) {
      dishToUpdate.type.push(types["veg"].value);
    }
    if (vej) {
      dishToUpdate.type.push(types["vej"].value);
    }
    dishToUpdate.description =description;
    dishToUpdate.name = name;
    dishToUpdate.image = image;
    dishToUpdate.price = price;
    updateDishData(dishToUpdate._id, dishToUpdate).then((res) => {
      console.log(res.data);
      if (res.status == "Success") {
        toast.success("Edit Successfully");
      } else {
        toast.error("Check Your inputs");
      }
    });
    setSubmit((prevState) => !prevState);
    setTimeout(()=>navigate("/admin"),1000);
    handleClose();
    // setTimeout(() => window.location.reload(), 1000);
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
            <FormGroup >
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
