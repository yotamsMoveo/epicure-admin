import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SingleDish } from "../../../../Assets/Interfaces/SingleDish";
import { getBestDishesData } from "../../../../services/api-services";
import { useEffect, useState } from "react";
import "../Table/Table.scss";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "../../../../Components/Modal/EditModal";
import { SingleRestaurant } from "../../../../Assets/Interfaces/SingleRestaurant";
import NewModal from "../../../../Components/Modal/NewModal";
import DeleteModal from "../../../../Components/Modal/DeleteModal";
export interface TableProps {
  Array: any[];
  Title: string;
  Culomns: string[];
}

const AdminTable: React.FC<TableProps> = ({ Array, Title, Culomns }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openEtidModal = (currentDish: SingleDish) => {
    setDish(currentDish);
    setIsEditOpen((prevState) => !prevState);
  };
  const deleteRow = (currentDish: SingleDish) => {
    setDish(currentDish);
    setIsDeleteOpen((prevState) => !prevState);
  };
  const openNewModal = () => {
    //setDish(currentDish)
    setIsNewOpen((prevState) => !prevState);
  };
  let rest: SingleRestaurant = {
    image: "string",
    name: "string",
    chef_name: "string",
    chef: "string",
    open_date: "string",
    rating: 0,
    open_hour: 0,
    _id: "string",
    active: true,
  };
  let dishToEdit: SingleDish = {
    image: "string",
    name: "string",
    description: "string",
    type: ["string"],
    price: 7,
    restaurant: rest,
    _id: "0",
    dish_time: ["string"],
    active: true,
  };
  const [dish, setDish] = useState(dishToEdit);
  const inputsForEdit = ["name", "image", "description", "price"];
  const inputsForNew = ["name", "image", "description"];
  return (
    <div>
      <div className="admin-header">
        <h1>{Title}</h1>
        <Button className="admin-header-button" onClick={() => openNewModal()}>
          Add
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Culomns.map((cul: string, index) => (
                <TableCell align="left" key={index}>
                  {cul}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.map((currentDish: SingleDish, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{currentDish.name}</TableCell>
                <TableCell align="left">
                  <img className="table-image" src={currentDish.image} />
                </TableCell>
                <TableCell align="left" >
                  <div className="types-array">
                    {currentDish.type.map((type) => (
                      <img className="table-type-image" src={type} />
                    ))}
                  </div>
                </TableCell>
                <TableCell align="left">{currentDish.description}</TableCell>
                <TableCell align="left">{currentDish.price}</TableCell>
                <TableCell align="left">
                  {currentDish.restaurant.name}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => deleteRow(currentDish)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => openEtidModal(currentDish)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditOpen ? (
        <EditModal inputArrays={inputsForEdit} dishToUpdate={dish} />
      ):<div></div>}
      {isNewOpen ? <NewModal inputArrays={inputsForNew} />:<div></div>}
      {isDeleteOpen ?<DeleteModal dishToDelete={dish} />:<div></div>}
    </div>
  );
};

export default AdminTable;
