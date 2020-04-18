import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import { apiURL, defaultAvatar } from "../../constants";
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const UserProfile = () => {

  const user = useSelector((state) => state.users.user);

  const useStyles = makeStyles({
    root: {
      width: "70%",
    },
    media: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      margin: 'auto'
    },
  });

  let image = defaultAvatar;

  if (user.avatar) {
    image = apiURL + '/' + user.avatar;
  }

  const classes = useStyles();

  return (
    <Box py={4}>
      <Grid container direction="row" alignItems="center" justify="center">
        <Card className={classes.root}>
            <Grid item >
              <Box p={2}>
                <Typography component='h4' variant='h4'>
                    Profile Info
                </Typography>
              </Box>
            </Grid>
            <Divider/>
            <Box p={2}>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box m='auto' width={{xs: 100, lg: 200}} height={{xs: 100, lg: 200}}>
                    <CardMedia
                      className={classes.media}
                      image={image}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" color="textSecondary" component="h5">
                      {`Username: ${user.username}`}
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="h5">
                      {`Display name: ${user.displayName}`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          <Divider/>
          <Box p={2}>
            <Grid container justify="flex-end">
              <Button component={Link} color="primary" variant="contained" to="/profile/edit">Edit Profile</Button>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
};

export default UserProfile;
