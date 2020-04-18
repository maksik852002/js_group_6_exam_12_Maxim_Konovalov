import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormElement from "./FormElement";
import { editProfile } from "../../../store/actions/usersActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [state, setState] = useState({
    password: "",
    avatar: null,
    displayName: "",
    username: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    Object.keys(state).forEach((key) => {
      profileData.append(key, state[key]);
    });

    dispatch(editProfile(profileData));
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10} lg={6}>
        <Box pt={2} pb={2}>
          <Typography variant="h4">Edit Profile</Typography>
        </Box>

        <form onSubmit={onSubmit}>
          <Grid container direction="column" spacing={2}>
            {user.facebookId && !user.isUsernameChanged && (
              <Grid item xs>
                <FormElement
                  propertyName="username"
                  title="Username"
                  onChange={onChange}
                  value={state.username}
                />
              </Grid>
            )}
            <Grid item xs>
              <FormElement
                propertyName="displayName"
                title="Display name"
                onChange={onChange}
                value={state.displayName}
              />
            </Grid>
            {!user.facebookId && (
              <Grid item xs>
                <FormElement
                  type="password"
                  propertyName="password"
                  title="Change password"
                  onChange={onChange}
                  value={state.password}
                />
              </Grid>
            )}
            <Grid item xs>
              <FormElement
                type="file"
                propertyName="avatar"
                title="Upload avatar"
                onChange={onFileChange}
              />
            </Grid>
            <Grid item xs>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
