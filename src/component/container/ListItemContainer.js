/* eslint-disable no-undef,camelcase,prefer-destructuring,max-len,prefer-arrow-callback */
import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';
import { handleErrors, PEOPLE_API, validateEmail } from '../utils/Utils';

let name = null;
let authentication_identity = null;

const updateUser = (user, dispatch) => {
  dispatch({
    type: 'EDIT_USER_END',
  });

  // check input
  if (name === null && authentication_identity === null) return;
  if (name === null) name = user.name;
  if (authentication_identity === null) authentication_identity = user.authentication_identity;

  if (typeof name === 'undefined' || name === '') {
    dispatch({
      type: 'ERROR_MESSAGE',
      open: true,
      message: 'Please enter a valid name',
    });
    return;
  }
  if (typeof authentication_identity === 'undefined' || authentication_identity === '') {
    dispatch({
      type: 'ERROR_MESSAGE',
      open: true,
      message: 'Please enter a valid name',
    });
    return;
  }
  if (!validateEmail(authentication_identity)) {
    dispatch({
      type: 'ERROR_MESSAGE',
      open: true,
      message: 'Please enter a valid email',
    });
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
      dispatch({
        type: 'UPDATE_USER',
        user: {
          id: user.id,
          name,
          authentication_identity,
        },
      });
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
      dispatch({
        type: 'EDIT_USER_ID',
        user,
      });
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
    dispatch({
      type: 'EDIT_USER_DATA',
      name,
      authentication_identity,
    });
  },
  onUserRemoved: (user) => {
    // delete user per api
    fetch(`${PEOPLE_API}/${user.id}`, {
      method: 'delete',
    })
      .then(handleErrors)
      .then(() => {
        // on success remove user from state
        dispatch({
          type: 'REMOVE_USER',
          user,
        });
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
