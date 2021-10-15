import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Branch from '../components/Branch';
import Reports from '../components/Reports';
import LoginForm from '../components/Forms/LoginForm';
import BranchCreationForm from '../components/Forms/BranchCreationForm';

import Sidebar from '../components/Sidebar';
import { sendValidation } from '../store/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';

import { connect } from '../socket';
import { Spinner, Center, Flex } from '@chakra-ui/react';

connect();

function App() {
  const { isValidated, loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log('RE RENDER APP');

  useEffect(() => {
    dispatch(sendValidation());
  }, []);

  if (!isValidated) {
    return (
      <Center direction="row" justify="center" align="center" h="50vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" render={() => <LoginForm />} />

          <Route path="/dashboard">
            <Sidebar />
          </Route>

          <Route exact path="/branch" render={() => <BranchCreationForm />} />
          <Route exact path="/branch/:id" render={() => <Branch />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
