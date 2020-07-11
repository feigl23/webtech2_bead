import React from 'react';
import PrivateRoute from '../routes/privateRoute';
import './app.scss';
import Login from './login/login';
import Main from './main/main';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Signup from './signup/singup';

function App() {
  return (
    <div className={"container"}>
      <div className={"container__background"}></div>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Signup} />
          <PrivateRoute path={"/admin"} component={<Main />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
