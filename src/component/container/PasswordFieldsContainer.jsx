import { connect } from 'react-redux';
import { getUserEditPassword, getUserPasswordConfirm } from '../../selectors';
import PasswordFields from '../presentational/PasswordFields';
import { handleCloseCreateUserDialog } from '../../actions';

const mapStateToProps = state => ({
  password: getUserEditPassword(state),
  passwordConfirm: getUserPasswordConfirm(state),
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseCreateUserDialog(confirmed));
  },
});

const PasswordFieldsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordFields);

export default PasswordFieldsContainer;
