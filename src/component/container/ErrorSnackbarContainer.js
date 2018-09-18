import { connect } from 'react-redux';
import ErrorSnackbar from '../presentational/ErrorSnackbar';

const mapStateToProps = state => ({
  open: state.error.open,
  message: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch({
      type: 'ERROR_MESSAGE',
      open: false,
      message: '',
    });
  },
});

const ErrorSnackbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorSnackbar);

export default ErrorSnackbarContainer;
