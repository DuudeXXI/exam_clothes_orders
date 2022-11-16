import { useContext } from 'react';
import UserOrdersContext from "../../Contexts/UserOrders";
import Line from './Line';
import DataContext from '../../Contexts/DataContext';
// import DataContext from '../../Contexts/DataContext';

function List() {

    // const { userId } = useContext(DataContext);
    // .filter(a => a[1][0].client_id === userId)
    const { list } = useContext(UserOrdersContext)
    const { userId } = useContext(DataContext);

    return (
            <div className="card" style={{margin: "30px 0 0 0"}}>
            <h5 className="card-header">Selected Type</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        list?.map(c => c[1][0].id !== null ? <Line key={c[1][0].id} clothe={c} /> : null)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;