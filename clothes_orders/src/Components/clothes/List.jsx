import { useContext } from 'react';
import ClothesContext from '../../Contexts/ClothesContext';
import Line from './Line';

function List() {

    const { clothes } = useContext(ClothesContext);

    return (
        <div className="card m-4">
            <h5 className="card-header">Movies List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        clothes?.map(c => <Line key={c.id} clothe={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;