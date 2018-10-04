import { connect } from 'react-redux';
import CreateUser from '../presentational/CreateUser';
import { createUserAsync, setUserCreationData } from '../../actions';

const mapStateToProps = state => ({
  name: state.userCreationData.name,
  authentication_identity: state.userCreationData.authentication_identity,
});

const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    dispatch(setUserCreationData(event.target.name, event.target.value));
  },
  createUser: () => {
    dispatch(createUserAsync());
  },
});

const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUser);

export default CreateUserContainer;
