/* eslint-disable camelcase */
import { connect } from 'react-redux';
import CreateUser from '../presentational/CreateUser';

let display_name;
let authentication_identity;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function handleErrors(response) {
  if (!response.ok) {
    alert(response.statusText);
    throw Error(response.statusText);
  }
  return response;
}

function createUser(dispatch) {
  const url = 'http://localhost:3001/people';
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: display_name,
      authentication_identity,
    }),
  })
    .then(handleErrors)
    .then(res => res.json())
    .then((result) => {
      // update the list
      dispatch({
        type: 'ADD_USER',
        guid: result.guid,
        display_name,
        authentication_identity,
      });

      // clear the fields
      display_name = '';
      authentication_identity = '';
      dispatch({
        type: 'USER_CREATION_DATA',
        display_name: '',
        authentication_identity: '',
      });
    })
    .catch((e) => {
      alert(e);
      console.log(e);
    });
}

const mapStateToProps = (state) => {
  console.log('map state to props', state);
  return ({
    display_name: state.userCreationData.display_name,
    authentication_identity: state.userCreationData.authentication_identity,
  });
};

const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    if (event.target.name === 'display_name') {
      display_name = event.target.value;
    } else {
      authentication_identity = event.target.value;
    }
    dispatch({
      type: 'USER_CREATION_DATA',
      display_name,
      authentication_identity,
    });
  },
  validateInput: () => {
    if (typeof display_name === 'undefined' || display_name === '') {
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
    createUser(dispatch);
  },
});

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUser);

export default CreateUserContainer;
