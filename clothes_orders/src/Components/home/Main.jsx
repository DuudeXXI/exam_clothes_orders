import { useContext } from "react";
//
import DataContext from "../../Contexts/DataContext";
import HomeContext from "../../Contexts/HomeContext";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
// Data
import clothesData from "../Data/clothes";
const Main = () => {
  const { userId, setUserId} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [clothes, setClothes] = useState(null);

  const [filter, setFilter] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  
  const [order, setOrder] = useState(null);
  const fromLocal = JSON.parse(localStorage.getItem('user_id'))
  
  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/clothes", authConfig())
      .then((res) => {
        setClothes(res.data.map((d, i) => ({...d, show: true, row: i})));
        setUserId(fromLocal)
        console.log('labas');
      });
  }, [lastUpdate, setUserId,filter]);

  useEffect(() => {
    if (null === order) {
        return;
    }
    axios.post('http://localhost:3003/home/orders/' + order.clothe_id, order, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
 }, [order, ]);

//   useEffect(() => {
//     if (0 === filter || clothes === null) {
//         return;
//     }
//     setClothes(m => m.type === filter ? { ...m, show: true } : { ...m, show: false });
//  }, [filter]);

 console.log(filter);
 console.log(clothes?.map(a => console.log(a.type)));

    const sortData = [
        {v: 'default', t:'Default'},
        {v: 'price_asc', t:'Price 1-9'}, 
        {v: 'price_desc', t:'Price 9-1'}
    ];

    useEffect(() => {
        switch (sortBy) {
            case 'price_asc':
                setClothes(m => [...m].sort((a, b) => a.price - b.price));
                break;
            case 'price_desc':
                setClothes(m => [...m].sort((b, a) => a.price - b.price));
                break;
            default:
                setClothes(m => [...m ?? []].sort((a, b) => a.row - b.row));
        }

    }, [sortBy, setClothes]);

  return (
    <HomeContext.Provider
      value={{
        clothes,
        setClothes,
        setOrder,
        setClothes,
        userId
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12" style={{margin: "30px 0 0 0"}}>
            <div className="card">
              <h5 className="card-header">Filter</h5>
              <div className="card-body">
                <div className="form-selection">
                  <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value * 1)}
                  >
                    <option value={0}>All</option>
                    {clothesData?.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-selection">
                <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {
                    sortData.map((g) => (<option key={g.v} value={g.v}>{g.t}</option>))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <List />
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default Main;
