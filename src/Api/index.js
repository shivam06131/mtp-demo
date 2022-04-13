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
  console.log("get video 2");
  const data = await fetch(
    "https://api.tutorspoint.uk/api/augmentivs3files.s3.eu-west-2.amazonaws.com/home_banner_video.mp4"
  );
  // console.log("value", value);
  const value = await data.json();
  return value;
};

export const postSignInData = async (payload) => {
  console.log("payload", payload);
  const data = await axios.post(
    "https://api.tutorspoint.uk/api/registration",
    payload
  );
  console.log("response data", data);
  // const value = await data.json();
  // return value;
};
