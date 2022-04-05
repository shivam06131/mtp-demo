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
    console.log(error);
  }
}
function* getFirstVideo() {
  try {
    const data = yield API.getFirstVideo();
    yield put({ type: "STORE_FIRST_VIDEO_DATA", payload: data });
  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchData);
  yield takeLatest("GET_VIDEO", getVideo);
  yield takeLatest("GET_VIDEO_ONE", getFirstVideo);
}

export default mySaga;
