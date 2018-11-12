/* eslint-disable max-len */
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function compareUsersByFirstName(a, b) {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
}

export const arrayToUserObject = (array, keyField) => (
  array.reduce((obj, user) => {
    obj[user[keyField]] = user;
    return obj;
  }, {})
);

export const getUserToBeCreated = () => (
  {
    id: 'userToBeCreated',
    name: '',
    authentication_identity: '',
  }
);

export function getUserObjectFromArray(user) {
  return {
    id: user[0],
    name: user[1],
    authentication_identity: user[2],
  };
}
