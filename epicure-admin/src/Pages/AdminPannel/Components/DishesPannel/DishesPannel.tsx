import { useEffect, useState } from "react";
import { SingleDish } from "../../../../Assets/Interfaces/SingleDish";
import { getBestDishesData } from "../../../../services/api-services";
import AdminTable from "../Table/Table";

const DishesPannel=()=>{
    let dishes:any[] = [];
    const [bestDishes, setBestDishes] = useState(dishes);
    useEffect(() => {
      getBestDishesData().then((res) => {
        setBestDishes(res.data);
        console.log(res.data)
      });
    }, []);
    const title="Dishes Pannel";

    return(<div>
        {bestDishes.length&&<AdminTable Array={bestDishes} Title={title}/>}
    </div>)
}

export default DishesPannel;