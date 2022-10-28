import { useContext } from 'react';
import AdminOrdersContext from "../../Contexts/AdminOrders";
import Line from './Line';

function List() {

    const { list } = useContext(AdminOrdersContext)
    
    return (
            <div className="card" style={{margin: "30px 0 0 0"}}>
            <h5 className="card-header">Selected Type</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        list?.map(c => <Line key={c[1][0].id} clothe={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;