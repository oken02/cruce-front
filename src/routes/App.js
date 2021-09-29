import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/LoginForm';
import BranchCreationForm from '../components/BranchCreationForm';
import CourierCreationForm from '../components/CourierCreationForm';
import UserCreationForm from '../components/UserCreationForm';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />;
        <Route exact path="/altaBranch" component={BranchCreationForm} />;
        <Route exact path="/altaCourier" component={CourierCreationForm} />;
        <Route exact path="/altaUser" component={UserCreationForm} />;
        {/* <Route exact path="/" component={Home} />; */}
      </Switch>
    </>
  );
}

export default App;
