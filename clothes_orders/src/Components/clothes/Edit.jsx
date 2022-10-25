import { useContext, useEffect, useState, useRef } from "react";
import ClothesContext from "../../Contexts/ClothesContext";
import getBase64 from "../../Functions/getBase64";
import clothesData from "../Data/clothes";

function Edit() {
  const [type, setType] = useState("0");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const [price, setPrice] = useState("");
  const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData } = useContext(ClothesContext);

  const edit = () => {
    setEditData({
      type,
      price: parseFloat(price),
      color,
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
      name,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setType(modalData.type);
    setPrice(modalData.price);
    setColor(modalData.color);
    setHex(modalData.color);
    setName(modalData.name);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  const colorPick = (e) => {
    setHex(e.target.value);
    setColor(e.target.value);
  };

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "#0000005f" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Apparel</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  maxLength={50}
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={0} disabled>
                    Choose from list
                  </option>
                  {clothesData.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Color</label>
                <input
                  type="color"
                  className="form-control"
                  value={color}
                  onChange={colorPick}
                  style={{ height: "60px" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Color Hex Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={hex}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  maxLength={5}
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  ref={fileInput}
                  type="file"
                  className="form-control"
                  onChange={doPhoto}
                />
              </div>
              {photoPrint ? (
                <div className="img-bin">
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
