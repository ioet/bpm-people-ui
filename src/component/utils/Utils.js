/* eslint-disable max-len */
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const longEnough = /^(.*){8}$/;
  const atLeastOneNumber = /^((.*\d.*).*)$/;
  const atLeastOneUppercaseLetter = /^((.*[A-Z].*).*)$/;
  const atLeastOneLowercaseLetter = /^((.*[a-z].*).*)$/;
  const atLeastOneSpecialCharacter = /^((.*\W.*).*)$/;
  return longEnough.test(password)
    && atLeastOneNumber.test(password)
    && atLeastOneUppercaseLetter.test(password)
    && atLeastOneLowercaseLetter.test(password)
    && atLeastOneSpecialCharacter.test(password);
};

export const compareUsersByFirstName = (a, b) => {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
};

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

export const getUserObjectFromArray = user => ({
  id: user[0],
  name: user[1],
  authentication_identity: user[2],
});
