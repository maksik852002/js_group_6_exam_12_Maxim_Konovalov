import React from "react";
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginWithFacebook } from "../../store/actions/usersActions";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const callback = (facebookData) => {
    if (facebookData.id) {
      dispatch(loginWithFacebook(facebookData));
    }
  };

  return (
    <FacebookLoginButton
      appId="260710234961364"
      callback={callback}
      fields="name, email, picture"
      render={(renderProps) => (
        <Button
          variant="contained"
          color="primary"
          onClick={renderProps.onClick}
          startIcon={<FacebookIcon />}
        >
          Login with Facebook
        </Button>
      )}
    />
  );
};

export default FacebookLogin;
