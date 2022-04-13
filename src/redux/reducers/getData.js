const dataReducer = (state = {}, action) => {
  switch (action.type) {
    // case "DATA_RECEIVED":
    //   return (state = [action.payload]);

    case "STORE_VIDEO_DATA":
      return (state = { ...state, video: [action.payload] });

    case "STORE_FIRST_VIDEO_DATA":
      return (state = { ...state, firstVideo: [action.payload] });

    case "STORE_SIGN_IN_DATA":
      return (state = { ...state, sign_in_data: [action.payload] });

    case "STORE_LOG_IN_DATA":
      return (state = { ...state, login_data: [action.payload] });

    default:
      return state;
  }
};

export default dataReducer;
