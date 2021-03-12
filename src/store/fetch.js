import axios from 'axios';
const isEnvEquieProd = true;

const resolve = path =>{
    if (__DEV) {
        return path;
    }
    return isEnvEquieProd 
    ? 'http://activity-test.tuwan.com'
    : 'http://activity.tuwan.com'
};

export const fetchSignupInfo = () => {
    return axios.get(resolve('/match/signupinfo?id=29&format=json'));
}
export const signup =(searchQuery) => {
    return axios.get(
        resolve('/match/signup?id=29'),
        { params: searchQuery }
    )
}