import { useContext, useEffect, useState } from "react";
//
import ClothesContext from "../../Contexts/ClothesContext";
import DataContext from "../../Contexts/DataContext";
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Create from './Create'
import List from './List'
import Edit from "./Edit";

const Main = () => {
  // Data from App.jsx
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  // READ for list
  useEffect(() => {
      axios.get('http://localhost:3003/server/clothes', authConfig())
          .then(res => {
              setClothes(res.data);
          })
  }, [lastUpdate]);

  useEffect(() => {
      if (null === createData) {
          return;
      }
      axios.post('http://localhost:3003/server/clothes', createData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [createData]);

  useEffect(() => {
      if (null === deleteData) {
          return;
      }
      axios.delete('http://localhost:3003/server/clothes/' + deleteData.id, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [deleteData]);

  useEffect(() => {
      if (null === editData) {
          return;
      }
      axios.put('http://localhost:3003/server/clothes/' + editData.id, editData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [editData]);


  return (
    <ClothesContext.Provider value={{
      setCreateData,
      clothes,
      setDeleteData,
      setEditData,
      modalData, 
      setModalData
    }}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-4 col-sm-12">
                        <Create />
                    </div>
                    <div className="col col-lg-8 col-sm-12">
                        <List />
                    </div>
                </div>
            </div>
            <Edit />
    </ClothesContext.Provider>
  );
};

export default Main;
