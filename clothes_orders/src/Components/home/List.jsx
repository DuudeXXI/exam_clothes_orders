import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import HomeContext from '../../Contexts/HomeContext';
import Line from './Line';

function List() {

    const { clothes, setClothes } = useContext(HomeContext);

    const [stats, setStats] = useState({clothesCount: null});

    useEffect(() => {
        if (null === clothes) {
            return;
        }
        setStats(s => ({...s, movieCount: clothes.length}));
    }, [clothes]);

    return (
        <>
            <div className="card m-4">
                <h5 className="card-header">Sort</h5>
                <div className="card-body">
                </div>
            </div>
            <div className="card m-4">
                <h5 className="card-header">Movies List ({stats.clothesCount})</h5>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            clothes?.map(m => m.show ? <Line key={m.id} movie={m} /> : null)
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default List;