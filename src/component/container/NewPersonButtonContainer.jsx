import { connect } from 'react-redux';
import { startCreateUser } from '../../actions';
import NewPersonButton from '../presentational/NewPersonButton';

const mapDispatchToProps = dispatch => ({
  createUser: () => {
    dispatch(startCreateUser());
  },
});

const NewPersonButtonContainer = connect(
  null,
  mapDispatchToProps,
)(NewPersonButton);

export default NewPersonButtonContainer;
