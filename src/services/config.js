const devBaseURL = "http://123.207.32.32:9001/";
const proBaseURL = "https://production.org";
console.log(process.env)
console.log(process)
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
