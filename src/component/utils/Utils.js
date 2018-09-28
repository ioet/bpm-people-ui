/* eslint-disable max-len,no-undef */

// export const PEOPLE_API = 'http://localhost:3000/people';
export const PEOPLE_API = process.env.REACT_APP_BPM_PEOPLE_API_URL;

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function handleErrors(response) {
  if (!response.ok) {
    alert(response.statusText);
    throw Error(response.statusText);
  }
  return response;
}

export function compareUsersByFirstName(a, b) {
  if (a.display_name.toLowerCase() < b.display_name.toLowerCase()) {
    return -1;
  }
  if (a.display_name.toLowerCase() > b.display_name.toLowerCase()) {
    return 1;
  }
  return 0;
}
