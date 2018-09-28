/* eslint-disable no-undef,camelcase,prefer-destructuring,max-len,prefer-arrow-callback */
import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';
import { handleErrors, PEOPLE_API, validateEmail } from '../utils/Utils';

let display_name = null;
let authentication_identity = null;

const updateUser = (user, dispatch) => {
  dispatch({
    type: 'EDIT_USER_END',
  });

  // check input
  if (display_name === null && authentication_identity === null) return;
  if (display_name === null) display_name = user.display_name;
  if (authentication_identity === null) authentication_identity = user.authentication_identity;

  if (typeof display_name === 'undefined' || display_name === '') {
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
  fetch(`${PEOPLE_API}/${user.guid}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      display_name,
      authentication_identity,
    }),
  })
    .then(handleErrors)
    .then(() => {
      dispatch({
        type: 'UPDATE_USER',
        user: {
          guid: user.guid,
          display_name,
          authentication_identity,
        },
      });
      display_name = null;
      authentication_identity = null;
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  edit: (typeof state.userEditData.guid === 'undefined') ? '' : state.userEditData.guid,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (event, user) => {
    if (event.target.innerHTML === '✎') {
      dispatch({
        type: 'EDIT_USER_GUID',
        user,
      });
    } else {
      updateUser(user, dispatch);
    }
  },
  onChange: (event) => {
    if (event.target.name === 'display_name') {
      display_name = event.target.value;
    } else {
      authentication_identity = event.target.value;
    }
    dispatch({
      type: 'EDIT_USER_DATA',
      display_name,
      authentication_identity,
    });
  },
  onUserRemoved: (user) => {
    // delete user per api
    fetch(`${PEOPLE_API}/${user.guid}`, {
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
