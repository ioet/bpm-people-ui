import { connect } from 'react-redux';
import ErrorSnackbar from '../presentational/ErrorSnackbar';
import { hideMessage } from '../../actions';

const mapStateToProps = state => ({
  open: state.message.open,
  message: state.message.message,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(hideMessage());
  },
});

const ErrorSnackbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorSnackbar);

export default ErrorSnackbarContainer;
