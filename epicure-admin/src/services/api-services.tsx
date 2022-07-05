import { SingleDish } from "../Assets/Interfaces/SingleDish";
const token = localStorage.getItem('token');

export async function getBestDishesData(): Promise<any> {
  const url = "http://3.85.131.215/api/Dishes";
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
}

export async function getResturantsData(): Promise<any> {
  const url = "http://3.85.131.215/api/Restaurants";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getChefOfTheWeekData(): Promise<any> {
  const url = "http://3.85.131.215/api/Chefs/";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getRestaurantsByChefId(chef_id: string): Promise<any> {
  const url = "http://3.85.131.215/api/Restaurants/" + chef_id;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
}

export async function getDishesByChefId(rest_id: string): Promise<any> {
  const url = "http://3.85.131.215/api/Dishes/" + rest_id;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
}

export async function getRestaurantsById(rest_id: string): Promise<any> {
  const url = "http://3.85.131.215/api/single/" + rest_id;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
}


export async function updateDishData(
  dish_id: string,
  dishDataTOUpdate: SingleDish
): Promise<any> {
  const url = "http://3.85.131.215/api/Dishes/" + dish_id;
  const yy=JSON.stringify({dishDataTOUpdate})
  const response = await fetch(url, {
    method: "PATCH",
    body: yy,
    headers: {
      'Content-Type': 'application/json',
      Authorization:`x-access-token ${localStorage.getItem('token')}`

    },
  });

  const data = await response.json();
  return data;
}

export async function addDishData(
  dishDataTOAdd: SingleDish
): Promise<any> {
  const url = "http://3.85.131.215/api/Dishes/" ;
  const yy=JSON.stringify({dishDataTOAdd})
  const response = await fetch(url, {
    method: "POST",
    body: yy,
    headers: {
      'Content-Type': 'application/json',
      Authorization:`x-access-token ${localStorage.getItem('token')}`
    },
  });

  const data = await response.json();
  return data;
}



