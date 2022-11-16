import { useContext } from "react";
import clothesData from "../Data/clothes";
import sizes from "../Data/sizes";
import DataContext from "../../Contexts/DataContext";

function Line({ clothe }) {
  
  const { userId } = useContext(DataContext);
  
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
            <div className="line_info_2">{clothe[1][0].price} Eur</div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {clothe[1].filter(a => a.client_id === userId).map((order) => (
          <li className="list-group-item" key={order.id}>
            <div className="comment-container">
              <div className="line_info_2">
                Your Client Number: <strong>{order.client_id}</strong>
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
              <div className="line_text_only">
                <div>Status: <strong>{ order.status ? "Confirmed" : "Unconfirmed"}</strong></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Line;
