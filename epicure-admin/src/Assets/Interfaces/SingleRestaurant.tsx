import { SingleDish } from "./SingleDish";

export interface SingleRestaurant {
  image: string;
  name: string;
  chef_name: string;
  chef: string;
  open_date: string;
  rating: number;
  open_hour: number;
  _id:string;
  active:boolean;
}
