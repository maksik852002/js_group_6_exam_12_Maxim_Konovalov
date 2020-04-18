import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Photos from "./containers/Photos/Photos";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPhoto from "./containers/NewPhoto/NewPhoto";
import UserProfileForm from "./components/UI/Form/UserProfileForm";
import UserProfile from "./containers/UserProfile/UserProfile";

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

const Routes = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <Switch>
      <Route path="/" exact component={Photos} />
      <ProtectedRoute
        isAllowed={user}
        path="/photos/new"
        exact
        component={NewPhoto}
      />
      <Route path="/users/:id" exact component={Photos} />
      <Route path="/photos" exact component={Photos} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoute
        isAllowed={user}
        path="/profile/edit"
        exact
        component={UserProfileForm}
      />
      <ProtectedRoute
        isAllowed={user}
        path="/profile/"
        exact
        component={UserProfile}
      />
    </Switch>
  );
};

export default Routes;
