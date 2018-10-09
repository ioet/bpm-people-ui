import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeUserAsync } from '../../actions';

const mapStateToProps = state => ({
  open: state.userDelete.open,
  user: state.userDelete.user,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (user) => {
    dispatch(hideDeleteDialog());
    if (typeof user !== 'undefined') {
      dispatch(removeUserAsync(user));
    }
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);

export default DeleteDialogContainer;
