import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import OrdersList from "../components/Tables/OrdersList";
import Order from "../components/Order";
import Branches from "../components/Tables/Branches";
import Branch from "../components/Branch";
import NewBranch from "../components/NewBranch";
import NewOrder from "../components/NewOrder";
import Couriers from "../components/Tables/Couriers";
import NewCourier from "../components/NewCourier";
import Courier from "../components/Courier";
import Reports from "../components/Reports";
import Messengers from "../components/Tables/Messengers";
import NewMessenger from "../components/NewMessenger";
import NotAssigned from "../components/Tables/NotAssignedOrders";
import Messenger from "../components/Messenger"
import Login from "../components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={() => <Login/>} />
        <Route exact path="/orders" render={() => <OrdersList />} />
        <Route
          exact
          path="/orders/notassigned"
          render={() => <NotAssigned />}
        />
        <Route exact path="/order" render={() => <NewOrder />} />
        <Route path="/order/:id" render={() => <Order />} />
        <Route exact path="/branches" render={() => <Branches />} />
        <Route exact path="/branch" render={() => <NewBranch />} />
        <Route exact path="/branch/:id" render={() => <Branch />} />
        <Route exact path="/couriers" render={() => <Couriers />} />
        <Route exact path="/courier" render={() => <NewCourier />} />
        <Route exact path="/courier/:id" render={() => <Courier />} />
        <Route exact path="/reports" render={() => <Reports />} />
        <Route exact path="/messengers" render={() => <Messengers />} />
        <Route exact path="/messenger" render={() => <NewMessenger />} />
        <Route exact path="/messenger/:id" render={() => <Messenger />} />

      </BrowserRouter>
    </div>
  );
}

export default App;
