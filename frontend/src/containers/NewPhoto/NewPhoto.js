import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPhoto } from "../../store/actions/photosActions";
import PhotoForm from "../../components/PhotoForm/PhotoForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const NewPhoto = () => {
  const error = useSelector((state) => state.photos.error);
  const dispatch = useDispatch();
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10} lg={6}>
        <Box pb={2} pt={2}>
          <Typography variant="h4">Add New Photo</Typography>
        </Box>
        <PhotoForm
          onSubmit={(data) => dispatch(createPhoto(data))}
          error={error}
        />
      </Grid>
    </Grid>
  );
};

export default NewPhoto;
