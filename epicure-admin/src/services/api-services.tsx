import { get } from "http";

export async function getBestDishesData(): Promise<any> {
  const url = "http://localhost:8000/api/Dishes";
  const response = await fetch(url,{method:'GET'});
  const data = await response.json();
  return data;
}

export async function getResturantsData(): Promise<any> {
  const url = "http://localhost:8000/api/Restaurants";
  const response = await fetch(url);
  const data = await response.json();
  return data ;
}

export async function getChefOfTheWeekData(): Promise<any> {
  const url = "http://localhost:8000/api/Chefs/";
  const response = await fetch(url);
  const data =await response.json();
  return data ;
}

export async function getRestaurantsByChefId(chef_id:string): Promise<any> {
  const url = "http://localhost:8000/api/Restaurants/"+chef_id;
  const response = await fetch(url,{method:'GET'});
  const data =await response.json();
  return data ;
}

export async function getDishesByChefId(rest_id:string): Promise<any> {
  const url = "http://localhost:8000/api/Dishes/"+rest_id;
  const response = await fetch(url,{method:'GET'});
  const data =await response.json();
  return data ;
}

export async function getRestaurantsById(rest_id:string): Promise<any> {
  const url = "http://localhost:8000/api/single/"+rest_id;
  const response = await fetch(url,{method:'GET'});
  const data =await response.json();
  return data ;
}



