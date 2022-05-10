import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "../Api/index";

let token = localStorage.getItem("login_token");
const instance = axios.create({
  baseURL: "https://api.tutorspoint.uk/api",
  headers: {
    Authorization: `Bearer ${JSON.parse(token)}`,
    "Access-Control-Allow-Origin": "*",
    "content-type": "text/json",
    allow: "*",
  },
});

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
    // const data = yield API.postSignInData(payload);
    const data = yield axios.post(
      "https://api.tutorspoint.uk/api/registration",
      payload
    );
    // return data;
    console.log("sigin data", data);
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
    localStorage.setItem("log_in_data", JSON.stringify(data.data.user));
    yield put({ type: "STORE_LOG_IN_DATA", payload: data });
  } catch (error) {
    console.log("error occoured at postSignInData saga action ", error);
    yield put({
      type: "STORE_LOG_IN_ERROR_DATA",
      payload: error.response.data.message,
    });
  }
}

function* postMakeProfileData(action) {
  try {
    console.log("action.payload", action);
    let token = localStorage.getItem("login_token");
    // console.log("token", token);
    console.log("action data", action);
    let data = yield axios.post(
      "https://api.tutorspoint.uk/api/teacher/update-personal-information",
      action.make_profile_detail,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Access-Control-Allow-Origin": "*",
          "content-type": "text/json",
          allow: "*",
        },
      }
    );
    console.log("post request was successfull");
    yield put({ type: "TEACHER_DATA_UPDATE" });
    yield put({ type: "UPDATE_ACCORDION_STATUS", payload: "about_section" });

    yield put({ type: "OPEN_NEXT_ACCORDION", payload: "about_section" });
    // yield put({ type: "STORE_PERSONAL_INFO_DATA", payload: data });
  } catch (error) {
    console.log("error occured at postMakeProfileData in saga.js");
  }
}

function* getPersonalInfo() {
  let defaultAccordion = [
    "personal_section",
    "about_section",
    "qualifications and experience",
    "fourth_section",
  ];
  let newAccordion = [];
  let currentOpened = localStorage.getItem("current_accordion");
  let index = defaultAccordion.indexOf(currentOpened);
  for (let i = 0; i <= index; i++) {
    newAccordion.push(defaultAccordion[i]);
  }

  yield put({ type: "UPDATE_ACCORDION_STATUS", payload: newAccordion });

  try {
    yield put({ type: "STORE_PERSONAL_INFO_LOADER", payload: true });
    let data = yield instance.get("/teacher/get-personal-information");
    yield put({ type: "STORE_PERSONAL_INFO_DATA", payload: data });
    yield put({ type: "STORE_PERSONAL_INFO_LOADER", payload: false });
    yield put({ type: "UPDATE_ACCORDION_STATUS", payload: "about_section" });
  } catch (error) {
    yield put({ type: "GET_PERSONAL_DATA_LOADER", payload: true });
    console.log("error occoured at getPersonalInfo in sagas.js");
  }
}

function* setPersonalInfoLoader(action) {
  console.log("action", action);
  yield put({ type: "STORE_PERSONAL_INFO_LOADER" });
}

function* updateAboutMe(action) {
  try {
    let data = yield instance.post("/teacher/update-about-me", action.payload);
    yield put({ type: "UPDATE_ABOUT_ME_INFO", data });
    yield put({
      type: "UPDATE_ACCORDION_STATUS",
      payload: "qualifications and experience",
    });
    yield put({
      type: "OPEN_NEXT_ACCORDION",
      payload: "qualifications and experience",
    });
  } catch (error) {
    console.log("error at updateAboutMe in saga.js", error);
  }
}

function* getAboutMe() {
  try {
    let defaultAccordion = [
      "personal_section",
      "about_section",
      "qualifications and experience",
      "fourth_section",
    ];
    let newAccordion = [];
    let currentOpened = localStorage.getItem("current_accordion");
    let index = defaultAccordion.indexOf(currentOpened);
    for (let i = 0; i <= index; i++) {
      newAccordion.push(defaultAccordion[i]);
    }

    yield put({ type: "UPDATE_ACCORDION_STATUS", payload: newAccordion });
    yield put({ type: "STORE_ABOUT_ME_INFO_LOADER", payload: true });
    let data = yield instance.get("/teacher/get-about-me");
    yield put({ type: "STORE_ABOUT_ME", payload: data });
    yield put({ type: "STORE_ABOUT_ME_INFO_LOADER", payload: false });
    yield put({
      type: "UPDATE_ACCORDION_STATUS",
      payload: "qualifications and experience",
    });
  } catch (error) {
    console.log("error at getAboutMe ", error);
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchData);
  yield takeLatest("GET_VIDEO", getVideo);
  yield takeLatest("GET_VIDEO_ONE", getFirstVideo);
  yield takeLatest("POST_SIGN_IN_DATA", postSignInData);
  yield takeLatest("POST_LOG_IN_DATA", postLogInData);
  yield takeLatest("MAKE_PROFILE", postMakeProfileData);
  yield takeLatest("GET_PERSONAL_INFORMATION", getPersonalInfo);
  yield takeLatest("PERSONAL_INFO_LOADER", setPersonalInfoLoader);
  yield takeLatest("UPDATE_ABOUT_ME", updateAboutMe);
  yield takeLatest("GET_ABOUT_ME", getAboutMe);
}

export default mySaga;
