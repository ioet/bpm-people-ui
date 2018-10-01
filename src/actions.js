export const addUsers = allUsers => ({
  type: 'ADD_USERS',
  user: allUsers,
});

export const addUser = oneUser => ({
  type: 'ADD_USER',
  id: oneUser.id,
  name: oneUser.name,
  authentication_identity: oneUser.authentication_identity,
});

export const resetUserCreationData = () => ({
  type: 'USER_CREATION_DATA',
  name: '',
  authentication_identity: '',
});

export const setUserCreationData = (name, authentication_identity) => ({
  type: 'USER_CREATION_DATA',
  name,
  authentication_identity,
});

export const setErrorMessage = errorMessage => ({
  type: 'ERROR_MESSAGE',
  open: true,
  message: errorMessage,
});

export const hideErrorMessage = () => ({
  type: 'ERROR_MESSAGE',
  open: false,
  message: '',
});

export const setEditUserId = editUserId => ({
  type: 'EDIT_USER_ID',
  id: editUserId,
});

export const setEditUserData = (name, authentication_identity) => ({
  type: 'EDIT_USER_DATA',
  name,
  authentication_identity,
});

export const setEditUserFinished = () => ({
  type: 'EDIT_USER_FINISH',
});

export const setUpdateUser = userToUpdate => ({
  type: 'UPDATE_USER',
  user: userToUpdate,
});

export const removeUser = userToRemove => ({
  type: 'REMOVE_USER',
  user: userToRemove,
});
