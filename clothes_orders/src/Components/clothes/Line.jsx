import { useContext } from "react";
import ClothesContext from "../../Contexts/ClothesContext";
import clothes from "../Data/clothes";

function Line({ clothe }) {
  const { setDeleteData, setModalData } = useContext(ClothesContext);

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
            <div className="line_info_3">{clothe.name}</div>
            <div className="line_info_2">{clothes.find(c => c.id === clothe.type)?.type}</div>
            <div className="line_info_1">Color code: <strong>{clothe.color}</strong></div>
            <div className="line_info_2">{clothe.price}</div>
          </div>
        </div>
        <div className="line_buttons">
          <button
            onClick={() => setModalData(clothe)}
            type="button"
            className="btn btn-outline-success"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteData(clothe)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
