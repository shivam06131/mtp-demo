const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      return (state = [action.payload]);

    case "STORE_VIDEO_DATA":
      return (state.video = [action.payload]);

    case "STORE_FIRST_VIDEO_DATA":
      return (state.firstVideo = [action.payload]);

    default:
      return state;
  }
};

export default dataReducer;
