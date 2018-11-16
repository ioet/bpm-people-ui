import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeUserAsync } from '../../actions';
import { getUserIds, getUserNameForDelete, isDeleteDialogOpen } from '../../selectors';

const mapStateToProps = state => ({
  open: isDeleteDialogOpen(state),
  userIds: getUserIds(state),
  username: getUserNameForDelete(state),
});

const mapDispatchToProps = dispatch => ({
  handleClose: (users = []) => {
    dispatch(hideDeleteDialog());
    users.forEach(u => dispatch(removeUserAsync(u)));
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);

export default DeleteDialogContainer;
