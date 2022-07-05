import { SingleRestaurant } from "./SingleRestaurant";

export interface SingleDish {
    image: string ;
    name: string ;
    description: string ;
    type: string[] ;
    price: number;
    restaurant: SingleRestaurant ;
    _id: string;
    dish_time:string;
    active:boolean;
  }
  