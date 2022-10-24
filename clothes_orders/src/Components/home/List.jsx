import { useContext } from 'react';
import HomeContext from '../../Contexts/HomeContext';
import Line from './Line';

function List() {

    const { clothes } = useContext(HomeContext)

    return (
            <div className="card" style={{margin: "30px 0 0 0"}}>
            <h5 className="card-header">Selected Type</h5>
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