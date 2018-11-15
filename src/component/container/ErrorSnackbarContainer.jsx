import { connect } from 'react-redux';
import ErrorSnackbar from '../presentational/ErrorSnackbar';
import { hideMessage } from '../../actions';
import { getMessage, isMessageOpen } from '../../selectors';

const mapStateToProps = state => ({
  open: isMessageOpen(state),
  message: getMessage(state),
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
