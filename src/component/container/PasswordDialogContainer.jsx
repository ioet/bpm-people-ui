import { connect } from 'react-redux';
import { handleCloseEnterPasswordDialog, setUserEditData } from '../../actions';
import PasswordDialog from '../presentational/PasswordDialog';
import { Variable } from '../../constants';
import {
  getInputError,
  getUserEditPassword,
  getUserPasswordConfirm,
  isPasswordDialogOpen,
} from '../../selectors';

const mapStateToProps = state => ({
  open: isPasswordDialogOpen(state),
  inputError: getInputError(state, Variable.PASSWORD_CONFIRM),
  password: getUserEditPassword(state),
  passwordConfirm: getUserPasswordConfirm(state),
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseEnterPasswordDialog(confirmed));
  },
  onChange: (event) => {
    dispatch(setUserEditData(event.target.name, event.target.value));
  },
});

const PasswordDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordDialog);

export default PasswordDialogContainer;
