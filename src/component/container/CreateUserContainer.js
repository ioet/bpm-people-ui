/* eslint-disable camelcase,max-len,no-undef */
import { connect } from 'react-redux';
import CreateUser from '../presentational/CreateUser';
import { handleErrors, PEOPLE_API, validateEmail } from '../utils/Utils';
import {
  addUser, resetUserCreationData, setErrorMessage, setUserCreationData,
} from '../../actions';

let name;
let authentication_identity;

function createUser(dispatch) {
  fetch(PEOPLE_API, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      authentication_identity,
    }),
  })
    .then(handleErrors)
    .then(res => res.json())
    .then((result) => {
      // update the list
      const user = {
        id: result.id,
        name,
        authentication_identity,
      };
      dispatch(addUser(user));

      // clear the fields
      name = '';
      authentication_identity = '';
      dispatch(resetUserCreationData());
    })
    .catch((e) => {
      alert(e);
      console.log(e);
    });
}

const mapStateToProps = state => ({
  name: state.userCreationData.name,
  authentication_identity: state.userCreationData.authentication_identity,
});

const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    if (event.target.name === 'name') {
      name = event.target.value;
    } else {
      authentication_identity = event.target.value;
    }
    dispatch(setUserCreationData(name, authentication_identity));
  },
  validateInput: () => {
    if (typeof name === 'undefined' || name === '') {
      dispatch(setErrorMessage('Please enter a valid name'));
      return;
    }
    if (!validateEmail(authentication_identity)) {
      dispatch(setErrorMessage('Please enter a valid email'));
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
