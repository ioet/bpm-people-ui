import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeUserAsync } from '../../actions';
import { DeleteDialogConst } from '../../constants';

const mapStateToProps = (state) => {
  const { userIds } = state.userDelete;
  let username = '';
  if (typeof userIds !== 'undefined') {
    username = (userIds.length > 1)
      ? userIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_USER
      : state.userList[userIds].name;
  }
  return {
    open: state.userDelete.open,
    userIds,
    username,
  };
};

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
