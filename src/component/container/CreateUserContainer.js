/* eslint-disable camelcase,max-len,no-undef */
import { connect } from 'react-redux';
import CreateUser from '../presentational/CreateUser';
import { handleErrors, PEOPLE_API, validateEmail } from '../utils/Utils';

let display_name;
let authentication_identity;

function createUser(dispatch) {
  fetch(PEOPLE_API, {
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

const mapStateToProps = state => ({
  display_name: state.userCreationData.display_name,
  authentication_identity: state.userCreationData.authentication_identity,
});

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
