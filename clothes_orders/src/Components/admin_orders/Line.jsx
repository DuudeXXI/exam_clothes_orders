import { useState } from "react";
import { useContext } from "react";
import AdminOrdersContext from "../../Contexts/AdminOrders";
import clothesData from "../Data/clothes";
import sizes from "../Data/sizes";

function Line({ clothe }) {
  const { setOrder, status, setStatus, setDeleteData } = useContext(AdminOrdersContext);

  const [size, setSize] = useState(0);
  const [comment, setComment] = useState("");
  
  return (
    <li className="list-group-item">
      <div className="line_content">
        <div className="product_info_container">
          {clothe[1][0].image ? (
            <div className="img-bin">
              <img src={clothe[1][0].image} alt={clothe[1][0].type}></img>
            </div>
          ) : (
            <div className="no_image">No image</div>
          )}
          <div className="line_info_container">
            <div className="line_info_3">{clothe[0]}</div>
            <div className="line_info_2">
              {clothesData.find((c) => c.id === clothe[1][0].type)?.type}
            </div>
            <div className="line_info_1">
              Color code: <strong>{clothe[1][0].color}</strong>
            </div>
            <div className="line_info_2">{clothe[1][0].price}</div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {clothe[1]?.map((order) => (
          <li className="list-group-item" key={order.id}>
            <div className="comment-container">
              <div className="line_info_2">
                Client Number: <strong>{order.client_id}</strong>
              </div>
              <div className="line_info_2">
                Requested size:{" "}
                <strong>
                  {sizes.find((s) => s.id === order.size)?.type}
                </strong>
              </div>
              <div>
                Comment: <strong>{order.comment}</strong>
              </div>
              <div className="line_buttons">
                <div>Status: <strong>{ status ? "Confirmed" : "Unconfirmed"}</strong></div>
                <button type="button" className="btn btn-outline-success" onClick={() => setStatus((s) => !s)}>
                  Change
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={() => setDeleteData(order)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Line;
