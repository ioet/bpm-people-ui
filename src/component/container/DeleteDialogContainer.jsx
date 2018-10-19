import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeUserAsync } from '../../actions';

const mapStateToProps = state => ({
  open: state.userDelete.open,
  users: state.userDelete.users,
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
