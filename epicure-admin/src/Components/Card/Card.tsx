import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import "./Card.scss";
import { useState } from "react";
import { AdminUser } from "../../Assets/Admin";
import { loginReq, registerReq } from "../../services/auth-api";

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
  Title: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ InputsArray, Title }) => {
  let user: AdminUser = {
    password: "",
    email: "",
    name:""
  };
  interface input {
    value: any;
  }
  const [userData, setUserData] = useState({user});
  const inputs: { [key: string]: input } = {};
  inputs["Password"] = { value: "" };
  inputs["Email"] = { value: "" };
  inputs["User Name"] = { value: "" };
  const handleInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(InputsArray.length==3){
    event.target.labels?.forEach((label) => {
      const data = label.attributes.getNamedItem("for")?.nodeValue;
      let test = "";
      if (data) {
        test = data;
      }
      inputs[test].value = event.target.value;
    });
    if(inputs["Password"].value!=""&&inputs["Email"].value!=""&&inputs["User Name"].value!=""){
      user.email=inputs["Email"].value;
      user.password=inputs["Password"].value;
      user.name=inputs["User Name"].value;
      setUserData({user});
      console.log(userData,'userData')
    }}
    else{
      event.target.labels?.forEach((label) => {
        const data = label.attributes.getNamedItem("for")?.nodeValue;
        let test = "";
        if (data) {
          test = data;
        }
        inputs[test].value = event.target.value;
      });
      if(inputs["Password"].value!=""&&inputs["Email"].value!=""){
        user.email=inputs["Email"].value;
        user.password=inputs["Password"].value;
        setUserData({user});
        console.log(userData,'userData')
      }
    }
  };

  const sendSingUpeReq = () => {
    if(InputsArray.length==3){
      userData.user.password=inputs["Password"].value;
      registerReq(userData).then((res)=>{
        console.log(res);
      })
    }
    else{
      userData.user.password=inputs["Password"].value;
      loginReq(userData).then((res)=>{
        console.log(res);
        if(res.token){
          localStorage.setItem('token', res.token);
          window.location.href='/admin';
        }else{
          console.log('err')
        }
      })
      console.log(userData);
    }
   
    
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        alignContent: "center",
        display: "flex",
      }}
      className="card-body"
    >
      <h1>{Title}</h1>
      <CardContent className="contant">
        {InputsArray.map((input: string, index) => (
          <TextField
            key={index}
            onChange={handleInputsChange}
            id={input}
            label={input}
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            required
          />
        ))}
      </CardContent>
      <CardActions>
        <Button onClick={sendSingUpeReq}>Submit</Button>
      </CardActions>
    </Card>
  );
};
export default BasicCard;
