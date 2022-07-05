import { useEffect, useState } from "react";
import { SingleDish } from "../../../../Assets/Interfaces/SingleDish";
import { getBestDishesData } from "../../../../services/api-services";
import AdminTable from "../Table/Table";

const DishesPannel=()=>{
    let dishes:any[] = [];
    const culomns = ["name", "image", "type", "description", "price", "restaurant"];
    const [bestDishes, setBestDishes] = useState(dishes);
    useEffect(() => {
      getBestDishesData().then((res) => {
        setBestDishes(res.data);
      });
    }, [bestDishes]);
    const title="Dishes Pannel";

    return(<div>
        {bestDishes.length&&<AdminTable Array={bestDishes} Title={title} Culomns={culomns}/>}
    </div>)
}

export default DishesPannel;