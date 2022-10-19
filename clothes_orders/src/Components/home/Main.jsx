import { useContext } from "react";
//
import DataContext from "../../Contexts/DataContext";
import HomeContext from "../../Contexts/HomeContext";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { authConfig } from "../../Functions/auth";
const Main = () => {
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [clothes, setClothes] = useState(null);
  const [rateData, setRateData] = useState(null);
  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/home/clothes", authConfig())
    .then((res) => {
        setClothes(res.data)
    });
  }, [lastUpdate]);

//   useEffect(() => {
//     if (null === rateData) {
//         return;
//     }
//     axios.put('http://localhost:3003/home/movies/' + rateData.id, rateData, authConfig())
//     .then(res => {
//         setLastUpdate(Date.now());
//     });
// }, [rateData]);

  return (
    <HomeContext.Provider value={{
      clothes,
      // setRateData,
      setClothes,
    }}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <List/>
                </div>
            </div>
        </div>
    </HomeContext.Provider>
  );
};

export default Main;
