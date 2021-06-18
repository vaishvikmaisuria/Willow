import axios from "axios";

export const localUrl = "http://localhost";
export const serverUrl = "http://localhost:5000";

// Adds trailing slash if they do not exist 
const enforceTrailingSlash = (url) => {
  return url.endsWith("/") ? url : url + "/";
};

// Definition of Get request with axios with port 5000
export function getRequest(uri, searchParams) {
  const params = searchParams ? searchParams : "";
  return axios.get(enforceTrailingSlash(`${serverUrl}${uri}`) + params);
}

// Definition of Post request with axios and specific port 5000
export function postRequest(uri, data) {
  return axios.post(enforceTrailingSlash(`${serverUrl}${uri}`), data);
}

