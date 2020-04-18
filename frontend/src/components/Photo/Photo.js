import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoDialog from "../UI/PhotoDialog/PhotoDialog";
import { apiURL } from "../../constants";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Photo({
  title,
  image,
  user,
  own,
  currentUser,
  path,
  deletePhoto,
}) {
  const classes = useStyles();
  const picture = apiURL + "/" + image;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PhotoDialog open={open} close={handleClose} image={picture} />
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <GridListTile style={{ listStyle: "none", lineHeight: "0" }}>
          <img
            src={picture}
            alt={title}
            style={{ width: "100%", transform: "translateY(0)" }}
          />
          <GridListTileBar
            title={title}
            subtitle={
              !own && (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/users/${user._id}`}
                >
                  by: {user.displayName}
                </Link>
              )
            }
            actionIcon={
              <>
                {currentUser === user._id && path === user._id && (
                  <IconButton className={classes.icon} onClick={deletePhoto}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton className={classes.icon} onClick={handleClickOpen}>
                  <ZoomOutMapIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </GridListTile>
      </Grid>
    </>
  );
}
