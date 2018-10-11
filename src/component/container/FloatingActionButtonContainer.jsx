import { connect } from 'react-redux';
import { endCreateUser, startCreateUser } from '../../actions';
import FloatingActionButton from '../presentational/FloatingActionButton';

const mapStateToProps = state => ({
  create: state.userEdit.create,
});

const mapDispatchToProps = dispatch => ({
  createUser: (create) => {
    dispatch((!create) ? startCreateUser() : endCreateUser());
  },
});

const FloatingActionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingActionButton);

export default FloatingActionButtonContainer;
