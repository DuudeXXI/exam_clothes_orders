import { useContext } from "react";
//
import AdminOrders from "../../Contexts/AdminOrders";
import DataContext from "../../Contexts/DataContext";

const Main = () => {
  const {} = useContext(DataContext);

  return (
    <AdminOrders.Provider value={{}}>
      <div className="container">
        <div className="row">
          <div className="col-sm">Two</div>
        </div>
      </div>
    </AdminOrders.Provider>
  );
};

export default Main;
