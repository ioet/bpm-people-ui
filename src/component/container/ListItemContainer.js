/* eslint-disable no-undef,camelcase,prefer-destructuring,max-len,prefer-arrow-callback */
import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';
import { handleErrors, PEOPLE_API, validateEmail } from '../utils/Utils';
import {
  removeUser,
  setEditUserData,
  setEditUserFinished,
  setEditUserId,
  setErrorMessage,
  setUpdateUser,
} from '../../actions';

let name = null;
let authentication_identity = null;

const updateUser = (user, dispatch) => {
  dispatch(setEditUserFinished());

  // check input
  if (name === null && authentication_identity === null) return;
  if (name === null) name = user.name;
  if (authentication_identity === null) authentication_identity = user.authentication_identity;

  if (typeof name === 'undefined' || name === '') {
    dispatch(setErrorMessage('Please enter a valid name'));
    return;
  }
  if (typeof authentication_identity === 'undefined' || authentication_identity === '') {
    dispatch(setErrorMessage('Please enter a valid email'));
    return;
  }
  if (!validateEmail(authentication_identity)) {
    dispatch(setErrorMessage('Please enter a valid email'));
    return;
  }

  // update user per api
  fetch(`${PEOPLE_API}/${user.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      authentication_identity,
    }),
  })
    .then(handleErrors)
    .then(() => {
      const userToUpdate = {
        id: user.id,
        name,
        authentication_identity,
      };
      dispatch(setUpdateUser(userToUpdate));
      name = null;
      authentication_identity = null;
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  edit: (typeof state.userEditData.id === 'undefined') ? '' : state.userEditData.id,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (event, user) => {
    if (event.target.innerHTML === '✎') {
      dispatch(setEditUserId(user.id));
    } else {
      updateUser(user, dispatch);
    }
  },
  onChange: (event) => {
    if (event.target.name === 'name') {
      name = event.target.value;
    } else {
      authentication_identity = event.target.value;
    }
    dispatch(setEditUserData(name, authentication_identity));
  },
  onUserRemoved: (user) => {
    // delete user per api
    fetch(`${PEOPLE_API}/${user.id}`, {
      method: 'delete',
    })
      .then(handleErrors)
      .then(() => {
        // on success remove user from state
        dispatch(removeUser(user));
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  },
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default ListItemContainer;
