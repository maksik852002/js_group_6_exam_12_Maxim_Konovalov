import React, { Component } from "react";
import { fetchPhotos, deletePhoto } from "../../store/actions/photosActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

class Photos extends Component {
  componentDidMount() {
    this.props.fetchPhotos(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchPhotos(this.props.match.params.id);
    }
  }

  render() {
    const userGallery = this.props.photos.find(
      (el) => el.user._id === this.props.match.params.id
    );
    return (
      <Box mt={3}>
        <Grid container direction="column" spacing={1}>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">
                {!userGallery
                  ? "All Users Gallery"
                  : userGallery.user.displayName + "'s Gallery"}
              </Typography>
            </Grid>
            {this.props.user && (
              <Grid item>
                <Button color="primary" component={Link} to={"/photos/new"}>
                  Add new photo
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item container direction="row" spacing={1}>
            {this.props.photos.map((photo) => (
              <Photo
                key={photo._id}
                title={photo.title}
                currentUser={this.props.user && this.props.user._id}
                image={photo.image}
                user={photo.user}
                own={!!userGallery}
                deletePhoto={() =>
                  this.props.deletePhoto(photo._id, photo.user._id)
                }
                path={this.props.match.params.id}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  photos: state.photos.photos,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (userId) => dispatch(fetchPhotos(userId)),
  deletePhoto: (photoId, userId) => dispatch(deletePhoto(photoId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
