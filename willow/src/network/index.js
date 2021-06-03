import axios from "axios";

export const localUrl = "http://localhost";
export const serverUrl = "http://localhost:9000";

// Adds trailing slash if they do not exist 
const enforceTrailingSlash = (url) => {
  return url.endsWith("/") ? url : url + "/";
};

// Definition of Get request with axios with port 9000
export function getRequest(uri, searchParams) {
  const params = searchParams ? searchParams : "";
  return axios.get(enforceTrailingSlash(`${serverUrl}${uri}`) + params);
}
// Definition of Get request with axios and specific port 
export function getRequestSpecifyPort(uri, searchParams) {
  const params = searchParams ? searchParams : "";
  return axios.get(enforceTrailingSlash(`${localUrl}${uri}`) + params);
}

// Definition of Post request with axios and specific port 9000
export function postRequest(uri, data) {
  return axios.post(enforceTrailingSlash(`${serverUrl}${uri}`), data);
}

// Definition of Get request with axios and specific port 9000 and with return type of zip
export function getZip(uri) {
  return axios.get(enforceTrailingSlash(`${serverUrl}${uri}`), {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/zip",
    },
  });
}
