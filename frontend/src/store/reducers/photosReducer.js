import {
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTO_SUCCESS,
  CREATE_PHOTO_FAILURE
} from "../actions/photosActions";

const initialState = {
  photos: [],
  photo: [],
  error: null
};

const photosReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return { ...state, photos: action.photos };
    case FETCH_PHOTO_SUCCESS:
      return { ...state, photo: action.photo };
    case CREATE_PHOTO_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default photosReduser;
