import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    top: "0",
    left: "0",
    background: "transparent",
    boxShadow: "none",
    paddingTop: "10px",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  media: {
    width: "100%",
  },
  wrap: {
    height: "inherit",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhotoDialog({ open, close, image }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={close}
              aria-label="close"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid item container justify="center" className={classes.wrap}>
          <CardMedia
            className={classes.media}
            image={image}
            title="media"
            component="img"
          />
        </Grid>
      </Dialog>
    </div>
  );
}
