import axios from "axios";

const resolve = (path) => {
  if (__DEV) {
    // return 'https://activity-test.tuwan.com' + path;
    return path;
  }
  return __BUILD__DEV
    ? "https://activity-test.tuwan.com" + path
    : "https://activity.tuwan.com" + path;
};

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

export const fetchSignupInfo = () => {
  return axios.get(resolve("/match/signupinfo?id=29&format=json"));
};
export const signup = (searchQuery) => {
  return axios.get(resolve("/match/signup?id=29"), {
    params: { ...searchQuery, format: "json" },
  });
};
export const fetchSignedUsers = () => {
  return axios.get(resolve("/match/getSignUpUser?id=29&format=json"));
};
export const fetchStageInfo = () => {
  return axios.get(resolve("/match/stageinfo?id=29&format=json"));
};
export const fetchMatchAmbientStatus = () => {
  return axios.get(resolve("/match/qqFlyCarList?id=29&format=json"));
};
