import { SingleRestaurant } from "./SingleRestaurant";

export interface SingleDish {
    image: string ;
    name: string ;
    description: string ;
    type: string ;
    price: number;
    restaurant: SingleRestaurant ;
    dish_id: number;
    dish_time:string;
  }
  