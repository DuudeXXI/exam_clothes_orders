import { useContext } from "react";
//
import UserOrders from "../../Contexts/UserOrders";
import DataContext from "../../Contexts/DataContext";

const Main = () => {

    const {} = useContext(DataContext);

    return (
        <UserOrders.Provider value={{}}>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    Three
                </div>
            </div>
        </div>
        </UserOrders.Provider>
    );
}

export default Main;