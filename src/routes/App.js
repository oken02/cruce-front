import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Order from "../components/Order";
import Branch from "../components/Branch";
import NewOrder from "../components/NewOrder";
import Courier from "../components/Courier";
import Reports from "../components/Reports";
import NotAssigned from "../components/Tables/NotAssignedOrders";
import Messenger from "../components/Messenger";
import LoginForm from "../components/Forms/LoginForm";
import BranchCreationForm from "../components/Forms/BranchCreationForm";
import CourierCreationForm from "../components/Forms/CourierCreationForm";
import UserCreationForm from "../components/Forms/UserCreationForm";

import Sidebar from '../components/Sidebar';
import { sendValidation } from '../store/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { isValidated, loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log('RE RENDER APP');

  useEffect(() => {
    dispatch(sendValidation());
  }, []);

  if (!isValidated) {
    return <p>VALIDATING TOKEN</p>;
  }

  return (
    <div className="App">
      {/* <p style={{ marginLeft: "50px" }}>
        {JSON.stringify({ isValidated, loggedUser })}
      </p> */}

      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" render={() => <LoginForm />} />

          <Route path="/dashboard">
            {/* <h1>HOLA</h1> */}
            <Sidebar />
          </Route>

          {/* <Route exact path="/orders" render={() => <OrdersList />} /> */}
          <Route
            exact
            path="/orders/notassigned"
            render={() => <NotAssigned />}
          />
          {/* <Route exact path="/order" render={() => <NewOrder />} /> */}
          {/* <Route path="/order/:id" render={() => <Order />} /> */}
          <Route exact path="/branch" render={() => <BranchCreationForm />} />
          <Route exact path="/branch/:id" render={() => <Branch />} />
          <Route exact path="/courier" render={() => <CourierCreationForm />} />
          <Route exact path="/courier/:id" render={() => <Courier />} />
          <Route exact path="/dashboard/reports" render={() => <Reports />} />
          {/* <Route exact path="/messengers" render={() => <Messengers />} /> */}
          {/* <Route exact path="/messenger/:id" render={() => <Messenger />} /> */}
          <Route exact path="/messEdit" render={() => <Messenger />} />


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
