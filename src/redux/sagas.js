import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../Api/index";
function* fetchData(action) {
  try {
    const data = yield call(API.getData);
    yield put({ type: "DATA_RECEIVED", payload: data });
  } catch (error) {
    console.log(error);
  }
}

function* getVideo() {
  try {
    const data = yield API.getVideo();
    yield put({ type: "STORE_VIDEO_DATA", payload: data });
  } catch (error) {
    console.log("error occoured at getVideo saga action ", error);
  }
}
function* getFirstVideo() {
  try {
    const data = yield API.getFirstVideo();
    yield put({ type: "STORE_FIRST_VIDEO_DATA", payload: data });
  } catch (error) {
    console.log("error occoured at getFirstVideo saga action ", error);
  }
}

function* postSignInData(action) {
  try {
    let payload = action.payload;
    const data = yield API.postSignInData(payload);
    localStorage.setItem("sign_in_data", JSON.stringify(data));
    yield put({ type: "STORE_SIGN_IN_DATA", payload: data });
  } catch (error) {
    console.log("error occoured at postSignInData saga action ", error);
  }
}
function* postLogInData(action) {
  try {
    let { remember, ...payload } = action.payload;
    if (remember) {
      localStorage.setItem("user_log_in_data", JSON.stringify(payload));
    } else {
      localStorage.removeItem("user_log_in_data");
    }

    const data = yield axios.post(
      "https://api.tutorspoint.uk/api/login",
      payload
    );

    localStorage.setItem("log_in_data", JSON.stringify(data));
    yield put({ type: "STORE_LOG_IN_DATA", payload: data });
  } catch (error) {
    console.log("error occoured at postSignInData saga action ", error);
    yield put({
      type: "STORE_LOG_IN_ERROR_DATA",
      payload: error.response.data.message,
    });
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchData);
  yield takeLatest("GET_VIDEO", getVideo);
  yield takeLatest("GET_VIDEO_ONE", getFirstVideo);
  yield takeLatest("POST_SIGN_IN_DATA", postSignInData);
  yield takeLatest("POST_LOG_IN_DATA", postLogInData);
}

export default mySaga;
