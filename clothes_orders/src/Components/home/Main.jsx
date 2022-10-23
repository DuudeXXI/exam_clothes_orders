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
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [clothes, setClothes] = useState(null);
  const [filter, setFilter] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const [order, setOrder] = useState(null);
  const [client, setClient] = useState(null);

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/clothes", authConfig())
      .then((res) => {
        setClothes(res.data);
      });
  }, [lastUpdate]);
// client id get
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/client", authConfig())
      .then((res) => {
        setClient(res.data);
      });
  }, [lastUpdate]);
  console.log(client);
  useEffect(() => {
    if (null === order) {
        return;
    }
    axios.post('http://localhost:3003/home/orders/' + order.clothe_id, order, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
 }, [order, ]);

  return (
    <HomeContext.Provider
      value={{
        clothes,
        setClothes,
        setOrder,
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
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value={0}>All</option>
                    {clothesData?.map((g) => (
                      <option key={g.id} value={g.type}>
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
                  ></select>
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
