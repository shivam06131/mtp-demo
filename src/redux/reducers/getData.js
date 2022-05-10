const dataReducer = (state = { acc_status: [] }, action) => {
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

    case "STORE_LOG_IN_ERROR_DATA":
      return (state = { ...state, login_error_data: [action.payload] });

    case "STORE_PERSONAL_INFO_DATA":
      return (state = { ...state, teacher_personal_data: [action.payload] });

    case "GET_PERSONAL_DATA_LOADER":
      return (state = { ...state, personal_data_loader: action.payload });

    case "STORE_PERSONAL_INFO_LOADER":
      return (state = { ...state, personal_info_loader: action.payload });

    case "TEACHER_DATA_UPDATE":
      return (state = { ...state, teacher_data_updated: true });

    case "UPDATE_ACCORDION_STATUS":
      if (Array.isArray(action.payload)) {
        return (state = { ...state, acc_status: action.payload });
      }
      return (state = {
        ...state,
        acc_status: !state.acc_status.includes(action.payload)
          ? [...state.acc_status, action.payload]
          : [...state.acc_status],
      });

    case "OPEN_NEXT_ACCORDION":
      return { ...state, open_next_accordion: action.payload };

    case "UPDATE_ABOUT_ME_INFO":
      return { ...state, about_me_info: action.payload };

    case "STORE_ABOUT_ME":
      return { ...state, about_me_data: action.payload };

    case "STORE_ABOUT_ME_INFO_LOADER":
      return { ...state, about_me_loader: action.payload };

    default:
      return state;
  }
};

export default dataReducer;
