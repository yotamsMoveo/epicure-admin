import { UserInfo } from "os";
import { AdminUser } from "../Assets/Admin";
import { SingleDish } from "../Assets/Interfaces/SingleDish";

export async function registerReq(
    userData:any
  ): Promise<any> {
    const url = "http://3.85.131.215/api/validation/register" ;
    const yy=JSON.stringify({userData})
    console.log(yy);
    const response = await fetch(url, {
      method: "POST",
      body: yy,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    return data;
  }

  export async function loginReq(
    userData:any
  ): Promise<any> {
    const url = "http://3.85.131.215/api/validation/login" ;
    const yy=JSON.stringify({userData})
    console.log(yy);
    const response = await fetch(url, {
      method: "POST",
      body: yy,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    return data;
  }