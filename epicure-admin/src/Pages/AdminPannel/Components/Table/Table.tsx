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
export interface TableProps {
  Array: any[];
  Title: string;
}

const culomns = ["name", "image", "type", "description", "price", "restaurant"];
const AdminTable: React.FC<TableProps> = ({ Array, Title }) => {
  return (
    <div>
      <h1>{Title}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {culomns.map((cul: string, index) => (
                <TableCell align="right" key={index}>
                  {cul}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.map((dish: SingleDish, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{dish.name}</TableCell>
                <TableCell align="right">{dish.image}</TableCell>
                <TableCell align="right">{dish.type}</TableCell>
                <TableCell align="right">{dish.description}</TableCell>
                <TableCell align="right">{dish.price}</TableCell>
                <TableCell align="right">{dish.restaurant_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminTable;
