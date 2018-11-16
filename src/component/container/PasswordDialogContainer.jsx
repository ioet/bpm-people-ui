import { connect } from 'react-redux';
import { handleCloseEnterPasswordDialog, setUserEditData } from '../../actions';
import PasswordDialog from '../presentational/PasswordDialog';
import { Variable } from '../../constants';

const mapStateToProps = state => ({
  open: state.userEdit.passwordDialogOpen,
  inputError: state.inputError[Variable.PASSWORD_CONFIRM],
  password: state.userEdit[Variable.PASSWORD],
  passwordConfirm: state.userEdit[Variable.PASSWORD_CONFIRM],
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
