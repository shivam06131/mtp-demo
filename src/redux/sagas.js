import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../Api/index";
function* fetchData(action) {
  try {
    // console.log(action.payload);
    const data = yield call(API.getData);
    yield put({ type: "DATA_RECEIVED", payload: data });
  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchData);
}

export default mySaga;
