import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import './Card.scss';

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export interface BasicCardProps {
  InputsArray: string[];
  Title:string;
}

const BasicCard: React.FC<BasicCardProps> = ({ InputsArray,Title }) => {
  return (
    <Card sx={{ minWidth: 275 ,alignContent:"center",display:"flex",backgroundColor:"gray"}} className="card-body">
        <h1>{Title}</h1>
      <CardContent className="contant" >
          {InputsArray.map((input: string,index) => 
            <TextField key={index} id="outlined-basic" label={input} variant="outlined" autoComplete="true" sx={{backgroundColor:"white"}}/>
          )}
      </CardContent>
      <CardActions>
        <Button >Submit</Button>
      </CardActions>
    </Card>
  );
};
export default BasicCard;
