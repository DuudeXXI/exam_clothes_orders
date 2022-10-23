import { useState } from "react";
import { useContext } from "react";
import AdminOrdersContext from "../../Contexts/AdminOrders";
import clothes from "../Data/clothes";
import sizes from "../Data/sizes";

function Line({ clothe }) {

  const { setOrder } = useContext(AdminOrdersContext)

  const [size, setSize] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <li className="list-group-item">
      <div className="line_content">
        <div className="product_info_container">
          {clothe.image ? (
            <div className="img-bin">
              <img src={clothe.image} alt={clothe.type}></img>
            </div>
          ) : (
            <div className="no_image">No image</div>
          )}
          <div className="line_info_container">
            <div className="line_info_3">
              {clothes.find((c) => c.id === clothe.type)?.type}
            </div>
            <div className="line_info_1">
              Color code: <strong>{clothe.color}</strong>
            </div>
            <div className="line_info_2">{clothe.price}</div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
