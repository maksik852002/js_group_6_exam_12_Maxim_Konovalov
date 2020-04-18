import axiosApi from "../../axiosApi";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTO_SUCCESS = "FETCH_PHOTO_SUCCESS";
export const CREATE_PHOTO_SUCCESS = "CREATE_PHOTO_SUCCESS";
export const CREATE_PHOTO_FAILURE = "CREATE_PHOTO_FAILURE";

export const fetchPhotosSuccess = (photos) => ({
  type: FETCH_PHOTOS_SUCCESS,
  photos,
});
export const fetchPhotoSuccess = (photo) => ({
  type: FETCH_PHOTO_SUCCESS,
  photo,
});
export const createPhotoSuccess = () => ({ type: CREATE_PHOTO_SUCCESS });
export const createPhotoFailure = (error) => ({
  type: CREATE_PHOTO_FAILURE,
  error,
});

export const fetchPhotos = (userId) => {
  return async (dispatch) => {
    let response;
    if (!userId) {
      response = await axiosApi.get("/photos");
    } else {
      response = await axiosApi.get(`/photos?user=${userId}`);
      console.log(response.data);
    }
    dispatch(fetchPhotosSuccess(response.data));
  };
};

export const fetchPhoto = (id) => {
  return async (dispatch) => {
    const response = await axiosApi.get("/photos/" + id);
    dispatch(fetchPhotoSuccess(response.data));
  };
};

export const createPhoto = (data) => {
  return async (dispatch) => {
    try {
      await axiosApi.post("/photos", data);
      dispatch(createPhotoSuccess());
      dispatch(push("/"));
      toast.success("Photo created", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      if (e.response) {
        dispatch(createPhotoFailure(e.response.data));
      } else {
        dispatch(
          createPhotoFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const deletePhoto = (photoId, userId) => {
  return async (dispatch) => {
    try {
      await axiosApi.delete(`/photos/${photoId}`);
      dispatch(fetchPhotos(userId));
    } catch (e) {
      console.log(e);
    }
  };
};
