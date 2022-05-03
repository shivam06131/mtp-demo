import axios from "axios";

export const getData = async () => {
  const data = await fetch(
    "https://countriesnow.space/api/v0.1/countries/capital"
  );
  const value = await data.json();
  return value;
};

export const getVideo = async () => {
  const data = await fetch(
    "https://api.tutorspoint.uk/api/get-site-setting-details"
  );
  const value = await data.json();
  return value;
};
export const getFirstVideo = async () => {
  const data = await fetch(
    "https://api.tutorspoint.uk/api/augmentivs3files.s3.eu-west-2.amazonaws.com/home_banner_video.mp4"
  );
  // console.log("value", value);
  const value = await data.json();
  return value;
};

export const postSignInData = async (payload) => {
  const data = await axios.post(
    "https://api.tutorspoint.uk/api/registration",
    payload
  );
  return data;
};
export const postLogInData = async (payload) => {
  try {
    const data = await axios.post(
      "https://api.tutorspoint.uk/api/login",
      payload
    );
    return data;
  } catch (error) {
    console.log("error in login api ", error.response.data.message);
    // return error.response.data.message;
    return error;
  }
};
