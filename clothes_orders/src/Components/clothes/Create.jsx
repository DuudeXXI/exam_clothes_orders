import { useState, useContext, useRef } from 'react';
import ClothesContext from '../../Contexts/ClothesContext';
import getBase64 from '../../Functions/getBase64';
import clothesData from '../Data/clothes';

function Create() {

    const [type, setType] = useState('0');
    const [color, setColor] = useState('');
    const [hex, setHex] = useState('');
    const [price, setPrice] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(ClothesContext);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {

        setCreateData({
            type,
            price: parseFloat(price),
            color,
            image: photoPrint
        });
        setColor('');
        setHex('');
        setPrice('')
        setType('0')
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    const colorPick = e => {
        setHex(e.target.value)
        setColor(e.target.value)
    }


    return (
        <div className="card m-4">
            <h5 className="card-header">New Apparel</h5>
            <div className="card-body">
            <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            clothesData.map(g => <option key={g.id} value={g.id}>{g.type}</option>)
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input type="color" className="form-control" value={color} onChange={colorPick} style={{ height: "60px"}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Color Hex Code</label>
                    <input type="text" className="form-control" value={hex} readOnly={true}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input maxLength={5} type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Movie Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img_prev'><img src={photoPrint} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;