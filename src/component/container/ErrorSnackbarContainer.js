import { connect } from 'react-redux';
import ErrorSnackbar from '../presentational/ErrorSnackbar';
import { hideErrorMessage } from '../../index';

const mapStateToProps = state => ({
  open: state.error.open,
  message: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(hideErrorMessage());
  },
});

const ErrorSnackbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorSnackbar);

export default ErrorSnackbarContainer;
