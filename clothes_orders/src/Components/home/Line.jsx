import { useState } from "react";
import { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";
import clothes from "../Data/clothes";
import sizes from "../Data/sizes";

function Line({ clothe }) {

  const { setOrder, userId} = useContext(HomeContext)

  const [size, setSize] = useState(0)
  const [comment, setComment] = useState('')

  const add = () => {
    setOrder({
      comment,
      size,
      clothe_id: clothe.id,
      client_id: userId
    })
    setComment('')
    setSize(0)
  }

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
            <div className="line_info_2">
              {clothes.find((c) => c.id === clothe.type)?.type}
            </div>
            <div className="line_info_1">
              Color code: <strong>{clothe.color}</strong>
            </div>
            <div className="line_info_2">{clothe.price}</div>
          </div>
        </div>
        <div className="order_inputs_container">
          <div>
            <select
              className="form-select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value={0} disabled>Choose size</option>
              {
                sizes.map(s => <option key={s.id} value={s.id}>{s.type}</option>)
              }
            </select>
          </div>
          <div>
            <textarea
              maxLength={120}
              type="text"
              placeholder="Add your comment"
              style={{maxWidth: "300px", minHeight: "100px", maxHeight:"100px"}}
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button type="button" onClick={add} className="btn btn-outline-success">Order</button>
        </div>
      </div>
    </li>
  );
}

export default Line;
